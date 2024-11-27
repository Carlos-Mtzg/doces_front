import React, { useState } from "react";
import styles from '../../public/css/components/request-form-modal.module.css';
import { ArrowRightCircle, X, AlertCircle } from "react-feather";

const SolicitudDocumentoModal = ({ tipoDocumento }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    matricula: "",
    nivelEstudios: "",
    periodoAcademico: "",
    correo: "",
    archivos: []
  });

  const [tipoDocumentoModal, setTipoDocumentoModal] = useState("");

  const openModal = (tipoDocumento) => {
    setTipoDocumentoModal(tipoDocumento);
  };

  const niveles = ["Secundaria", "Bachillerato", "Licenciatura", "Maestría"];

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "archivos") {
      setFormData((prevState) => ({
        ...prevState,
        archivos: [...prevState.archivos, ...Array.from(files)],
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleRemoveFile = (index) => {
    setFormData((prevState) => {
      const archivos = [...prevState.archivos];
      archivos.splice(index, 1);
      return { ...prevState, archivos };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos enviados: ", formData);
  };

  return (
    <div
      className="modal fade"
      id="solicitudModal"
      tabIndex="-1"
      aria-labelledby="solicitudModalLabel"
      aria-hidden="true"
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
            ></button>
          </div>

          {/* Cuerpo del Modal */}
          <div className="modal-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {tipoDocumento === 'Título' && (
              <div className="alert alert-warning d-flex gap-2 mx-2" role="alert">
                <div className='d-flex align-items-center'>
                  <AlertCircle className='me-2' />
                </div>
                <div>Para este documento necesitarás adjuntar <strong>formato de certificación de estudios, recibo de pago, constancia de no adeudo y carta de liberación de estadías.</strong></div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="row px-2 mt-4">
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
                    className="form-select"
                    id="nivelEstudios"
                    name="nivelEstudios"
                    style={{ height: "48px" }}
                    value={formData.nivelEstudios}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecciona tu nivel de estudios</option>
                    {niveles.map((nivel, index) => (
                      <option key={index} value={nivel}>
                        {nivel}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Nombre */}
                <div className="col-md-6 mb-4">
                  <label htmlFor="nombre" className="form-label">
                    Nombre:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    name="nombre"
                    style={{ height: "48px" }}
                    placeholder="Escribe aquí tu nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Periodo Académico */}
                <div className="col-md-6 mb-4">
                  <label htmlFor="periodoAcademico" className="form-label">
                    Periodo Académico Requerido:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="periodoAcademico"
                    name="periodoAcademico"
                    style={{ height: "48px" }}
                    placeholder="Selecciona tu nivel de estudios"
                    value={formData.periodoAcademico}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Matrícula */}
                <div className="col-md-6 mb-4">
                  <label htmlFor="matricula" className="form-label">
                    Matrícula:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="matricula"
                    name="matricula"
                    style={{ height: "48px" }}
                    placeholder="Escribe aquí tu matrícula"
                    value={formData.matricula}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Correo Electrónico */}
                <div className="col-md-6 mb-4">
                  <label htmlFor="correo" className="form-label">
                    Correo Electrónico:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="correo"
                    name="correo"
                    style={{ height: "48px" }}
                    placeholder="Selecciona tu nivel de estudios"
                    value={formData.correo}
                    onChange={handleChange}
                    required
                  />
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
              </div>
            </form>
          </div>
          <div className="modal-footer d-flex justify-content-end px-3">
            {/* Botón para Enviar */}
            <button type='button' className={`p-2 px-4 ${styles['next-btn']}`}>
              <div className={`d-flex gap-2 justify-content-evenly align-items-center ${styles['next-content']}`}>
                Siguiente
                <ArrowRightCircle size={18} />
              </div>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolicitudDocumentoModal;
