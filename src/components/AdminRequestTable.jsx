
import React from 'react'
import Accions from '../../src/assets/icons/accionss.png'
import Alert from '../../src/assets/icons/alert-circle.png'
import Calendar from '../../src/assets/icons/calendar.png'
import Docs from '../../src/assets/icons/docs.png'
import Status from '../../src/assets/icons/status.png'


const AdminRequestTable = () => {


    const data = [

        {
            doc: "kardex",
            fecha: "13/05/2024",
            prioridad: "1",
            status: "2",
            id_accion: "1",

        },

        {
            doc: "Constancia de estudios",
            fecha: "15/07/2024",
            prioridad: "2",
            status: "3",
            id_accion: "2",

        },


    ]






    return (
        <>
            <div className="table-responsive">
                <table className="table caption-top ">
                    <caption>List of users</caption>
                    <thead className='text-secondary'>
                        <tr className="text-center text-secondary border-bottom border-secondary-subtle ">
                            <th className="border-end border-secondary-subtle text-secondary ">#</th>
                            <th className="border-end border-secondary-subtle text-secondary">
                                <img src={Docs} alt="Doc icon" style={{ width: '18px', marginRight: '8px' }} />
                                Tipo de Documento
                            </th>
                            <th className="border-end border-secondary-subtle text-secondary">
                                <img src={Calendar} alt="Calendar icon" style={{ width: '18px', marginRight: '8px' }} />
                                Fecha de Entrega
                            </th>
                            <th className="border-end border-secondary-subtle text-secondary">
                                <img src={Alert} alt="Alert icon" style={{ width: '18px', marginRight: '8px' }} />
                                Prioridad
                            </th>
                            <th className="border-end border-secondary-subtle text-secondary">
                                <img src={Status} alt="Status icon" style={{ width: '18px', marginRight: '8px' }} />
                                Status
                            </th>
                            <th className='text-secondary'>Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="text-secondary text-center">
                        {data.map((obj, index) => (


                            <tr className="border-bottom border-secondary-subtle">
                                <th className="border-end border-gray align-middle text-secondary" scope="row">{index + 1} </th>

                                <td className="border border-secondary-subtle align-middle text-secondary" > {obj.doc}  </td>
                                <td className="border border-secondary-subtle align-middle text-secondary">{obj.fecha}</td>

                                <td className="border border-secondary-subtle align-middle text-secondary">

                                    <div className={`rounded-4 border text-white ${obj.prioridad === '1' ? '' : ''}  w-75 h-50`}
                                        style={{
                                            backgroundColor: obj.prioridad === '1' ? '#b76869' :
                                                obj.prioridad === '2' ? '#b79769' :
                                                    obj.prioridad === '3' ? '#75a968' : '#f1f1f1',

                                                    display: 'inline-block', 
                                        }}
                                    >    {obj.prioridad ==='1'?'Alta':obj.prioridad==='2'? 'Media':obj.prioridad ==='3'?'Baja':obj.prioridad}</div>

                                </td>
                                <td className=" border border-secondary-subtle align-middle text-secondary">

                                <div className={`position-relative rounded-4 border text-white ${obj.status === '1' ? '' : ''} w-75 h-50` }
                                        style={{
                                            backgroundColor: obj.status === '1' ? '#b76869' :
                                                obj.status === '2' ? '#84a4c4' :
                                                    obj.status === '3' ? '#75a968   ' : '#f1f1f1',
                                                    display: 'inline-block', 
                                        }}
                                    >   
                                    <div className=' position-absolute top-50 start-0 translate-middle-y rounded-circle ' style={{backgroundColor:'#1F62A6'}}> </div>


                                    {obj.status ==='1'?'En espera':obj.status==='2'? 'En progreso':obj.status ==='3'?'Terminado':obj.status}</div>

                                </td>




                                <td className="align-middle text-center">
                                    <button className="btn border-0 p-0">
                                        <img src={Accions} alt="Actions icon" style={{ width: '30px' }} />
                                    </button>
                                </td>
                            </tr>

                        ))}

                    </tbody>
                </table>
            </div>


        </>


    )

}

export default AdminRequestTable;