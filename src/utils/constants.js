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

module.exports = {
  checkMyAge, thisYear, baseUrlForImages, noData, noImagePic, noVideoPic
}