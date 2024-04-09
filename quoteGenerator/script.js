const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const quoteAuthor = document.querySelector("#author");
const newQuoteBtn = document.querySelector("#new-quote");
let data = [];

newQuoteBtn.addEventListener("click", newQuote);
function newQuote() {
  const quotesNum = data[Math.trunc(Math.random() * data.length)];
  quoteText.textContent = quotesNum?.text;
  if(!quotesNum.author){
  quoteAuthor.textContent ='unknown';
  }
  quoteAuthor.textContent = quotesNum?.author.split(',').at(0);
}

// Function to fetch the API and generate
async function fetchQuotes() {
  try {
    const response = await fetch("https://type.fit/api/quotes");
    data = await response.json();
    console.log(data);
    newQuote();
  } catch (error) {
    console.error(error);
  }
}

fetchQuotes();


