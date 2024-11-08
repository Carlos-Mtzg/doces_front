import React from 'react'
import { Form, Link } from 'react-router-dom'
import styles from '../../public/css/auth/login.module.css'
import { LogIn } from 'react-feather'

const Login = () => {
    return (
        <div className="container-fluid d-flex px-0 h-100">
            <div className={`h-100 col-4 d-flex justify-content-center flex-column p-5 ${styles['login-container']}`}>
                <h1 className={`fw-semibold text-center pb-5 ${styles['title']}`}>Inicio de Sesion</h1>
                <Form method='post'>
                    <div className="form-gorup mb-4">
                        <label htmlFor="email-input" className={`form-label fw-normal ${styles['email-label']}`}>Correo Electrónico</label>
                        <input name='email-input' type="text" className={`form-control ${styles['email-input']}`} placeholder='usuario@email.com' />
                    </div>
                    <div className="form-gorup">
                        <label htmlFor="password-input" className={`form-label fw-normal ${styles['password-label']}`}>Contraseña</label>
                        <input name='password-input' type="password" className={`form-control ${styles['password-input']}`} placeholder='********' />
                    </div>
                    <div className="form-grup text-end pt-2 pb-5">
                        <Link className={`${styles['forget-password']}`} to="/">¿Olvidaste tu contraseña?</Link>
                    </div>
                    <div className="form-gorup d-flex flex-column gap-3">
                        <button className={`${styles['signIn-btn']}`}>
                            <div className={`${styles['signIn-content']}`}>
                                Iniciar Sesión
                                <LogIn />
                            </div>
                            <span></span>
                        </button>
                        <Link className={`text-center ${styles['register-now']}`} to="/">Registrarme ahora</Link>
                    </div>
                </Form>
            </div>
            <div className='col-8'></div>
        </div>
    )
}

export default Login