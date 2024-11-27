import React from 'react';

const StatusBadge = ({ status, customColors }) => {
    let statusClass = '';
    let statusText = '';
    let customStyle = {};

    switch (status) {
        case 'in-progress':
            statusClass = 'badge';
            statusText = 'En Progreso';
            customStyle = customColors?.inProgress || { backgroundColor: '#84a4c3', color: 'white' };
            break;
        case 'pending':
            statusClass = 'badge';
            statusText = 'En Espera';
            customStyle = customColors?.pending || { backgroundColor: '#b89769', color: 'white' };
            break;
        case 'completed':
            statusClass = 'badge';
            statusText = 'Completada';
            customStyle = customColors?.completed || { backgroundColor: '#9ac091', color: 'white' };
            break;
        default:
            statusClass = 'badge bg-secondary';
            statusText = 'Desconocido';
    }

    return <span className={statusClass} style={customStyle}>{statusText}</span>;
};

export default StatusBadge;