import React, { useState } from 'react'
import styles from '../../assets/css/admin/requests.module.css'
import AdminRequestTable from '../../components/AdminRequestTable'
import AdminRequestOffCanvas from '../../components/AdminRequestOffCanvas';


const RequestsSelected = () => {
    const [requests] = useState([
        {
            id: 1,
            type: "Certificado",
            deliveryDate: "12/12/2024",
            priority: "hight",
            status: "in-progress",
            userData: "Usuario 1"
        },
        {
            id: 2,
            type: "Titulo",
            deliveryDate: "11/11/2024",
            priority: "medium",
            status: "pending",
            userData: "Usuario 2"
        },
        {
            id: 3,
            type: "Kardex",
            deliveryDate: "09/11/2024",
            priority: "down",
            status: "completed",
            userData: "Usuario 2"
        }
    ]);

    const [selectedRequest, setSelectedRequest] = useState(null);

    return (
        <>
            <h1 className={`${styles['title']} py-2 mb-4`}>Solicitudes</h1>
            <AdminRequestTable
                requests={requests}
                onRequestSelect={setSelectedRequest}
            />
            <AdminRequestOffCanvas request={selectedRequest} />
        </>
    )
}

export default RequestsSelected