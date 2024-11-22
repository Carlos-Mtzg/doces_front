import React, { useState, useRef } from 'react';
import { BarChart2, AlertCircle, FileText, ChevronsLeft, Calendar, Send ,Paperclip} from 'react-feather'


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

            <div className="offcanvas offcanvas-end show " tabIndex="-1" aria-labelledby="offcanvasNavbarLabel">
                <div className="offcanvas-header">
                    <button
                        onClick={handleCloseModal}
                        type="button"
                        className="btn border-0 p-0"
                        aria-label="Close"
                    >
                        <ChevronsLeft className="text-secondary" style={{ width: "20px" }} />
                    </button>
                </div>

                <div className="offcanvas-body" style={{ fontSize: "14PX" }}>
                    <ul className="navbar-nav justify-content-center flex-grow-1 pe-0 mb-3">
                        <h5 className="fs-2 text text-center">Detalles de Solicitud</h5>
                    </ul>

                    <div className="d-flex justify-content-start">
                        <div className="px-3 w-100">
                            <div className="row align-items-start pb-3 pt-2">
                                <div className="col-sm-6 col-md-5 col-lg-7 text-start fs-6">
                                    <AlertCircle className="text-secondary mx-2" style={{ width: "20px" }} />
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

                            <div className="row align-items-start pb-3">
                                <div className="col-sm-6 col-md-5 col-lg-7 text-start">
                                    <Calendar className="text-secondary mx-2" style={{ width: "20px" }} />
                                    Fecha de Entrega
                                </div>
                                <div className="col-sm-6 col-md-5 offset-md-2 col-lg-5 offset-lg-0 text-start">{fecha}</div>
                            </div>

                            <div className="row align-items-start pb-3">
                                <div className="col-sm-6 col-md-5 col-lg-7 text-start">
                                    <FileText className="text-secondary mx-2" style={{ width: "20px" }} />
                                    Tipo de Documento
                                </div>
                                <div className="col-sm-6 col-md-5 offset-md-2 col-lg-5 offset-lg-0 text-start">{doc}</div>
                            </div>

                            <div className="row align-items-start pb-3">
                                <div className="col-sm-6 col-md-5 col-lg-7 text-start">
                                    <BarChart2 className="text-secondary mx-2" style={{ width: "20px" }} />
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

                            <div className="row align-items-start pb-3">
                                <div className="col-sm-6 col-md-5 col-lg-7 text-start">
                                    <FileText className="text-secondary mx-2" style={{ width: "20px" }} />
                                    Datos del usuario
                                </div>
                                <div className="col-sm-6 col-md-5 offset-md-2 col-lg-5 offset-lg-0 text-start"></div>
                            </div>

                            <div className="position-relative p-4 mb-3 ">
                                {data.map((obj, index) => (
                                    <div key={index} className="flex-column position-absolute top-50 start-50 translate-middle">

                                        <div className="row mb-2  gap-5 ">
                                            <div className="col-5 col-md-4 col-lg-4 text-start fw-bold">Nombre:</div>
                                            <div className="col-4 col-md-4 col-lg-4 text-start ">{obj.nombre}</div>
                                        </div>

                                        <div className="row mb-2  gap-5">
                                            <div className="col-5 col-md-4 col-lg-4 text-start fw-bold">Matrícula:</div>
                                            <div className="col-4 col-md-4 col-lg-4 text-start  ">{obj.matricula}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>



                            <div className='position-relative col-12 p-2 border-bottom border-top dark-subtle gap-2 items-center' >

                                <textarea className='col-11  border-0 shadow-none focus-ring focus-ring-light' type="text" style={{ resize: "none", overflow: "hidden" }} placeholder='Notificar de Información errónea...' />

                                <button className="position-absolute top-50 start-100 translate-middle fixed z-index-2 btn border-0 p-0" ><Send className='text-secondary' style={{ width: "15px" }} />  </button>
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

                            <div className='fs-5 pt-4'><Paperclip  style={{ width:"18px" }} className='text-secondary'/> Cargar archivo</div>


                            <div className='mt-3 '>

                                <form>
                                    <div className="input-group mb-3">
                                        <button
                                            className="btn border "
                                            type="button"
                                            style={{ backgroundColor: "#eceded" }}

                                            onClick={handleButtonClick}
                                        >
                                            Examinar...
                                        </button>

                                        <label
                                            className="form-control rounded-end border-start-0 "
                                            onClick={handleButtonClick}
                                            style={{ cursor: "pointer", fontSize: "15px" }}
                                        >
                                            {fileName}
                                        </label>

                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            style={{ display: "none" }}
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                    <div class="position-relative p-4">

                                    <div className='d-flex flex-column col-12 position-absolute top-50 start-100 translate-middle'>
                                    <button className='btn col-6 rounded-4 btn-outline-secondary' >Enviar Documento</button>

                                    </div>
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
