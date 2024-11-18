import React from 'react'
import ReactDOMServer from 'react-dom/server'
import styles from '../../public/css/components/document-card.module.css'
import { AlertCircle, FilePlus, FileText, Award, ArrowRight } from 'react-feather'
import Swal from 'sweetalert2'

function DocumentCard() {
    const handleClick = () => {
        const arrowRight = ReactDOMServer.renderToString(<ArrowRight size={18} style={{ color: '#002E5D' }} />)
        Swal.fire({
            title: "Requisitos para el documento",
            html: `
            <div style="padding-bottom: 8px;">${arrowRight} Nombre completo</div>
            <div style="padding-bottom: 8px;">${arrowRight} Matricula</div>
            <div style="padding-bottom: 8px;">${arrowRight} Cuatrimestre</div>
            <div style="padding-bottom: 8px;">${arrowRight} Carrera</div>
            `,
            icon: "question"
        });
    }

    return (
        <div className={`${styles['cardsContainer']}`}>
            {/* Kardex */}
            <div className={`${styles['card']}`}>
                <div className={`${styles['colorLabel']}`} style={{ backgroundColor: '#1985B6' }} />
                <FileText size={80} style={{ color: '#A3AED0', strokeWidth: '0.5' }} />
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 30 }}>
                    <h4>Kardex</h4>
                    <p style={{ color: 'rgba(0, 0, 0, 0.5)' }}>Descripcion...</p>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 196, height: 24 }}>
                        <button type='button' className={`${styles['requirements-btn']}`} onClick={handleClick}>
                            <div className={`d-flex justify-content-evenly align-items-center ${styles['requirements-content']}`}>
                                <AlertCircle size={15} />
                                Requisitos
                            </div>
                            <span></span>
                        </button>
                        <button type='button' className={`${styles['request-document-btn']}`}>
                            <div className={`d-flex justify-content-evenly align-items-center ${styles['request-document-content']}`}>
                                <FilePlus size={15} />
                                Solicitar
                            </div>
                            <span></span>
                        </button>
                    </div>
                </div>
            </div>
            {/* Constancia de estudios */}
            <div className={`${styles['card']}`}>
                <div className={`${styles['colorLabel']}`} style={{ backgroundColor: '#00AB84' }} />
                <FileText size={80} style={{ color: '#A3AED0', strokeWidth: '0.5' }} />
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 30 }}>
                    <h4>Constancia de estudios</h4>
                    <p style={{ color: 'rgba(0, 0, 0, 0.5)' }}>Descripcion...</p>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 196, height: 24 }}>
                        <button type='button' className={`${styles['requirements-btn']}`} onClick={handleClick}>
                            <div className={`d-flex justify-content-evenly align-items-center ${styles['requirements-content']}`}>
                                <AlertCircle size={15} />
                                Requisitos
                            </div>
                            <span></span>
                        </button>
                        <button type='button' className={`${styles['request-document-btn']}`}>
                            <div className={`d-flex justify-content-evenly align-items-center ${styles['request-document-content']}`}>
                                <FilePlus size={15} />
                                Solicitar
                            </div>
                            <span></span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Certificado de estudios */}
            <div className={`${styles['card']}`}>
                <div className={`${styles['colorLabel']}`} style={{ backgroundColor: '#00AB84' }} />
                <FileText size={80} style={{ color: '#A3AED0', strokeWidth: '0.5' }} />
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 30 }}>
                    <h4>Constancia de estudios</h4>
                    <p style={{ color: 'rgba(0, 0, 0, 0.5)' }}>Descripcion...</p>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 196, height: 24 }}>
                        <button type='button' className={`${styles['requirements-btn']}`} onClick={handleClick}>
                            <div className={`d-flex justify-content-evenly align-items-center ${styles['requirements-content']}`}>
                                <AlertCircle size={15} />
                                Requisitos
                            </div>
                            <span></span>
                        </button>
                        <button type='button' className={`${styles['request-document-btn']}`}>
                            <div className={`d-flex justify-content-evenly align-items-center ${styles['request-document-content']}`}>
                                <FilePlus size={15} />
                                Solicitar
                            </div>
                            <span></span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Carta de recomendacion */}
            <div className={`${styles['card']}`}>
                <div className={`${styles['colorLabel']}`} style={{ backgroundColor: '#1985B6' }} />
                <FileText size={80} style={{ color: '#A3AED0', strokeWidth: '0.5' }} />
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 30 }}>
                    <h4>Carta de recomendación</h4>
                    <p style={{ color: 'rgba(0, 0, 0, 0.5)' }}>Descripcion...</p>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 196, height: 24 }}>
                        <button type='button' className={`${styles['requirements-btn']}`} onClick={handleClick}>
                            <div className={`d-flex justify-content-evenly align-items-center ${styles['requirements-content']}`}>
                                <AlertCircle size={15} />
                                Requisitos
                            </div>
                            <span></span>
                        </button>
                        <button type='button' className={`${styles['request-document-btn']}`}>
                            <div className={`d-flex justify-content-evenly align-items-center ${styles['request-document-content']}`}>
                                <FilePlus size={15} />
                                Solicitar
                            </div>
                            <span></span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Titulo */}
            <div className={`${styles['card']}`}>
                <div className={`${styles['colorLabel']}`} style={{ backgroundColor: '#1985B6' }} />
                <Award size={80} style={{ color: '#A3AED0', strokeWidth: '0.5' }} />
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 30 }}>
                    <h4>Título</h4>
                    <p style={{ color: 'rgba(0, 0, 0, 0.5)' }}>Descripcion...</p>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 196, height: 24 }}>
                        <button type='button' className={`${styles['requirements-btn']}`} onClick={handleClick}>
                            <div className={`d-flex justify-content-evenly align-items-center ${styles['requirements-content']}`}>
                                <AlertCircle size={15} />
                                Requisitos
                            </div>
                            <span></span>
                        </button>
                        <button type='button' className={`${styles['request-document-btn']}`}>
                            <div className={`d-flex justify-content-evenly align-items-center ${styles['request-document-content']}`}>
                                <FilePlus size={15} />
                                Solicitar
                            </div>
                            <span></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default DocumentCard

