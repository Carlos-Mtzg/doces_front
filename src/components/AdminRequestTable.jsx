import React, { useState } from 'react'
import AdminRequestModal from './AdminRequestModal'
import styles from '../../public/css/components/admin-requests.module.css'

import { BarChart2, AlertCircle, FileText, ChevronsLeft, Calendar } from 'react-feather'

const AdminRequestTable = () => {
    const [modalData, setModalData] = useState(null); 
    const [isModalOpen, setIsModalOpen] = useState(false); 

    const data = [
        {
            doc: "kardex",
            fecha: "13/05/2024",
            prioridad: "1",
            status: "2",
            id_accion: "1",
        },
        {
            doc: "Constancia de estudios",
            fecha: "15/07/2024",
            prioridad: "2",
            status: "3",
            id_accion: "2",
        },
    ];

    const openModal = (docData) => {
        setModalData(docData);
        setIsModalOpen(true); 
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalData(null);
    };

    return (
        <>
            <div className="table-responsive">
                <table className="table caption-top table-hover">
                    <thead className='text-secondary'>
                        <tr className="text-center text-secondary border-bottom border-secondary-subtle">
                            <th className="border-end border-secondary-subtle text-secondary">#</th>
                            <th className="border-end border-secondary-subtle text-secondary">
                                <FileText style={{ width: '18px', marginRight: '8px' }}></FileText>
                                Tipo de Documento
                            </th>
                            <th className="border-end border-secondary-subtle text-secondary">
                                <Calendar style={{ width: '18px', marginRight: '8px' }}></Calendar>
                                Fecha de Entrega
                            </th>
                            <th className="border-end border-secondary-subtle text-secondary">
                                <AlertCircle style={{ width: '18px', marginRight: '8px' }}></AlertCircle>
                                Prioridad
                            </th>
                            <th className="border-end border-secondary-subtle text-secondary">
                                <BarChart2 style={{ width: '18px', marginRight: '8px' }}></BarChart2>
                                Status
                            </th>
                            <th className='text-secondary'>Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="text-secondary text-center">
                        {data.map((obj, index) => (
                            <tr className="border-bottom border-secondary-subtle" key={obj.id_accion}>
                                <th className="border-end border-gray align-middle text-secondary" scope="row">{index + 1}</th>
                                <td className="border border-secondary-subtle align-middle text-secondary">{obj.doc}</td>
                                <td className="border border-secondary-subtle align-middle text-secondary">{obj.fecha}</td>
                                <td className="border border-secondary-subtle align-middle text-secondary">
                                    <div className={`rounded-4 border text-white ${obj.prioridad === '1' ? '' : ''} w-75 h-50`}
                                        style={{
                                            backgroundColor: obj.prioridad === '1' ? '#b76869' :
                                                obj.prioridad === '2' ? '#b79769' :
                                                    obj.prioridad === '3' ? '#75a968' : '#f1f1f1',
                                            display: 'inline-block',
                                        }}
                                    >
                                        {obj.prioridad === '1' ? 'Alta' : obj.prioridad === '2' ? 'Media' : obj.prioridad === '3' ? 'Baja' : obj.prioridad}
                                    </div>
                                </td>
                                <td className="border border-secondary-subtle align-middle text-secondary">
                                    <div className={`position-relative rounded-4 border text-white ${obj.status === '1' ? '' : ''} w-75 h-50`}
                                        style={{
                                            backgroundColor: obj.status === '1' ? '#b76869' :
                                                obj.status === '2' ? '#84a4c4' :
                                                    obj.status === '3' ? '#75a968' : '#f1f1f1',
                                            display: 'inline-block',
                                        }}
                                    >
                                        <div className='position-absolute top-50 start-0 translate-middle-y rounded-circle ' style={{ backgroundColor: '#1F62A6' }}></div>
                                        {obj.status === '1' ? 'En espera' : obj.status === '2' ? 'En progreso' : obj.status === '3' ? 'Terminado' : obj.status}
                                    </div>
                                </td>
                                <td className="align-middle text-center">
                                    <button onClick={() => openModal(obj)} className="btn border-0 p-0">
                                   <ChevronsLeft className={`${styles['leftBtn']} text-secondary`}/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && modalData && (
                <AdminRequestModal
                    doc={modalData.doc}
                    fecha={modalData.fecha}
                    prioridad={modalData.prioridad}
                    status={modalData.status}
                    id={modalData.id_accion}
                    closeModal={closeModal} 
                />
            )}
        </>
    )
}

export default AdminRequestTable;
