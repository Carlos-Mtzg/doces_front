import React, { useState } from 'react';
import styles from '../../assets/css/auth/authentication.module.css';
import { AlertCircle, Send } from 'react-feather';
import * as yup from 'yup';
import { useFormik } from 'formik';
import AxiosClient from '../../config/htttp-client/axios-client';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const RecoverPasswordModal = () => {
    const [alert, setAlert] = useState({ open: false, severity: '', message: '', title: '' });

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: yup.object().shape({
            email: yup.string().email('Ingresa un correo electrónico válido').required('Campo obligatorio *')
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                await new Promise(resolve => setTimeout(resolve, 2000));
                const response = await AxiosClient.post('/recover-password-email', {
                    email: values.email
                });
                if (response) {
                    setAlert({
                        open: true,
                        severity: 'success',
                        title: 'Correo enviado',
                        message: 'Te hemos enviado un correo electrónico con las instrucciones para restablecer tu contraseña.',
                    });
                    formik.resetForm();
                } else {
                    setAlert({
                        open: true,
                        severity: 'error',
                        title: 'Error',
                        message: 'No se pudo enviar el correo. Por favor verifica el correo ingresado.',
                    });
                    formik.resetForm();
                }
            } catch (error) {
                setAlert({
                    open: true,
                    severity: 'error',
                    title: 'Error',
                    message: 'Ocurrió un error al enviar el correo. Intenta de nuevo más tarde.',
                });
                formik.resetForm();
            } finally {
                setSubmitting(false);
            }
        }

    });

    const handleCloseModal = () => {
        formik.resetForm();
        setAlert({ ...alert, open: false });
    };

    return (
        <div className="modal fade" id="recover-password" aria-hidden="true" aria-labelledby="recover-password">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className={`modal-header ${styles['modal-header']}`}>
                        <h5 className={`modal-title fw-semibold ${styles['modal-title']}`}>Recuperar Contraseña</h5>
                        <button className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar" onClick={handleCloseModal}></button>
                    </div>
                    <form onSubmit={formik.handleSubmit} noValidate>
                        <div className="modal-body">
                            <div className="form-group mb-4">
                                <label htmlFor="email-modal-input" className={`form-label fw-normal ${styles['email-label']}`}>Correo Electrónico</label>
                                <input
                                    id="email-modal-input"
                                    name='email'
                                    type="text"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''} ${styles['email-input']}`}
                                    placeholder='Escribe aqui tu correo electrónico'
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <div className="text-danger mt-1" style={{ fontSize: '15px' }}>{formik.errors.email}</div>
                                ) : null}
                            </div>
                            <div className="alert alert-warning d-flex gap-2" role="alert">
                                <div className='d-flex align-items-center'>
                                    <AlertCircle className='me-2' />
                                </div>
                                <div>Te enviaremos un enlace con las instrucciones para restablecer tu contraseña.</div>
                            </div>
                            {alert.open && (
                                <Alert
                                    severity={alert.severity}
                                    onClose={() => setAlert({ ...alert, open: false })}
                                    style={{ marginTop: '10px' }}
                                >
                                    <AlertTitle>{alert.title}</AlertTitle>
                                    {alert.message}
                                </Alert>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type='submit' className={`py-2 ${styles['send-email-btn']}`} disabled={formik.isSubmitting}>
                                <div className={`${styles['send-email-content']}`}>
                                    {formik.isSubmitting ? (
                                        <>
                                            Cargando...
                                            <output className="spinner-border ms-4" style={{ width: '1.25rem', height: '1.25rem' }}>
                                                <span className="visually-hidden"></span>
                                            </output>
                                        </>
                                    ) : (
                                        <>
                                            Enviar Correo
                                            <Send className="ms-2" width={18} />
                                        </>
                                    )}
                                </div>
                                <span></span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RecoverPasswordModal;