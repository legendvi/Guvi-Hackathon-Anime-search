//Create Boiler Plate------------------------------
const renderBoilerPlate = function () {
  const body = document.querySelector("body");
  const template = `<div class="container">
  <div id="serachName">
    <form id="searchForm">
      <div class="m-3 mb-3">
        <label for="name" class="form-label"
          >Enter Anime Name and click Search to see the Results</label
        >
        <input
          type="text"
          class="form-control mb-3"
          id="name"
          placeholder="Enter a Anime"
        />
        <button type="submit" id="search" class="btn btn-primary">
          Search
        </button>
      </div>
    </form>
  </div>
  <div id="searchResult">
    <div class="container">
      <div id="grid" class="row"></div>
    </div>
  </div>
</div>`;

  body.insertAdjacentHTML("afterbegin", template);
};

//---------------------------------------------------

//All Dom elemets required

const selectElements = function () {
  const domElement = {
    inputFeild: document.querySelector("#name"),
    search: document.querySelector("#search"),
    form: document.querySelector("#searchForm"),
    grid: document.querySelector("#grid"),
  };
  return domElement;
};

//--------------------------------------------------
// Async Funtion used to fetch Data

const getAnimeResult = async function (query, domElement) {
  try {
    const res = await fetch(`https://api.jikan.moe/v3/search/anime?q=${query}`);
    const data = await res.json();
    let count = 0;
    domElement.grid.innerHTML = "";
    data.results.forEach(function (show) {
      const card = getCard(show);

      domElement.grid.insertAdjacentHTML("beforeend", card);
      count++;
    });
    // console.log(count);
  } catch (error) {
    console.log(error);
  }
};
//--------------------------------------------------------------

//This Funtion gives the code to render card
const getCard = function (data) {
  return ` <div class="col">
    <div class="card " style="width: 18rem">
        <img height='250rem'
          src="${data.image_url}"
          class="card-img-top"
          alt="No Image Preview Available"
        />
        <div class="card-body">
          <h5 class="card-title">${
            data.title ? data.title : "Title Not Available"
          }</h5>
          <p class="card-text">
            <p><b>Start Date: </b>${
              data.start_date
                ? data.start_date.substr(0, 10)
                : "This Show is Still Airing"
            }</p>
            <p><b>End Date: </b>${
              data.end_date
                ? data.end_date.substr(0, 10)
                : "This Show is Still Airing"
            }</p>
            <p><b>Type: </b>${
              data.type ? data.type : "Type is not Available"
            }</p>
            <p><b>IMDB Rating: </b>${
              data.score ? data.score : "No Rating Available"
            }</p>
          </p>
        </div>
        </div>
</div>`;
};
//Add Event Listener to Listen submit Event
const handleSubmitEvent = function (domElement) {
  domElement.form.addEventListener("submit", function (e) {
    e.preventDefault();
    const query = domElement.inputFeild.value;
    getAnimeResult(query, domElement);
  });
};
//Initilize Boiler Plate and Event Listner and Dom Elements
const init = function () {
  renderBoilerPlate();
  handleSubmitEvent(selectElements());
};
init();
