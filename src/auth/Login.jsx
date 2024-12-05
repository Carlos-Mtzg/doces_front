import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from '../assets/css/auth/authentication.module.css'
import { LogIn } from 'react-feather'
import * as yup from 'yup'
import { useFormik } from 'formik'
import AuthContext from '../config/context/auth-context'
import AxiosClient from '../config/htttp-client/axios-client'
import Swal from "sweetalert2";
import RecoverPasswordModal from './components/RecoverPasswordModal'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


const Login = () => {
    const [alert, setAlert] = useState({ open: false, severity: '', message: '', title: '' });
    const { dispatch } = useContext(AuthContext)
    const navigate = useNavigate();
    const REQUIRED_FIELDS = 'Campo obligatorio *';

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: yup.object().shape({
            email: yup.string().email('Ingresa un correo electrónico válido').required(REQUIRED_FIELDS),
            password: yup.string().required(REQUIRED_FIELDS)
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                await new Promise(resolve => setTimeout(resolve, 2000));
                const response = await AxiosClient.post('/login', {
                    email: values.email,
                    password: values.password
                });
                if (response?.accessToken) {
                    localStorage.setItem('token', response.accessToken);
                    localStorage.setItem('role', response.role);
                    sessionStorage.setItem('userId', response.id);
                    Swal.fire({
                        title: 'Has iniciado sesión correctamente.',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2000
                    }).then(() => {
                        dispatch({ type: 'SIGNIN', payload: response });
                        navigate('/', { replace: true });
                    })
                } else
                    throw Error('Error')
            } catch (error) {
                setAlert({
                    open: true,
                    severity: 'error',
                    title: 'Correo y/o contraseña incorrectos. Por favor, verifica tus datos.',
                });
            }
            finally {
                setSubmitting(false);
            }
        }
    });

    return (
        <div className="container-fluid d-flex px-0 h-100">
            <div className={`h-100 col-12 col-md-4 d-flex justify-content-center flex-column p-5 ${styles['login-container']}`}>
                <h1 className={`fw-semibold pb-5 ${styles['title']}`}>Inicio de Sesion</h1>
                {/* Formulario */}
                <form onSubmit={formik.handleSubmit} noValidate>
                    <div className="form-group mb-4">
                        {alert.open && (
                            <Alert
                                severity={alert.severity}
                                onClose={() => setAlert({ ...alert, open: false })}
                                style={{ marginBottom: '20px' }}
                            >
                                <AlertTitle>{alert.title}</AlertTitle>
                                {alert.message}
                            </Alert>
                        )}
                        <label htmlFor="email-input" className={`form-label fw-normal ${styles['email-label']}`}>Correo Electrónico</label>
                        <input name='email' type="text"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''} ${styles['email-input']}`}
                            placeholder='Escribe aqui tu correo electrónico' />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="text-danger mt-1" style={{ fontSize: '15px' }}>{formik.errors.email}</div>
                        ) : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password-input" className={`form-label fw-normal ${styles['password-label']}`}>Contraseña</label>
                        <input name='password' type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''} ${styles['password-input']}`}
                            placeholder='****************' />
                        {formik.touched.password && formik.errors.password ? (
                            <div className="text-danger mt-1" style={{ fontSize: '15px' }}>{formik.errors.password}</div>
                        ) : null}
                    </div>
                    <div className="form-grup text-end pt-2 pb-5">
                        <Link className={`${styles['forget-password']}`} to="" data-bs-toggle="modal" data-bs-target="#recover-password">¿Olvidaste tu contraseña?</Link>
                    </div>
                    <div className="form-group d-flex flex-column gap-3">
                        <button className={`${styles['signIn-btn']}`} type='submit'
                            disabled={formik.isSubmitting}
                        >
                            <div className={`${styles['signIn-content']}`}>
                                {formik.isSubmitting ? (
                                    <>
                                        Cargando...
                                        <output className="spinner-border ms-4" style={{ width: '1.25rem', height: '1.25rem' }}>
                                            <span className="visually-hidden"></span>
                                        </output>
                                    </>
                                ) : (
                                    <>
                                        Iniciar Sesión
                                        <LogIn className="ms-2" />
                                    </>
                                )}
                            </div>
                            <span></span>
                        </button>

                        <Link className={`text-center ${styles['register-now']}`} to="/register">Registrarme ahora</Link>
                    </div>
                </form>
                {/* Formulario */}
            </div>
            <div className='col-8'></div>
            {/* Modal */}
            <RecoverPasswordModal />
            {/* Modal */}
        </div>
    )
}

export default Login