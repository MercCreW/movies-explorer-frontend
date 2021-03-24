import validator from 'validator';

const getErrorName = (value) => {
  if(value.length !=0 && value.length < 2){
    return 'Поле должно быть больше 2 символов';
  } else if (value.length === 0){
    return 'Поле должно быть заполнено';
  }
    return '';
}

const getErrorEmail = (value) => {
  if (value.length !=0 && !validator.isEmail(value)) {
    return 'Некорректный email';
  } else 
  if(value.length !=0 && value.length < 5){
    return 'Поле должно быть больше 5 символов';
  } else if (value.length === 0){
    return 'Поле должно быть заполнено';
  }
    return '';
}

const getErrorPassword = (value) => {
  if(value.length !=0 && value.length < 5){
    return 'Поле должно быть больше 5 символов';
  } else if (value.length === 0){
    return 'Поле должно быть заполнено';
  }
    return '';
}


export {getErrorName, getErrorEmail, getErrorPassword};