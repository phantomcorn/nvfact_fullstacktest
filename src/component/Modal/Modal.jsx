import { Formik, Form, Field } from "formik";
import { useCreateUserMutation, useUpdateUserMutation } from "../../features/user/userApiSlice";
import { useEffect, useState } from "react"
import "./Modal.scss"
import Icon from "../Icon/Icon";
import { validationSchema } from "./ModalHelper";
import { useTranslation } from "react-i18next";

export default function Modal({user, closeModal}) {

    const [update, updateProps] = useUpdateUserMutation()
    const [create, createProps] = useCreateUserMutation()
    const [statusMsg, setStatusMsg] = useState("")
    const [isEdit, setIsEdit] = useState(false)
    const [initialValues, setInitialValues] = useState({
        email: "",
        name: "",
        role: "",
        birthdate: "",
        password: "",
        isActive: ""
    })
    const {t, i18n} = useTranslation("modal")

    const handleUpdate = async ({password, ...values}) => {
        setStatusMsg("Updating...")
        try {
            const res = await update({id: user._id, ...values}).unwrap()
            setStatusMsg(res.message)
        } catch (err) {
            console.log(err)
        }
    }

    const handleCreate = async (values) => {
        setStatusMsg("Creating...")
        values.birthdate = new Date(values.birthdate)

        try {
            const res = await create(values).unwrap()
            setStatusMsg(res.message)
        } catch (err) {
            console.log(err)
        }
    }

    const handleClose = (event) => {
        event.stopPropagation()
        event.preventDefault()
        closeModal()
    }

    const handleEdit = (event) => {
        event.preventDefault()
        setIsEdit(true)
    }

    useEffect(() => {
        if (user) {
            setInitialValues({
                email: user.email,
                name: user.name,
                role: user.role,
                birthdate: user.birthdate,
                password: "",
                isActive: user.isActive
            })
            setIsEdit(false)
        } else {
            setIsEdit(true)
        }
    },[user])

    return (
        <div className="overlay" onClick={handleClose}>
            <Formik
                initialValues={initialValues}
                enableReinitialize
                onSubmit={async (values) => user ? handleUpdate(values) : handleCreate(values)}
                validationSchema={validationSchema}
            >
                {({ errors, touched }) => (
                    <Form className="modal shadow" onClick={(e) => e.stopPropagation()}>
                        <div className="flex flex-row justify-between">
                            <div> {user ? t("Edit Form") : t("New user")} </div>
                            <Icon variant={"x"} onClick={handleClose} />
                        </div>
                        <div className="flex edit-form-row">
                            <div className='flex flex-col'>
                                <label htmlFor='email'>{t("Email")}</label>
                                <Field className="text-field" id="email" name="email" type="email" disabled={!isEdit}/>
                                {errors.email && touched.email ? (
                                    <div className="text-red-500">{errors.email}</div>
                                ) : null}
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor='name'>{t("Name")}</label>
                                <Field className="text-field" id="name" name="name" type="text" disabled={!isEdit}/>
                                {errors.name && touched.name ? (
                                    <div className="text-red-500">{errors.name}</div>
                                ) : null}
                            </div>
                            
                            <div className='flex flex-col'>
                                <label htmlFor='password'>{t("Password")}</label>
                                <Field disabled={(isEdit && !user) ? false : true } className="text-field" id="password" name="password" type="password"/>
                                {errors.password && touched.password ? (
                                    <div className="text-red-500">{errors.password}</div>
                                ) : null}
                            </div>
                        </div>
                        
                        <div className="flex edit-form-row">

                            <div className='flex flex-col'>
                                <label htmlFor='birthdate'>{t("Date of birth")}</label>
                                <Field className="birthdate" id="birthdate" name="birthdate" type="date" disabled={!isEdit}/>
                                {errors.birthdate && touched.birthdate ? (
                                    <div className="text-red-500">{errors.birthdate}</div>
                                ) : null}
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor='role'>{t("Role")}</label>
                                <Field as="select" className="text-field" id="role" name="role" disabled={!isEdit}>
                                    <option value="">-</option>
                                    <option value="USER">USER</option>
                                    <option value="ADMIN">ADMIN</option>
                                </Field>
                                {errors.role && touched.role ? (
                                    <div className="text-red-500">{errors.role}</div>
                                ) : null}
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor='active'>{t("Active")}</label>
                                <Field className="text-field" id="active" name="isActive" type="checkbox" disabled={!isEdit}/>
                            </div>

                        </div>

                        <div className="flex gap-5  justify-end items-center">
                            {(updateProps.isError || createProps.isError) &&
                                <div className="text-red-500"> {statusMsg} </div>
                            }
                            {(updateProps.isSuccess || createProps.isSuccess) &&
                                <div className="text-green-500"> {statusMsg} </div>
                            }   
                            <div className="flex gap-2 items-center">
                                {isEdit 
                                    ? 
                                    <button type="submit" className="secondary-btn">{user ? t("Update") : t("Create")}</button>
                                    :
                                    <button type="button" className="primary-btn"  onClick={handleEdit}>{t("Edit")}</button>
                                }
                                
                                
                                <button className="bg-slate-500" onClick={handleClose}>{t("Cancel")}</button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}