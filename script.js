//*Variables del Dom y un contador necesario para el codigo
const mainContainer = document.getElementById("main_container");
let offset = 0;

//*Funcion donde se renderizan los pokemones
const card = (img, name, number, description) => {
  //?Creando los elementos y agregandoles sus clases respectivas del Dom
  const card = document.createElement("article");
  card.classList.add("cards");

  const figure = document.createElement("figure");
  figure.classList.add("cards_image_container");

  const image = document.createElement("img");
  image.src = img;
  image.classList.add("cards_image");

  const div = document.createElement("div");
  div.classList.add("cards_text_container");

  const title = document.createElement("h2");
  title.classList.add("cards_name");

  const numero = document.createElement("span");
  numero.classList.add("cards_number");

  const descripcion = document.createElement("p");
  descripcion.classList.add("cards_description");

  //?Creando el Fragment que ayuda a la renderizacion de elementos
  const fragment = document.createDocumentFragment();

  //?Agregando los datos de la api a los elementos
  image.src = img;
  title.textContent = name;
  numero.textContent = number;
  descripcion.textContent = description;

  //?Agregando los elementos a el Dom
  title.appendChild(numero);
  figure.appendChild(image);
  div.appendChild(title);
  div.appendChild(descripcion);
  card.appendChild(figure);
  card.appendChild(div);
  fragment.appendChild(card);
  mainContainer.appendChild(fragment);
};

//*obtiene los datos de la ruta de 20 pokemones de la api
const getData = async () => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset}`
    );

    if (!response) {
      throw new Error("Error al obtener el pokemon");
    }

    const data = await response.json();

    //?Contador que va sumandose cada vez que se ejecuta
    offset = offset + 20;

    return data;
  } catch (error) {
    console.error(error);
  }
};

//*Obtiene los datos para luego ser renderizados utilizando los pokemones anteriores

//*Variable para que no se repitan los valores
let repeat;

const getPokemon = async () => {
  try {
    const data = await getData();

    for (const element of data.results) {
      //?Se obbtiene el pokemon en especifico
      const pokemon = await fetch(element.url);
      const pokemonJson = await pokemon.json();

      if (repeat !== pokemonJson.id) {
        //?Se obtienen los diferentes valores de los pokemones
        const numero = pokemonJson.id;
        const name = pokemonJson.name;
        const image = pokemonJson.sprites.front_default;

        //?Se obtiene la descripcion de la especie del pokemon
        const species = await fetch(pokemonJson.species.url);
        const speciesJson = await species.json();

        //?se obtiene la descripcion de los pokemones
        const entries = speciesJson.flavor_text_entries;
        const descripcion = entries.find(
          (entry) => entry.language.name === "es"
        ).flavor_text;

        card(image, name, numero, descripcion);
      }

      repeat = pokemonJson.id;
    }
  } catch (error) {
    console.error(error);
  }
};

getPokemon();

//*Variable de estado para la ejecucion de la funcion en intervalos de tiempo
let canExecute = true;

//! Esta funsion ayuda para que le de un margen de tiempo a la extraccion de datos en el Dom
const render = () => {
  if (canExecute) {
    const totalHeight = document.documentElement.scrollHeight;
    if (scrollY + innerHeight >= totalHeight) {
      getData();
      getPokemon();

      canExecute = false;
    }

    setTimeout(() => {
      canExecute = true;
    }, 2500);
  }
};

window.addEventListener("scroll", render);
