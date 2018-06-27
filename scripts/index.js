
const searchButton = document.querySelector(".searchButton");
let searchCriteria = "platsannonser/matchning?lanid=3&yrkesomradeid=3&antalrader=30";
const sthlmButton = document.querySelector("#stockholm");
const gbgButton = document.querySelector("#goteborg");
const uppsalaButton = document.querySelector("#uppsala");
const malmoButton = document.querySelector("#malmo");
const printDiv = document.querySelector("#print");

searchButton.addEventListener("click", async function() {
  printDiv.innerHTML = "";
  if (sthlmButton.checked) {
    searchCriteria = "platsannonser/matchning?lanid=1&yrkesomradeid=3&antalrader=30";
  } else if (uppsalaButton.checked) {
    searchCriteria = "platsannonser/matchning?lanid=3&yrkesomradeid=3&antalrader=30";
  } else if (gbgButton.checked) {
    searchCriteria = "platsannonser/matchning?lanid=14&yrkesomradeid=3&antalrader=30";
  } else if (malmoButton.checked) {
    searchCriteria = "platsannonser/matchning?lanid=12&yrkesomradeid=3&antalrader=30";
  } else {
    searchCriteria = "platsannonser/matchning?yrkesomradeid=3&antalrader=80";
  }
  const baseURL = 'http://api.arbetsformedlingen.se/af/v0/';
  const responseObject = await fetch(baseURL + searchCriteria);
  let matches = await responseObject.json();
  let matchningdata = matches.matchningslista.matchningdata;
  let printString = getHtmlString(matchningdata);
  printJobs(printString); 
  });

  function printJobs(string) {
    printDiv.insertAdjacentHTML("beforeend", string);
  }


  function getHtmlString(data){
  let htmlString = "";
  for(let post of data){
    htmlString +=`
    <div class="card" id="${post.annonsid}">
    <h2>${post.annonsrubrik}</h2>
    <p>${post.yrkesbenamning}</p>
    <p>${post.arbetsplatsnamn}</p>
    </div>
    `;
  };
  return htmlString;
}
