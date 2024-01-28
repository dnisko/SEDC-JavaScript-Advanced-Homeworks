let url1 = "https://raw.githubusercontent.com/sedc-codecademy/skwd9-04-ajs/main/Samples/students_v2.json";
let url2 = "https://dummyjson.com/products";
let url3 = "https://dummyjson.com/recipes"

function exerciseApi(url)
{
    fetch(url)
    .then((response) => response.json())
    .then((result) => 
    {
        console.log(result);    
        //EXERCISE 1
        /*
        //1
        const averageGradeHigherThan3 = result.filter(student => student.averageGrade > 3);
        console.log(averageGradeHigherThan3);

        //2
        const femaleStudentsNames = result.filter(student => student.gender.toLowerCase() === "female" && student.averageGrade === 5);
        console.log(femaleStudentsNames);
        let mappedfemaleStudentsNames = femaleStudentsNames.map(student => student.firstName);
        console.log(mappedfemaleStudentsNames);

        //3
        const maleStudentsFromSkopje = result.filter(student => student.gender.toLowerCase() === "male" && student.city.toLowerCase() === "skopje" && student.age > 18);
        console.log(maleStudentsFromSkopje);
        const filteredmaleStudentsFromSkopje = maleStudentsFromSkopje.map(student => `${student.lastName} ${student.firstName}`);
        console.log(filteredmaleStudentsFromSkopje);

        //4
        const averageGradesOfFemaleOver24 = result.filter(student => student.gender.toLowerCase() === "male" && student.age > 24);
        const filteredaverageGradesOfFemaleOver24 = averageGradesOfFemaleOver24.map(student => `${student.firstName} ${student.averageGrade}`);
        console.log(filteredaverageGradesOfFemaleOver24);

        //5
        const maleStartingWithB = result.filter(student => student.firstName.toLowerCase().startsWith("b") && student.averageGrade > 2);
        console.log(maleStartingWithB);

        //6
        const femaleEmailAge20and30 = result.filter(student => student.gender.toLowerCase() === "female" && student.age > 20 && student.age < 30);
        console.log(femaleEmailAge20and30);
        const emailsOfFemaleEmailAge20and30 = femaleEmailAge20and30.map(student => student.email);
        let sorded = emailsOfFemaleEmailAge20and30.sort((a, b) => a.localeCompare(b));
        console.log(sorded);

        //7
        const studentNamesAvbove40 = result.filter(student => student.age > 40).map(student => `${student.firstName} ${student.lastName}`);
        console.log(studentNamesAvbove40.sort((a, b) => a.localeCompare(b)));

        //8
        const countOfStudentsUsingGoogle = result.filter(student => student.email.includes("google")).length;
        console.log(countOfStudentsUsingGoogle);

        //9
        const averageAgeOfFemaleInSkopje = result.filter(student => student.gender.toLowerCase() === "female" && student.city.toLowerCase() === "skopje");
        const averageAge = averageAgeOfFemaleInSkopje.reduce((acc, student) => acc + student.age, 0) / averageAgeOfFemaleInSkopje.length;
        console.log(averageAge);
        */
        
        //EXERCISE 2
        /* 
        // 1
        const laptopsInStock = result.products.filter(p => p.stock > 0 && p.brand.toLowerCase() === "apple");
        console.log(laptopsInStock.sort((p, b) => b.price - p.price));

        //2
        const firstGroceryItem = result.products.filter(p => p.category === "groceries");
        console.log(firstGroceryItem[0]);

        //3
        const indexOfFirstSamsung = result.products.findIndex(p => p.brand.toLowerCase() === "samsung");
        console.log(indexOfFirstSamsung);

        //4
        const findSony = result.products.some(p => p.brand.toLowerCase() === "sony");
        console.log(findSony);

        //5
        const highestRatedSkincare = result.products.filter(p => p.category.toLowerCase() === "skincare").map(p => `${p.rating} ${p.title}`);
        console.log(highestRatedSkincare);
        const sortedByRating = highestRatedSkincare.sort((a, b) => b.localeCompare(a));
        console.log(sortedByRating[0]);

        //6
        const ratingAbove4ipol = result.products.filter(p => p.rating >= 4.5); //ipol :)
        const averageDiscountOfratingAbove4ipol = ratingAbove4ipol.reduce((acc, p) => acc + p.discountPercentage, 0) / ratingAbove4ipol.length;
        console.log(averageDiscountOfratingAbove4ipol);

        //7
        const highestPrice = Math.max(...result.products.map(p => p.price));
        console.log(highestPrice);

        //8
        const allIphones = result.products.filter(p => p.title.toLowerCase().includes("iphone"));
        console.log(allIphones);
        const averagePriceOfAllIphones = allIphones.reduce((acc, p) => acc + p.price, 0) / allIphones.length;
        console.log(averagePriceOfAllIphones);

        //9
        const lowestPrice = Math.min(...result.products.map(p => p.price));
        console.log(lowestPrice);
        */


        //EXERCISE 3
        /* 
        //1
        //const allDesert = result.recipes.filter(p => p.mealType.toLowerCase().includes("dessert")); // doesn't work... says '.toLowerCase() is not a function' ?!?
        //edit: because it returns array of Objects... 
        const allDesert = result.recipes.filter(p => p.mealType.includes("Dessert")); //
        console.log(allDesert);

        //2
        const allNamesWithAbove30Review = result.recipes.filter(p => p.reviewCount >=30);
        const nameOfAllNamesWithAbove30Review = allNamesWithAbove30Review.map(p => `${p.name} ${p.reviewCount}`);
        console.log(nameOfAllNamesWithAbove30Review);

        //3
        const allThatUseCinnamon = result.recipes.filter(p => p.ingredients.includes("Cinnamon"));
        console.log(allThatUseCinnamon);

        //4
        const allServedForLunchAndDinner = result.recipes.filter(p => p.mealType.includes("Lunch") && p.mealType.includes("Dinner"));
        console.log(allServedForLunchAndDinner);

        //5
        const ingredientsForDish = result.recipes.filter(p => p.name.toLowerCase() === "mango salsa chicken").map(p => p.ingredients);
        console.log(ingredientsForDish);

        //6
        const americanCuisine = result.recipes.filter(p => p.cuisine.toLowerCase() === "american");
        const averageOfCaloriesForAmericanCuisine = americanCuisine.reduce((acc, p) => acc + p.caloriesPerServing, 0) / americanCuisine.length;
        console.log(averageOfCaloriesForAmericanCuisine);

        //7
        const allPasta = result.recipes.filter(p => p.name.toLowerCase().includes("pasta"));
        const averageCookingTimeForAllPasta = allPasta.reduce((acc, p) => acc + p.cookTimeMinutes, 0) / allPasta.length;
        console.log(averageCookingTimeForAllPasta);

        //8
        const recepieWithLowestReviews = Math.min(...result.recipes.map(p => p.reviewCount));
        console.log(recepieWithLowestReviews);
        */
    });
};

//ex1
// exerciseApi(url1);
/*
{
    "id":1,
    "firstName":"Frasquito",
    "lastName":"Koop",
    "email":"fkoop0@ow.ly",
    "gender":"Male",
    "city":"Benzilan",
    "averageGrade":4,
    "age":33
}
*/

//ex2
//exerciseApi(url2);
/*
id	1
title	"iPhone 9"
description	"An apple mobile which is nothing like apple"
price	549
discountPercentage	12.96
rating	4.69
stock	94
brand	"Apple"
category	"smartphones"
thumbnail	"https://cdn.dummyjson.com/product-images/1/thumbnail.jpg"
images	
0	"https://cdn.dummyjson.com/product-images/1/1.jpg"
1	"https://cdn.dummyjson.com/product-images/1/2.jpg"
2	"https://cdn.dummyjson.com/product-images/1/3.jpg"
3	"https://cdn.dummyjson.com/product-images/1/4.jpg"
4	"https://cdn.dummyjson.com/product-images/1/thumbnail.jpg"
*/

//ex3
// exerciseApi(url3);
/* 
id	1
name	"Classic Margherita Pizza"
ingredients	
0	"Pizza dough"
1	"Tomato sauce"
2	"Fresh mozzarella cheese"
3	"Fresh basil leaves"
4	"Olive oil"
5	"Salt and pepper to taste"
instructions	
0	"Preheat the oven to 475°F (245°C)."
1	"Roll out the pizza dough and spread tomato sauce evenly."
2	"Top with slices of fresh mozzarella and fresh basil leaves."
3	"Drizzle with olive oil and season with salt and pepper."
4	"Bake in the preheated oven for 12-15 minutes or until the crust is golden brown."
5	"Slice and serve hot."
prepTimeMinutes	20
cookTimeMinutes	15
servings	4
difficulty	"Easy"
cuisine	"Italian"
caloriesPerServing	300
tags	
0	"Pizza"
1	"Italian"
userId	45
image	"https://cdn.dummyjson.com/recipe-images/1.webp"
rating	4.6
reviewCount	3
mealType	
0	"Dinner"
*/