import React from 'react';
import PropTypes from 'prop-types';

const StatusBadge = ({ status, customColors }) => {
    let statusClass = '';
    let statusText = '';
    let customStyle = {};

    switch (status) {
        case 'En progreso':
            statusClass = 'badge';
            statusText = 'En progreso';
            customStyle = customColors?.inProgress || { backgroundColor: '#84a4c3', color: 'white' };
            break;
        case 'Pendiente':
            statusClass = 'badge';
            statusText = 'Pendiente';
            customStyle = customColors?.pending || { backgroundColor: '#b89769', color: 'white' };
            break;
        case 'Completada':
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

StatusBadge.propTypes = {
    status: PropTypes.string,
    customColors: PropTypes.shape({
        inProgress: PropTypes.object,
        pending: PropTypes.object,
        completed: PropTypes.object,
    }),
};

export default StatusBadge;