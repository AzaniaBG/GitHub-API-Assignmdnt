'use strict'

//define a variable in which the base url will be stored
const baseURL = `https://api.github.com/search/users`;
//function takes one argument, an object, which is formatted to comply w/ API requirements
function formatQueryParameters(params) {
    let queryItems = Object.keys(params).map(key => `${key}=${params[key]}`);
console.log(`queryItems is ${queryItems}`);
    return queryItems.join("+");
}

//function takes one argument and makes request to API based on argument passed through
function getUserHandle(search) {
//define an object that contains the required parameters; set the value equal to the user's input
    let params = {
        q: search,
    }
    let queryString = formatQueryParameters(params);
    let url = baseURL + "?" + queryString;
console.log(`url is ${url}`);
    fetch(url).then(response => {
        if(response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
        }).then(responseJson => displayResults(responseJson)).catch(err => {
            $("#js-error-message").text(`Oopsie poopsie! ${err.message}`);
            $("#error-message").removeClass("hidden");
console.log(`err is ${err.message}`);
        });
};
//function displays responses to page 
function displayResults(responseJson) {
    $("#results").empty;
    for(let i = 0; i < responseJson.items.length; i++) {
        let userItems = responseJson.items[i].login;
        let userRepos = responseJson.items[i].repos_url;
        $("#js-user-results").append(`<li>${userItems}: <a href="${userRepos}">${userRepos}</a></li><br>`)
console.log(`userItems is ${userItems}`);
console.log(`userRepos is ${userRepos}`);     
    }
    $("#results").removeClass("hidden");
};
//function watches for input submitted on form
function watchForm() {
//listen for the `submit` event and capture the user's input
$("form").submit(event => {
    event.preventDefault();
    let searchTerm = $("#input-value").val();
console.log(`searchTerm is ${searchTerm}`)
//pass input value as argument to function getUserHandle
    getUserHandle(searchTerm);
    })

}

$(watchForm);