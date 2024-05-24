import mongoose, {Schema } from "mongoose";
import {  IDepartment} from "../interface/index.interface";

const departmentSchema = new Schema<IDepartment>({
    departmentName: { type: String, required: true },
    headTeacher: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
    subjects: [{
        subjectName: { type: String, required: true },
        facultyName: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true }
    }]
});

export const DepartmentModel = mongoose.model<IDepartment>("DepartmentModel", departmentSchema);
