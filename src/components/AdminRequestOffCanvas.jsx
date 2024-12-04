import React, { useEffect, useState } from 'react'
import { ChevronsRight, BarChart2, AlertCircle, FileText, File } from 'react-feather'
import styles from '../assets/css/components/offcanvas-requests.module.css'
import StatusBadge from './StatusBadge'
import PriorityBadge from './PriorityBadge'
import AxiosClient from '../config/htttp-client/axios-client'
import Swal from 'sweetalert2'
import PropTypes from 'prop-types';

const AdminRequestOffCanvas = ({ request }) => {
    const token = localStorage.getItem('token');
    const [data, setData] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            if (request) {
                const userId = request.id;
                console.log(userId);
                try {
                    const userResponse = await AxiosClient.get(`/documentRequest/user/byDocumentRequest/${userId}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setData(userResponse || 'No se encontró la información');
                    console.log(userResponse);
                } catch (error) {
                    console.error('Error al consumir el endpoint:', error);
                }
            }
        };
        fetchData();
    }, [request]);


    const handlechageId = async () => {
        const adminId = sessionStorage.getItem('userId');

        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esto",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#002E5D',
            cancelButtonColor: '#707372',
            confirmButtonText: 'Seleccionar',
            cancelButtonText: 'Cancelar'
        });
        if (result.isConfirmed) {
            try {
                await AxiosClient.put(`documentRequest/admin/${request.id}/${adminId}`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(() => {
                    window.location.reload();
                });

            } catch (error) {
                console.error('Error updating admin ID:', error);
            }
        }
    };

    const { priority, type: fileType, status } = request || {};

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
                        <PriorityBadge priority={priority} />
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
                        <StatusBadge status={status} />
                    </div>
                </div>
                <div className="row d-flex mb-4 flex-column">
                    <div className="col-6 fs-6 text-secondary fw-bold">
                        <FileText size={20} className='me-2' />
                        Datos del usuario
                    </div>
                    <div className="col-6 pt-3 ms-5">
                        {data ? (
                            <div>
                                <p className="text-secondary"><strong>Nombre:</strong> {data.name} {data.lastname}</p>
                                <p className="text-secondary"><strong>Grupo:</strong> {data.grupo}</p>
                                <p className="text-secondary"><strong>Cuatrimestre:</strong> {data.cuatrimestre}</p>
                                <p className="text-secondary"><strong>Matrícula:</strong> {data.matricula}</p>
                                <p className="text-secondary"><strong>Email:</strong> {data.email}</p>
                            </div>
                        ) : (
                            <p>Cargando información del usuario...</p>
                        )}
                    </div>
                </div>
                <div className="position-relative d-flex justify-content-end gap-3 mt-4">
                    <button type="button" className={`btn btn-primary ${styles['send-document-btn']}`} onClick={handlechageId}>
                        <div className={`d-flex gap-2 align-items-center ${styles['send-document-content']}`}>
                            Seleccionar Solicitud
                            <File size={15} />
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
};

AdminRequestOffCanvas.propTypes = {
    request: PropTypes.shape({
        id: PropTypes.number,
        priority: PropTypes.string,
        status: PropTypes.string,
    }),
};

export default AdminRequestOffCanvas