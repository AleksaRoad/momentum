const timeText = document.querySelector(".time");
const dateText = document.querySelector(".date");
const greetingText = document.querySelector(".greeting");

//функция определения дня недели
function getWeekDay(date) {
  if (state.language == "ru") {
    let days = [
      "Воскресенье",
      "Понедельник",
      "Вторник",
      "Среда",
      "Четверг",
      "Пятница",
      "Суббота",
    ];
    return days[date.getDay()];
  };
  if (state.language == "en") {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[date.getDay()];
  };
};
//функция определения даты (месяц, число)

function showDate() {
    const date = new Date();
    const options = { month: "long", day: "numeric" };
    const currentDate = date.toLocaleDateString(lang().dataFormat, options);
    return (date.textContent = getWeekDay(date) + ", " + currentDate);
  }
  
//функция вывода времени, даты, приветствия
function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  setTimeout(showTime, 1000);
  return (
    (timeText.textContent = currentTime),
    (dateText.textContent = showDate()),
    (greetingText.textContent = timeOfDay())
  );
}

showTime();
