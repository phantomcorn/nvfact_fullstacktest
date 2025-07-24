import * as Yup from "yup"
export const validationSchema = Yup.object({
    email: Yup.string().email("Not a valid email").required("An email is required"),
    password: Yup.string()
        .min(8, "Password must be longer than 8 characters")
        .matches(/[A-Za-z]/, 'Password must contain at least one letter')
        .matches(/[^A-Za-z0-9]/, 'Password must contain at least one symbol'),
    name: Yup.string()
        .min(1, "Name must be longer than 1 character")
        .max(15, "Name must be less than 15 characters")
        .required("Name is required"),
    role: Yup.string().oneOf(["ADMIN", "USER"],"Must be ADMIN or USER").required("Role is required"),
    birthdate: Yup.date().required("Date of birth is required")
})