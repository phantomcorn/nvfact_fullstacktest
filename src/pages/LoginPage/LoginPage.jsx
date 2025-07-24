import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setCredentials } from '../../features/auth/authSlice.js';
import { useLoginMutation, useRegisterMutation } from "../../features/auth/authApiSlice.js"
import "./LoginPage.scss"
import { Formik, Field, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import LanguageSelect from '../../component/LanguageSelect/LanguageSelect.jsx';

export default function LoginPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { t, i18n } = useTranslation("login");

    const userRef = useRef("")
    const passRef = useRef("")

    const [msg, setMsg] = useState("")
    const [login, {isLoading}] = useLoginMutation()
    const [register, registerMutationProps] = useRegisterMutation()

    //Login
    async function handleLogin(values) {
        try {
            const resp = await login(values).unwrap()

            if (resp.token) { //user has verified their account and is admin
                dispatch(setCredentials(resp))
                navigate("/dashboard")
            } else {
                setMsg(resp.message)
            } 
        } catch (err) {
            if (!err.status) {
                setMsg("No server response")
            } else if (err.status == 400) {
                setMsg("Missing username or password")
            } else if (err.status == 401) {
                setMsg("Incorrect password")
            } else if (err.status === 404) {
                setMsg("No account found")
            } else {
                setMsg(err.data?.message)
            }
        } 
    }


    return (
        <div className="min-w-full min-h-full flex items-center justify-center flex-col">

            <Formik
                initialValues={{
                    email: "",
                    password: ""
                }}
                onSubmit={async(values) => {handleLogin(values)}}
            >
                <Form className='login-form'>
                    <div className='login-form-header bold'>
                        <h3>{t("Admin Portal")}</h3>
                        <LanguageSelect/>
                    </div>
                    <div className="login-form-field">
                        <div className='min-w-full flex flex-col'>
                            <label htmlFor='email'>{t("Email")}</label>
                            <Field className="text-field" id="email" name="email" type="email" placeholder="John@gmail.com"/>
                        </div>
                    
                        <div className='min-w-full flex flex-col'>
                            <label htmlFor='password'>{t("Password")}</label>
                            <Field className="text-field" id="password" name="password" type="password" placeholder="123123"/>
                        </div>

                        <div className='flex items-center gap-4'>
                            {msg && 
                                <div className='text-red-500'>{t(msg)}</div>
                            }
                            <button className="secondary-btn" type="submit">{t("Log in")}</button>
                        </div>
                    </div>
                    
                </Form>  
            </Formik>           
            
        </div>
    )
}