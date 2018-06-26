let matches = [];
const searchButton = document.querySelector(".searchButton");
let searchCriteria = "platsannonser/matchning?lanid=3&yrkesomradeid=3&antalrader=30";

searchButton.addEventListener("click", async function() {
  const baseURL = 'http://api.arbetsformedlingen.se/af/v0/';
  const responseObject = await fetch(baseURL + searchCriteria);
  matches = await responseObject.json();
  console.log(matches);
});
