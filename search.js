const search = document.getElementById("search_input");
const form = document.getElementById("form");
const exit_button = document.getElementById("exit_button");

const exit = () => {
  exit_button.style.display = "block";

  exit_button.addEventListener("click", () => {
    mainContainer.innerHTML = "";
    offset = 0
    getPokemons();
  });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = search.value.trim().toLowerCase();

  exit();

  const singleCard = (img, name, number, description) => {
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

  const getSingleData = async () => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${value}`
      );

      if (!response) {
        throw new Error("Error al obtener el pokemon");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const getSinglePokemon = async () => {
    try {
      mainContainer.innerHTML = "";
      const data = await getSingleData();

      //?Se obtienen los diferentes valores de los pokemones
      const numero = data.id;
      const name = data.name;
      const image = data.sprites.front_default;

      //?Se obtiene la descripcion de la especie del pokemon
      const species = await fetch(data.species.url);
      const speciesJson = await species.json();

      //?se obtiene la descripcion de los pokemones
      const entries = speciesJson.flavor_text_entries;
      const descripcion = entries.find(
        (entry) => entry.language.name === "es"
      ).flavor_text;

      singleCard(image, name, numero, descripcion);
    } catch (error) {
      console.error(error);
    }
  };

  getSinglePokemon();
});
