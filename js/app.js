// Variables
const formulary = document.querySelector('#formulario');
const listTweets = document.querySelector('#lista-tweets');
let tweets = [];



// Events Listeners
eventListeners();
function eventListeners(){
    // When the user add a new tweet 
    formulary.addEventListener('submit',addTweet);

    // When the document is ready 
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        console.log(tweets);

        createHTML();
    });
};


// Functions 
function addTweet(e){
    e.preventDefault();

    // Textarea where the user reading
    const tweet = document.querySelector('#tweet').value;

    // Validation..
    if(tweet === ''){
        showError('A message can not go in blank');

        return; // prevent that is execute more lines of codes
    };

    const tweetObj = {
        id: Date.now(),
        tweet: tweet,       // tweet
    };

    // const tweetObj = {
    //     id: Date.now(),
    //     tweet,      
    // };

    // add to the array of tweets
    tweets = [...tweets, tweetObj];
    console.log(tweets);

    // After added we go to create the HTML 
    createHTML();

    // Restart the formulary
    formulary.reset();

};


// Show message of error
function showError(error){
    const messageError = document.createElement('p');
    messageError.textContent = error;
    messageError.classList.add('error');
    
    // Insert the content 
    const content = document.querySelector('#contenido');
    content.appendChild(messageError);

    // Eliminated the alert after of three seconds 
    setTimeout(() => {
        messageError.remove();
    }, 3000 );
};

// Show a list of the tweets
function createHTML(){
    cleanerHTML();
    if(tweets.length > 0){
        tweets.forEach( tweet => {

            // Add a button of eliminate
            const btnEliminate = document.createElement('a');
            btnEliminate.classList.add('borrar-tweet');
            btnEliminate.innerText = 'X';

            //Add the function of eliminate 

            btnEliminate.onclick = () => {
                eraseTweet(tweet.id);
            };

            // Create the HTML 

            const li = document.createElement('li');
            
            // Add the text
            li.innerText = tweet.tweet;

            // Assing the button 
            li.appendChild(btnEliminate);

            // Insert in the HTML
            listTweets.appendChild(li);
        });
    };
    
    synchronizeStorage();
};

// Add  the current tweets to LocalStorage

function synchronizeStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
};
// Eliminate a tweet 
function eraseTweet(id){
    tweets = tweets.filter(tweet => tweet.id !== id);
    createHTML();
};

// Cleaner the HTML
function cleanerHTML(){
    while(listTweets.firstChild){
        listTweets.removeChild(listTweets.firstChild);
    };
};



