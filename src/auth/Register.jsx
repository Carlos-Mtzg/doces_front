import React from "react";
import { Form, Link } from "react-router-dom";
import styles from "../assets/css/auth/register.module.css";
import { LogIn } from 'react-feather'

const Register = () => {
  return (
    <div className="container-fluid d-flex px-0 h-100">
      <div className={`h-100 col-12 col-md-4 d-flex justify-content-center flex-column px-5 py-3 ${styles['register-container']}`}>
        <h1 className={`fw-semibold ${styles['title']}`}>Registro</h1>
        <nav aria-label="breadcrumb pb-5">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link className={styles['back-link']} to="/auth/login">Volver</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Registro</li>
          </ol>
        </nav>
        {/* Formulario */}
        <Form method='post' className="d-flex flex-column align-items-between gap-4">
          <div className="form-group">
            <label htmlFor="name-input" className={`form-label fw-normal ${styles['form-label']}`}>Nombre</label>
            <input name='name-input' type="text" className={`form-control ${styles['form-input']}`} placeholder='Nombre/s...' />
          </div>
          <div className="form-group">
            <label htmlFor="lastname-input" className={`form-label fw-normal ${styles['form-label']}`}>Apellidos</label>
            <input name='lastname-input' type="text" className={`form-control ${styles['form-input']}`} placeholder='Apellido/s...' />
          </div>
          <div className="form-group">
            <label htmlFor="email-input" className={`form-label fw-normal ${styles['form-label']}`}>Correo electrónico</label>
            <input name='email-input' type="text" className={`form-control ${styles['form-input']}`} placeholder='Escribe aqui tu correo' />
          </div>
          <div className="form-group">
            <label htmlFor="password-input" className={`form-label fw-normal ${styles['form-label']}`}>Contraseña</label>
            <input name='password-input' type="password" className={`form-control ${styles['form-input']}`} placeholder='********' />
          </div>
          <div className="form-group d-flex flex-column mt-2">
            <button className={`${styles['register-btn']}`}>
              <div className={`${styles['register-content']}`}>
                Registrarme
                <LogIn className="ms-2" />
              </div>
              <span></span>
            </button>
          </div>
        </Form>
        {/* Formulario */}
      </div>
      <div className='col-8'></div>
    </div>
  )
}

export default Register;
