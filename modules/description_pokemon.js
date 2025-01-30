const parsePokemon = JSON.parse(localStorage.getItem("pokemon"));
const descriptionText = document.getElementById("description_text");
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

const animationDisplace = () => {
  const displace = document.createElement("section");
  displace.classList.add("displace");

  const displaceHeader = document.createElement("header");
  displaceHeader.classList.add("displace_header");

  const displaceTitle = document.createElement("h3");
  displaceTitle.classList.add("displace_title");

  const svg = `<svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M7.03 13.92h4V5l2.01-.03v8.95h3.99l-5 5Z"
              />
            </svg>`;

  const textContent = document.createElement("div");
  textContent.textContent = `Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Voluptatem, sint, aliquam rerum minima harum voluptas, earum modi ea
            dicta excepturi vero nulla. Quos neque excepturi voluptate sed
            perferendis obcaecati cum!`;

  const fragment = document.createDocumentFragment();

  displaceTitle.textContent = "Ubicacion";
  displaceHeader.appendChild(displaceTitle);
  displaceHeader.insertAdjacentHTML("beforeend", svg);
  displace.appendChild(displaceHeader);
  displace.appendChild(textContent);
  fragment.appendChild(displace);
  descriptionText.appendChild(fragment);

  displace.addEventListener("click", () => {
    if (displace.classList.contains("displace_open")) {
      displace.classList.remove("displace_open");
      displace.classList.add("displace_clouse");

    } else if (displace.classList.contains("displace_clouse")) {
      displace.classList.remove("displace_clouse");
      displace.classList.add("displace_open");

    } else{
        displace.classList.add('displace_open')
    }
  });
};
animationDisplace();

const setLocation = async () => {
  const response = await fetch(parsePokemon.location_area_encounters);
  const data = await response.json();
  console.log(data);
};
setLocation();
