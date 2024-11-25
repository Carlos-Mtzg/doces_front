import React from 'react'
import AdminRequestTable from '../../components/AdminRequestTable'
import styles from '../../../public/css/admin/requests.module.css'


const RequestsSelected = () => {
    return (
        <>
            <h1 className={`${styles['title']} py-2 mb-4`}>Solicitudes</h1>
            <AdminRequestTable />
        </>
    )
}

export default RequestsSelected