const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

// show loading
function laoding() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
function complete() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}
// get quotes from API

async function getQuote() {
  // loader function if api fail
  laoding();
  const apiUrl = "https://type.fit/api/quotes";

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    let random = Math.floor(Math.random() * data.length);
    // if author is blank, add 'unknown'
    if (data[random].author == false) {
      authorText.innerText = "Unknown";
    } else {
      authorText.innerText = data[random].author;
    }
    // reduce font size for long quote
    if (data[random].text.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    authorText.innerText = data[random].author;
    quoteText.innerText = data[random].text;
  } catch (error) {
    getQuote();
    console.log("Whoops, no quote", error);
  }
  complete();
}

// next quote
function nextQuote() {
  getQuote();
}

newQuoteBtn.addEventListener("click", nextQuote);

// for twitter post
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

twitterBtn.addEventListener("click", tweetQuote);

// on Load
getQuote();
