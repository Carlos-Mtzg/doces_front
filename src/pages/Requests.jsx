import React from 'react';
import styles from '../../public/css/user/requests.module.css';
import RequestCard from '../components/RequestCard.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const Requests = () => {
    const data = [
        { id: '1', title: 'Kardex', description: 'Descripción del kardex', status: 'Solicitud en espera' },
        { id: '2', title: 'Constancia de estudios', description: 'Descripción del certificado', status: 'Solicitud en progreso' },
        { id: '3', title: 'Carta de recomendación', description: 'Descripción de la constancia', status: 'Solicitud terminada' },
        { id: '4', title: 'Certificado de estudios', description: 'Descripción de la constancia', status: 'Solicitud terminada' },
        { id: '5', title: 'Certificado de estudios', description: 'Descripción de la constancia', status: 'Solicitud terminada' },
        { id: '6', title: 'Kardex', description: 'Descripción de la constancia', status: 'Solicitud terminada' },
        { id: '7', title: 'Certificado de estudios', description: 'Descripción de la constancia', status: 'Solicitud terminada' },

    ];

    return (
        <>
            <h1 className={`py-2 mb-4 ${styles['title']}`}>Mis solicitudes</h1>
            <div className="container-fluid">
                <div className="row">
                    {data.map((item) => (
                        <div key={item.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mt-3 mb-1">
                            <RequestCard
                                title={item.title}
                                description={item.description}
                                status={item.status}
                                footerColor={item.footerColor}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Requests;
