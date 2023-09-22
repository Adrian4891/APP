export const validateSignUp =  (userData) => {
  const errors = {};
  if(!/^[a-z0-9_-]{5,10}$/.test(userData.userName)){
    errors.userName = "Entre 6 y 10 de longitud, sin caracteres especiales, en minuscula"
  }
  else if(!/^[a-zA-Z0-9._-]{1,35}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userData.email)){
    errors.email = "Debe ser un email valido"
  }
  else if(!/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{6,20}$/.test(userData.password)){
    errors.password = "Contiene entre 6 y 20 caracteres y al menos un numero"
  }
  return errors
}

export const validateLogin = (userData) => {
  const errors = {};
  if(!/^[a-zA-Z0-9._-]{1,35}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userData.email)){
    errors.email = "El userName longitud entre 6 y 10  o un email valido";
  }
  else if (!/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{6,20}$/.test(userData.password)){
    errors.password = "Contiene entre 6 y 20 caracteres y al menos un numero";
  }
  return errors;
}

export const validateDataUser = (userData) => {
  const errors = {};
  if(userData.name.length > 10 || userData.name.length <= 3 ){
    errors.name = "El nombre debe ser mayor a 2 caracteres y menor a diez";
  }
  else if(userData.lastName.length > 10 || userData.lastName.length < 2 ){
    errors.lastName = "El apellido  debe ser mayor a dos caracteres y menor a diez";
  }
  else if(!/^[\d]{1,2}\.?[\d]{3,3}\.?[\d]{3,3}$/.test(userData.dni)){
    errors.dni = "El Dni debe ser un numero mayor a 6 cifras y hasta 8";
  }
  else if(!/^\d{4}$/.test(userData.codPostal)){
    errors.codPostal = "El cod postal Debe ser un número de 4 cifras";
  } 
  else if(userData.state === ""){
    errors.state = "Debe seleccionar una provincia de la lista";
  }
  else if(userData.city === ""){
    errors.city = "Debe seleccionar una localidad de la lista";
  }
  else if(userData.street.length === 0 ){
    errors.street = "Tiene que ser una calle valida, No puede estar vacio";
  }
  else if(!/^\d{3,4}$/.test(userData.number)){
    errors.number = "El número de calle debe ser de 3 o 4 cifras";
  }
  else if(!/^\d{3,4}$/.test(userData.areaCode)){
    errors.areaCode = "El codigo debe ser mayor a 2 cifras y hasta 4";
  }
  else if(userData.numTel.length < 7 || userData.numTel.length > 8){
    errors.numTel = "El número debe ser mayor a 6 cifras y hasta 8 ";
  }
  return errors;
}

const calcularEdad = (fechaNac) => {
  const fechaActual = new Date();
  const nacimiento = new Date(fechaNac);
  let edad = fechaActual.getFullYear() - nacimiento.getFullYear();
  const mesAct = fechaActual.getMonth();
  const mesNac = nacimiento.getMonth();
  if (mesNac > mesAct || (mesNac === mesAct && nacimiento.getDate() > fechaActual.getDate())){
    edad--;
  }
  return edad;
}

export const validateProfileInfo = (userData) => {
  console.log(userData.name.length);
  const errors = {};
  if(userData.name === null || userData.name.length > 10 || userData.name.length < 3 ){
    errors.name = "El nombre  debe ser mayor a dos caracteres y menor a diez";
  }
  else if(userData.lastName === null || userData.lastName.length > 10 || userData.lastName.length < 3 ){
    errors.lastName = "El apellido  debe ser mayor a dos caracteres y menor a diez";
  }
  else if(userData.state === null ){
    errors.state = "El campo de provincia no puede estar vacio ";
  }
  else if(userData.city === null){
    errors.city = "El campo de ciudad no puede estar vacio";
  }
  else if(!/^[a-zA-Z]+(?:\s+[a-zA-Z]+)*(?:\s+\d+)$/.test(userData.address)){
    errors.address = "El campo debe contener un numero un espacio y la calle";
  }
  else if(!/^(\d{1,4})? ?(\d{4})-?(\d{4})$/.test(userData.telephone)){
    errors.telephone = "Debe contener cod de area un espacio y continuo los numeros siguientes";
  }
  else if (  userData.birthday === null || /^\s*$/.test(userData.birthday) ) {
    errors.birthday = "La fecha debe estar completa y con su formato valido";
  }
  else if (calcularEdad(userData.birthday) < 18 ){
    errors.birthday = "Debes ser mayor de edad para tener una cuenta";
  }
  console.log(errors);
  return errors;
}