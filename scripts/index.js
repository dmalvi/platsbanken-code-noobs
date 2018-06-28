
const searchButton = document.querySelector(".searchButton");
let searchCriteria = "platsannonser/matchning?lanid=3&yrkesomradeid=3&antalrader=30&sida=";
const sthlmButton = document.querySelector("#stockholm");
const gbgButton = document.querySelector("#goteborg");
const uppsalaButton = document.querySelector("#uppsala");
const malmoButton = document.querySelector("#malmo");
const printDiv = document.querySelector("#print");
const nextButton = document.querySelector(".next");
let pageNumber = 1;
const baseURL = 'http://api.arbetsformedlingen.se/af/v0/';

// function for when you push SÖK
searchButton.addEventListener("click", async function() {
  printDiv.innerHTML = "";
  if (sthlmButton.checked) {
    searchCriteria = "platsannonser/matchning?lanid=1&yrkesomradeid=3&antalrader=30&sida=";
  } else if (uppsalaButton.checked) {
    searchCriteria = "platsannonser/matchning?lanid=3&yrkesomradeid=3&antalrader=30&sida=";
  } else if (gbgButton.checked) {
    searchCriteria = "platsannonser/matchning?lanid=14&yrkesomradeid=3&antalrader=30&sida=";
  } else if (malmoButton.checked) {
    searchCriteria = "platsannonser/matchning?lanid=12&yrkesomradeid=3&antalrader=30&sida=";
  } else {
    searchCriteria = "platsannonser/matchning?yrkesomradeid=3&antalrader=30&sida=";
  }
  const responseObject = await fetch(baseURL + searchCriteria + pageNumber);
  let matches = await responseObject.json();
  let matchningdata = matches.matchningslista.matchningdata;
  let printString = getHtmlString(matchningdata);
  printJobs(printString);
});

// function for when you push LADDA FLER
nextButton.addEventListener("click",async function(){
  pageNumber = pageNumber + 1;
  searchCriteria = "platsannonser/matchning?yrkesomradeid=3&antalrader=30&sida=";
  const responseObject = await fetch(baseURL + searchCriteria + pageNumber);
  let matches = await responseObject.json();
  let matchningdata = matches.matchningslista.matchningdata;
  let printString = getHtmlString(matchningdata);
  printJobs(printString);
});

//prints out HTMLstring on the page
function printJobs(string) {
  printDiv.insertAdjacentHTML("beforeend", string);
}

//what to print out
function getHtmlString(data){
  let htmlString = "";
  for(let post of data){
    htmlString +=`
    <div class="card" id="${post.annonsid}">
    <p>${post.annonsid}</p>
    <h2>${post.annonsrubrik}</h2>
    <p>${post.yrkesbenamning}</p>
    <p>${post.arbetsplatsnamn}</p>
    <a href="${post.annonsurl}" target="_blank">Läs mer</a>
    </div>
    `;
  };
  return htmlString;
}
