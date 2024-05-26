import session from 'express-session';
import { IUser } from './../interface/user.interface';
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as yup from 'yup';
import prettier from 'prettier';
import bcrypt from 'bcrypt'
import { apiError } from "../helper/apiError";
import { apiResponse } from "../helper/apiResponse";
import * as dotenv  from 'dotenv'
import { userModel } from "../model/index.model";
import { string } from 'yup';
import { error } from 'console';
dotenv.config();


interface AuthenticatedRequest extends Request {
    user?: IUser; // Assuming IUser is the interface for your user model
  }

export class authMiddleware {
    userExist = async(req:Request, res:Response , next:NextFunction) =>{
        try {
            const {userName, email, password} = req.body;
            const user = await userModel.findOne({
                $or: [
                    {email}, {userName},
                ]
            })

            if(!user) {
                const errResponse = new apiError(404, "User not found", [ "User not found", ]);
                return res.status(errResponse.statuscode).json(errResponse);
            }

            const isPassword = await bcrypt.compare(password, user.password.toString());

            if(!isPassword){
                const errResponse = new apiError(401, "Invalid credentials", [ "Invalid credentials",]);
                return res.status(errResponse.statuscode).json(errResponse);
            } 

            (req as AuthenticatedRequest).user = user;
            next();
        } catch (error:any) {
            const errResponse = new apiError(500, "internal server error", [error.message])
            res.status(errResponse.statuscode).json(errResponse);
        }
    }

    userLogin = async(req:Request, res:Response) => {
        try {
            const {userName, email, password} = req.body;
            const user = await userModel.findOne({
                $or: [
                    {email}, {userName},
                ]
            })

            if(!user) {
                const errResponse = new apiError(400, "Invalid credentials", ["Invalid credentials", ]);
                return res.status(errResponse.statuscode).json(errResponse);
            }

            const isMatch = await bcrypt.compare(password, user.password.toString());
            if(!isMatch){
                const errResponse = new apiError(400, "Invalid credentials", [ "Invalid credentials", ]);
                return res.status(errResponse.statuscode).json(errResponse);
            } 

            const accessToken = jwt.sign({id: user._id, role: user.role}, process.env.ACCESS_SECRET!, {expiresIn: '1h'})
            const refreshToken = jwt.sign({id:user._id, role:user.role}, process.env.REFRESH_SECRET!, {expiresIn:'7d'})

            const updatedUser = await userModel.findByIdAndUpdate(user._id , {$set:{accessToken, refreshToken}}, {new:true});

            // (req.session as session.Session & {user:SessionData['user']}).user = {
            //     id: user._id,
            //     userName: user.userName,
            //     email: user.email,
            //     role: user.role,
            // };

            const response = new apiResponse(200, updatedUser, "user logging successfully");
            
            res.cookie('refreshToken', refreshToken, {httpOnly:true})
            
            res.header("auth-token",accessToken).status(response.statuscode).json(response)

        } catch (error:any) {
            const errResponse = new apiError(500, "internal server error", [error.message])
            res.status(errResponse.statuscode).json(errResponse);   
        }
    }

    isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
        try {
          const token = req.header("Authorization")?.replace("Bearer ", "");
          if (!token) {
            const errResponse = new apiError(401,"Authorization token is required", ["Authorization token is required"],);
            return res.status(errResponse.statuscode).json(errResponse);
          }
    
          const decoded: any = jwt.verify(token, process.env.ACCESS_SECRET!);
          const user = await userModel.findById(decoded.id);
    
          if (!user || !["principal", "teacher", "student"].includes(user.role)) {
            const errResponse = new apiError(403, "Forbidden", ["Forbidden"]);
            return res.status(errResponse.statuscode).json(errResponse);
          }
    
          (req as AuthenticatedRequest).user = user;
          next();
        } catch (error: any) {
          const errResponse = new apiError(400, "Invalid token", [error.message]);
          res.status(errResponse.statuscode).json(errResponse);
        }
      };

      isAdmin = async (req: Request, res: Response, next: NextFunction) => {
        try {
          const user = (req as AuthenticatedRequest).user; // Assuming req.user contains the authenticated user object
          if (user?.role !== "principal") {
            const errResponse = new apiError(403,"Forbidden, admin access required", ["Forbidden, admin access required"], );
            return res.status(errResponse.statuscode).json(errResponse);
          }
          next();
        } catch (error: any) {
          const errResponse = new apiError(500, "Internal Server Error", [
            error.message,
          ]);
          res.status(errResponse.statuscode).json(errResponse);
        }
      };
    
      refreshToken = async (req: Request, res: Response) => {
        try {
          const refreshToken =
            req.body.refreshToken || req.headers["x-refresh-token"];
          if (!refreshToken) {
            return res.status(401).json({ message: "Refresh token is required" });
          }
          const decoded: any = jwt.verify( refreshToken, process.env.REFRESH_TOKEN_SECRET!,);
    
          const user = await userModel.findById(decoded.userId);
          if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
    
          const accesstoken = jwt.sign( { id: user._id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: "1h" }, );
          return res.status(404).json({ accesstoken });
        } catch (error) {
          return res.status(401).json({ message: "Invalid refresh token" });
        }
      };


    userLogout = async(req:Request, res:Response) =>{
        try {
            // const userId = req.session.user?.id;
            const userId = req.body;  //remove 
            if(!userId){
                return res.status(400).json({message: 'no user logged in'})
            }
    
            await userModel.findByIdAndUpdate(userId, {$unset: {accessToken:"", refreshToken: ""}})
    
            req.session.destroy((err) => {
                if(err){
                    return res.status(500).json({message: 'Failed to logout'})
                }
                res.clearCookie('connect.sid')
                res.status(200).json({message: 'user logged out successfully'})
            })
        } catch (error:any) {
            const errResponse = new apiError(500, "internal server error", [error.message])
            res.status(errResponse.statuscode).json(errResponse);   
        }
    }
}
