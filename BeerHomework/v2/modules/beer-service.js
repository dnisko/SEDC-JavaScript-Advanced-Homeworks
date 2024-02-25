import { ApiService } from "./app-service.js";
import { Beer } from "./beer.js";
import { Loader } from "./loader.js"
import { Render } from "./render.js";

export class BeerService
{
  constructor()
  {
    this.apiService = new ApiService();
    // this.baseUrl = "https://api.punkapi.com/v2/beers";
    this.pageSize = 5;
    this.currentPage = 1;
    this.random = document.getElementById("random");
    this.notification = document.getElementById("notification");
    this.cardContainer = document.getElementById("cardContainer");
    this.pagination = document.getElementsByClassName("pagination")[0];
    this.searchBtn = document.getElementById("searchBtn");
    this.searchText = document.getElementById("searchText");

    this.currentPageOf = document.getElementById("currentPageOf");
    this.testingPages = document.getElementById("testingPages");
    this.detailesBeer = document.getElementById("detailesBeer");

    this.previous = document.getElementsByClassName("previous")[0]; 
    this.next = document.getElementsByClassName("next")[0];

    this.paging = document.getElementById("pageSize");

    this.pagesPerPage = document.getElementById("pagesPerPage");
    this.sort = document.getElementById("sort");

    this.testArray = [];
  }

  pages = (size) =>
  {
    pageSize = size;
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

  async mainBeers(beerData)
  {
    Loader.show();
    this.resetContainers();
    try
    {  
      beerData = await this.apiService.fetchBeer(`${this.currentPage}`,`${this.pageSize}`
      );

      if (!beerData.length)
      {
        throw new Error("No beer found! Try again.");
      }
      this.getCurrentPageOf();
      const mappedBeers = this.mapBeerData(beerData);
      this.testArray = new Object(mappedBeers);
      // console.log(this.testArray);
      Render.main(mappedBeers, this.cardContainer);
      // console.log(beerData.sort((a, b) => a.name.localeCompare(b.name)));

    }
    catch (error)
    {
      this.notification.innerHTML = `<div class='alert-danger'>${error}</div>`;
    }
    finally
    {
      Loader.hide();
    }
  }

  async moreDetailes(id)
  {
    Loader.show();
    this.resetContainers();
    try
    {
      const beerData = await this.apiService.getOneBeer(id);
      if (!beerData.length)
      {
        throw new Error(`No beer found! Try again.`);
      }
      const mappedBeers = this.mapBeerData(beerData);
      this.testArray = new Object(mappedBeers);
      Render.one(mappedBeers, this.cardContainer);
    }
    catch (error)
    {
      this.notification.innerHTML = `<div class='alert-danger'>${error}</div>`;
    }
    finally
    {
      Loader.hide();
    }
  }

  async randomBeer()
  {
    Loader.show();
    this.resetContainers();
    try
    {
      const beerData = await this.apiService.getRandomBeer();
      if (!beerData.length)
      {
        throw new Error(`No beer found! Try again.`);
      }
      const mappedBeers = this.mapBeerData(beerData);
      this.testArray = new Object(mappedBeers);
      Render.one(mappedBeers, this.cardContainer);
    }
    catch (error)
    {
      this.notification.innerHTML = `<div class='alert-danger'>${error}</div>`;
    }
    finally
    {
      Loader.hide();
    }
  }

  async searchBeer(searchText)
  {
    // debugger;
    this.resetContainers();
    const searchValue = searchText.trim();
    if (!searchValue)
    {
      this.notification.innerHTML = "<div class='alert-danger'>You entered an invalid or empty name!</div>";
      return;
    }
        Loader.show();
    try
    {
      const beerData = await this.apiService.getBeersByName(searchValue);
      if (!beerData.length) {
        throw new Error("No beers available! Search value " + searchValue)
      }
      console.log(beerData);
      const mappedData = this.mapBeerData(beerData);
      this.testArray = new Object(mappedData);
      console.log(mappedData);
      Render.main(mappedData, this.cardContainer);
    }
    catch (error)
    {
        this.notification.innerHTML = `<div class='alert-danger'>${error}</div>`;
    }
    finally
    {
      Loader.hide();
    }
  }

  mapBeerData(beers)
  {
    return beers.map((beer) => new Beer(beer));
  }

  resetContainers()
  {
    this.notification.innerHTML = "";
    this.cardContainer.innerHTML = "";
    this.detailesBeer.innerHTML = "";
    this.searchText.value = "";
  };

  //stolen from net :) - catch the click event on <a> element in dropdown
  getPageFromDropdownPage(event)
  {
    // Check if the clicked element is an <a> tag (dropdown item)
    if (event.target.tagName === "A")
    {
      let selectedText = event.target.textContent.trim();
      this.pageSize = parseInt(selectedText);
      console.log(this.pageSize);
    }
  };

  getPageFromDropdownSort(event)
  {
    // debugger;
    if (event.target.tagName === "A" && this.testArray.length > 1)
    {
      let selectedText = event.target.textContent.trim();
      console.log(selectedText);
      console.log(this.testArray.length);

      switch (selectedText)
      {
        case "name":
          console.log(this.testArray);
          this.testArray.sort((a, b) => a.name.localeCompare(b.name));
          console.log(this.testArray.sort((a, b) => a.name.localeCompare(b.name)));
          this.resetContainers();
          Render.main(this.testArray, this.cardContainer)
        break;

        case "% alc abv --- abv prop":
          console.log(this.testArray);
          this.testArray.sort((a, b) => a.abv - b.abv);
          console.log(this.testArray.sort((a, b) => a.abv - b.abv));
          this.resetContainers();
          Render.main(this.testArray, this.cardContainer)
        break;

        case "first_brewed":
          console.log(this.testArray);
          this.testArray.sort((a, b) => a.first_brewed - b.first_brewed);
          console.log(this.testArray.sort((a, b) => a.first_brewed.localeCompare(b.first_brewed)));
          this.resetContainers();
          Render.main(this.testArray, this.cardContainer)
        break;

        case "bitternes --- ibu prop":
          console.log(this.testArray);
          this.testArray.sort((a, b) => a.ibu - b.ibu);
          console.log(this.testArray.sort((a, b) => a.ibu - b.ibu));
          this.resetContainers();
          Render.main(this.testArray, this.cardContainer)
        break;
      
        default:
          break;
      }
    }
  };

  //the idea is to catch the last page from the url, but I couldnt get it to work
  lastPage()
  {
    //just for the method not to be empty :)
    this.notification.innerHTML = `<div class='alert-danger'>This is the Last page.</div>`;
  };

  registerEvents()
  {
    // debugger;
    console.log(`Event fired: ${this.currentPage}`);

    this.pagesPerPage.addEventListener("click", (event) =>
    {
      this.getPageFromDropdownPage(event);
      this.mainBeers();
    });

    this.sort.addEventListener("click", (event) =>
    {
      this.getPageFromDropdownSort(event);
      // this.mainBeers();
    });

    this.random.addEventListener("click", () => this.randomBeer());

    //couldnt get it to work... on every click, the currentPage is 1, get changed +1 or -1 (depending on button clicked), and on another click, it gets back to 1....
    //https://25.media.tumblr.com/f5d59b55f3e201d8390db1faea32eafc/tumblr_mzv1ygEokZ1so2zfro1_500.gif
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
      this.moreDetailes(clickedElement);
    });

    this.searchBtn.addEventListener("click", async () =>
    {
      // debugger;
      this.searchBeer(this.searchText.value);
    });
  }
};