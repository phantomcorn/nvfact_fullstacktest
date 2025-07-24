import { Formik, Form, Field } from "formik";
import { useCreateUserMutation, useUpdateUserMutation } from "../../features/user/userApiSlice";
import { useEffect, useState } from "react"
import "./Modal.scss"
import Icon from "../Icon/Icon";
import { validationSchema } from "./ModalHelper";
import { useTranslation } from "react-i18next";
import fields from "./Modal.config";

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
            setStatusMsg(err.data.message)
        }
    }

    const handleCreate = async (values) => {
        setStatusMsg("Creating...")
        const formattedData = {
            birthdate: new Date(values.birthdate),
            ...values
        }
        try {
            const res = await create(formattedData).unwrap()
            setStatusMsg(res.message)
        } catch (err) {
            setStatusMsg(err.data.message)
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
                        
                        {fields.map((row,idx) => (
                            <div key={`form-row-${idx+1}`} className="flex edit-form-row">
                                
                                {row.map(({label, id, type})=> (
                                    <div className='flex flex-col'>
                                        <label htmlFor={id}>{t(label)}</label>

                                        {id === "password" && //Only allow editing when creating new user 
                                            <Field 
                                                disabled={(isEdit && !user) ? false : true } 
                                                className="text-field" 
                                                id={id}
                                                name={id} 
                                                type={id}
                                            />
                                        }

                                        {id === "email" && //Only allow editing when creating new user
                                            <Field className="text-field" id={id} name={id} type={type} disabled={user}/>
                                        }

                                        {id === "role" && //Render a dropdown
                                            <Field as="select" className="text-field" id={id} name={id} disabled={!isEdit}>
                                                <option value="">-</option>
                                                <option value="USER">USER</option>
                                                <option value="ADMIN">ADMIN</option>
                                            </Field>
                                        }

                                        {id === "isActive" && //Render a checkbox
                                            <Field className="text-field" id={id} name={id} type="checkbox" disabled={!isEdit}/>
                                        }                   

                                        {/* Rest */}
                                        {id !== "isActive" && id !== "role" && id !== "password" && id !== "email" && 
                                            <Field className="text-field" id={id} name={id} type={type} disabled={!isEdit}/>
                                        }

                                        {errors[id] && touched[id] ? (
                                            <div className="text-red-500">{errors[id]}</div>
                                        ) : null}
                                    </div>
                                ))}

                            </div>
                        ))}
                            
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