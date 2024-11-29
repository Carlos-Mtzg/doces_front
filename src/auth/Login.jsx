import React, { useContext } from 'react'
import { Form, Link, useNavigate } from 'react-router-dom'
import styles from '../assets/css/auth/login.module.css'
import { LogIn, Send, AlertCircle } from 'react-feather'

import * as yup from 'yup'
import { useFormik } from 'formik'
import AuthContext from '../config/context/auth-context'
import AxiosClient from '../config/htttp-client/axios-client'
import Swal from "sweetalert2";


const Login = () => {
    const { dispatch } = useContext(AuthContext)
    const navigate = useNavigate();
    const VALIDATION_ERROR = 'Campo obligatorio *';

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: yup.object().shape({
            email: yup.string().email('Ingresa un correo electrónico válido').required(VALIDATION_ERROR),
            password: yup.string().required(VALIDATION_ERROR)
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const response = await AxiosClient.post('/login', {
                    email: values.email,
                    password: values.password
                });
                if (response && response.accessToken) {
                    localStorage.setItem('token', response.accessToken);
                    localStorage.setItem('role', response.role);
                    sessionStorage.setItem('userId', response.id);
                    Swal.fire({
                        title: 'Has iniciado sesión correctamente.',
                        icon: 'success',
                        confirmButtonText: 'Aceptar',
                        confirmButtonColor: '#002E5D'
                    }).then(()=> {
                        dispatch({ type: 'SIGNIN', payload: response });
                        navigate('/', { replace: true });
                    })
                } else
                    throw Error('Error')
            } catch (error) {
                Swal.fire({
                    title: 'Error en el inicio de sesión',
                    text: 'Las credenciales proporcionadas son incorrectas. Por favor, verifica tu correo y contraseña.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#002E5D'
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
                                Iniciar Sesión
                                <LogIn className="ms-2" />
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
            <div className="modal fade" id="recover-password" aria-hidden="true"
                aria-labelledby="label-modal-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className={`modal-header ${styles['modal-header']}`}>
                            <h5 className={`modal-title fw-semibold ${styles['modal-title']}`}>Recuperar Contraseña</h5>
                            <button className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                        </div>
                        <Form>
                            <div className="modal-body">
                                <div className="form-group mb-4">
                                    <label htmlFor="email-modal-input" className={`form-label fw-normal ${styles['email-label']}`}>Correo Electrónico</label>
                                    <input name='email-modal-input' type="text" className={`form-control ${styles['email-input']}`} placeholder='Escribe aqui tu correo electrónico' />
                                </div>
                                <div className="alert alert-warning d-flex gap-2" role="alert">
                                    <div className='d-flex align-items-center'>
                                        <AlertCircle className='me-2' />
                                    </div>
                                    <div>Te enviaremos un enlace con las instrucciones para restablecer tu contraseña.</div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type='Submit' className={`py-2 ${styles['send-email-btn']}`}>
                                    <div className={`${styles['send-email-content']}`}>
                                        Enviar Correo
                                        <Send className="ms-2" width={18} />
                                    </div>
                                    <span></span>
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
            {/* Modal */}
        </div>
    )
}

export default Login