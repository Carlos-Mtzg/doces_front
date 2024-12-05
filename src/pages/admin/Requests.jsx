import React, { useState, useEffect } from 'react'
import styles from '../../assets/css/admin/admin-pages.module.css'
import AdminRequestTable from '../../components/admin/AdminRequestTable'
import AdminRequestOffCanvas from '../../components/admin/AdminRequestOffCanvas';
import AxiosClient from '../../config/htttp-client/axios-client';


const RequestsSelected = () => {
    const [requests, setRequests] = useState([]);
    const token = localStorage.getItem('token');


    useEffect(() => {
        const Requests = async () => {
            try {
                const response = await AxiosClient.get('/documentRequest/', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response) {
                    const filteredRequests = response.filter(request => request.admin_id === null && request.status != "Completada");
                    const formattedRequests = filteredRequests.map((request) => ({
                        id: request.id,
                        type: request.documentName,
                        priority: request.priority,
                        status: request.status,
                        userData: `Usuario ${request.user_id}
                    `
                    }));
                    setRequests(formattedRequests);
                } else {
                    console.log("error en el filtro ", response.data);
                }
            } catch (error) {
                console.error("error al trare la infor", error);
            }
        };
        Requests();
    }, [token]);

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