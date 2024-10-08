/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (let game = 0; game < games.length; game++) {
        let current_game = games[game]
        // create a new div element, which will become the game card
        let divelement = document.createElement('div')
        
        // add the class game-card to the list
        divelement.classList.add('game-card')

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TITLE
        let title = document.createElement('h2')
        title.innerHTML = current_game.name
        divelement.appendChild(title)

        // DESCRIPTION
        let descr = document.createElement('p')
        descr.innerHTML = current_game.description
        divelement.appendChild(descr)

        // STATS
        let pledge = document.createElement('p')
        pledge.innerHTML = `Amount Pledge: \$${current_game.pledged}`
        divelement.appendChild(pledge)
        let curr_goal = document.createElement('p')
        curr_goal.innerHTML = `Goal: \$${current_game.goal}`
        divelement.appendChild(curr_goal)

        // IMAGE
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        let image = document.createElement('img')
        image.classList.add('game-image')
        image.src = current_game.img
        image.alt = current_game.name
        divelement.appendChild(image)

        // append the game to the games-container
        gamesContainer.appendChild(divelement)
    }
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON)

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributors = GAMES_JSON.reduce((total, currgame) => {
    return total += currgame.backers
}, 0)
// console.log(totalContributors)

// set the inner HTML using a template literal and toLocaleString to get a number with commas
const commaNum = totalContributors.toLocaleString('en-US')
contributionsCard.innerHTML = `${commaNum}`

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const raised = GAMES_JSON.reduce((total, currgame) => {
    return total += currgame.pledged
} ,0)
// set inner HTML using template literal
const raisedComma = raised.toLocaleString('en-US')
raisedCard.innerHTML = `\$${raisedComma}`

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = GAMES_JSON.length

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let unfunded = GAMES_JSON.filter((game) => {
        return game.pledged < game.goal
    })

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfunded)
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let funded = GAMES_JSON.filter((game) => {
        return game.pledged >= game.goal
    })

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(funded)
}
// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON)
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener('click', filterUnfundedOnly)
fundedBtn.addEventListener('click', filterFundedOnly)
allBtn.addEventListener('click', showAllGames)

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const num_unfunded = GAMES_JSON.reduce((count, game) => {
    return game.pledged < game.goal ? count += 1 : count
} ,0)
console.log(num_unfunded)

// create a string that explains the number of unfunded games using the ternary operator
const unfundedDisplay = `Hooray! A total of ${raisedComma} has been raised for ${GAMES_JSON.length - num_unfunded} ${GAMES_JSON.length - num_unfunded > 1 ? "games" : "game"}.
However, ${num_unfunded} ${num_unfunded > 1 ? "games" : "game"} remain unfunded. We need your help to bring these games to life!`

// create a new DOM element containing the template string and append it to the description container
let cta = document.createElement('p')
cta.innerHTML = unfundedDisplay
descriptionContainer.appendChild(cta)
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
let [first, second, ...others] = sortedGames
// console.log(first)
// console.log(second)

// create a new element to hold the name of the top pledge game, then append it to the correct element
let firstTitle = document.createElement('h3')
let secondTitle = document.createElement('h3')
firstTitle.innerHTML = first.name
secondTitle.innerHTML = second.name
firstGameContainer.appendChild(firstTitle)
secondGameContainer.appendChild(secondTitle)

// do the same for the runner up item