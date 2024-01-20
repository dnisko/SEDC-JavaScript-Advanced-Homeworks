// Exercise 1
/*
Make 3 functions:

    Function that takes a number through a parameter and returns how many digits that number has
    Function that takes a number through a parameter and returns if its even or odd
    Function that takes a number through a parameter and returns if its positive or negative

Create a function that takes a number through a parameter and calls all three functions for the number that was passed. It should show the results in the console.
Ex:

Code: getNumberStats(-25); Console: 2 Digits, Odd, Negative
*/

let getNumberStats = (number) =>
{
    let digits = getDigits(number);
    let oddEven = getOddOrEven(number);
    let negativePositive = getNegativeOrPositive(number);

    return `The number is ${number}. It has ${digits} digits, it is ${oddEven} and it is ${negativePositive}.` 
};

let getDigits = (number) =>
{
    return number.toString().length;
};

let getOddOrEven = (number) =>
{
    if(number % 2 === 0)
    {
        return `Even`;
    }
    else
    {
        return `Odd`;
    }
};

let getNegativeOrPositive = (number) =>
{
    if(number < 0)
    {
        return `Negative`;
    }
    else
    {
        return `Positive`;
    }
};

let number = getNumberStats(25);
console.log(number);


// Exercise 2
/*
Create 2 variables with arrow functions.

    1. First arrow function will accept two parameters, one for element and one for color. The function should change the given element text color with the color given from the second color parameter. If no parameter is passed for color, the default value is black.
    2. Second arrow function will accept two parameters, one for element and one for textSize. The function should change the given element text size to the number given from the second textSize parameter. If no parameter is passed for textSize, the default value is 24.

Create an HTML document with two inputs, a button and an h1 header with some text. The first input should be for text size and the second for color. When the button is clicked the h1 header should change according to the input values ( change size as the first input value and color as the second input value ). Use the functions that we declared earlier and use arrow function for the event listener of the button.
Ex:

**Input1: ** Person enters 28 **Input2: ** Person enters red **Result: ** The h1 text should change to size 28 and color red
*/

// document.getElementById("ex2H1").style.fontSize
let ex2Btn = document.getElementById("ex2Btn");

let changeColor = (element, color = "black") =>
{
    element.style.color = color;
    // console.log(element);
    // console.log(color);
};

//don't know why the default parametar doesn't work...
let changeFontSize = (element, size = "24px") =>
{
    // console.log(parseInt(size));
    element.style.fontSize = size;
    // console.log(size);
    // console.log(element.style.fontSize);
};

ex2Btn.addEventListener("click", () =>
{
    let element = document.getElementById("ex2H1");
    let color = document.getElementById("ex2Color").value;
    let fontSize = document.getElementById("ex2FontSize").value;
    console.log(color);
    console.log(fontSize);
    changeColor(element, color);
    changeFontSize(element, fontSize + "px");
});


// Exercise 3
/*
Write an anonymous function that takes an array as a parameter and returns the square of each element.

*Hint: square = number * number or number on power 2.
*/

let numberArray = [2, 3, 5, 1, 6];
let squareNumberArray = function(array)
{
    let squaredArry = [];
    for(const element in array)
    {
        squaredArry.push(array[element] * array[element]);
    }
    return squaredArry;
};

console.log(squareNumberArray(numberArray));


// Exercise 4
/*
Write a self-invoked function that calculates the factorial of a given number and logs it to the console. BONUS: Provide the input from the HTML, and print the result in the HTML.

*Hint: refer the examples from the class code.
*/

let ex4Number = document.getElementById("ex4Number");
let ex4H1 = document.getElementById("ex4H1");

ex4Number.addEventListener("change", () =>
{
    ((num) =>
    {
        ex4H1.innerText = `The factoriel of ${num} is:\u00A0`
        if (num === 0)
        {
            ex4H1.innerText += `1`;
        }
        else if(num < 0)
        {
            ex4H1.innerText = `Cannot calculate factorial from negative number.`
        }
        else
        {
            let factorial = 1;
            for(let i = 1; i <= num; i++)
            {
                factorial *= i;
            }
            ex4H1.innerText += factorial;
        }
    })(ex4Number.value);
});


// Exercise 5
/*
Write an arrow function that takes a string and returns a new string with each word reversed. Example: 'hello from qinshift academy' ==> 'olleh morf tfihdniq ymedaca' *You don't have to handle uppercase and lowercase, make the example all lowercase BONUS: Provide the input from the HTML, and print the result in the HTML.
*/

let ex5Btn = document.getElementById("ex5Btn");

let reverseString = (string) =>
{
    let split = string.toLowerCase().split(" ");
    let reversed = [];
    for(let i = 0; i < split.length; i++)
    {
        // console.log(split[i]);
        let word = split[i] + " ";
        // console.log(word);
        for(let j = word.length - 1; j >= 0; j--)
        {
            // console.log(word[j]);
            reversed.push(word[j]);
        }
    }
    console.log(reversed);
    return reversed.join("");
};

ex5Btn.addEventListener("click", () =>
{
    let ex5Text = document.getElementById("ex5Text").value;
    let ex5H1 = document.getElementById("ex5H1");
    // reverseString(ex5Text);
    ex5H1.innerText = reverseString(ex5Text);

});


// Exercise 6
/*
Create an anonymous function that takes a given array and returns the product of all positive numbers. Test array: let array = [-10, 5, 7894, NaN, 'Hello world', Infinity, false, [Object, Object], 25, name => Hello ${name}, -Infinity, ['hi', 28, -93, true], { name: 'Bob', age: 23, }, undefined, 14, null, 159, 0, -11];

*Hints:

    Iterate over each element of the array
    Find a way to check if each element is number
    Check if the number is a positive number and if true, store it in a filtered array with all positive numbers
    Multiply all positive numbers
*/

let exercise6Array = [-10, 5, 7894, NaN, 'Hello world', Infinity, false, [Object, Object ], 25, name => `Hello ${name}`, -Infinity, ['hi', 28, -93, true], { name: 'Bob', age: 23, }, undefined, 14, null, 159, 0, -11];

let product = function(array)
{
    array = JSON.stringify(array);
    // console.log(array);

    let cleanedArray = [];

    //RegEx for charachters: '[' ']' ',' ':' '{' '}' - this is if the 23 in 'age: 23' have to be taken
    cleanedArray = array.split(/\[|\]|,|:|{|}/);
    let multiply = 1;
    for(const element in cleanedArray)
    {
        let parse = parseInt(cleanedArray[element]);
        // console.log(parse);
        
        if(!isNaN(parse) && parse > 0)
        {
            // console.log(parse);
            multiply *= parse
        }
    }

    // console.log(testArray);
    // console.log(array);
    // console.log(multiply);
    return multiply;
};

let multiplication = product(exercise6Array);
console.log(multiplication);


// Exercise 7
/*
Create an arrow function that takes a string and returns the number (count) of vowels contained within it. (Use anonymous functions/Arrow functions for the implementation) BONUS: Provide the input from the HTML, and print the result in the HTML.

    Hint: vowels: a, e, i, o, u
*/

let ex7Btn = document.getElementById("ex7Btn");

let getString = (string) =>
{
    let count = 0;
    for(const char in string)
    {
        count += findVowels(string[char]);
    }
    return `The count of the vowels in the string: \"${string}\" is: \n${count}`;
};

let findVowels = function(text)
{
    let count = 0;
    if(text === "a"
    || text === "e"
    || text === "i"
    || text === "o"
    || text === "u")
    {
        count += 1;
        console.log(text);
    }

    return count;
};

let printToHTML = (element) =>
{
    let ex7Text = document.getElementById("ex7Text").value;
    element.innerText = getString(ex7Text);
}
ex7Btn.addEventListener("click", () =>
{
    let ex7H1 = document.getElementById("ex7H1");
    // getString(ex7Text);
    printToHTML(ex7H1)
});