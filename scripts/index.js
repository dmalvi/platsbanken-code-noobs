
const searchButton = document.querySelector(".searchButton");
const printDiv = document.querySelector("#print");
const nextButton = document.querySelector(".next");
const result = document.querySelector(".result");
let pageNumber = 1;
const baseURL = 'http://api.arbetsformedlingen.se/af/v0/';
let form = document.querySelector(".form");
let vocation = document.querySelector("#vocation");
let area = document.querySelector("#area");
let numberOfPages = document.querySelector("#pages");


//Makes a fetch 
async function fetchURL() {
  let searchCriteria = `platsannonser/matchning?lanid=${area.value}&yrkesomradeid=${vocation.value}&antalrader=${numberOfPages.value}`;
  const responseObject = await fetch(baseURL + searchCriteria + pageNumber);
  let matches = await responseObject.json();
  return matches;
} 

// function for when you push SÖK
form.addEventListener("submit", async function(event) {
  event.preventDefault();
  printDiv.innerHTML = "";  
  let matches = await fetchURL();
  console.log(matches);
  let matchningdata = matches.matchningslista.matchningdata;
  let printString = getHtmlString(matchningdata);
  printJobs(printString);
  revealNextButton();
  let antalAnnonser = matches.matchningslista.antal_platsannonser;
  result.innerHTML="";
  result.insertAdjacentHTML("afterbegin", "Antal annonser: " + antalAnnonser + " st");
});

// funtion for reveal LADDA FLER button
function revealNextButton(){
  nextButton.classList.remove("hide");
}

// function for when you push LADDA FLER
nextButton.addEventListener("click",async function(){
  event.preventDefault();
  pageNumber = pageNumber + 1;
  let matches = await fetchURL();
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