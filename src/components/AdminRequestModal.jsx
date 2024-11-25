import React, { useState, useRef } from 'react';
import { BarChart2, AlertCircle, FileText, ChevronsLeft, Calendar, Send, Paperclip, File } from 'react-feather'
import styles from '../../public/css/components/admin-requests.module.css'

const AdminRequestModal = ({ doc, fecha, prioridad, status, id, closeModal }) => {

    const [showModal, setShowModal] = useState(true);


    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState("Sin documento seleccionado");

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFileName(file ? file.name : "Sin documento seleccionado");
    };

    const handleCloseModal = () => {
        setShowModal(false);
        closeModal();
    };

    const handleBackdropClick = (e) => {
        if (e.target.classList.contains('offcanvas-backdrop')) {
            handleCloseModal();
        }
    };


    if (!showModal) {
        return null;
    }

    const data = [
        {
            nombre: "Juan",
            apellidos: "Ortiz Bernal",
            matricula: "20223TN129"

        },

    ];


    return (
        <>
            <div
                className="offcanvas-backdrop fade show" onClick={handleBackdropClick} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 1)', zIndex: 1040, }}
            />

            <div className={`${styles['custom-offcanvas']} offcanvas offcanvas-end show px-3`} tabIndex="-1" aria-labelledby="offcanvasNavbarLabel">
                <div className="offcanvas-header">
                    <button onClick={handleCloseModal} type="button" className="btn border-0 p-0" aria-label="Close">
                        <ChevronsLeft className={`${styles['leftBtn']} text-secondary`} style={{ width: "20px" }} />
                    </button>
                </div>

                <div className="offcanvas-body" style={{ fontSize: "14PX" }}>
                    <h5 className="px-3 fs-2 fw-bold mb-4">Detalles de Solicitud</h5>
                    <div className="d-flex justify-content-start">
                        <div className="px-3 w-100">
                            <div className="row align-items-start pb-4 pt-2">
                                <div className="col-sm-6 col-md-5 col-lg-7 text-start text-secondary fs-7 fw-bold">
                                    <AlertCircle className="text-secondary me-2" style={{ width: "20px" }} />
                                    Prioridad
                                </div>
                                <div
                                    className={`col-sm-2 col-md-2 offset-md-2 col-lg-2 offset-lg-0 text-center rounded-4 border text-white ${prioridad === '1' ? '' : ''
                                        }`}
                                    style={{
                                        backgroundColor:
                                            prioridad === '1' ? '#b76869' :
                                                prioridad === '2' ? '#b79769' :
                                                    prioridad === '3' ? '#75a968' : '#f1f1f1',
                                        display: 'inline-block',
                                    }}
                                >
                                    {prioridad === '1' ? 'Alta' : prioridad === '2' ? 'Media' : prioridad === '3' ? 'Baja' : prioridad}
                                </div>
                            </div>

                            <div className="row align-items-start pb-4">
                                <div className="col-sm-6 col-md-5 col-lg-7 text-start text-secondary fs-7 fw-bold">
                                    <Calendar className="text-secondary me-2" style={{ width: "20px" }} />
                                    Fecha de Entrega
                                </div>
                                <div className="col-sm-6 col-md-5 offset-md-2 col-lg-5 offset-lg-0 text-start">{fecha}</div>
                            </div>

                            <div className="row align-items-start pb-4">
                                <div className="col-sm-6 col-md-5 col-lg-7 text-start text-secondary fs-7 fw-bold">
                                    <FileText className="text-secondary me-2" style={{ width: "20px" }} />
                                    Tipo de Documento
                                </div>
                                <div className="col-sm-6 col-md-5 offset-md-2 col-lg-5 offset-lg-0 text-start">{doc}</div>
                            </div>

                            <div className="row align-items-start pb-4">
                                <div className="col-sm-6 col-md-5 col-lg-7 text-start text-secondary fs-7 fw-bold">
                                    <BarChart2 className="text-secondary me-2" style={{ width: "20px" }} />
                                    Status
                                </div>
                                <div
                                    className={`col-sm-3 col-md-3 offset-md-3 col-lg-4 offset-lg-0 text-center rounded-4 border text-white ${status === '1' ? '' : ''
                                        }`}
                                    style={{
                                        backgroundColor:
                                            status === '1' ? '#b76869' :
                                                status === '2' ? '#84a4c4' :
                                                    status === '3' ? '#75a968' : '#f1f1f1',
                                        display: 'inline-block',
                                    }}
                                >
                                    {status === '1' ? 'En espera' : status === '2' ? 'En progreso' : status === '3' ? 'Terminado' : status}
                                </div>
                            </div>

                            <div className="row align-items-start pb-2">
                                <div className="col-sm-6 col-md-5 col-lg-7 text-start text-secondary fs-7 fw-bold">
                                    <FileText className="text-secondary me-2" style={{ width: "20px" }} />
                                    Datos del usuario
                                </div>
                                <div className="col-sm-6 col-md-5 offset-md-2 col-lg-5 offset-lg-0 text-start"></div>
                            </div>

                            <div className="position-relative p-4 mb-3 ">
                                {data.map((obj, index) => (
                                    <div key={index} className="flex-column position-absolute top-50 start-50 translate-middle text-secondary">
                                        <div className="row mb-2  gap-5 ">
                                            <div className="col-5 col-md-4 col-lg-4 text-start fw-semi">Nombre:</div>
                                            <div className="col-4 col-md-4 col-lg-4 text-start ">{obj.nombre}</div>
                                        </div>
                                        <div className="row mb-2  gap-5">
                                            <div className="col-5 col-md-4 col-lg-4 text-start fw-semi">Matrícula:</div>
                                            <div className="col-4 col-md-4 col-lg-4 text-start">{obj.matricula}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className='position-relative col-12 border-bottom border-top mt-4'>
                                <textarea className='col-11 border-0 shadow-none py-2' type="text" style={{ resize: "none", overflow: "hidden" }} placeholder='Notificar de Información errónea...' />
                                <button className="position-absolute top-50 start-100 translate-middle fixed z-index-2 btn border-0 p-0" >
                                    <Send className={`${styles['leftBtn']} text-secondary`} size={15} />
                                </button>
                            </div>
                            {
                                !doc && (
                                    <div className='mt-4'>
                                        <p>
                                            Para asignarte la solicitud, presiona el botón, de esta forma se moverá a tu pantalla de solicitudes seleccionadas.
                                        </p>
                                    </div>
                                )
                            }

                            <div className='fs-6 pt-4 text-secondary'>
                                <Paperclip size={15} className='me-2' />
                                Cargar archivo
                            </div>
                            <div className='mt-3'>
                                <form>
                                    <div className="input-group mb-3">
                                        <button className="btn border fs-6 text-secondary" type="button" onClick={handleButtonClick}>
                                            Examinar...
                                        </button>
                                        <label htmlFor="file-input" className="form-control rounded-end text-secondary fs-6" style={{ cursor: "pointer" }}>
                                            Selecciona un archivo
                                        </label>
                                        <input id="file-input" type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} />
                                    </div>
                                    <div className="position-relative d-flex justify-content-end mt-4">
                                        <button type='button' className={`p-2 px-4 ${styles['send-document-btn']}`}>
                                            <div className={`d-flex gap-2 justify-content-evenly align-items-center ${styles['send-document-content']}`}>
                                                Enviar Documento
                                                <File size={15} />
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
        </>
    );
};

export default AdminRequestModal;
