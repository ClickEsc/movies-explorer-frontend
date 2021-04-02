const now = new Date();

// Функция рассчета моего возраста
function checkMyAge() {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); 
  const birthDate = new Date(1991, 9, 27);

  // День рождения в текущем году
  const birthDateNow = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());

  let age;
  let years;

  // Возраст = текущий год - год рождения
  age = today.getFullYear() - birthDate.getFullYear();
  
  // Если день рождения в этом году ещё предстоит, то вычитаем из age один год
  if (today < birthDateNow) {
    age = age-1;
  }
  
  const ageString = age.toString();

  if (ageString.endsWith('1')) {
    years = 'год';
  } else if (ageString.endsWith('2') || ageString.endsWith('3') || ageString.endsWith('4')) {
    years = 'года';
  } else {
    years = 'лет';
  }
  
  return age + ' ' + years
}

const thisYear = now.getFullYear();

const baseUrlForImages = 'https://api.nomoreparties.co';
const noData = 'Нет данных';
const noImagePic = 'https://www.webpsilon.com/wp-content/uploads/2018/02/Image_Not_Found_1x_qjofp8.png';
const noVideoPic = 'https://i.ytimg.com/vi/3QtqXM5sdaY/maxresdefault.jpg';

const SIGNUP_OK_MSG = 'Вы успешно зарегистрировались!';
const PROFILE_UPDATE_OK_MSG = 'Данные профиля успешно обновлены';
const PROFILE_UPDATE_FAIL_MSG = 'При обновлении профиля произошла ошибка'
const RES_ERROR_MSG = 'Что-то пошло не так! Попробуйте ещё раз.';

const INCORRECT_TOKEN_MSG = 'При авторизации произошла ошибка. Переданный токен некорректен.';
const NO_TOKEN_MSG = 'При авторизации произошла ошибка. Токен не передан или передан не в том формате.';

const SERVER_ERROR_MSG = 'На сервере произошла ошибка.';
const EMAIL_CONFLICT_MSG = 'Пользователь с таким email уже существует.';
const BAD_AUTH_DATA_MSG = 'Вы ввели неправильный логин или пароль.';

module.exports = {
  checkMyAge,
  thisYear,
  baseUrlForImages,
  noData,
  noImagePic,
  noVideoPic,
  SIGNUP_OK_MSG,
  PROFILE_UPDATE_OK_MSG,
  PROFILE_UPDATE_FAIL_MSG,
  RES_ERROR_MSG,
  INCORRECT_TOKEN_MSG,
  NO_TOKEN_MSG,
  SERVER_ERROR_MSG,
  EMAIL_CONFLICT_MSG,
  BAD_AUTH_DATA_MSG
}