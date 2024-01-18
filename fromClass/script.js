//Student constructor function
function Student (firstName, lastName, birthYear, academy, grades = [])
{
    this.firstName = firstName,
    this.lastName = lastName,
    this.birthYear = birthYear,
    this.academy = academy,
    this.grades = grades,

    this.getAge = function ()
    {
        // let date = new Date();
        return new Date().getFullYear() - birthYear; 
    },

    this.getInfo = function ()
    {
        return `This is student ${firstName} ${lastName} from the academy ${academy}!`;
    },

    this.getGradesAverage = function ()
    {
        let sum = 0;
        for(let i = 0; i < grades.length; i++)
        {
            sum += grades[i];
        }

        return sum / grades.length;
    }
}

let studentsArray = [];

let student1 = new Student ("Bob1", "Bobsky1", 1954, "coding", [5, 3, 5, 2, 6]);
let student2 = new Student ("Bob2", "Bobsky2", 1974, "accounting", [7, 1, 3, 5, 2, 5, 3]);
let student3 = new Student ("Bob3", "Bobsky3", 1984, "networking", [5, 7, 5, 2, 3]);

function printStudent(student)
{
    console.log(student.getAge());
    console.log(student.getInfo());
    console.log(student.getGradesAverage());   
}

printStudent(student1);
printStudent(student2);
printStudent(student3);



//List generator from an array
let namesArray = ["Bob", "Jason", "Rocky", "Richard", "Matt"];
let ex2Btn = document.getElementById("ex2Btn");
let ex2List = document.getElementById("ex2List");

ex2Btn.addEventListener("click", function()
{
    ex2List.innerHTML = "";
    for(let i = 0; i < namesArray.length; i++)
    {
        ex2List.innerHTML += `<li>${namesArray[i]}</li>`;
    }
});


//List Generator dynamically from inputs
let ex3Btn = document.getElementById("ex3Btn");
ex3Btn.addEventListener("click", function()
{
    // ex3List.innerHTML = "";
    let ex3Color = document.getElementById("ex3Color").value;
    let ex3FontSize = document.getElementById("ex3FontSize").value;
    let ex3Items = document.getElementById("ex3Items").value;
    let ex3List = document.getElementById("ex3List");

    let itemsArray = ex3Items.split(",");
    // console.log(itemsArray);
    let parsedFS = parseInt(ex3FontSize);
    if(!isNaN(parsedFS))
    {
        for(let item in itemsArray)
        {
            ex3List.innerHTML += `<li style="color:${ex3Color}; font-size:${parsedFS}px;">${itemsArray[item]}</li>`
        }
    }
    else
    {
        alert("Enter number for font size.")
    }
   
});



//Create a student registry page
let ex4Btn = document.getElementById("ex4Btn");
let database = [];

function Generator(firstName, lastName, age, email) 
{
    this.firstName = firstName,
    this.lastName = lastName,
    this.age = age,
    this.email = email
};

function addToConstructor()
{
    let ex4FirstName = document.getElementById("ex4FirstName").value;
    let ex4LastName = document.getElementById("ex4LastName").value;
    let ex4Age = document.getElementById("ex4Age").value;
    let ex4Email = document.getElementById("ex4Email").value;

    database.push(new Generator(ex4FirstName, ex4LastName, ex4Age, ex4Email));
};

function clearFields()
{
    document.getElementById("ex4FirstName").value = "";
    document.getElementById("ex4LastName").value = "";
    document.getElementById("ex4Age").value = "";
    document.getElementById("ex4Email").value = "";
}
ex4Btn.addEventListener("click", function()
{
    addToConstructor();
    console.log(database);
    clearFields();
});