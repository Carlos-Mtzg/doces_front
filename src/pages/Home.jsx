import React from 'react'
import styles from '../assets/css/user/user-pages.module.css'
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