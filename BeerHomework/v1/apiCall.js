//per_page=${choose}
//https://api.punkapi.com/v2/beers?page=2&per_page=80

// let url = "https://api.punkapi.com/v2/beers";

export async function fetchBeer(url, currentPage, pageSize) {
    // url = `${url}?page=${currentPage}&per_page=${pageSize}`;
    url = `${url}${currentPage}${pageSize}`;
    console.log(url);
    let response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(`HTTP ERROR. Status: ${response.status}`);
    }

    let data = await response.json();
    // console.log(data);
    return data;
}

// let beer = fetchBeer(url, 1, 10);
// console.log(beer);
const getLastPageNumber = (url) =>
{
    //page number is always at the same index (in this api :))
    let lastPage = url.charAt(url.indexOf("?page=") + 6);
    return lastPage;
};

// console.log(getLastPageNumber(url));

/*
function is_required(name)
{
    throw new Error(`Argument, \`${name}\`, is required.`);
}
let objects = [];
//https://observablehq.com/@xari/paginated_fetch
function paginated_fetch
(
    url = is_required("url"), // Improvised required argument in JS
    page = 1,
    previousResponse = []
)
{
    return fetch(`${url}?page=${page}`) // Append the page number to the base URL
    .then(response => response.json())
    .then(newResponse =>
        {
            const response = [...previousResponse, ...newResponse]; // Combine the two arrays
            if (newResponse.length !== 0)
            {
                page++;
                return paginated_fetch(url, page, response);
            }
            objects = response;
            console.log(objects);
            console.log(objects[objects.length-1].id);
            return response;
        });
}

let testBeer = paginated_fetch(url);
console.log(testBeer);
*/

