import React, { useState, useEffect } from 'react'
import styles from '../../assets/css/admin/requests.module.css'
import AdminRequestTable from '../../components/AdminRequestTable'
import AdminRequestOffCanvas from '../../components/AdminRequestOffCanvas';
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
                console.log(response);
                
                const formattedRequests = response.map((request) => ({
                    id: request.id,
                    type: request.documentName,
                    priority: request.priority,
                    status: request.status,
                    userData: `Usuario ${request.user_id}`
                }));
                setRequests(formattedRequests);
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