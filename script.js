// getCurrentImageOfTheDay(): This function should fetch the data for 
// the current date from the NASA API and display it in the UI. 
// This function runs when the page loads.

// getImageOfTheDay(): This function should fetch the data for
//  the selected date from the NASA API and display it in the UI. 
//  It should also save the date to local storage and also show it in 
//  the search history unordered list.

//  saveSearch(): This function should save a date to local storage. 
// As shown in the recording, you need to just save the dates in an array.

// addSearchToHistory(): This function should add the date to 
//the search history list in the Ui. 
// You need to get the searches array from localstorage and 
// display it as an unordered list in the ui. When a user clicks on 
// the specific list item, you need to fetch the data for 
// that specific date all over again and show it in the black div.
// Make sure when the user clicks the list item , 
// you show the search results again on the screen in 
// the div as shown in the ui reference.

// date : "2023-06-01"
// explanation: "Massive stars in our Milky Way Galaxy live spectacular lives.  Collapsing from vast cosmic clouds, their nuclear furnaces ignite and create heavy elements in their cores. After a few million years, the enriched material is blasted back into interstellar space where star formation can begin anew. The expanding debris cloud known as Cassiopeia A is an example of this final phase of the stellar life cycle. Light from the explosion which created this supernova remnant would have been first seen in planet Earth's sky about 350 years ago, although it took that light about 11,000 years to reach us. This false-color image, composed of X-ray and optical image data from the Chandra X-ray Observatory and Hubble Space Telescope, shows the still hot filaments and knots in the remnant. It spans about 30 light-years at the estimated distance of Cassiopeia A. High-energy X-ray emission from specific elements has been color coded, silicon in red, sulfur in yellow, calcium in green and iron in purple, to help astronomers explore the recycling of our galaxy's star stuff. Still expanding, the outer blast wave is seen in blue hues. The bright speck near the center is a neutron star, the incredibly dense, collapsed remains of the massive stellar core."
// hdurl: "https://apod.nasa.gov/apod/image/2306/Chandrafirstlight_0.jpg"
// media_type: "image"
// service_version: "v1"
// title :"Recycling Cassiopeia A"
// url: "https://apod.nasa.gov/apod/image/2306/Chandrafirstlight_0_1024.jpg"

//const currentDate = new Date().toISOString().split("T")[0];
// https://api.nasa.gov/planetary/apod?date=${date}&api_key=${your_api_key}

console.log("test");

function getCurrentImageOfTheDay(){
  const currentDate = new Date().toISOString().split("T")[0];
  fetch(`https://api.nasa.gov/planetary/apod?api_key=LCc8yC3V8qH2zpKDNlqx2G9jEKIw2kwPOhuNCX2a&date=${currentDate}`)
  .then((res) => res.json())
  .then((data) => 
      //  console.log(data)
        document.getElementById("current-image-container").innerHTML +=`
        <h1>Picture on  ${data.date} </h1>
        <div><img src="${data.hdurl}" alt="image"></div>
        <div>
          <h2>${data.title}</h2>
        </div>
        <div>
          <p>${data.explanation}</p>
        </div>
        `
  ); 
}

getCurrentImageOfTheDay();

let btn=document.getElementById("button");
let input = document.getElementById("search-input");

function getImageOfTheDay(){
  let date= input.value;
  // console.log(date);
  document.getElementById("current-image-container").innerHTML="";

  fetch(`https://api.nasa.gov/planetary/apod?api_key=LCc8yC3V8qH2zpKDNlqx2G9jEKIw2kwPOhuNCX2a&date=${date}`)
  .then((res) => res.json())
  .then((data) => 
      //  console.log(data)
        document.getElementById("current-image-container").innerHTML +=`
        <h1>Picture on  ${data.date} </h1>
        <div><img src="${data.hdurl}" alt="image"></div>
        <div>
          <h2>${data.title}</h2>
        </div>
        <div>
          <p>${data.explanation}</p>
        </div>
        ` )
  .catch((error) => console.log(error));   
  saveSearch(date);
  addSearchToHistory(date);
// document.getElementById("search-history").innerHTML +=`<p> ${date} </p>`;

};

function saveSearch(date){
  const searches = JSON.parse(localStorage.getItem("searches")) || [];
  searches.push(date);
  localStorage.setItem("searches", JSON.stringify(searches));
};

function addSearchToHistory(date) {
  const searchHistory = document.getElementById("search-history");
  const li = document.createElement("li");
  const link = document.createElement("a");
  link.href = "javascript:void(0)";
  link.textContent = date;
  link.addEventListener("click", function() {
      // Fetch and display the image for the clicked date
      getImageOfTheDay(date);
  });
  li.appendChild(link);
  searchHistory.appendChild(li);
}


// Event listener for form submission
document.getElementById("button").addEventListener("submit", function(event) {
  event.preventDefault();
  const selectedDate = document.getElementById("search-input").value;
  const currentDate = new Date().toISOString().split("T")[0];

  if (selectedDate > currentDate) {
      // Display an error message or take appropriate action
      alert("Invalid date selection. Please choose a date on or before the current date.");
      return;
  }

  getImageOfTheDay(selectedDate);
});


