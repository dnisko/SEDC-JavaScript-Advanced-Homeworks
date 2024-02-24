import { ApiService } from "./app-service.js";
import { Beer } from "./beer.js";

export class BeerService
{
  constructor()
  {
    this.apiService = new ApiService();
    this.baseUrl = "https://api.punkapi.com/v2/beers";
    this.pageSize = 5;
    this.currentPage = 1;
    this.random = document.getElementById("random");
    this.notification = document.getElementById("notification");
    this.cardContainer = document.getElementById("cardContainer");
    this.pagination = document.getElementsByClassName("pagination")[0];
    this.currentPageOf = document.getElementById("currentPageOf");
    this.testingPages = document.getElementById("testingPages");
    this.detailesBeer = document.getElementById("detailesBeer");

    this.previous = document.getElementsByClassName("previous")[0]; 
    this.next = document.getElementsByClassName("next")[0];

    this.paging = document.getElementById("pageSize");

    this.dropdownList = document.getElementById("demolist");
  }

  pages = (size) =>
  {
    pageSize = size;
    // console.log(pageSize);
    // console.log(Math.floor(325 / size));
    console.log(this.currentPage);

    return Math.floor(325 / size);
  };

  renderPagination = () =>
  {
    this.pagination.innerHTML = 
    `<li class="page-item disabled">
      <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
    </li>
    <li class="page-item">
      <a class="page-link" href="#">Next</a>
    </li>`;
  };

  getCurrentPageOf = () =>
  {
    currentPageOf.innerHTML = `page ${this.currentPage} / ${this.pages(this.pageSize)}`;
  }
//GET ID. IF ID < matematika za kolku da ima po strana i koe ID bi bilo posledno na strana......

  // async searchBeer(number) {
  //   // const n = input.trim();
  //   try {
  //     const beerData = await this.apiService.getBeerBySearch(searchValue);
  //     if (!beerData.length) {
  //       throw new Error(`No beer found! Search value: ${searchValue}`);
  //     }
  //     // const mappedCountries = this.mapCountryData(countriesData);
  //     // this.renderCountries(mappedCountries);
  //   } catch (error) {
  //     this.notification.innerHTML = `<div class='alert-danger'>${error}</div>`;
  //   }
  // }
  // url = `${url}?page=${currentPage}&per_page=${pageSize}`;

  nextCurrentPage = () =>
  {debugger;
    // console.log(this.currentPage);
    this.currentPage += 1;
    this.testingPages.innerText = this.currentPage;
  }

  previousCurrentPage = () =>
  {
    this.currentPage -= 1;
    this.testingPages = this.currentPage;
  }

  async mainBeers()
  {
    this.resetContainers();
    try
    {
      // ZA VO NEXT
      // let totalPages = this.pages(this.pageSize);
      // // console.log(totalPages);
      // if(this.currentPage >= totalPages)
      // {
      //   return this.lastPage();
      // }
      
      const beerData = await this.apiService.fetchBeer(
        `${this.baseUrl}`,
        `?page=${this.currentPage}`,
        `&per_page=${this.pageSize}`
      );

      if (!beerData.length)
      {
        throw new Error("No beer found! Try again.");
      }
      this.getCurrentPageOf();
      const mappedBeers = this.mapBeerData(beerData);
      this.renderBeer(mappedBeers);

    }
    catch (error)
    {
      this.notification.innerHTML = `<div class='alert-danger'>${error}</div>`;
    }
  }

  async moreDetailes(id)
  {
    this.resetContainers();
    try
    {
      const beerData = await this.apiService.getOneBeer(id);
      if (!beerData.length)
      {
        throw new Error(`No beer found! Try again.`);
      }
      const mappedBeers = this.mapBeerData(beerData);
      this.renderMoreBeer(mappedBeers);
    }
    catch (error)
    {
      this.notification.innerHTML = `<div class='alert-danger'>${error}</div>`;
    }
  }

  async randomBeer()
  {
    this.resetContainers();
    try
    {
      const beerData = await this.apiService.getRandomBeer();
      if (!beerData.length)
      {
        throw new Error(`No beer found! Try again.`);
      }
      const mappedBeers = this.mapBeerData(beerData);
      this.renderMoreBeer(mappedBeers);
    }
    catch (error)
    {
      this.notification.innerHTML = `<div class='alert-danger'>${error}</div>`;
    }
  }

  mapBeerData(beers)
  {
    return beers.map((beer) => new Beer(beer));
  }

  renderBeer(beer)
  {
    beer.forEach((beer) =>
    {
      this.cardContainer.innerHTML += 
      `<div class="cardContainer col">
          <div class=""col-md-4"">
            <img src="${beer.image_url}" class="card-img-top" alt="${beer.name}">
              <div class="card-body">
                <h5 class="card-title">${beer.name}</h5>
                <p class="card-text">${beer.tagline}</p>
                <a href="#" class="btn btn-primary" id="${beer.id}">More details</a>
              </div>
          </div>
        </div>`;
    });
  };

  renderMoreBeer(beer)
  {
    console.log(beer);
    beer.forEach((beer) =>
    {
    this.detailesBeer.innerHTML += 
    `<div class="card mb-3" style="max-width: 1200px;">
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${beer.image_url}" class="img-fluid rounded-start" alt="${beer.name}">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${beer.name}</h5>
            <p class="card-text">${beer.description}</p>
            <p class="card-text">Brewed: ${beer.first_brewed}<br>
            alcohol: ${beer.abv}%<br>
            bitternes: ${beer.ibu} IBU
            </p>
            <p class="card-text"><strong class="text-body-secondary">Food pairing</strong></p>
              
                ${beer.food_pairing.map(food =>
                  `<div class="card-footer text-body-secondary">
                    ${food}
                  </div>`
                  ).join('')}
              
          </div>
        </div>
      </div>
      </div>`
    });
  }

  resetContainers()
  {
    this.cardContainer.innerHTML = "";
    this.detailesBeer.innerHTML = ""
  };

  getPageFromDropdown(event)
  {
    // Check if the clicked element is an <a> tag (dropdown item)
    if (event.target.tagName === "A")
    {
      var selectedText = event.target.textContent.trim();
      this.pageSize = parseInt(selectedText);
      console.log(this.pageSize);
    }
  };

  lastPage()
  {
    this.notification.innerHTML = `<div class='alert-danger'>This is the Last page.</div>`;
  };

  registerEvents()
  {
    // debugger;
    console.log(`Event fired: ${this.currentPage}`);

    this.dropdownList.addEventListener("click", (event) =>
    {
      this.getPageFromDropdown(event);
      this.mainBeers();
    });

    this.random.addEventListener("click", () => this.randomBeer());

    this.previous.addEventListener("click", () =>
    {
      if(this.currentPage === 1)
      {
        this.previous.classList.add("disabled");
        console.log(`Previuos clicked: ${this.currentPage}`);
      }
      if(this.currentPage > 1)
      {
        this.previous.classList.remove("disabled")
        this.previousCurrentPage();
        console.log(`Previuos clicked: ${this.currentPage}`);
      }
    });

    this.next.addEventListener("click", () =>
    {
      // debugger;
      console.log("tuka");
      if(this.currentPage < this.pages(this.pageSize))
      {
        this.next.classList.remove("disabled");
        this.nextCurrentPage();
        console.log(`Next clicked: ${this.currentPage}`);
      }
      if(this.currentPage === this.pages(this.pageSize))
      {
        this.next.classList.add("disabled");
      }
    });

    this.cardContainer.addEventListener("click", (event) =>
    {
      const clickedElement = event.target.getAttribute("id");
      // console.log(clickedElement);
      // const beerId = clickedElement.getAttribute("id");
      // console.log(clickedElement);
      this.moreDetailes(clickedElement);
    })
  }
};


    // this.resetBtn.addEventListener("click", () => this.resetContainers());
    // this.btnEurope.addEventListener("click", () => this.getCountriesInEurope());
    // this.btnMacedonia.addEventListener("click", () =>
    // this.searchCountries("Macedonia")
    // );
    // this.btnNeighbours.addEventListener("click", () =>
    // this.getMacedoniaNeighbours()
    // );


  //za site piva

// $(document).ready(function () {
//   $("#demolist a").on("click", async function () {
//     pageSize = $(this).text();
//     // console.log(pageSize);
//     pages(pageSize);
//     console.log("tuka " + pageSize);

//     const beerData = await this.apiService.fetchBeer();

//     renderBeer(container, beerData, pageSize);
//   });
// });
