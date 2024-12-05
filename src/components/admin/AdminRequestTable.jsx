import React from 'react'
import styles from '../../assets/css/admin/admin-pages.module.css'
import { BarChart2, AlertCircle, FileText, ChevronsLeft } from 'react-feather'
import PriorityBadge from './../PriorityBadge'
import StatusBadge from './../StatusBadge'
import PropTypes from 'prop-types'
const AdminRequestTable = ({ requests, onRequestSelect }) => {

    return (
        <div className="table-responsive">
            <table className="table table-bordered caption-top table-hover text-center">
                <thead>
                    <tr style={{ borderTop: 'none' }}>
                        <th className='text-secondary fw-bold' style={{ borderLeft: 'none' }}>#</th>
                        <th className='text-secondary fw-bold'>
                            <FileText style={{ width: '18px', marginRight: '8px' }}></FileText>
                            Tipo de Documento
                        </th>
                        <th className="border-end border-secondary-subtle text-secondary fw-bold">
                            <AlertCircle style={{ width: '18px', marginRight: '8px' }}></AlertCircle>
                            Prioridad
                        </th>
                        <th className="border-end border-secondary-subtle text-secondary fw-bold">
                            <BarChart2 style={{ width: '18px', marginRight: '8px' }}></BarChart2>
                            Status
                        </th>
                        <th className='text-secondary fw-bold' style={{ borderRight: 'none' }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map((request) => (
                        <tr key={request.id} className="text-center">
                            <td style={{ borderLeft: 'none' }} className='text-secondary fw-bold'>{request.id}</td>
                            <td className='text-secondary'>{request.type}</td>
                            <td>
                                <PriorityBadge priority={request.priority} />
                            </td>
                            <td>
                                <StatusBadge status={request.status} />
                            </td>
                            <td>
                                <button
                                    className="btn border-0 p-0"
                                    type="button"
                                    data-bs-toggle="offcanvas"
                                    data-bs-target="#offCanvasRequests"
                                    aria-controls="offCanvasRequests"
                                    onClick={() => onRequestSelect(request)}
                                >
                                    <ChevronsLeft className={`${styles['leftBtn']} text-secondary`} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

AdminRequestTable.propTypes = {
    requests: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            type: PropTypes.string.isRequired,
            priority: PropTypes.string.isRequired,
            status: PropTypes.string.isRequired,
        })
    ).isRequired,
    onRequestSelect: PropTypes.func.isRequired,
};

export default AdminRequestTable;
