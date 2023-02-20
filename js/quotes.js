// import jsonContent from "./data.json" assert { type: "json" };
const quoteText = document.querySelector(".quote");
const quoteAuthor = document.querySelector(".author");
const change = document.querySelector(".change-quote");

//асинхронная функция поиска рандомной цитаты из JSON
async function getQuotes() {
  let quotes = "";
  if (state.language == "ru") {
    quotes = "./assets/quotes-ru.json";
  } else {
    quotes = "./assets/quotes-en.json";
  }
  const res = await fetch(quotes);
  const data = await res.json();
  let randomNum = Math.floor(Math.random(data) * data.length);
  let randomQuote = data[randomNum];
  let quote = Object.values(randomQuote)[0];
  let author = Object.values(randomQuote)[1];
  quoteText.textContent = quote;
  quoteAuthor.textContent = author;
  localStorage.setItem("quote", quote);
  // quoteText.style.transition = "1s"
}
getQuotes();
//клик на reloder анимация кручения и вызов новой цитаты
let count = 1;
change.addEventListener("click", () => {
  getQuotes();
  change.style = `transform:rotate(${180 * count}deg)`;
  count += 1;
});

//вариант кручения без глобальной переменной
// change.onclick = () => {
//   const { transform } = change.style
//   const num = +transform.match(/\d+/g)?.valueOf() || 0
//   change.style.transform = `rotate(${180 + num}deg)`;
// }
