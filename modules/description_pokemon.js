const parsePokemon = JSON.parse(localStorage.getItem("pokemon"));
const normalImage = document.getElementById("normal_image");
const shinyImage = document.getElementById("shiny_image");
const image = document.getElementById("image");
const cardName = document.getElementById("name");
const typeText = document.getElementById("type_text");
const weight = document.getElementById("weight");
const baseExperience = document.getElementById("base_experience");
console.log(parsePokemon);

const changeImage = () => {
  image.src = parsePokemon.sprites.front_default;
  const normal = parsePokemon.sprites.front_default;
  const shiny = parsePokemon.sprites.front_shiny;

  shinyImage.addEventListener("click", () => {
    image.src = shiny;
  });

  normalImage.addEventListener("click", () => {
    image.src = normal;
  });
};
changeImage();

const setName = () => {
  cardName.textContent = parsePokemon.name.toUpperCase();
  const number = document.createElement("span");
  number.textContent = parsePokemon.id;

  cardName.appendChild(number);
};
setName();

const setType = () => {
  const type = parsePokemon.types;
  let text = "";

  type.forEach((element) => {
    text += `${element.type.name} `;
  });

  typeText.textContent = text;
};
setType();

const setWeight = () => {
  const convert = parseInt(parsePokemon.weight) / 10;
  weight.textContent = `${convert}kg`;
};
setWeight();

const setExperience = () => {
  baseExperience.textContent = `${parsePokemon.base_experience}xp`;
};
setExperience();

const setLocation = async () => {
  const response = await fetch(parsePokemon.location_area_encounters);
  const data = await response.json();
  console.log(data);
};
setLocation();
