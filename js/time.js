
const timeText = document.querySelector('.time');
const dateText = document.querySelector('.date');
const greetingText = document.querySelector(".greeting")

//функция определения дня недели
function getWeekDay(date) {
  let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
  return days[date.getDay()];
}
//функция определения даты (месяц, число)
function showDate(){
const date = new Date();
const options = {month: 'long', day: 'numeric'};
const currentDate = date.toLocaleDateString('ru-RU', options);
return date.textContent =  getWeekDay(date) + ", " + currentDate
}
//функция вывода времени, даты, приветствия
function showTime(){
const date = new Date();
const currentTime = date.toLocaleTimeString();
setTimeout(showTime, 1000);
return (timeText.textContent = currentTime, dateText.textContent = showDate(), greetingText.textContent = timeOfDay())
}

showTime(); 