import { toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Success = (data)=>{
    toast.success(data, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000, //3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Slide
      });
}

export const ErrorToaster = (data)=>{
    toast.error(data, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition: Slide
        });
}