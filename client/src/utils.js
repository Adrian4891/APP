import ibanezImg from "./images/logoIbanez.svg";
import casioImg from "./images/logoCasio.svg";
import charvelImg from "./images/logoCharvel.svg";
import fenderImg from "./images/logoFender.svg";
import ernieImg from "./images/logoErni.svg";
import jacksonImg from "./images/logoJackson.svg";
import pearlImg from "./images/logoPearl.svg";
import rolandImg from "./images/logoRoland.svg"
import tamaImg from "./images/logoTama.svg";
import yamahaImg from "./images/logoYamaha.svg";
import Swal from "sweetalert2";

export const arrSlider = [ ibanezImg, fenderImg, casioImg, charvelImg, 
    ernieImg, jacksonImg, pearlImg, rolandImg, tamaImg, yamahaImg, ernieImg,
];

export const num = new Intl.NumberFormat('es-419');

export const nonAuthUser  = async() => {
   return  await Swal.fire({
        icon: 'error',
        title:'No estas logueado',
        showCloseButton:true,
        showConfirmButton:true,
        confirmButtonText:'Loguearme', 
    });
}
export const paymentProgress = async () =>{
    const Toast = Swal.mixin({
        toast:true,
        position:'top-end',
        showConfirmButton:false,
        timer:3000,
        timerProgressBar:true,
    });
    return await Toast.fire({
        icon:'success',
        title:'Tú orden esta preparandose'
    });
}

export const productInCart = async (name, image) => {
    return await Swal.fire({
        title:'Listo!',
        text:`${name} Se agrego al carrito!`,
        imageUrl:image,
        imageWidth:undefined,
        imageHeight:"150",
        width:450,
        confirmButtonText:'Ver carrito',
        showCloseButton:true,
    });
}

