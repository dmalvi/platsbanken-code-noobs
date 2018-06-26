
const searchButton = document.querySelector(".searchButton");
let searchCriteria = "platsannonser/matchning?lanid=3&yrkesomradeid=3&antalrader=30";


searchButton.addEventListener("click", async function() {
  const baseURL = 'http://api.arbetsformedlingen.se/af/v0/';
  const responseObject = await fetch(baseURL + searchCriteria);
  let matches = await responseObject.json();
  let matchningdata = matches.matchningslista.matchningdata;
  let printString = getHtmlString(matchningdata);
  printJobs(printString); 
  });

  function printJobs(string) {
    const printDiv = document.querySelector("#print");
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
