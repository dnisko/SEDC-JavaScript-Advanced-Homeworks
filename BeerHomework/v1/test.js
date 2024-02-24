import { fetchBeer } from "./apiCall.js";

let beersNav = document.getElementById("beersNav");
let pagesSort = document.getElementById("pages-sort");
let random = document.getElementById("random");

let url = "https://api.punkapi.com/v2/beers";
let pageSize = 5;
let beers = null;
let container = document.getElementsByClassName("container")[0];

pagesSort.hidden = true;

/* 
<div class="container text-center">
    
    <div class="row row-cols-4">

      <div class="cardContainer col">
        
        <div class="card" style="width: 18rem;">
          <img src="..." class="card-img-top" alt="...">
          
          <div class="card-body">
            <h5 class="card-title">Beer name</h5>
            <p class="card-text">Beer descripton</p>
            <a href="#" class="btn btn-primary">More details</a>
          </div>
        
        </div>
      
      </div>

    </div>
  
</div>


.card-img-top {
    width: 100%;
    height: 15vw;
    object-fit: cover;
}

*/
let test = {
    "id": 1,
    "name": "Buzz",
    "tagline": "A Real Bitter Experience.",
    "first_brewed": "09/2007",
    "description": "A light, crisp and bitter IPA brewed with English and American hops. A small batch brewed only once.",
    "image_url": "https://images.punkapi.com/v2/keg.png",
    "abv": 4.5,
    "ibu": 60,
    "target_fg": 1010,
    "target_og": 1044,
    "ebc": 20,
    "srm": 10,
    "ph": 4.4,
    "attenuation_level": 75,
    "volume": {
      "value": 20,
      "unit": "litres"
    },
    "boil_volume": {
      "value": 25,
      "unit": "litres"
    },
    "method": {
      "mash_temp": [
        {
          "temp": {
            "value": 64,
            "unit": "celsius"
          },
          "duration": 75
        }
      ],
      "fermentation": {
        "temp": {
          "value": 19,
          "unit": "celsius"
        }
      },
      "twist": null
    },
    "ingredients": {
      "malt": [
        {
          "name": "Maris Otter Extra Pale",
          "amount": {
            "value": 3.3,
            "unit": "kilograms"
          }
        },
        {
          "name": "Caramalt",
          "amount": {
            "value": 0.2,
            "unit": "kilograms"
          }
        },
        {
          "name": "Munich",
          "amount": {
            "value": 0.4,
            "unit": "kilograms"
          }
        }
      ],
      "hops": [
        {
          "name": "Fuggles",
          "amount": {
            "value": 25,
            "unit": "grams"
          },
          "add": "start",
          "attribute": "bitter"
        },
        {
          "name": "First Gold",
          "amount": {
            "value": 25,
            "unit": "grams"
          },
          "add": "start",
          "attribute": "bitter"
        },
        {
          "name": "Fuggles",
          "amount": {
            "value": 37.5,
            "unit": "grams"
          },
          "add": "middle",
          "attribute": "flavour"
        },
        {
          "name": "First Gold",
          "amount": {
            "value": 37.5,
            "unit": "grams"
          },
          "add": "middle",
          "attribute": "flavour"
        },
        {
          "name": "Cascade",
          "amount": {
            "value": 37.5,
            "unit": "grams"
          },
          "add": "end",
          "attribute": "flavour"
        }
      ],
      "yeast": "Wyeast 1056 - American Ale™"
    },
    "food_pairing": [
      "Spicy chicken tikka masala",
      "Grilled chicken quesadilla",
      "Caramel toffee cake"
    ],
    "brewers_tips": "The earthy and floral aromas from the hops can be overpowering. Drop a little Cascade in at the end of the boil to lift the profile with a bit of citrus.",
    "contributed_by": "Sam Mason <samjbmason>"
  }

let dataForCards = (data) =>
{
    let cardContainer = document.createElement("div");
    cardContainer.className = "cardContainer col";

    let card = document.createElement("div");
    card.className = "card";
    // card.style.textAlign = "center"
    // card.style.width = "18rem";
    // card.style.height = "40%";
    
    let picture = document.createElement("img");
    picture.className = "card-img-top";
    picture.src = data.image_url;
    picture.style.width = "30%";
    picture.style.height = "30%";
    picture.style.margin = "auto";
    // picture.style.objectFit = "cover";
    
    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    
    let name = document.createElement('h5');
    name.innerText = data.name;
    name.className = 'card-title';
    
    let description = document.createElement('div');
    description.innerText = data.description;
    description.className = 'card-color';

    let moreDetils = document.createElement("a");
    moreDetils.href = "#"; //kolku da go ima :)
    moreDetils.className = "btn btn-primary";
    moreDetils.innerText = "More details";

    let row = document.createElement("div")
    row.className = "row row-cols-4";

    cardBody.appendChild(name);
    cardBody.appendChild(description);
    cardBody.appendChild(moreDetils);

    card.appendChild(picture);
    card.appendChild(cardBody);

    cardContainer.appendChild(card);
    row.appendChild(cardContainer);

    container.appendChild(row);
}

random.addEventListener("click", () =>
{
  // debugger;
  pagesSort.hidden = false;
  beers = fetchBeer(`${url}/random`, "", "");
  // renderBeer(row, beers, 1);

  renderDetailsBeer (container, beers);

});
beersNav.addEventListener("click", () =>
{
  pagesSort.hidden = false;
  beers = fetchBeer(url, `?page=${1}`, `&per_page=${pageSize}`);
  renderBeer(container, beers, pageSize);
});

//help: https://stackoverflow.com/questions/24620741/get-selected-item-value-from-bootstrap-dropdown-with-specific-id
$(document).ready(function ()
{
  $('#demolist a').on('click', function ()
  {
    pageSize = ($(this).text());
    console.log(pageSize);
    pages(pageSize);
    console.log("tuka " + pageSize);

    beers = fetchBeer(url, 1, pageSize);
    renderBeer(container, beers, pageSize);

      /*
        beers = fetchBeer(url, 1, pageSize);
        beers.then(data =>
            {
                // debugger;
                row.innerHTML = "";
                const info = data.filter(p => p.id == 1);
                console.log(data);
                let tempArray = [];
                for(let i = 0; i < pageSize; i++)
                {
                    // 
                    // console.log();
                    // tempArray.push(data[i]);
                    dataForCards(data[i]);
                }
                
                console.log(tempArray);
                // console.log(info.id, info.name, info.tagline, info.first_brewed, info.description, info.image, info.abv, info.ibu, info.food_pairing);
                return info;
                // let id = data[0].id;
                // let name = data[0].name;
                // let tagline = data[0].tagline;
                // let first_brewed = data[0].first_brewed;
                // let description = data[0].description;
                // let image = data[0].image_url;
                // let abv = data[0].abv;
                // let ibu = data[0].ibu;
                // let food_pairing = data[0].food_pairing;
        
                // console.log(id, name, tagline, first_brewed, description, image, abv, ibu, food_pairing);
                // return id, name, tagline, first_brewed, description, image, abv, ibu, food_pairing;
            }).catch(err =>
            {
                console.log(err);
            });
          */
  });
});

let renderBeer = (container, beerData, pageSize) =>
{
  beerData.then(data =>
    {
      container.innerHTML = "";
      const info = data.filter(p => p.id == 1);
      console.log(data);
      let tempArray = [];
      for(let i = 0; i < pageSize; i++)
      {
        dataForCards(data[i]);
      }
      
      console.log(tempArray);
      return info;
    }).catch(err =>
    {
        console.log(err);
    });
}



let renderDetailsBeer = (container, beerData) =>
{
  // debugger;
  beerData.then(data =>
    {
      container.innerHTML = "";
      const info = data.filter(p => p.id == 1);
      console.log(data);
      let tempArray = [];
      // for(let i = 0; i < 1; i++)
      // {
        dataForCardsDetaled(data[0]);
      // }
      
      console.log(tempArray);
      return data;
    }).catch(err =>
    {
        console.log(err);
    });
}

/*
<div class="card mb-3" style="max-width: 540px;">

  <div class="row g-0">

    <div class="col-md-4">
      <img src="..." class="img-fluid rounded-start" alt="...">
    </div>

    <div class="col-md-8">
    
      <div class="card-body">
        <h5 class="card-title">Card title</h5> - name
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p> - description
        <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p> - food pairing
      </div>

    </div>
  </div>
</div>
*/

let dataForCardsDetaled = (data) =>
{
  console.log("tuka");
  console.log(data.id);
  let card3 = document.createElement("div");
  card3.className = "card mb-3";

  let row0 = document.createElement("div");
  row0.className = "row g-0";

  let col4 = document.createElement("div");
  col4.className = "col-md-4";
  
  let picture = document.createElement("img");
  picture.className = "img-fluid rounded-start";
  picture.src = data.image_url;
  // picture.style.width = "30%";
  // picture.style.height = "30%";
  picture.style.margin = "auto";
  // picture.style.objectFit = "cover";
  
  let col8 = document.createElement("div");
  col8.className = "col-md-8";

  let cardBody = document.createElement('div');
  cardBody.className = 'card-body';

  let name = document.createElement('h5');
  name.innerText = data.name;
  name.className = 'card-title';
  
  let description = document.createElement('p');
  description.innerText = data.description;
  description.className = 'card-text';

  let foodPairing = document.createElement("p");
  foodPairing.className = "card-text";
  foodPairing.innerText = data.food_pairing;

  

  cardBody.appendChild(name);
  cardBody.appendChild(description);
  cardBody.appendChild(foodPairing);

  col8.appendChild(cardBody);

  col4.appendChild(picture);

  row0.appendChild(col8);
  row0.appendChild(col4);

  card3.appendChild(row0);

  // cardContainer.appendChild(card3);
  container.appendChild(card3);
}
let pages = (size) =>
{
    // console.log("od pages");
    pageSize = size;
    // console.log(pageSize);
    console.log(Math.floor(325 / size));
    return Math.floor(325 / size);
}

// let beers = fetchBeer(url, 1, pages(15));
// console.log(beers);


