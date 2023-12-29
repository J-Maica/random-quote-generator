let guide = false;
let quotes = {
    content: "",
    author: ""
};

function getQuotes() {
    fetch("https://api.quotable.io/random")
        .then(res => res.json())
        .then(data => {
            quotes = {
                content: data.content,
                author: data.author
            };
            updateQuotes();
        })
        .catch(error => console.error("Error fetching quotes:", error));
}

function updateQuotes() {
    document.getElementById('quoteContent').innerText = `"${quotes.content}"`;
    document.getElementById('quoteAuthor').innerText = `- ${quotes.author}`;
}

function showGuide() {
    guide = true;
    updateGuide();
}

function hideGuide() {
    guide = false;
    updateGuide();
}

function updateGuide() {
    document.getElementById("guide").innerText = guide ? "Click to generate new Quote" : "";
}

document.getElementById('screenshotBtn').addEventListener('click', function () {
    // hide button for better capture
    document.getElementById('screenshotBtn').style.display = 'none';
    
    // Capture screenshot using html2canvas
    html2canvas(document.body).then(function (canvas) {
        // Create an "a" element to download the screenshot
        var link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'quote-screenshot.png';
        link.click();

        // delay button visibility
        setTimeout(() => {
            document.getElementById('screenshotBtn').style.display = 'block';
        }, 5000);
    });
});

document.addEventListener('DOMContentLoaded', getQuotes);
