import React, { useState } from "react";
import styles from '../assets/css/components/request-form-modal.module.css';
import { ArrowRightCircle, X, AlertCircle, ArrowLeftCircle } from "react-feather";
import PropTypes from 'prop-types';
import * as yup from 'yup'
import { useFormik } from 'formik'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import AxiosClientFormData from "../config/htttp-client/axios-fortmData";


const SolicitudDocumentoModal = ({ tipoDocumento, precioDocumento }) => {
  const VALIDATION_ERROR = 'Campo obligatorio *';
  const [currentSection, setCurrentSection] = useState(1);
  const [alert, setAlert] = useState({ open: false, severity: '', message: '', title: '' });
  const niveles = ["TSU", "Ingenieria", "Licenciatura"];
  const [formData, setFormData] = useState({
    archivos: []
  });


  const handleChange = (e) => {
    const { files } = e.target;
    const archivosSeleccionados = Array.from(files);
    formik.setFieldValue("archivos", archivosSeleccionados);
  };
  
  const handleRemoveFile = (index) => {
    const nuevosArchivos = [...formik.values.archivos];
    nuevosArchivos.splice(index, 1);
    formik.setFieldValue("archivos", nuevosArchivos);
  };
  
  

  const formik = useFormik({
    initialValues: {
      nombre: "",
      matricula: "",
      nivelEstudios: "",
      periodoAcademico: "",
      correo: "",
      archivos: [],
      cardNumber: "",
      expirationDate: '',
      cvv: ''
    },
    validationSchema: yup.object().shape({
      // Primer seccion
      nombre: yup.string().required(VALIDATION_ERROR),
      matricula: yup.string().required(VALIDATION_ERROR),
      nivelEstudios: yup.string().required(VALIDATION_ERROR),
      periodoAcademico: yup.string().required(VALIDATION_ERROR),
      correo: yup.string().email('Ingresa un correo electrónico válido').required(VALIDATION_ERROR),
      archivos: yup.array().max(4, 'Solo se pueden adjuntar hasta 4 archivos'),
      // Segunda seccion
      cardNumber: yup.string()
        .required('El número de tarjeta es requerido')
        .matches(/^\d{16}$/, 'El número de tarjeta debe tener 16 dígitos'),
      expirationDate: yup.string()
        .required('La fecha de expiración es requerida')
        .matches(/^(0[1-9]|1[0-2])\/?(\d{2})$/, 'La fecha de expiración debe estar en el formato MM/YY'),
      cvv: yup.string()
        .required('El CVV es requerido')
        .matches(/^\d{3,4}$/, 'El CVV debe tener 3 o 4 dígitos')
    }),
    onSubmit: async (values, { setSubmitting }) => {
      const formData = new FormData();
    
      // Agregar archivos al FormData
      if (values.archivos && values.archivos.length > 0) {
        values.archivos.forEach((file) => {
          formData.append("files", file); // El nombre "files" debe coincidir con @RequestParam en el backend
        });
      } else {
        // Si no se proporcionan archivos, mostrar una alerta (opcional)
        setAlert({
          open: true,
          severity: 'error',
          title: 'Error',
          message: 'Debe seleccionar al menos un archivo.',
        });
        setSubmitting(false); // Finalizar el envío sin realizar la solicitud
        return;
      }
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      
      // Agregar otros campos del formulario
      formData.append("nombre", values.nombre);
      formData.append("matricula", values.matricula);
      formData.append("nivelEstudios", values.nivelEstudios);
      formData.append("periodoAcademico", values.periodoAcademico);
      formData.append("correo", values.correo);
      formData.append("cardNumber", values.cardNumber);
      formData.append("expirationDate", values.expirationDate);
      formData.append("cvv", values.cvv);
    
      try {
        const token = localStorage.getItem('token');
        const userId = sessionStorage.getItem('userId');
        
        if (!userId) {
          setAlert({
            open: true,
            severity: 'error',
            title: 'Error',
            message: 'No se pudo encontrar el ID de usuario.',
          });
          setSubmitting(false);
          return;
        }
    
        const response = await AxiosClientFormData.post(`/documentRequest/${userId}/${tipoDocumento}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
    
        if (response) {
          console.log('Files uploaded successfully:', response.data);
          setAlert({
            open: true,
            severity: 'success',
            title: 'Solicitud creada exitosamente',
            message: 'Su solicitud ha sido registrada.',
          });
          formik.resetForm();
        } else {
          setAlert({
            open: true,
            severity: 'error',
            title: 'Error',
            message: '¡Ocurrió un error inesperado!',
          });
        }
      } catch (error) {
        console.error(error);
        setAlert({
          open: true,
          severity: 'error',
          title: 'Error',
          message: '¡Ocurrió un error inesperado!',
        });
      } finally {
        setSubmitting(false); // Asegurarse de que el formulario no se quede en estado de envío
      }
    }
    
    
  });

  const handleNext = () => {
    formik.validateForm().then((errors) => {
      formik.setTouched({
        nombre: true,
        matricula: true,
        nivelEstudios: true,
        periodoAcademico: true,
        correo: true,
      });
      const hasErrors = Object.keys(errors).some((key) =>
        ["nombre", "matricula", "nivelEstudios", "periodoAcademico", "correo"].includes(key)
      );
      if (!hasErrors) {
        setCurrentSection(2);
      }
    });
  };

  const handleBack = () => {
    setCurrentSection(1);
  };

  const handleCloseModal = () => {
    setCurrentSection(1);
    formik.resetForm();
    setAlert({ ...alert, open: false });
  };

  return (
    <div
      className="modal fade"
      id="solicitudModal"
      tabIndex="-1"
      aria-labelledby="solicitudModalLabel"
      aria-hidden="true"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered" style={{ maxHeight: '520px' }}>
        <div className="modal-content">
          {/* Header del Modal */}
          <div className={`modal-header ${styles['custom-header']}`}>
            <h5 className="modal-title fw-bold fs-3 px-2" id="solicitudModalLabel">
              Solicitud de Documento
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleCloseModal}
            ></button>
          </div>

          {/* Cuerpo del Modal */}
          <form onSubmit={formik.handleSubmit}>
            <div className="modal-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
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
              {tipoDocumento === 'Título' && (
                <div className="alert alert-warning d-flex gap-2 mx-2" role="alert">
                  <div className='d-flex align-items-center'>
                    <AlertCircle className='me-2' />
                  </div>
                  <div>Para este documento necesitarás adjuntar <strong>formato de certificación de estudios, recibo de pago, constancia de no adeudo y carta de liberación de estadías.</strong></div>
                </div>
              )}
              <div className="row px-2 mt-4">
                {currentSection === 1 && (
                  <>
                    {/* Tipo de Documento */}
                    <div className="col-md-6 mb-4">
                      <label htmlFor="tipoDocumento" className="form-label">
                        Tipo de Documento:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        style={{ height: "48px" }}
                        id="tipoDocumento"
                        value={tipoDocumento}
                        disabled
                      />
                    </div>

                    {/* Nivel de Estudios */}
                    <div className="col-md-6 mb-4">
                      <label htmlFor="nivelEstudios" className="form-label">
                        Nivel de estudios:
                      </label>
                      <select
                        id="nivelEstudios"
                        name="nivelEstudios"
                        style={{ height: "48px" }}
                        value={formik.values.nivelEstudios}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`form-select ${formik.touched.nivelEstudios && formik.errors.nivelEstudios ? 'is-invalid' : ''}`}
                        required
                      >
                        <option value="">Selecciona tu nivel de estudios</option>
                        {niveles.map((nivel, index) => (
                          <option key={index} value={nivel}>
                            {nivel}
                          </option>
                        ))}
                      </select>
                      {formik.touched.nivelEstudios && formik.errors.nivelEstudios ? (
                        <div className="text-danger">{formik.errors.nivelEstudios}</div>
                      ) : null}
                    </div>

                    {/* Nombre */}
                    <div className="col-md-6 mb-4">
                      <label htmlFor="nombre" className="form-label">
                        Nombre:
                      </label>
                      <input
                        id="nombre"
                        name="nombre"
                        type="text"
                        style={{ height: "48px" }}
                        value={formik.values.nombre}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`form-control ${formik.touched.nombre && formik.errors.nombre ? 'is-invalid' : ''}`}
                        placeholder="Escribe aquí tu nombre"
                      />
                      {formik.touched.nombre && formik.errors.nombre ? (
                        <div className="text-danger mt-1" style={{ fontSize: '15px' }}>{formik.errors.nombre}</div>
                      ) : null}
                    </div>

                    {/* Periodo Académico */}
                    <div className="col-md-6 mb-4">
                      <label htmlFor="periodoAcademico" className="form-label">
                        Periodo Académico Requerido:
                      </label>
                      <input
                        id="periodoAcademico"
                        name="periodoAcademico"
                        type="text"
                        style={{ height: "48px" }}
                        value={formik.values.periodoAcademico}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`form-control ${formik.touched.periodoAcademico && formik.errors.periodoAcademico ? 'is-invalid' : ''}`}
                        placeholder="Selecciona tu nivel de estudios"
                      />
                      {formik.touched.periodoAcademico && formik.errors.periodoAcademico ? (
                        <div className="text-danger mt-1" style={{ fontSize: '15px' }}>{formik.errors.periodoAcademico}</div>
                      ) : null}
                    </div>

                    {/* Matrícula */}
                    <div className="col-md-6 mb-4">
                      <label htmlFor="matricula" className="form-label">
                        Matrícula:
                      </label>
                      <input
                        id="matricula"
                        name="matricula"
                        type="text"
                        style={{ height: "48px" }}
                        value={formik.values.matricula}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`form-control ${formik.touched.matricula && formik.errors.matricula ? 'is-invalid' : ''}`}
                        placeholder="Escribe aquí tu matrícula"
                      />
                      {formik.touched.matricula && formik.errors.matricula ? (
                        <div className="text-danger mt-1" style={{ fontSize: '15px' }}>{formik.errors.matricula}</div>
                      ) : null}
                    </div>

                    {/* Correo Electrónico */}
                    <div className="col-md-6 mb-4">
                      <label htmlFor="correo" className="form-label">
                        Correo Electrónico:
                      </label>
                      <input
                        id="correo"
                        name="correo"
                        type="email"
                        style={{ height: "48px" }}
                        value={formik.values.correo}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`form-control ${formik.touched.correo && formik.errors.correo ? 'is-invalid' : ''}`}
                        placeholder="Escribe aquí tu correo electrónico"
                      />
                      {formik.touched.correo && formik.errors.correo ? (
                        <div className="text-danger mt-1" style={{ fontSize: '15px' }}>{formik.errors.correo}</div>
                      ) : null}
                    </div>

                    {/* Archivos {solo para titulo} */}
                    {tipoDocumento === 'Título' && (
                      <div className="col-md-12 mb-1">
                        <label htmlFor="archivos" className="form-label">
                          Subir Archivos:
                        </label>
                        <input
                          type="file"
                          className="form-control"
                          id="archivos"
                          name="archivos"
                          multiple
                          onChange={handleChange}
                          required
                        />
                        {formData.archivos.length > 0 && (
                          <div className="mt-4">
                            <p>Archivos seleccionados:</p>
                            <ul>
                              {formData.archivos.map((archivo, index) => (
                                <li key={index} className="text-secondary">
                                  {archivo.name}
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveFile(index)}
                                    className="btn btn-sm ms-2 border-0 text-secondary"
                                  >
                                    <X size={15} />
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
                {currentSection === 2 && (
                  <div className="row d-flex">
                    <div className="col-12 col-md-6">
                      <p className="fs-5 mb-4 fw-semibold">Datos de facturación</p>
                      {/* Número de tarjeta */}
                      <div className="col-md-12 mb-4">
                        <label htmlFor="correo" className="form-label">
                          Número de tarjeta:
                        </label>
                        <input
                          id="cardNumber"
                          name="cardNumber"
                          type="text"
                          style={{ height: "48px" }}
                          value={formik.values.cardNumber}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={`form-control ${formik.touched.cardNumber && formik.errors.cardNumber ? 'is-invalid' : ''}`}
                          placeholder="Ingresa tu número de tarjeta aquí"
                          maxLength="16"
                        />
                        {formik.touched.cardNumber && formik.errors.cardNumber ? (
                          <div className="text-danger">{formik.errors.cardNumber}</div>
                        ) : null}
                      </div>

                      <div className="row">
                        {/* Fecha de Expiración */}
                        <div className="col-md-6 mb-4">
                          <label htmlFor="expirationDate" className="form-label">Fecha de Expiración:</label>
                          <input
                            id="expirationDate"
                            name="expirationDate"
                            type="text"
                            value={formik.values.expirationDate}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            style={{ height: "48px" }}
                            className={`form-control ${formik.touched.expirationDate && formik.errors.expirationDate ? 'is-invalid' : ''}`}
                            placeholder="MM/YY"
                            maxLength="5"
                          />
                          {formik.touched.expirationDate && formik.errors.expirationDate ? (
                            <div className="text-danger">{formik.errors.expirationDate}</div>
                          ) : null}
                        </div>

                        {/* CVV */}
                        <div className="col-md-6 mb-4">
                          <label htmlFor="cvv" className="form-label">CVV:</label>
                          <input
                            id="cvv"
                            name="cvv"
                            type="text"
                            style={{ height: "48px" }}
                            className={`form-control ${formik.touched.cvv && formik.errors.cvv ? 'is-invalid' : ''}`}
                            value={formik.values.cvv}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Ingresa tu CVV"
                            maxLength="3"
                          />
                          {formik.touched.cvv && formik.errors.cvv ? (
                            <div className="text-danger">{formik.errors.cvv}</div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 px-md-5">
                      <p className="fs-5 mb-4 fw-semibold">Detalles</p>
                      <div className="p-4 border rounded d-flex flex-column h-75">
                        <p className="fs-3 text-secondary">{tipoDocumento}</p>
                        <p className="fs-3">{precioDocumento}</p>
                        <div className="mt-auto border-top d-flex">
                          <p className="me-auto pt-2">Total:</p>
                          <p className="ms-auto pt-2">{precioDocumento}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer d-flex justify-content-end px-3">
              {currentSection === 1 && (
                <>
                  <button
                    type='button'
                    aria-label="Close"
                    data-bs-dismiss="modal"
                    className={`me-auto p-2 px-4 ${styles['back-btn']}`}
                    onClick={handleCloseModal}>
                    <div className={`d-flex gap-2 justify-content-evenly align-items-center ${styles['back-content']}`}>
                      Cancelar
                      <X size={18} />
                    </div>
                    <span></span>
                  </button>

                  <button type='button' className={`p-2 px-4 ${styles['next-btn']}`} onClick={handleNext}>
                    <div className={`d-flex gap-2 justify-content-evenly align-items-center ${styles['next-content']}`}>
                      Siguiente
                      <ArrowRightCircle size={18} />
                    </div>
                    <span></span>
                  </button>
                </>
              )}
              {currentSection === 2 && (
                <>
                  <button type='submit' className={`me-auto p-2 px-4 ${styles['back-btn']}`} onClick={handleBack}>
                    <div className={`d-flex gap-2 justify-content-evenly align-items-center ${styles['back-content']}`}>
                      <ArrowLeftCircle size={18} />
                      Volver
                    </div>
                    <span></span>
                  </button>

                  <button type='submit' className={`p-2 px-4 ${styles['next-btn']}`}>
                    <div className={`d-flex gap-2 justify-content-evenly align-items-center ${styles['next-content']}`} disabled={formik.isSubmitting}>
                      Enviar
                      <ArrowRightCircle size={18} />
                    </div>
                    <span></span>
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

SolicitudDocumentoModal.propTypes = {
  tipoDocumento: PropTypes.string.isRequired,
  precioDocumento: PropTypes.string.isRequired,
};

export default SolicitudDocumentoModal;