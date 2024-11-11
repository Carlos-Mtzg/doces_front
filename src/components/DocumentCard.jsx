import React from 'react'
import styles from '../../public/css/components/document-card.module.css'
import { AlertCircle, FilePlus } from 'react-feather'
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

                    <svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M44.3327 6.3335H18.9993C17.3196 6.3335 15.7087 7.00076 14.521 8.18849C13.3333 9.37622 12.666 10.9871 12.666 12.6668V63.3335C12.666 65.0132 13.3333 66.6241 14.521 67.8118C15.7087 68.9996 17.3196 69.6668 18.9993 69.6668H56.9994C58.6791 69.6668 60.29 68.9996 61.4777 67.8118C62.6654 66.6241 63.3327 65.0132 63.3327 63.3335V25.3335L44.3327 6.3335Z" stroke="#A3AED0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M44.334 6.3335V25.3335H63.334" stroke="#A3AED0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M50.6673 41.1665H25.334" stroke="#A3AED0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M50.6673 53.8335H25.334" stroke="#A3AED0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M31.6673 28.5H28.5007H25.334" stroke="#A3AED0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 30 }}>
                        <h4>Kardex</h4>
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
                {/* Constancia de estudios */}
                <div className={styles.card}>
                    <div className={styles.colorLabel} style={{ backgroundColor: '#1985B6' }} />

                    <svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M44.3327 6.3335H18.9993C17.3196 6.3335 15.7087 7.00076 14.521 8.18849C13.3333 9.37622 12.666 10.9871 12.666 12.6668V63.3335C12.666 65.0132 13.3333 66.6241 14.521 67.8118C15.7087 68.9996 17.3196 69.6668 18.9993 69.6668H56.9994C58.6791 69.6668 60.29 68.9996 61.4777 67.8118C62.6654 66.6241 63.3327 65.0132 63.3327 63.3335V25.3335L44.3327 6.3335Z" stroke="#A3AED0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M44.334 6.3335V25.3335H63.334" stroke="#A3AED0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M50.6673 41.1665H25.334" stroke="#A3AED0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M50.6673 53.8335H25.334" stroke="#A3AED0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M31.6673 28.5H28.5007H25.334" stroke="#A3AED0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
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

                    <svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M44.3327 6.3335H18.9993C17.3196 6.3335 15.7087 7.00076 14.521 8.18849C13.3333 9.37622 12.666 10.9871 12.666 12.6668V63.3335C12.666 65.0132 13.3333 66.6241 14.521 67.8118C15.7087 68.9996 17.3196 69.6668 18.9993 69.6668H56.9994C58.6791 69.6668 60.29 68.9996 61.4777 67.8118C62.6654 66.6241 63.3327 65.0132 63.3327 63.3335V25.3335L44.3327 6.3335Z" stroke="#A3AED0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M44.334 6.3335V25.3335H63.334" stroke="#A3AED0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M50.6673 41.1665H25.334" stroke="#A3AED0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M50.6673 53.8335H25.334" stroke="#A3AED0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M31.6673 28.5H28.5007H25.334" stroke="#A3AED0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
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

                    <svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M44.3327 6.3335H18.9993C17.3196 6.3335 15.7087 7.00076 14.521 8.18849C13.3333 9.37622 12.666 10.9871 12.666 12.6668V63.3335C12.666 65.0132 13.3333 66.6241 14.521 67.8118C15.7087 68.9996 17.3196 69.6668 18.9993 69.6668H56.9994C58.6791 69.6668 60.29 68.9996 61.4777 67.8118C62.6654 66.6241 63.3327 65.0132 63.3327 63.3335V25.3335L44.3327 6.3335Z" stroke="#A3AED0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M44.334 6.3335V25.3335H63.334" stroke="#A3AED0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M50.6673 41.1665H25.334" stroke="#A3AED0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M50.6673 53.8335H25.334" stroke="#A3AED0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M31.6673 28.5H28.5007H25.334" stroke="#A3AED0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
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

                    <svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M38.0007 47.5001C50.243 47.5001 60.1673 37.5757 60.1673 25.3334C60.1673 13.0911 50.243 3.16675 38.0007 3.16675C25.7583 3.16675 15.834 13.0911 15.834 25.3334C15.834 37.5757 25.7583 47.5001 38.0007 47.5001Z" stroke="#A3AED0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M25.9977 43.985L22.166 72.8334L37.9993 63.3334L53.8327 72.8334L50.001 43.9534" stroke="#A3AED0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

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

