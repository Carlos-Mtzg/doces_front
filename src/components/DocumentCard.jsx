import React from 'react'
import styles from '../../public/css/components/document-card.module.css'
import { AlertCircle, FilePlus, FileText, Award } from 'react-feather'
import Swal from 'sweetalert2'

function DocumentCard() {
    const handleClick = () => {
        Swal.fire({
            title: "Requisitos",
            text: "1.- Nombre completo\n2.- Matricula\n3.- Cuatrimestre\n4.- Carrera",
            icon: "question"
          });          
    }

    const handleClickTitle = () => {
        Swal.fire({
            title: "Requisitos",
            text: "1.- Nombre completo\n2.- Matricula\n3.- Cuatrimestre\n4.- Carrera\n5.- Formato de certificación de estudios\n6.- Recibo de pago de certifiación de estudios\n7.- Constancia de no adeudo\n8.- Carta de liberación de estadías",
            icon: "question"
          });   
    }

    return (
        <>
            <div className={styles.cardsContainer}>


                {/* Kardex */}
                <div className={styles.card}>
                    <div className={styles.colorLabel} style={{ backgroundColor: '#FF8000' }} />
                    <FileText size={80} style={{color:'#A3AED0', strokeWidth:'0.5'}}  />
                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 30 }}>
                        <h4>Kardex</h4>
                        <p style={{ color: 'rgba(0, 0, 0, 0.5)' }}>Descripcion...</p>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 196, height: 24 }}>
                            <div className={styles.requirementsButton} onClick={handleClick}>
                                <AlertCircle size={16}/>
                                Requisitos
                            </div>

                            <div className={styles.requestDocumentButton}>
                                <FilePlus size={16} />
                                Solicitar
                            </div>
                        </div>
                    </div>
                </div>
                {/* Constancia de estudios */}
                <div className={styles.card}>
                    <div className={styles.colorLabel} style={{ backgroundColor: '#1985B6' }} />

                    <FileText size={80} style={{color:'#A3AED0', strokeWidth:'0.5'}}  />


                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 30 }}>
                        <h4>Constancia de estudios</h4>
                        <p style={{ color: 'rgba(0, 0, 0, 0.5)' }}>Descripcion...</p>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 196, height: 24 }}>
                            <div className={styles.requirementsButton} onClick={handleClick}>
                                <AlertCircle size={16} />
                                Requisitos
                            </div>

                            <div className={styles.requestDocumentButton}>
                                <FilePlus size={16}/>
                                Solicitar
                            </div>
                        </div>
                    </div>
                </div>

                {/* Certificado de estudios */}
                <div className={styles.card}>
                    <div className={styles.colorLabel} style={{ backgroundColor: '#FFBF61' }} />

                    <FileText size={80} style={{color:'#A3AED0', strokeWidth:'0.5'}}  />

                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 30 }}>
                        <h4>Constancia de estudios</h4>
                        <p style={{ color: 'rgba(0, 0, 0, 0.5)' }}>Descripcion...</p>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 196, height: 24 }}>
                            <div className={styles.requirementsButton} onClick={handleClick}>
                                <AlertCircle size={16} />
                                Requisitos
                            </div>

                            <div className={styles.requestDocumentButton}>
                                <FilePlus size={16} />
                                Solicitar
                            </div>
                        </div>
                    </div>
                </div>

                {/* Carta de recomendacion */}
                <div className={styles.card}>
                    <div className={styles.colorLabel} style={{ backgroundColor: '#00AB84' }} />

                    <FileText size={80} style={{color:'#A3AED0', strokeWidth:'0.5'}}  />

                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 30 }}>
                        <h4>Carta de recomendación</h4>
                        <p style={{ color: 'rgba(0, 0, 0, 0.5)' }}>Descripcion...</p>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 196, height: 24 }}>
                            <div className={styles.requirementsButton} onClick={handleClick}>
                                <AlertCircle size={16} />
                                Requisitos
                            </div>

                            <div className={styles.requestDocumentButton}>
                                <FilePlus size={16} />
                                Solicitar
                            </div>
                        </div>
                    </div>
                </div>

                {/* Titulo */}
                <div className={styles.card}>
                    <div className={styles.colorLabel} style={{ backgroundColor: '#F25C54' }} />

                    <Award size={80} style={{color:'#A3AED0', strokeWidth:'0.5'}}  />


                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 30 }}>
                        <h4>Título</h4>
                        <p style={{ color: 'rgba(0, 0, 0, 0.5)' }}>Descripcion...</p>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 196, height: 24 }}>
                            <div className={styles.requirementsButton} onClick={handleClickTitle}>
                                <AlertCircle size={16} />
                                Requisitos
                            </div>

                            <div className={styles.requestDocumentButton}>
                                <FilePlus size={16} />
                                Solicitar
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>



    )
}


export default DocumentCard

