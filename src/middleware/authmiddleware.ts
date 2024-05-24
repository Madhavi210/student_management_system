import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import { apiError } from "../helper/apiError";
import { apiResponse } from "../helper/apiResponse";
import * as dotenv  from 'dotenv'
import { userModel } from "../model/index.model";
dotenv.config();

