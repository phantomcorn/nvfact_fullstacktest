import { Formik, Form, Field } from "formik";
import { useCreateUserMutation, useUpdateUserMutation } from "../../features/user/userApiSlice";
import "./Modal.scss"
import * as Yup from "yup"

export default function Modal({user, closeModal}) {

    const [update, updateProps] = useUpdateUserMutation()
    const [create, createProps] = useCreateUserMutation()

    const handleUpdate = async (values) => {
        try {
            await update({id: user._id, ...values}).unwrap()
        } catch (err) {
            console.log(err)
        }
    }

    const handleCreate = async (values) => {

        values.birthdate = new Date(values.birthdate)

        try {
            await create(values).unwrap()
        } catch (err) {
            console.log(err)
        }
    }

    const handleClose = (event) => {
        event.stopPropagation()
        event.preventDefault()
        closeModal()
    }

    const initialValues = {
        email: "",
        name: "",
        role: "",
        birthdate: "",
        password: "",
        status: ""
    }

    if (user) { //editing mode
        initialValues.email = user.email
        initialValues.name = user.name
        initialValues.role = user.role
        initialValues.birthdate = user.birthdate,
        initialValues.status = user.isActive
    }

    return (
        <div className="overlay" onClick={handleClose}>
            <Formik
                initialValues={initialValues}
                enableReinitialize
                onSubmit={async (values) => user ? handleUpdate(values) : handleCreate(values)}
                validationSchema={Yup.object({
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
                })}
            >
                {({ errors, touched }) => (
                    <Form className="modal shadow" onClick={(e) => e.stopPropagation()}>
                        <div> {user ? "Edit Form" : "New user"} </div>
                        <div className="flex edit-form-row">
                            <div className='flex flex-col'>
                                <label htmlFor='email'>Email</label>
                                <Field className="text-field" id="email" name="email" type="email"/>
                                {errors.email && touched.email ? (
                                    <div className="text-red-500">{errors.email}</div>
                                ) : null}
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor='name'>Name</label>
                                <Field className="text-field" id="name" name="name" type="text"/>
                                {errors.name && touched.name ? (
                                    <div className="text-red-500">{errors.name}</div>
                                ) : null}
                            </div>
                            
                            <div className='flex flex-col'>
                                <label htmlFor='password'>Password</label>
                                <Field className="text-field" id="password" name="password" type="password"/>
                                {errors.password && touched.password ? (
                                    <div className="text-red-500">{errors.password}</div>
                                ) : null}
                            </div>
                        </div>
                        
                        <div className="flex edit-form-row">

                            <div className='flex flex-col'>
                                <label htmlFor='birthdate'>Date of birth</label>
                                <Field className="birthdate" id="birthdate" name="birthdate" type="date" />
                                {errors.birthdate && touched.birthdate ? (
                                    <div className="text-red-500">{errors.birthdate}</div>
                                ) : null}
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor='role'>Role</label>
                                <Field as="select" className="text-field" id="role" name="role">
                                    <option value="">-</option>
                                    <option value="USER">USER</option>
                                    <option value="ADMIN">ADMIN</option>
                                </Field>
                                {errors.role && touched.role ? (
                                    <div className="text-red-500">{errors.role}</div>
                                ) : null}
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor='active'>Active</label>
                                <Field className="text-field" id="active" name="status" type="checkbox"/>
                            </div>

                        </div>

                        <div className="button-options">
                            {updateProps.status.isLoading && 
                                <div> Updating.. </div>
                            }
                            {updateProps.status.isSuccess && 
                                <div> Update succesful</div>
                            }

                            {createProps.status.isLoading && 
                                <div> Creating... </div>
                            }
                            {createProps.status.isSuccess && 
                                <div> Create succesful</div>
                            }
                            <div></div>
                            <button type="submit" className="secondary-btn">Save</button>
                            <button className="bg-slate-500" onClick={handleClose}>Cancel</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}