// ---------------- MOVIES
let moviesSearch = document.getElementById("moviesSearch");
let btnSearch = document.getElementById("btnMovieSearch");

let arrayMovies = ["The Matrix", "Dune", "The Godfather", "The Dark Knight", "The Lord of the Rings: The Return of the King", "Pulp Fiction", "Forrest Gump", "Star Wars: Episode V - The Empire Strikes Back", "Goodfellas", "Saving Private Ryan", "Terminator 2: Judgment Day", "Back to the Future"];

btnSearch.addEventListener("click", function()
{
    console.log(moviesSearch.value.toLowerCase());

    let movieResult = document.getElementById("movieResult");

    for(let i = 0; i < arrayMovies.length; i++)
    {
        //better search - search if entered text is anywhere in the array (like like (%))
        //cons:
        //many titles with "the" word can be fond;
        //titles with same words etc..
        if(arrayMovies[i].toLowerCase().includes(moviesSearch.value.toLowerCase()))
        {
            console.log("THIS");
            movieResult.style.color = "green";
            movieResult.innerText = "The movie can be rented"
            break;
        }
        else
        {
            console.log("THIS THIS");
            movieResult.style.color = "red";
            movieResult.innerText = "The movie can't be rented"
        }

        //searches for exact title
        // if(moviesSearch.value.toLowerCase() === arrayMovies[i].toLowerCase())
        // {
        //     console.log("Found");
        // }
    }
});
// ---------------- END MOVIES



// ---------------- REMINDER
let reminderForm = document.getElementById("reminderForm");
let btnShowReminders = document.getElementById("btnShowReminders");
let allReminders = document.getElementById("allReminders");

let reminderArray = [];
function Reminder (title, priority, color, description)
{
    this.title = title,
    this.priority = priority,
    this.color = color,
    this.description = description
};

reminderForm.addEventListener("submit", function()
{
    let title = reminderForm.elements[0].value;
    let priority = reminderForm.elements[1].value;
    let color = reminderForm.elements[2].value;
    let description = reminderForm.elements[3].value;

    let reminder = new Reminder(title, priority, color, description);
    reminderArray.push(reminder);

    console.log(reminderArray);
    event.preventDefault();

});

btnShowReminders.addEventListener("click", function()
{
    allReminders.innerHTML = "";
    let buildTable = `
    <tr>
        <td>
            Reminder Title
        </td>
        <td>
            Reminder Priority
        </td>
        <td>
            Reminder Description
        </td>
    </tr>`;
    for(let i = 0; i < reminderArray.length; i++)
    {
        buildTable += `
        <tr>
            <td style="color: ${reminderArray[i].color}">
                ${reminderArray[i].title}
            </td>
            <td>
                ${reminderArray[i].priority}
            </td>
            <td>
                ${reminderArray[i].description}
            </td>
        </tr>`;
    }
    allReminders.innerHTML = `<table border=1;>${buildTable}</table>`;
});
// ---------------- END REMINDER



// ---------------- STAR WARS
let btnSW = document.getElementById("btnSW");

btnSW.addEventListener("click", function()
{
    fetch("https://swapi.dev/api/people/1")
    .then(function (response)
    {
        return response.json();
    })
    .then(function (response)
    {

        console.log("call successful");
        console.log(response);

        let element = document.getElementById("SW-result");
        element.innerHTML = "";
        let buildTable = `
        <tr>
            <td>
                Height
            </td>
            <td>
                Weight
            </td>
            <td>
                Eye color
            </td>
            <td>
                Hair color
            </td>
        </tr>`;
        buildTable += `
        <tr>
            <td>
                ${response.height}
            </td>
            <td>
                ${response.mass}
            </td>
            <td>
                ${response.eye_color}
            </td>
            <td>
                ${response.hair_color}
            </td>
        </tr>`;

        element.innerHTML += `<h1>${response.name}</h1>
        <table>${buildTable}</table>`;
    })
    .catch(function(response)
    {
        console.log("The request has failed: " + response.status);
        console.log(response.responseText);
    });
});
// ---------------- END STAR WARS