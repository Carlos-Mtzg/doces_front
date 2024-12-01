import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const SweetAlert= withReactContent(Swal);

export const customAlert=(title, text, icon)=>{
    return SweetAlert.fire({
        title,
        text,
        icon,
        confirmButtonColor:'#',
        confirmButtonText:'Aceptar',
        customClass: {
            container: 'swal-container'
          }
    });
};

export const carga=(title, text,)=>{
    return SweetAlert.fire({
        title ,
        text,
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading(); // Spinner de carga
        },
    });
};



export const SuccesAlert=(title, text, icon)=>{
    return SweetAlert.fire({
        title ,
        text,
        icon ,
        showConfirmButton: false,
        timer: 1000
    });

 
};

export const preconfirmAlert= (preConfirm)=> SweetAlert.fire({
   title:'¿Estás seguro?',
   text:'',
   icon:'info',
   showCancelButton:true,
   confirmButtonColor:'',
   cancelButtonColor:'',
   confirmButtonText:'Aceptar',
   cancelButtonText:'Cancelar',
   reverseButtons:true,
   backdrop: true,
   showCancelButton:true,
   showLoaderOnConfirm: true,
   allowOutsideClick:()=> !Swal.isLoading(),
   customClass: {
    container: 'swal-container'
  },
   preConfirm
});

export const LogOutAlert= (preConfirm)=> SweetAlert.fire({
    title:'Cerrar sesión?',
    text:'¿Seguro que desea cerrar sesión?',
    icon:'info',
    confirmButtonColor:"#0e7490",
    confirmButtonText:'Aceptar',
    cancelButtonText:'Cancelar',
    reverseButtons:true,
    backdrop:true,
    showCancelButton:true,
    showLoaderOnConfirm:true,
    allowOutsideClick:()=> !SweetAlert.isLoading(),
    preConfirm,
})


export const confirmAlert= async (message)=>{
    try{
        const result= await SweetAlert.fire({
            title:'¿Estás seguro?',
            text:message,
            icon:'info',
            confirmButtonText:'Aceptar',
            cancelButtonText:'Cancelar',
            showCancelButton:true,
            confirmButtonColor:'',
            cancelButtonColor:'',
            reverseButtons:true,
            customClass: {
                container: 'swal-container'
              }
        });
        return result.isConfirmed;
    }catch(error){
        console.error('Error en el proceso:', error);
        return false;
    }
};