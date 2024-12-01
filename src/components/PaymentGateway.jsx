import React, { useState } from 'react';
import { useFormik } from 'formik';
import styles from '../assets/css/components/payment-gateway.module.css';
import { paymentSchema } from '../schemas/paymentSchema.js';
import AxiosClient from '../config/htttp-client/axios-client.js';



export default function PaymentGateway(props) {
  const [files, setFiles] = useState(props.archivos);

  // useEffect(() => {
  //   if (files != null) {
  //     files.forEach(element => {
  //       console.log("Archivo: ", element.name);
  //     });
  //   }
  // }, [files]);


  const onSubmit = async (values, actions) => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });

    try {
      const token = localStorage.getItem('token')
      let userId = sessionStorage.getItem('userId')

      const response = await AxiosClient.post(`/documentRequest/${userId}/${props.documentName}`, formData, {
        headers: {
          "Content-Type" : "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Files uploaded successfully:', response.data);
    } catch (error) {
      console.log(error);
    }

    actions.resetForm();
    console.log('submitted');
  };

  const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      cardNumber: '',
      expirationDate: '',
      cvv: ''
    },
    validationSchema: paymentSchema,
    onSubmit
  });






  return (
    <>
      <form onSubmit={handleSubmit} className={styles.paymentGatewayContainer}>
        <div style={{ fontSize: 26 }}>Pago de documento</div>
        <hr />
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: '50%', }}>
            <div style={{ fontSize: 18, marginBottom: 32 }} >Datos de facturación</div>
            <label htmlFor="cardNumber">Número de tarjeta</label>
            <input
              id='cardNumber'
              type="text"
              placeholder='Ingresa tu número de tarjeta aqui'
              value={values.cardNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${styles.input} ${errors.cardNumber && touched.cardNumber ? styles['input-error'] : ''}`}
            />
            {errors.cardNumber && touched.cardNumber && <p className={styles.error}>{errors.cardNumber}</p>}

            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor="expirationDate">Fecha de expiración</label>
                <input
                  id='expirationDate'
                  type="text"
                  placeholder='MM/AA'
                  value={values.expirationDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${styles.smallInput} ${errors.expirationDate && touched.expirationDate ? styles['input-error'] : ''}`}
                />
                {errors.expirationDate && touched.expirationDate && <p className={styles.error}>{errors.expirationDate}</p>}

              </div>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor="cvv">CVV</label>
                <input
                  id='cvv'
                  type="text"
                  placeholder='CVV'
                  value={values.cvv}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${styles.smallInput} ${errors.cvv && touched.cvv ? styles['input-error'] : ''}`}
                />
                {errors.cvv && touched.cvv && <p className={styles.error}>{errors.cvv}</p>}


              </div>


            </div>

          </div>

          <div style={{ display: 'flex', flexDirection: 'column', width: '40%', }}>

            <div style={{ fontSize: 18, marginBottom: 50 }}>Detalles</div>
            <div className={styles['detailsContainer']}>
              <div style={{ fontSize: 32, color: 'gray' }}>Domcumento: {props.documentName}</div>
              <div style={{ fontSize: 20 }}>${props.price}</div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'end', width: '100%', height: '100%' }}>
                <hr />
                <div style={{ justifyContent: 'flex-end' }}>
                  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <div>Total:</div>
                    <div>${props.price}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <hr />
        <button disabled={isSubmitting} type="submit" className={styles.payButton}>Confirmar y pagar</button>
      </form>

    </>

  );
}