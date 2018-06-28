
const searchButton = document.querySelector(".searchButton");
let searchCriteria = "platsannonser/matchning?lanid=3&yrkesomradeid=3&antalrader=30&sida=";
const printDiv = document.querySelector("#print");
const nextButton = document.querySelector(".next");
const result = document.querySelector(".result");
let pageNumber = 1;
const baseURL = 'http://api.arbetsformedlingen.se/af/v0/';

/*Ellis workspace*/ 

let form = document.querySelector(".form");
searchCriteria = `platsannonser/matchning?lanid=3&yrkesomradeid=3&antalrader=30&sida=`;

function fetchURL() {
  const responseObject = await fetch(baseURL + searchCriteria + pageNumber);
  let matches = await responseObject.json();
  return matches;
}

/*Ellis workspace*/ 


// function for when you push SÖK
form.addEventListener("submit", async function() {
  printDiv.innerHTML = "";  
  let matches = fetchURL();
  let matchningdata = matches.matchningslista.matchningdata;
  let printString = getHtmlString(matchningdata);
  printJobs(printString);
  revealNextButton();
  let antalAnnonser = matches.matchningslista.antal_platsannonser;
  result.innerHTML="";
  result.insertAdjacentHTML("afterbegin", "Antal annonser: " + antalAnnonser + " st");
});

// 10, 34,35,36 index.html 83

// funtion for reveal LADDA FLER button
function revealNextButton(){
  nextButton.classList.remove("hide");
}

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
    <a href="${post.annonsurl}" class="popUpButton">Läs mer</a>
    </div>
    `;
  };
  return htmlString;
}
let popUpButton=document.querySelector(".popUpButton");
let popUp=document.querySelector(".popUp"):


popUpButton.addEventListener("click",function(){
popUp.style.display="block";
popUp.insertAdjacentHTML("beforeend",${post.annonsurl})
})