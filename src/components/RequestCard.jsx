import React from 'react';
import PropTypes from 'prop-types';
import styles from '../assets/css/components/request-card.module.css';
import { AlertCircle, FileText } from 'react-feather';

function RequestCard({ title, description, status }) {

    const getColorByStatus = (status) => {
        switch (status) {
            case 'Pendiente':
                return '#f25c54';
            case 'En progreso':
                return '#ffbf61';
            case 'Completada':
                return '#00ab84';
            default:
                return '#A3AED0';
        }
    };

    const footerColor = getColorByStatus(status);

    return (
        <div className={styles.cardContainer}>
            {/* Icono circular superior */}
            <div className={styles.iconCircle} style={{ backgroundColor: footerColor }}></div>
            {/* Título */}
            <h4 className={`px-4 ${styles['cardTitle']}`}>{title}</h4>
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

RequestCard.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string,
};

export default RequestCard;