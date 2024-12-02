import React, {useEffect,useState}from 'react'
import styles from '../../assets/css/admin/selected.module.css'
import AdminRequestTable from '../../components/AdminRequestTable'
import AxiosClient from '../../config/htttp-client/axios-client'
import AdminRequestOffCanvasSelect from '../../components/AdminRequestOffCanvasSelect';
const Requests = () => {
    
        const [requests, setRequests] = useState([]);
        const [selectedRequest, setSelectedRequest] = useState(null);
        const token = localStorage.getItem('token');
        const id = sessionStorage.getItem('userId');

        useEffect(() => {
            const fetchRequests = async () => {
                try {
                    const response = await AxiosClient.get('/documentRequest/', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    console.log('Response:', response);

                    if (response) {
                        const filteredRequests = response.filter(request => request.admin_id === parseInt(id));
                        const formattedRequests = filteredRequests.map((request) => ({
                            id: request.id,
                            type: request.documentName,
                            priority: request.priority,
                            status: request.status,
                            userData: `Usuario ${request.user_id}`
                        }));
                        setRequests(formattedRequests);
                    } else {
                        console.error("La respuesta no contiene datos");
                    }
                } catch (error) {
                    console.error("Error al traer la información", error);
                }
            };

            fetchRequests();
        }, [token, id]);

        return (
            <>
                <h1 className={`${styles['title']} py-2 mb-4`}>Solicitudes Seleccionadas</h1>
                <AdminRequestTable
                    requests={requests}
                    onRequestSelect={setSelectedRequest}
                />
                <AdminRequestOffCanvasSelect request={selectedRequest} />
            </>
        );
    };



export default Requests