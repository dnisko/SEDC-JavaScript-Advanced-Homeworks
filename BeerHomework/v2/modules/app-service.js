class ApiService {
  constructor() {
    this.baseUrl = "https://api.punkapi.com/v2/beers";
    // this.currentPage = currentPage,
    // this.pageSize = pageSize;
  }

  async fetchBeer(url, currentPage, pageSize)
  {
    // url = `${url}?page=${currentPage}&per_page=${pageSize}`;
    const response = await fetch(`${url}${currentPage}${pageSize}`);

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

  // async getBeerByPaging(pagesPerPage) {
  //   const response = await fetch(`${this.baseUrl}/region/${region}`);
  //   const data = await response.json();
  //   return data;
  // }

  async getMacedoniaNeighbours()
  {
    const response = await fetch(`${this.baseUrl}/all`);
    const data = await response.json();
    return data.filter((c) => c.borders?.includes("MKD"));
  }
}

export { ApiService };
