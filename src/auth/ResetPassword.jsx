import React from 'react'
import styles from '../assets/css/auth/authentication.module.css'
import { CheckSquare } from 'react-feather'
import * as yup from 'yup'
import { useFormik } from 'formik'
import AxiosClient from '../config/htttp-client/axios-client'
import Swal from 'sweetalert2'
import { useNavigate, useParams } from 'react-router-dom'

const REQUIRED_FIELDS = 'Campo obligatorio';

const validationSchema = yup.object().shape({
  password: yup.string()
    .required(REQUIRED_FIELDS)
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .matches(/[A-Z]/, 'La contraseña debe contener al menos una letra mayúscula')
    .matches(/[a-z]/, 'La contraseña debe contener al menos una letra minúscula')
    .matches(/[\W_]/, 'La contraseña debe contener al menos un carácter especial (como !, @, #, $, etc.)')
    .trim(),
  repeatPassword: yup.string()
    .required(REQUIRED_FIELDS)
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
});

const showSuccessMessage = (navigate) => {
  Swal.fire({
    title: '¡Contraseña actualizada!',
    text: "Ahora puedes iniciar sesión con tu nueva contraseña.",
    icon: 'success',
    showConfirmButton: false,
    timer: 3000,
  }).then(() => {
    navigate('/login', { replace: true })
  });
}

const showErrorMessage = () => {
  Swal.fire({
    title: 'Error',
    text: 'Hubo un problema al actualizar tu contraseña. Por favor, intenta nuevamente.',
    icon: 'error',
    confirmButtonText: 'Aceptar',
    confirmButtonColor: '#002E5D',
  });
}

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      password: '',
      repeatPassword: ''
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await AxiosClient.post(`/reset-password/${token}`, {
          password: values.password,
          repeatPassword: values.repeatPassword
        });
        if (response) {
          showSuccessMessage(navigate);
        } else
          throw Error('Error')
      } catch (error) {
        showErrorMessage();
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="row w-100 d-flex justify-content-center align-items-center">
        <div className="col-6 d-flex flex-column">
          <div className="card shadow">
            <div className={`card-header py-3 fs-3 fw-bold ${styles['header-custom']}`}>
              Recuperar Contraseña
            </div>
            <div className="card-body p-5">
              {/* Formulario */}
              <form onSubmit={formik.handleSubmit} className='d-flex flex-column gap-3' noValidate>
                <div className="form-group">
                  <label htmlFor="password" className={`form-label fw-bold ${styles['form-label']}`}>Nueva contraseña</label>
                  <input name='password' type="password"
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
                <div className="form-group">
                  <label htmlFor="repeatPassword" className={`form-label fw-bold ${styles['form-label']}`}>Repite tu contraseña</label>
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
                <div className="form-group d-flex flex-column mt-2">
                  <button className={`${styles['confirm-btn']}`} type="submit"
                    disabled={formik.isSubmitting}
                  >
                    <div className={`${styles['confirm-content']}`}>
                      Confirmar
                      <CheckSquare className="ms-2" size={15} />
                    </div>
                    <span></span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword