const factInput = document.getElementById("factInput");
const photoInput = document.getElementById("photoInput");
const factButton = document.querySelector(".submit-fact-btn");
const photoButton = document.querySelector(".submit-photo-btn");
const resultDiv = document.querySelector(".result");


function showSpinner() {
  const spinnerHTML = `<div class="spinner"><i class="fa-solid fa-spinner fa-spin"></i></div>`;
  resultDiv.innerHTML = spinnerHTML;
}


async function getCatFacts() {
  let numberOfFacts = Number(factInput.value);

  if (numberOfFacts <= 0) {
    numberOfFacts = 1;
  } else if (numberOfFacts > 50) {
    numberOfFacts = 50;
  }

  const apiURL = `https://meowfacts.herokuapp.com/?count=${numberOfFacts}`;

  showSpinner();

  try {
    const response = await axios.get(apiURL);
    const factsData = response.data;

    if (factsData && Array.isArray(factsData.data)) {
      let factItems = "";
      for (let i = 0; i < factsData.data.length; i++) {
        factItems = factItems + `<li>${factsData.data[i]}</li>`;
      }
      resultDiv.innerHTML = `<ol class="facts-results">${factItems}</ol>`;
    }
  } catch (error) {
    resultDiv.innerHTML = `<p>Failed to load cat facts</p>`;
  }
}


async function getCatPhotos() {
  let numberOfPhotos = Number(photoInput.value);

  if (numberOfPhotos <= 0) {
    numberOfPhotos = 1;
  } else if (numberOfPhotos > 10) {
    numberOfPhotos = 10;
  }

  const apiURL = `https://api.thecatapi.com/v1/images/search?limit=${numberOfPhotos}`;

  showSpinner(); 

  try {
    const response = await axios.get(apiURL);
    const photoData = response.data;

    if (photoData && Array.isArray(photoData, numberOfPhotos)) {
      let photosHTML = `<div class="photos-results">`;

      for (let i = 0; i < numberOfPhotos; i++) {
        const photo = photoData[i];
        photosHTML = photosHTML + `<div class="image-container">`;
        photosHTML =
          photosHTML +
          `<img class="cat-image" src="${photo.url}" alt="A cute cat">`;
        photosHTML = photosHTML + `</div>`;
      }

      photosHTML = photosHTML + `</div>`;
      resultDiv.innerHTML = photosHTML;
    }
  } catch (error) {
    resultDiv.innerHTML = `<p>Failed to load cat photos</p>`;
  }
}


factButton.addEventListener("click", function (event) {
  event.preventDefault(); 
  getCatFacts();
});

photoButton.addEventListener("click", function (event) {
  event.preventDefault(); 
  getCatPhotos();
});
