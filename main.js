const author = document.querySelector("#author");
const imgContainer = document.querySelector("#img-container");
const showDataBtn = document.querySelector("#show-data-btn");
const userInput = document.querySelector("#user-input");
const submitBtn = document.querySelector("#submit-btn");
const images = document.querySelector("#images");

const maxItems = 30;
const objArray = [];

let objectId = "";
const endPointObjectId = `https://collectionapi.metmuseum.org/public/collection/v1/objects/`;
const endPointSearch = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=`;

async function getData(url) {
  try {
    let response = await fetch(url);
    let result = await response.json();

    let museumData = result.objectIDs;

    if (Array.isArray(museumData) && museumData.length > 0) {
      museumData.slice(0, maxItems).forEach((item) => {
        objArray.push(item);
      });
      console.log(objArray);

      displayImages();
    }
    // displayImg(museumData);
    console.log(museumData);
  } catch (error) {
    console.log(error);
  }
}

async function displayImages() {
  try {
    // Clear existing images from the container
    imgContainer.innerHTML = "";

    for (const objectId of objArray) {
      let objectUrl = `${endPointObjectId}${objectId}`;
      console.log("Object URL:", objectUrl); // Log the constructed URL

      let objectResponse = await fetch(objectUrl);
      console.log("Object Response:", objectResponse); // Log the response object

      if (!objectResponse.ok) {
        throw new Error(`Error fetching object with ID ${objectId}`);
      }

      let objectResult = await objectResponse.json();

      const createImg = document.createElement("img");
      createImg.classList = "museum-img";
      createImg.src = objectResult.primaryImageSmall;
      imgContainer.append(createImg);
    }
  } catch (error) {
    console.log(error);
  }
}

submitBtn.addEventListener("click", () => {
  objectId = userInput.value.trim();
  const apiUrl = `${endPointSearch}${objectId}`;
  console.log("API URL:", apiUrl);
  getData(apiUrl);
});
