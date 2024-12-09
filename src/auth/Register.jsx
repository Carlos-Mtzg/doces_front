import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../assets/css/auth/authentication.module.css";
import { ArrowLeftCircle, ArrowRightCircle, LogIn } from 'react-feather'
import * as yup from 'yup'
import { useFormik } from 'formik'
import AxiosClient from '../config/htttp-client/axios-client'
import Swal from "sweetalert2";
const REQUIRED_FIELDS = 'Campo obligatorio *';
const EMPTY_FIELDS = 'Este campo no puede contener espacios en blanco';

const validationSchema = yup.object().shape({
  name: yup.string().matches(/^[A-Za-záéíóúÁÉÍÓÚ]+$/, 'El nombre solo puede contener letras y no debe tener espacios').required(REQUIRED_FIELDS).trim(),
  lastname: yup.string().matches(/^[A-Za-záéíóúÁÉÍÓÚ]+$/, 'Este campo solo puede contener letras y no debe tener espacios').required(REQUIRED_FIELDS).trim(),
  surname: yup.string().matches(/^[A-Za-záéíóúÁÉÍÓÚ]+$/, 'Este campo solo puede contener letras y no debe tener espacios').required(REQUIRED_FIELDS).trim(),
  matricula: yup.string().required(REQUIRED_FIELDS),
  career: yup.string().required(REQUIRED_FIELDS).trim(),
  grupo: yup.string().length(1, 'El grupo debe ser un solo carácter').matches(/^\S*$/, EMPTY_FIELDS).required(REQUIRED_FIELDS).trim(),
  cuatrimestre: yup.string().matches(/^\S*$/, EMPTY_FIELDS).required(REQUIRED_FIELDS).trim(),
  email: yup.string().email('Ingresa un correo electrónico válido').matches(/^\S*$/, EMPTY_FIELDS).required(REQUIRED_FIELDS).trim(),
  password: yup
    .string()
    .required('La contraseña es obligatoria')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .matches(/[A-Z]/, 'La contraseña debe contener al menos una letra mayúscula')
    .matches(/[a-z]/, 'La contraseña debe contener al menos una letra minúscula')
    .matches(/[\W_]/, 'La contraseña debe contener al menos un carácter especial (como !, @, #, $, etc.)')
    .trim(),
  repeatPassword: yup.string()
    .required(REQUIRED_FIELDS)
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
});

const handleSubmit = async (values, { setSubmitting }, navigate) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 3000));
    const response = await AxiosClient.post('/register', values);
    if (response.status === 200) {
      showSuccessMessage(navigate)
    } else {
      throw Error('Error');
    }
  } catch (error) {
    showErrorMessage();
  } finally {
    setSubmitting(false);
  }
};

const showSuccessMessage = (navigate) => {
  Swal.fire({
    title: 'Registro exitoso',
    text: 'Te has registrado correctamente. Ahora puedes iniciar sesión.',
    icon: 'success',
    confirmButtonText: 'Aceptar',
    confirmButtonColor: '#002E5D',
  }).then(() => {
    navigate('/login', { replace: true });
  });
};

const showErrorMessage = () => {
  Swal.fire({
    title: 'Error',
    text: 'Hubo un problema al registrar tu cuenta. Por favor, intenta nuevamente.',
    icon: 'error',
    confirmButtonText: 'Aceptar',
    confirmButtonColor: '#002E5D',
  });
};

const Register = () => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(1);
  const careers = ["Licenciatura en Negocios y Mercadotecnia",
    "Licenciatura en Diseño digital y Producción audiovisual",
    "Licenciatura en Contaduría", "Licenciatura en Administración",
    "Licenciatura en Gestión del Bienestar", "Licenciatura en Terapia Física",
    "Ingeniería en Tecnologías de la información e Innovación digital",
    "Ingeniería en Diseño Textil y Moda", "Ingeniería Industrial",
    "Ingeniería Mecatrónica", "Ingeniería en Mantenimiento Industrial",
    "Ingeniería en Nanotecnología"
  ];

  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      lastname: '',
      matricula: '',
      career: '',
      grupo: '',
      cuatrimestre: '',
      email: '',
      password: '',
      repeatPassword: ''
    },
    validationSchema,
    onSubmit: (values, actions) => handleSubmit(values, actions, navigate),
  });

  const handleNext = () => {
    formik.validateForm().then((errors) => {
      formik.setTouched({
        name: true,
        surname: true,
        lastname: true,
        email: true,
        password: true,
        repeatPassword: true
      });
      const hasErrors = Object.keys(errors).some((key) =>
        ["name", "surname", "lastname", "email", "password", "repeatPassword"].includes(key)
      );
      if (!hasErrors) {
        setCurrentSection(2);
      }
    });
  };

  const handleBack = () => {
    setCurrentSection(1);
  };

  return (
    <div className="container-fluid d-flex px-0" style={{ minHeight: '100vh' }}>
      <div className="row w-100 d-flex justify-content-center align-items-center">
        <div className={`card col-8 shadow px-5 py-4 ${styles['register-container']}`}>
          <form onSubmit={formik.handleSubmit} className="d-flex flex-column" style={{ minHeight: '596px' }} noValidate>
            {currentSection == 1 && (
              <>
                <h1 className={`fw-semibold ${styles['title']}`}>Registro</h1>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link className={styles['back-link']} to="/login">Volver</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Registro</li>
                  </ol>
                </nav>
                <div className="d-flex flex-column gap-3">
                  <div className="form-group">
                    {/* Name */}
                    <label htmlFor="name-input" className={`form-label fw-normal ${styles['form-label']}`}>Nombre</label>
                    <input name='name' type="text"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''} ${styles['form-input']}`}
                      placeholder='Escribe aquí tu nombre/s' />
                    {formik.touched.name && formik.errors.name ? (
                      <div className="text-danger mt-1" style={{ fontSize: '15px' }}>{formik.errors.name}</div>
                    ) : null}
                  </div>
                  <div className="d-flex gap-3">
                    <div className="form-group w-100">
                      {/* Surname */}
                      <label htmlFor="surname-input" className={`form-label fw-normal ${styles['form-label']}`}>Apellido Paterno</label>
                      <input
                        name='surname'
                        type="text"
                        value={formik.values.surname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`form-control ${formik.touched.surname && formik.errors.surname ? 'is-invalid' : ''} ${styles['form-input']}`}
                        placeholder='Escribe aquí tu apellido'
                      />
                      {formik.touched.surname && formik.errors.surname ? (
                        <div className="text-danger mt-1" style={{ fontSize: '15px' }}>{formik.errors.surname}</div>
                      ) : null}
                    </div>
                    <div className="form-group w-100">
                      {/* Lastname */}
                      <label htmlFor="lastname-input" className={`form-label fw-normal ${styles['form-label']}`}>Apellido Materno</label>
                      <input
                        name='lastname'
                        type="text"
                        value={formik.values.lastname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`form-control ${formik.touched.lastname && formik.errors.lastname ? 'is-invalid' : ''} ${styles['form-input']}`}
                        placeholder='Escribe aquí tu apellido'
                      />
                      {formik.touched.lastname && formik.errors.lastname ? (
                        <div className="text-danger mt-1" style={{ fontSize: '15px' }}>{formik.errors.lastname}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="form-group">
                    {/* Email */}
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
                  <div className="d-flex gap-3">
                    <div className="form-group w-100">
                      {/* Password */}
                      <label htmlFor="password-input" className={`form-label fw-normal ${styles['form-label']}`}>Contraseña</label>
                      <input
                        name='password'
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''} ${styles['form-input']}`}
                        placeholder='****************'
                      />
                      {formik.touched.password && formik.errors.password ? (
                        <div className="text-danger mt-1" style={{ fontSize: '15px' }}>{formik.errors.password}</div>
                      ) : null}
                    </div>
                    <div className="form-group w-100">
                      {/* Repeat Password */}
                      <label htmlFor="repeatPassword" className={`form-label fw-normal ${styles['form-label']}`}>Repite tu contraseña</label>
                      <input name='repeatPassword' type="password"
                        value={formik.values.repeatPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`form-control ${formik.touched.repeatPassword && formik.errors.repeatPassword ? 'is-invalid' : ''} ${styles['form-input']}`}
                        placeholder='********'
                      />
                      {formik.touched.repeatPassword && formik.errors.repeatPassword ? (
                        <div className="text-danger mt-1" style={{ fontSize: '15px' }}>{formik.errors.repeatPassword}</div>
                      ) : null}
                    </div>
                  </div>
                </div>
                {/* Buttons Container */}
                <div className="d-flex justify-content-end mt-auto">
                  <button type='button' className={`p-2 px-4 ${styles['register-btn']}`} onClick={handleNext}>
                    <div className={`d-flex gap-2 justify-content-evenly align-items-center ${styles['register-content']}`}>
                      Siguiente
                      <ArrowRightCircle size={18} />
                    </div>
                    <span></span>
                  </button>
                </div>
              </>
            )}
            {currentSection == 2 && (
              <>
                <h1 className={`fw-semibold ${styles['title']} mb-5`}>Registro</h1>
                <div className="d-flex flex-column gap-3">
                  <div className="form-group w-100">
                    {/* Matricula */}
                    <label htmlFor="lastname-input" className={`form-label fw-normal ${styles['form-label']}`}>Matricula</label>
                    <input
                      name='matricula'
                      type="text"
                      value={formik.values.matricula}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`form-control ${formik.touched.matricula && formik.errors.matricula ? 'is-invalid' : ''} ${styles['form-input']}`}
                      placeholder='Escribe aquí tu matricula'
                    />
                    {formik.touched.matricula && formik.errors.matricula ? (
                      <div className="text-danger mt-1" style={{ fontSize: '15px' }}>{formik.errors.matricula}</div>
                    ) : null}
                  </div>
                  <div className="form-group w-100">
                    {/* Career */}
                    <label htmlFor="career-input" className={`form-label fw-normal ${styles['form-label']}`}>Carrera</label>
                    <select
                      name='career'
                      value={formik.values.career}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`form-control ${formik.touched.career && formik.errors.career ? 'is-invalid' : ''} ${styles['form-input']}`}
                    >
                      <option>Selecciona una opción</option>
                      {careers.map((nivel) => (
                        <option key={nivel} value={nivel}>
                          {nivel}
                        </option>
                      ))}
                    </select>
                    {formik.touched.career && formik.errors.career ? (
                      <div className="text-danger mt-1" style={{ fontSize: '15px' }}>{formik.errors.career}</div>
                    ) : null}
                  </div>
                  <div className="d-flex gap-3">
                    <div className="form-group w-100">
                      {/* Cuatrimestre */}
                      <label htmlFor="lastname-input" className={`form-label fw-normal ${styles['form-label']}`}>Cuatrimestre</label>
                      <input
                        name='cuatrimestre'
                        type="text"
                        value={formik.values.cuatrimestre}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`form-control ${formik.touched.cuatrimestre && formik.errors.cuatrimestre ? 'is-invalid' : ''} ${styles['form-input']}`}
                        placeholder='Cuatrimestre...'
                        maxLength={2}
                      />
                      {formik.touched.cuatrimestre && formik.errors.cuatrimestre ? (
                        <div className="text-danger mt-1" style={{ fontSize: '15px' }}>{formik.errors.cuatrimestre}</div>
                      ) : null}
                    </div>
                    <div className="form-group w-100">
                      {/* Group */}
                      <label htmlFor="lastname-input" className={`form-label fw-normal ${styles['form-label']}`}>Grupo</label>
                      <input
                        name='grupo'
                        type="text"
                        value={formik.values.grupo}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`form-control ${formik.touched.grupo && formik.errors.grupo ? 'is-invalid' : ''} ${styles['form-input']}`}
                        placeholder='Grupo...'
                        maxLength={1}
                      />
                      {formik.touched.grupo && formik.errors.grupo ? (
                        <div className="text-danger mt-1" style={{ fontSize: '15px' }}>{formik.errors.grupo}</div>
                      ) : null}
                    </div>
                  </div>
                </div>
                {/* Buttons Container */}
                <div className="d-flex mt-auto">
                  <button type='submit' className={`me-auto p-2 px-4 ${styles['back-btn']}`} onClick={handleBack}>
                    <div className={`d-flex gap-2 justify-content-center align-items-center ${styles['back-content']}`}>
                      <ArrowLeftCircle size={18} />
                      Volver
                    </div>
                    <span></span>
                  </button>
                  {formik.isSubmitting ? (
                    <button className={`p-2 px-4 ${styles['register-btn']}`} type="submit" disabled>
                      <div className={`${styles['register-content']}`}>
                        Cargando...
                        <output className="spinner-border ms-4" style={{ width: '1.25rem', height: '1.25rem' }}>
                          <span className="visually-hidden"></span>
                        </output>
                      </div>
                      <span></span>
                    </button>
                  ) : (
                    <button className={`p-2 px-4 ${styles['register-btn']}`} type="submit" disabled={formik.isSubmitting}>
                      <div className={`${styles['register-content']}`}>
                        Registrarme
                        <LogIn size={18} className="ms-2" />
                      </div>
                      <span></span>
                    </button>
                  )}
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register;
