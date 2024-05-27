
import * as yup from 'yup';
import { gender , role, resultStatus, paymentMode, paymentStatus} from '../enum/index.enum';


export const userValidate = yup.object().shape({
    userName: yup.string().required("user name is required"),
    email: yup.string().email().required("email is required"),
    password: yup.string().required("password is required"),
    age: yup.number().required().positive().integer("age is required"),
    gender: yup.string().required().oneOf(Object.values(gender)),
    role: yup.string().required().oneOf(Object.values(role)),
    dob: yup.date().required("birthdate is required"),
    profilePic: yup.string().optional(),
    address: yup.string().optional(),
    accessToken: yup.string().optional(),
    refreshToken: yup.string().optional()
})

export const resultValidate = yup.object().shape({
    student: yup.string().required(), // Assuming student ID is provided as a string
    obtainMarks: yup.number().required().positive().integer(),
    totalMarks: yup.number().required().positive().integer(),
    grade: yup.string(),
    percentage: yup.number().positive().integer(),
    status: yup.string().oneOf(Object.values(resultStatus)),
    rank: yup.string().optional()
});

export const notificationValidate = yup.object().shape({
    receiver: yup.string().required(), // Assuming receiver ID is provided as a string
    message: yup.string().required(),
    description: yup.string().optional(),
    read: yup.boolean().optional(),
});

export const feesValidate = yup.object().shape({
    student: yup.string().required("student id is required"), // Assuming student ID is provided as a string
    totalAmount: yup.number().required().positive(),
    paidAmount: yup.number().required().positive(),
    remainAmount: yup.number().positive(),
    paidDate: yup.date().default(() => new Date()),
    payment: yup.object().shape({
        paymentStatus: yup.string().required().oneOf(Object.values(paymentStatus)),
        paymentMode: yup.string().required().oneOf(Object.values(paymentMode)).default(paymentMode.CASH),
    })
});

export const departmentValidate = yup.object().shape({
    departmentName: yup.string().required("department name is required"),
    headTeacher: yup.string().required("head teacher isrequired"), // Assuming headTeacher ID is provided as a string
    subjects: yup.array().of(yup.object().shape({
        subjectName: yup.string().required("subjetc name is required"),
        facultyName: yup.string().required("faculty name is required"), // Assuming facultyName ID is provided as a string
    })).required(),
})