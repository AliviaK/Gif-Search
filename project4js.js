// Method to run when window loads. Connects buttons to functions
const init = () => {
    const searchButton = document.querySelector("#searchButton");
    searchButton.addEventListener("click", searchGifs);
    const refreshButton = document.querySelector("#refreshButton");
    refreshButton.addEventListener("click", clearResults);
}

// Method to clear .gifs from page
const clearResults = () => {
    const imagesNode = document.querySelector("#imagesDiv");
    imagesNode.innerHTML = "";
    document.querySelector("#searchField").value = "";
}

// Method to load gifs from Giphy api
const searchGifs = async () => {
    const searchedInput = document.querySelector("#searchField").value;
    const API_KEY = "YDQzwgaMeKdpGLmZ4P10r00Pf9sbRQj6";
    const siteUrl = `http://api.giphy.com/v1/gifs/search?q=${searchedInput}&api_key=${API_KEY}&limit=10`;

    let gifPromise = fetch(siteUrl)
    .catch((error => {
        console.error(error);
    }));
    gifPromise.then(results => {
        let jsonResults = results.json();
        return jsonResults;
    }).then(jsonResults => {
        let divNode = document.querySelector("#imagesDiv");
        const gifUrls = jsonResults.data.map(gif => {
            let img = document.createElement("img");
            img.setAttribute("class", "p-2");
            img.setAttribute("src", gif.images.original.url);
            divNode.appendChild(img);
            document.body.appendChild(divNode);
        });
    }).catch((error => {
        console.error(error);
    }));
}

// When page loads, run init method to initialize page
window.onload = init;
