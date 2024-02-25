class ApiService {
  constructor() {
    this.baseUrl = "https://api.punkapi.com/v2/beers";
    // this.currentPage = currentPage,
    // this.pageSize = pageSize;
  }

  async fetchBeer(currentPage, pageSize)
  {
    // url = `${url}?page=${currentPage}&per_page=${pageSize}`;
    const response = await fetch(`${this.baseUrl}?page=${currentPage}&per_page=${pageSize}`);
    if (!response.ok)
    {
      throw new Error(`HTTP ERROR. Status: ${response.status}`);
    }

    const data = await response.json();
    // console.log(data);
    return data;
  }

  async getRandomBeer()
  {
    // Math.floor(Math.random() * 325) + 1;
    const response = await fetch(`${this.baseUrl}/random`);
    const data = await response.json();
    return data;
  }

  async getOneBeer(id)
  {
    // debugger;
    // Math.floor(Math.random() * 325) + 1;
    const response = await fetch(`${this.baseUrl}/${id}`);
    const data = await response.json();
    return data;
  }

  async getBeersByName(name)
  {
    const response = await fetch(`${this.baseUrl}?beer_name=${name}`);
    console.log(response);
    const data = await response.json();
    return data;
  }
}

export { ApiService };
