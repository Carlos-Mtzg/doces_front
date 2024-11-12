import React from 'react'
import '../../public/css/user/home.css'
import AdminRequestTable from '../components/adminRequestTable'
const Home = () => {
    return (
        <>
            <h1 className='title py-2 mb-4'>Inicio</h1>


            <AdminRequestTable />
            
            </>
    )
}

export default Home