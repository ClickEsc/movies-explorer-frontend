// Функция рассчета моего возраста
function checkMyAge() {
  const now = new Date();
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

module.exports = {
  checkMyAge
}