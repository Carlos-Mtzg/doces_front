import React from 'react'
import styles from '../../public/css/user/home.module.css'
import DocumentCard from '../components/DocumentCard'

const Home = () => {
    return (
        <>
            <h1 className={`py-2 mb-4 ${styles['title']}`}>Inicio</h1>
            <DocumentCard />
        </>
    )
}

export default Home