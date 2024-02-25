export class Render
{
    // loader logic
    static main(beer, element)
    {
        beer.forEach((beer) =>
        {
            element.innerHTML += 
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
    }

    static one(beer, element)
    {
        console.log(beer);
        beer.forEach((beer) =>
        {
            element.innerHTML += 
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
}
