const parsePokemon = JSON.parse(localStorage.getItem("pokemon"));
const descriptionText = document.getElementById("description_text");
const normalImage = document.getElementById("normal_image");
const shinyImage = document.getElementById("shiny_image");
const image = document.getElementById("image");
const cardName = document.getElementById("name");
const typeText = document.getElementById("type_text");
const weight = document.getElementById("weight");
const baseExperience = document.getElementById("base_experience");
const statContainer = document.getElementById('stats_container')
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

const setStats = ()=>{
  const stats = parsePokemon.stats
  const fragment = document.createDocumentFragment()
  console.log(stats);
  
  stats.forEach(element => {
    const name = document.createElement('h3')
    name.textContent = `${element.stat.name.toUpperCase()} :`
    name.classList.add('stat_title')

    const value = document.createElement('p')
    value.textContent = element.base_stat
    value.classList.add('stat_value')

    const div = document.createElement('div')
    div.classList.add('stat')

    div.appendChild(name)
    div.appendChild(value)

    fragment.appendChild(div)
  });

  statContainer.appendChild(fragment)
}
setStats()

const animationDisplace = (title, data) => {
  const displace = document.createElement("section");
  displace.classList.add("displace");

  const displaceHeader = document.createElement("header");
  displaceHeader.classList.add("displace_header");

  const displaceTitle = document.createElement("h3");
  displaceTitle.classList.add("displace_title");
  displaceTitle.textContent = title;

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

  const textContent = document.createElement("section");
  textContent.appendChild(data)
  textContent.style.display = "none";
  textContent.classList.add('locationsContainer')

  const fragment = document.createDocumentFragment();

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

      setTimeout(() => {
        textContent.style.display = "none";
      }, 2000);
    } else if (displace.classList.contains("displace_clouse")) {
      textContent.style.display = "grid";
      displace.classList.remove("displace_clouse");
      displace.classList.add("displace_open");
    } else {
      textContent.style.display = "grid";
      displace.classList.add("displace_open");
    }
  });
};

const setLocation = async () => {
  const response = await fetch(parsePokemon.location_area_encounters);
  const data = await response.json();

  const fragment = document.createDocumentFragment();

  data.forEach((element) => {
    const areaName = element.location_area.name;
    const versionDetails = element.version_details;
    let versionName = "";
    let location;

    versionDetails.forEach((ver) => {
      versionName += `${ver.version.name}, `;
    });

    const rute = document.createElement("p");
    rute.classList.add("rute");
    rute.textContent = `Ruta: ${areaName}`;

    const version = document.createElement("p");
    version.classList.add("version");
    version.textContent = `Version: ${versionName.slice(0, -2)}`;

    const locationContainer = document.createElement("div");
    locationContainer.classList.add("location");

    locationContainer.appendChild(rute);
    locationContainer.appendChild(version);
    fragment.appendChild(locationContainer);
  });

  if (data.length !== 0) {
    animationDisplace("Ubicacion", fragment);
  }
};
setLocation();
