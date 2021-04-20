// assigning variables
const copyBtn = document.querySelector("#copyBtn");
const quoteBox = document.querySelector(".quote");
const authorBox = document.querySelector(".author");
const nextQuoteBtn = document.querySelector("#nextQuote");


// text content
copyBtn.innerHTML = "<i class='fas fa-copy'></i> Copy Quote";
nextQuoteBtn.textContent = "New Quote";
quoteBox.textContent = "It always seems impossible until it's done...";
authorBox.textContent = "by  Nelson Mandela";


// inner height of devices
const deviceheight = () => {
    const height = window.innerHeight;
    if(height < 500){
        quoteBox.innerHTML = "Please rotate your device then click on New Quote Button.";
        authorBox.innerHTML = "Please rotate your deveice then click on New Quote Button.";
        nextQuoteBtn.style.display = "none";
    }else{
        nextQuoteBtn.style.display = "block";
    }
}


// generating quotes
const generateQuote = async () => {
    const api = "https://type.fit/api/quotes";
    quoteBox.textContent = "Loading...";
    authorBox.textContent = "Loading...";
    const randomNum = Math.floor(Math.random() * 1643);// 1643 numbers of quotes...

    try {
        const data = await fetch(api);
        const jsonData = await data.json();
        const quote = jsonData[randomNum].text;
        const author = jsonData[randomNum].author;
        author == null 
                ? authorBox.innerHTML = "by unKnown" 
                : authorBox.innerHTML  = `by ${author}`;
        quoteBox.innerHTML = quote;
    } catch (error) {
        console.log(error);
        quoteBox.textContent = "Check Your Internet Connection.";
        authorBox.textContent  = "Check Your Internet Connection.";
    }
}

// copying quotes
const copyQuote = () => {
    const copiedQuote = quoteBox.innerHTML;
    const copiedAuthor = authorBox.innerHTML;
    
    navigator.clipboard.writeText(`${copiedQuote} ${copiedAuthor}`);
    copyBtn.innerHTML ="&#10003;  Copied";
    quoteBox.style.color = "#000";
    authorBox.style.color = '#000';
    setTimeout(() => {
        copyBtn.innerHTML = "<i class='fas fa-copy'></i> Copy Quote";
        quoteBox.style.color = "#fff";
        authorBox.style.color = "#fff";
    }, 1000);
}


// calling the generate quote and copy quote functions
nextQuoteBtn.addEventListener("click", generateQuote);
copyBtn.addEventListener("click", copyQuote);

setInterval(() => {
    deviceheight();
}, 800);
