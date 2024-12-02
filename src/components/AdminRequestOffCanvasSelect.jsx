import React, { useRef, useState,useEffect } from 'react';
import { ChevronsRight, BarChart2, AlertCircle, FileText, Calendar, Send, Paperclip, File } from 'react-feather';
import styles from '../assets/css/components/offcanvas-requests.module.css';
import Swal from "sweetalert2";
import AxiosClient from '../config/htttp-client/axios-client';
import AxiosFormData from '../config/htttp-client/axios-fortmData';

const AdminRequestOffCanvasSelect = ({ request }) => {
    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState('Selecciona un archivo');
    const [priority, setPriority] = useState( '');
    const [status, setStatus] = useState('');
    const [messageContent, setMessageContent] = useState('');
    const token = localStorage.getItem('token');
    const [file, setFile] = useState(null);


    useEffect(() => {
        if (request) {
            setPriority(request.priority || 'Baja');
            setStatus(request.status || 'Pendiente');
        }
    }, [request]);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleButtonError = async (event) => {
        event.preventDefault();
        const user_id = request.userData.match(/\d+/)[0];
        try {
            const userResponse = await AxiosClient.get(`/user/${user_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const user = userResponse;
            localStorage.setItem('user-id', user.id);

            const formData = new FormData();
            formData.append('toEmail', user.email);
            formData.append('subject', 'Asunto del correo');
            formData.append('title', 'Error encontrado en tu solicitud');
            formData.append('messageContent', messageContent);


            const emailReponse = await AxiosFormData.post(`/documentRequest/sendEmail`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            Swal.fire({
                title: 'Correo enviado correctamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#002E5D'
            }).then(() => {
                window.location.reload();
            });

        } catch (error) {
            Swal.fire({
                title: 'Error al enviar el correo.',
                icon: 'error',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#002E5D'
            });
        }
   
    }
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            setFile(file);
        } else {
            setFileName('Selecciona un archivo');
            setFile(null);
        }
    };

    const handlePriorityChange = async(event) => {

        const newPriority=(event.target.value);
        setPriority(newPriority);

        try {
            const response= await AxiosClient.put(`/documentRequest/priority/${request.id}/${newPriority}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
                
            });            
            Swal.fire({
                title: 'La prioridad cambio correctamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#002E5D'
            }).then(() => {
                window.location.reload();
            });
            
        } catch (error) {
            Swal.fire({
                title: 'Error al cambiar la prioridad.',
                icon: 'error',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#002E5D'
            }) ;
        }

    };

    const handleStatusChange = (event) => {

        const newStatus =(event.target.value);
        setStatus(newStatus);

        try {
            
            const response= AxiosClient.put(`/documentRequest/status/${request.id}/${newStatus}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            Swal.fire({
                title: 'El estatus cambio correctamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#002E5D'
            }).then(() => {
                window.location.reload();
            });
        } catch (error) {
            Swal.fire({
                title: 'Error al cambiar el estatus.',
                icon: 'error',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#002E5D'
            });
        }

    };

    const hanldeSendEmail = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        const user_id = request.userData.match(/\d+/)[0];
        console.log("user_id", user_id);

        try {
            const userResponse = await AxiosClient.get(`/user/${user_id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });


            const user = userResponse;
            const formData = new FormData();
            formData.append('toEmail', user.email);
            formData.append('subject', 'Asunto del correo');
            formData.append('title', 'Archivo de tu solicitud');
            formData.append('messageContent', "messageContent");
            if (file) formData.append('file', file);

            const emailResponse = await AxiosFormData.post('/sendEmail', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }, maxContentLength: Infinity,
                maxBodyLength: Infinity
            });

            Swal.fire({
                title: 'Correo enviado correctamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#002E5D'
            }).then(() => {
                window.location.reload();
            });
        } catch (error) {
            console.error('Error al enviar el correo:', error);
            Swal.fire({
                title: 'Error al enviar el correo.',
                icon: 'error',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#002E5D'
            });
        }
    };

    const { type: fileType, userData: user } = request || {};

    return (
        <div className={`${styles['custom-offcanvas']} offcanvas offcanvas-end`} tabIndex="-1" id="offCanvasRequests" aria-labelledby="offCanvasRequestsLabel">
            <div className="offcanvas-header">
                <button type="button" className="btn border-0 p-0" data-bs-dismiss="offcanvas" aria-label="Close">
                    <ChevronsRight className={`${styles['rightBtn']} text-secondary`} style={{ width: "20px" }} />
                </button>
            </div>
            <div className="offcanvas-body px-5">
                <h5 className='fs-2 fw-bold mb-5'>Detalles de Solicitud</h5>
                <div className="row d-flex mb-4">
                    <div className="col-6 fs-6  text-secondary fw-bold">
                        <AlertCircle size={20} className='me-2' />
                        Prioridad
                    </div>
                    <div className="col-6">
                        <select className="form-select" value={priority} onChange={handlePriorityChange}>
                            <option value="Alta">Alta</option>
                            <option value="Media">Media</option>
                            <option value="Baja">Baja</option>
                        </select>
                    </div>
                </div>

                <div className="row d-flex mb-4">
                    <div className="col-6 fs-6 text-secondary fw-bold">
                        <FileText size={20} className='me-2' />
                        Tipo de Documento
                    </div>
                    <div className="col-6">
                        {fileType || 'No especificado'}
                    </div>
                </div>
                <div className="row d-flex mb-4">
                    <div className="col-6 fs-6 text-secondary fw-bold">
                        <BarChart2 size={20} className='me-2' />
                        Status
                    </div>
                    <div className="col-6">
                        <select className="form-select" value={status} onChange={handleStatusChange}>
                            <option value="En progreso">En Progreso</option>
                            <option value="Pendiente">Pendiente</option>
                            <option value="Completada">Completada</option>
                        </select>
                    </div>
                </div>
                <div className="row d-flex mb-4">
                    <div className="col-6 fs-6 text-secondary fw-bold">
                        <FileText size={20} className='me-2' />
                        Datos del usuario
                    </div>
                    <div className="col-6">
                        {user || 'Sin información'}
                    </div>
                </div>
                <form className={`d-flex justify-content-between mt-5 mb-5 py-2 ${styles['text-container']}`}>
                    <div className="col-10">
                        <textarea className='form-control border-0' rows={1} placeholder='Notificar de información errónea...' 
                            value={messageContent}
                            onChange={(e) => setMessageContent(e.target.value)} 
                            style={{ resize: 'none', boxShadow: 'none' }}></textarea>
                    </div>
                    <div className="col-1 d-flex align-items-center">
                        <button className='btn text-secondary' type='submit' onClick={handleButtonError}>
                            <Send size={20} />
                        </button>
                    </div>
                </form>
                <div className='fs-6 text-secondary mb-2'>
                    <Paperclip size={15} className='me-2' />
                    Cargar archivo
                </div>
                <form>
                    <div className="input-group mb-3">
                        <button className="btn border fs-6 text-secondary" type="button" onClick={handleButtonClick}>
                            Examinar...
                        </button>
                        <label htmlFor="file-input" className="form-control rounded-end text-secondary fs-6" style={{ cursor: "pointer" }}>
                            {fileName}
                        </label>
                        <input id="file-input" type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} />
                    </div>
                    <div className="position-relative d-flex justify-content-end mt-4" >
                        <button type='button' className={`p-2 px-4 ${styles['send-document-btn']}`} onClick={hanldeSendEmail}>
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
    );
};

export default AdminRequestOffCanvasSelect;