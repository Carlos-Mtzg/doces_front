import React from 'react';
import styles from '../../public/css/components/request-card.module.css';
import { AlertCircle, FileText } from 'react-feather';

/*
Solicitud en espera: f25c54
Solicitud en progreso: ffbf61
Solicitud terminada: 00ab84
 */

/*
Kardex: 1985b6
Constancia de estudios: 009475
Cartas de recomendacion: ffd166
Certificados de estudio: ffbf61
Titulo: f25c54
 */

function RequestCard({ title, description, status }) {

    const getColorByTitle = (title) => {
        switch (title) {
            case 'Kardex':
                return '#1985b6';
            case 'Constancia de estudios':
                return '#009475';
            case 'Carta de recomendación':
                return '#ffd166';
            case 'Certificado de estudios':
                return '#ffbf61';
            case 'Titulo':
                return '#f25c54';
            default:
                return '#A3AED0';
        }
    };

    const iconColor = getColorByTitle(title);

    const getColorByStatus = (status) => {
        switch (status) {
            case 'Solicitud en espera':
                return '#f25c54';
            case 'Solicitud en progreso':
                return '#ffbf61';
            case 'Solicitud terminada':
                return '#00ab84';
            default:
                return '#A3AED0';
        }
    };

    const footerColor = getColorByStatus(status);

    return (
        <div className={styles.cardContainer}>
            {/* Icono circular superior */}
            <div className={styles.iconCircle} style={{ backgroundColor: iconColor}}></div>

            {/* Título */}
            <h4 className={styles.cardTitle}>{title}</h4>

            {/* Descripción */}
            <p className={styles.cardDescription}>{description}</p>

            {/* Imagen */}
            <div className={styles.iconImage}>
                <FileText size={100} style={{ color: '#A3AED0', strokeWidth: '0.5' }} />
            </div>

            {/* Pie de la card */}
            <div className={styles.footer} style={{ backgroundColor: footerColor }}>
                <AlertCircle size={16} color="#FFFFFF" />
                <span className={styles.footerText}>{status}</span>
            </div>
        </div>
    );
}

export default RequestCard;