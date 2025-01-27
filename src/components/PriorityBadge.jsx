import React from 'react'
import PropTypes from 'prop-types'

const PriorityBadge = ({ priority, customColors }) => {
    let priorityClass = '';
    let priorityText = '';
    let customStyle = {};

    switch (priority) {
        case 'Alta':
            priorityClass = 'badge';
            priorityText = 'Alta';
            customStyle = customColors?.hight || { backgroundColor: '#b86869', color: 'white' };
            break;
        case 'Media':
            priorityClass = 'badge';
            priorityText = 'Media';
            customStyle = customColors?.medium || { backgroundColor: '#b89769', color: 'white' };
            break;
        case 'Baja':
            priorityClass = 'badge';
            customStyle = customColors?.down || { backgroundColor: '#84a4c3', color: 'white' };
            priorityText = 'Baja';
            break;
        default:
            priorityClass = 'badge bg-secondary';
            priorityText = 'Desconocido';
    }
    return <span className={priorityClass} style={customStyle}>{priorityText}</span>;
}

PriorityBadge.propTypes = {
    priority: PropTypes.string,
    customColors: PropTypes.shape({
        hight: PropTypes.object,
        medium: PropTypes.object,
        down: PropTypes.object,
    }),
};

export default PriorityBadge