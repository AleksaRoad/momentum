let search = () => daySet()

//асинхронная функция на получение изображения Unsplash
async function getLinkToImageUnsplash() {
const urlU = `https://api.unsplash.com/photos/random?orientation=landscape&query=${search()}&client_id=qKUaPCGozqoytA7ENUmHmQvlrboqG6dVh0GZ-FzpVds`;
const resU = await fetch(urlU);
const dataU = await resU.json();
let linkU = dataU.urls.regular
localStorage.setItem("linkU", linkU)
};
getLinkToImageUnsplash()
//асинхронная функция на получение изображения Flickr
async function getLinkToImageFlickr() {
const urlF = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=090e27573acc9823416e53bfaaa1658d&per_page=500&tags=${search()}&extras=url_h&format=json&nojsoncallback=1`;
const resF = await fetch(urlF);
const dataF = await resF.json();
let links = dataF.photos.photo.filter(a => Object.keys(a).includes("url_h"))
const randomIndex = Math.floor(Math.random() * (links.length));
// console.log(links[randomIndex].url_h)
let linkF = links[randomIndex].url_h

localStorage.setItem("linkF", linkF)
};


// console.log(getLinkToImageFlickr())

//аналог получения ссылки с Flickr
// const num = Math.ceil(Math.random() * 100)
// return data.photos.photo[num].url_h
// let photos = Object.values(dataF)[0];
// let photo = Object.values(photos)[4];
// let randomLink = photo[randomIndex].url_h;
// console.log(randomLink)
// console.log((dataF.photos.photo).length)
// dataF.photos.photo[randomIndex].hasOwnProperty("url_h")
// for (let i = 0; (dataF.photos.photo).length > i; i++){
// if ((){
//   return dataF.photos.photo[randomIndex].url_h
// }else{
//   i++
// }}