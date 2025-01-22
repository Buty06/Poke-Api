const mainContainer = document.getElementById("main_container");
let offset = 0;

const card = (img, name, number, description) => {
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

  const fragment = document.createDocumentFragment();

  image.src = img;
  title.textContent = name;
  numero.textContent = number;
  descripcion.textContent = description;

  title.appendChild(numero);
  figure.appendChild(image);
  div.appendChild(title);
  div.appendChild(descripcion);
  card.appendChild(figure);
  card.appendChild(div);
  fragment.appendChild(card);
  mainContainer.appendChild(fragment);
};

const getData = async () => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset}`
    );

    if (!response) {
      throw new Error("Error al obtener el pokemon");
    }

    const data = await response.json();

    offset = offset + 20;

    return data;
  } catch (error) {
    console.error(error);
  }
};

const getPokemon = async () => {
  try {
    const data = await getData();

    data.results.forEach(async (element) => {
      const pokemon = await fetch(element.url);
      const pokemonJson = await pokemon.json();

      const species = await fetch(pokemonJson.species.url);
      const speciesJson = await species.json();

      const numero = pokemonJson.id;
      const name = pokemonJson.name;
      const image = pokemonJson.sprites.front_default;

      const entries = speciesJson.flavor_text_entries;
      const descripcion = entries.find(
        (entry) => entry.language.name === "es"
      ).flavor_text;

      card(image, name, numero, descripcion);
    });
  } catch (error) {
    console.error(error);
  }
};

getPokemon();

console.log();

window.addEventListener("scroll", () => {
  const totalHeight = document.documentElement.scrollHeight;
  if (scrollY + innerHeight >= totalHeight) {
    getData();
    getPokemon();
  }
});
