import { GET, cardGenerator, qS, cE, getRandomInt } from "./utils.js";
import { cities } from "./citiesMock.js";

//hero
// const heroImages = [
//   "./img/hero-ocean2.jpg",
//   "./img/hero-adventure2.jpg",
//   "./img/hero-relax.jpg",
// ];
// const heroText = [
//   'It\'s a big word out there...  "Man cannot discover new oceans unless he has the courage to lose sight of the shore"',
//   "It's time for adventures",
//   "Just relax & enjoy",
// ];

// let heroImgCounter = 0;

// const heroEl = qS("hero");
// const wrapperEl = cE("div");
// const heroImgEl = cE("img");
// const textEl = cE("h3");

// wrapperEl.className = "wrapper";

// heroImgEl.setAttribute("src", heroImages[0]);

// setInterval(() => {
//   heroImgEl.src = heroImages[heroImgCounter];
//   textEl.textContent = heroText[heroImgCounter];
//   heroImgEl.className = `image${heroImgCounter}`;
//   textEl.className = `text-img${heroImgCounter}`;
//   heroImgCounter++;

//   if (heroImgCounter >= heroImages.length) {
//     heroImgCounter = 0;
//   }
// }, 3000);
// wrapperEl.appendChild(textEl);
// wrapperEl.appendChild(heroImgEl);
// heroEl.appendChild(wrapperEl);

const heroImages = [
  "./img/hero-ocean2.jpg",
  "./img/hero-adventure2.jpg",
  "./img/hero-relax.jpg",
];
const heroText = [
  'It\'s a big word out there...  "Man cannot discover new oceans unless he has the courage to lose sight of the shore"',
  "It's time for adventures",
  "Just relax & enjoy",
];

const heroEl = qS("hero");
const wrapperEl = cE("div");
const Img1El = cE("img");
const Img2El = cE("img");
const Img3El = cE("img");
const text1El = cE("h3");
const text2El = cE("h3");
const text3El = cE("h3");

wrapperEl.className = "wrapper";

Img1El.setAttribute("src", heroImages[0]);
Img2El.setAttribute("src", heroImages[1]);
Img3El.setAttribute("src", heroImages[2]);

text1El.textContent = heroText[0];
text2El.textContent = heroText[1];
text3El.textContent = heroText[2];

Img1El.className = "hero-image";
Img2El.className = "hero-image";
Img3El.className = "hero-image";

text1El.className = "hero-txt";
text2El.className = "hero-txt";
text3El.className = "hero-txt";
text1El.classList.add("long");

setInterval(() => {
  Img1El.classList.add("visualize");
  text1El.classList.add("visualize");
  Img2El.classList.remove("visualize");
  text2El.classList.remove("visualize");
  Img3El.classList.remove("visualize");
  text3El.classList.remove("visualize");
}, 3000);

setInterval(() => {
  Img2El.classList.add("visualize");
  text2El.classList.add("visualize");
  Img1El.classList.remove("visualize");
  text1El.classList.remove("visualize");
  Img3El.classList.remove("visualize");
  text3El.classList.remove("visualize");
}, 6000);

setInterval(() => {
  Img3El.classList.add("visualize");
  text3El.classList.add("visualize");
  Img1El.classList.remove("visualize");
  text1El.classList.remove("visualize");
  Img2El.classList.remove("visualize");
  text2El.classList.remove("visualize");
}, 9000);

wrapperEl.append(text1El, text2El, text3El);
wrapperEl.append(Img1El, Img2El, Img3El);
heroEl.appendChild(wrapperEl);

//cards

const cardScontainerEl = qS(".cardS-container");
const contentWrapper = qS(".content-wrapper");
const containerTitle = cE("h3");

containerTitle.className = "container-title";

contentWrapper.append(containerTitle, cardScontainerEl);
containerTitle.textContent = "Le più popolari";

const mostPopular = cities.filter((city) => city.show_in_popular === true);
mostPopular.map((popCity) => {
  cardScontainerEl.appendChild(cardGenerator(popCity));
});

//toggle tra città popolari e tutte le città
const showAllBtn = qS(".show");
showAllBtn.addEventListener("click", () => {
  showAllBtn.classList.toggle("-all");
  containerTitle.textContent = "";
  if (showAllBtn.className === "show") {
    contentWrapper.innerHTML = "";
    cardScontainerEl.innerHTML = "";
    showAllBtn.innerHTML = "";
    showAllBtn.textContent = "Mostra tutte";
    contentWrapper.append(containerTitle, showAllBtn, cardScontainerEl);
    containerTitle.textContent = "Le più popolari";

    const mostPopular = cities.filter((city) => city.show_in_popular === true);
    mostPopular.map((popCity) => {
      cardScontainerEl.appendChild(cardGenerator(popCity));
    });
  } else if (showAllBtn.className === "show -all") {
    cardScontainerEl.innerHTML = "";
    contentWrapper.innerHTML = "";
    contentWrapper.append(containerTitle, showAllBtn, cardScontainerEl);
    containerTitle.textContent = "Tutte le città";
    showAllBtn.innerHTML = "";
    showAllBtn.textContent = "Mostra popolari";

    cities.map((city) => {
      cardScontainerEl.appendChild(cardGenerator(city));
    });
  }
});

//Funzione search

const inputEl = qS(".search");

inputEl.addEventListener("change", () => {
  cardScontainerEl.innerHTML = "";
  heroEl.innerHTML = "";

  const newData = cities.filter((item) =>
    item.name.toLowerCase().includes(inputEl.value.toLowerCase())
  );

  containerTitle.textContent = "Risultati";
  if (newData.length != 0) {
    newData.map((city) => cardScontainerEl.appendChild(cardGenerator(city)));
  } else {
    containerTitle.textContent = "Non ci sono risultati per questa ricerca";
  }
});

//tasto destinazione random
const randomDestEl = qS(".random-btn");
const yourDestEl = qS(".your-destination");
randomDestEl.addEventListener("click", () => {
  cardScontainerEl.innerHTML = "";
  heroEl.innerHTML = "";
  yourDestEl.textContent = "Questa destinazione sembra parlare proprio di te!";
  containerTitle.textContent = "";

  const allDestinations = cities.map((city) => city);
  cardScontainerEl.appendChild(
    cardGenerator(allDestinations[getRandomInt(0, allDestinations.length - 1)])
  );
  // console.log(allDestinations[getRandomInt(0, allDestinations.length - 1)]);
});

//hamburger menu

const hambEl = qS(".hamburger");
const menuEl = qS(".nav_text");
hambEl.addEventListener("click", () => {
  menuEl.classList.toggle("show_menu");
  console.log("click");
});
