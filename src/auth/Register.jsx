import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styles from "../assets/css/auth/register.module.css";
import { LogIn } from 'react-feather'

import * as yup from 'yup'
import { useFormik } from 'formik'
import AuthContext from '../config/context/auth-context'
import AxiosClient from '../config/htttp-client/axios-client'

const Register = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const VALIDATION_ERROR = 'Campo obligatorio *';
  const [registered, setRegistered] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      lastname: '',
      matricula: '',
      email: '',
      password: '',
    },
    validationSchema: yup.object().shape({
      name: yup.string().matches(/^[A-Za-záéíóúÁÉÍÓÚ\s]+$/, 'El nombre solo puede contener letras y espacios').required(VALIDATION_ERROR),
      lastname: yup.string().matches(/^[A-Za-záéíóúÁÉÍÓÚ\s]+$/, 'Este campo solo puede contener letras y espacios').required(VALIDATION_ERROR),
      email: yup.string().email('Ingresa un correo electrónico válido').required(VALIDATION_ERROR),
      password: yup
        .string()
        .required('La contraseña es obligatoria')
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .matches(/[A-Z]/, 'La contraseña debe contener al menos una letra mayúscula')
        .matches(/[a-z]/, 'La contraseña debe contener al menos una letra minúscula')
        .matches(/[\W_]/, 'La contraseña debe contener al menos un carácter especial (como !, @, #, $, etc.)')
        .trim(),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await AxiosClient.post('/register', {
          name: values.name,
          lastname: values.lastname,
          email: values.email,
          password: values.password,
        });
        console.log('Response', response);

        if (response.status === 200) {
          setRegistered(true);
          // dispatch({ type: 'SIGNIN', payload: response.data });
          alert('Registro exitoso');
          navigate('/login', { replace: true });
        } else
          throw Error('Error')
      } catch (error) {
        console.log(response.data);
      }
      finally {
        setSubmitting(false);
      }
    }
  });

  if (registered) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="container-fluid d-flex px-0 h-100">
      <div className={`h-100 col-12 col-md-4 d-flex justify-content-center flex-column px-5 py-3 ${styles['register-container']}`}>
        <h1 className={`fw-semibold ${styles['title']}`}>Registro</h1>
        <nav aria-label="breadcrumb pb-5">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link className={styles['back-link']} to="/login">Volver</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Registro</li>
          </ol>
        </nav>
        {/* Formulario */}
        <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-3" style={{ minHeight: '75vh' }} noValidate>
          <div className="form-group">
            <label htmlFor="name-input" className={`form-label fw-normal ${styles['form-label']}`}>Nombre</label>
            <input name='name' type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''} ${styles['form-input']}`}
              placeholder='Nombre/s...' />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-danger mt-1" style={{ fontSize: '15px' }}>{formik.errors.name}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="lastname-input" className={`form-label fw-normal ${styles['form-label']}`}>Apellidos</label>
            <input
              name='lastname'
              type="text"
              value={formik.values.lastname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`form-control ${formik.touched.lastname && formik.errors.lastname ? 'is-invalid' : ''} ${styles['form-input']}`}
              placeholder='Apellido/s...'
            />
            {formik.touched.lastname && formik.errors.lastname ? (
              <div className="text-danger mt-1" style={{ fontSize: '15px' }}>{formik.errors.lastname}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="email-input" className={`form-label fw-normal ${styles['form-label']}`}>Correo electrónico</label>
            <input
              name='email'
              type="text"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''} ${styles['form-input']}`}
              placeholder='Escribe aqui tu correo'
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-danger mt-1" style={{ fontSize: '15px' }}>{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="password-input" className={`form-label fw-normal ${styles['form-label']}`}>Contraseña</label>
            <input
              name='password'
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''} ${styles['form-input']}`}
              placeholder='********'
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-danger mt-1" style={{ fontSize: '15px' }}>{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="form-group d-flex flex-column mt-auto">
            <button className={`${styles['register-btn']}`} type="submit"
              disabled={formik.isSubmitting}
            >
              <div className={`${styles['register-content']}`}>
                Registrarme
                <LogIn className="ms-2" />
              </div>
              <span></span>
            </button>
          </div>
        </form>
        {/* Formulario */}
      </div>
      <div className='col-8'></div>
    </div>
  )
}

export default Register;
