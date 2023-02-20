

//клик по радиокнопке с языком(выбор языка, запись в настройки, )
en.addEventListener('click', () => { 
if(en.type == "radio" && en.checked){
  ru.removeAttribute("checked")
  en.setAttribute('checked', 'true')
  state.language = "en"
  getQuotes()
}});

ru.addEventListener('click', () => { 
if(ru.type == "radio" && ru.checked){
  en.removeAttribute("checked")
  ru.setAttribute('checked', 'true')
  state.language = "ru"
  getQuotes()
}});

function changeLanguage () {
getQuotes()

}