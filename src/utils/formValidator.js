import validator from 'validator';

const inputValidator = {
  name: {
    required: (value) => {
      if (value === '') {
        return 'Поле должно быть заполнено';
      };
      return '';
    },
    minLength: (value) => {
      if (value.length < 2) {
        return 'Длина поля должна быть более 2 символов';
      };
      return '';
    },
    maxLength: (value) => {
      if (value.length > 30) {
        return 'Длина поля должна быть не больше 30 символов'
      };
      return '';
    },
  },
  email: {
    required: (value) => {
      if (value === '') {
        return 'Поле должно быть заполнено';
      };
      return '';
    },
    minLength: (value) => {
      if (value.length < 5) {
        return 'Длина поля должна быть более 5 символов';
      };
      return '';
    },
    isEmail: (value) => {
      if (!validator.isEmail(value)) {
        return 'Некорректный email';
      };
      return '';
    },
  },
  password: {
    required: (value) => {
      if (value === '') {
        return 'Поле должно быть заполнено';
      };
      return '';
    },
    minLength: (value) => {
      if (value.length < 5) {
        return 'Длина поля должна быть более 5 символов';
      };
      return '';
    },
  },
};

const getErrorText = (error) => {
  const field = Object.keys(error).find((item) => {
    return error[item] !== '';
  })
  return error[field];
}

const checkValid = (name, value) => {
  return Object.keys(inputValidator[name]).map((key) => {    
    const result = inputValidator[name][key](value);
    return { [key] : result }
  }).reduce((pr,item) => ({...pr, ...item}),{});
}

export {inputValidator, getErrorText, checkValid};