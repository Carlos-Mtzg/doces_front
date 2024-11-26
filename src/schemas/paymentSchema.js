import * as yup from 'yup'

const cardNumberRules = /^\d{13,19}$/;
const expirationDateRules = /^(0[1-9]|1[0-2])\/\d{2}$/;
const cvvRules = /^\d{3,4}$/

export const paymentSchema = yup.object().shape({
    cardNumber: yup.string().matches(cardNumberRules, {message: "Ingresa un número de tarjeta valido"}).required("Campo obligatorio"),
    expirationDate: yup.string().matches(expirationDateRules, {message: "Ingresa una fecha de experiacion valida en formato MM/AA"}).required("Campo obligatorio"),
    cvv: yup.string().matches(cvvRules, {message: "Ingresa un cvv valido"}).required("Campo obligatorio")
})


