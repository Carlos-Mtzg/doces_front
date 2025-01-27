import { useState, useEffect } from 'react';
import styles from '../assets/css/user/user-pages.module.css';
import RequestCard from '../components/RequestCard.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import AxiosClient from '../config/htttp-client/axios-client.js'

const Requests = () => {
    const [data, setData] = useState([]);
    const userId = sessionStorage.getItem('userId');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await AxiosClient.get(`/documentRequest/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setData(response);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [userId]);


    return (
        <>
            <h1 className={`py-2 mb-4 ${styles['title']}`}>Mis solicitudes</h1>
            <div className={`container-fluid`}>
                <div className="row">
                    {data.map((item) => (
                        <div key={item.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mt-3 mb-1">
                            <RequestCard
                                title={item.documentName}
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
