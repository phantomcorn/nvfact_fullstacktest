import { Formik, Form, Field } from "formik";
import { useUpdateUserMutation } from "../../features/user/userApiSlice";
import "./Modal.scss"

export default function Modal({user, closeModal}) {

    const [update, status] = useUpdateUserMutation()
    const handleSubmit = async (values) => {
        try {
            const res = await update(values).unwrap()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="overlay">
        <Formik
            initialValues={{
                email: user.email,
                name: user.name,
                role: user.role,
                birthdate: user.birthdate,
            }}
            enableReinitialize
            onSubmit={async (values) => handleSubmit(values)}
        >
            <Form className="modal">
                <div className='input-group'>
                    <label htmlFor='email'>Email</label>
                    <Field className="text-field" id="email" name="email" type="email"/>
                </div>

                <div className='input-group'>
                    <label htmlFor='name'>Name</label>
                    <Field className="text-field" id="name" name="name" type="name"/>
                </div>

                <div className='input-group'>
                    <label htmlFor='role'>Role</label>
                    <Field className="text-field" id="role" name="role" type="role"/>
                </div>

                 <div className='input-group'>
                    <label htmlFor='birthdate'>Date of birth</label>
                    <Field className="birthdate" id="birthdate" name="birthdate" type="birthdate" />
                </div>

                <button type="submit" className="secondary-btn">Save</button>
                <button onClick={closeModal}>Cancel</button>
            </Form>
        </Formik>
        </div>
    )
}