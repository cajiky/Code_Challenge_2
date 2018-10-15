console.log('client.js sourced');
let freshJoke;
$( document ).ready( onReady );

class Joke{
    constructor(whoseJoke,jokeQuestion,punchLine){
        this.whoseJoke = whoseJoke;
        this.jokeQuestion = jokeQuestion;
        this.punchLine = punchLine;
    }
}

function onReady() {
    console.log('DOM ready');
    getJokes();
    $('#addJokeButton').on('click', addNewJoke);
}

//function to append all the jokes to DOM
function appendToDOM(array){
    let el = $('#outputDiv');
    el.empty();
    for(let joke of array){
        el.append(`
        <p>${joke.whoseJoke} sent in: ${joke.jokeQuestion}. -----PUNCHLINE: ${joke.punchLine}</p>
        `)
    }
}

//function to talk to the server to grab the items from the jokes array
function getJokes(){
    $.ajax({
        method: 'GET',
        url: '/joke'
    }).then(function(response){
        let jokeArray = response;
        console.log('Our response:',jokeArray);
        appendToDOM(jokeArray);
    }).catch(function (error){
        console.log(error);
    })
}

//function to get data into the joke class
function getDataIntoNewJoke(){
    console.log('JokeButtonPUshed')
    let whoseJoke = $('#whoseJokeIn').val();
    let jokeQuestion = $('#questionIn').val();
    let punchLine = $('#punchLineIn').val();

    freshJoke = new Joke(whoseJoke,jokeQuestion,punchLine);
}

//function to send new joke off to server for storage
function addNewJoke(){
    getDataIntoNewJoke();
    $.ajax({
        method: 'POST',
        url:'/joke',
        data: freshJoke
    }).then(function(response){
        console.log(response);
        getJokes();
    }).catch(function (error){
        console.log(error);
    })
}