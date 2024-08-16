window.addEventListener("load", () =>    {
    let accounts = JSON.parse(localStorage.getItem("accounts"));
    //getSongSamples();
    //particularSong(665540);

    let activeAccount = JSON.parse(localStorage.getItem("activeAccount"));

    insertSongToHTML(activeAccount);
    logout(accounts, activeAccount);

    



    
    
})

function getSongSamples(){

    let searchInputElement = document.querySelector("#searchInput");
    console.log(searchInputElement);
    searchInputElement.addEventListener("keydown", (event) => {
        if(event.key == "Enter"){
            callAPI(event.target.value);
        }
    });

    async function callAPI(searchQuery){
        try{
            let url =  `https://freesound.org/apiv2/search/text/?query=${searchQuery}`;
            let apiHeader = {
                method: "GET",
                
                headers: {
                    Authorization: "Token AJU6BYIOVzeAYlZGs5558TKdKNde9WKqSQTataCh"
                }
            }
            let response = await fetch(url, apiHeader);
            let data = await response.json();
            console.log(data.results);
            localStorage.setItem("testData", JSON.stringify(data.results.slice(0, 2)));

        } 
        catch(error){
            console.log(error);
        }
    }
}

function particularSong(songID){
    let data = JSON.parse(localStorage.getItem("testData"));
    
    console.log(data);
    for(song of data){
        console.log(song);
    }

    async function getSong(songID){

        let url =  `https://freesound.org/apiv2/sounds/${songID}/`;
        let apiHeader = {
            method: "GET",
            
            headers: {
                Authorization: "Token AJU6BYIOVzeAYlZGs5558TKdKNde9WKqSQTataCh"
            }
        }

        let response = await fetch(url, apiHeader);
        let song = await response.json();
        console.log(song);
        localStorage.setItem("testSong", JSON.stringify(song));
    }

    console.log("The song");    
    getSong(songID);
}

function insertSongToHTML(activeAccount) {
    
    let main = document.querySelector("main");

    let song = JSON.parse(localStorage.getItem("testSong"));


    let songContainer = document.createElement("section");
    songContainer.classList.add("songContainer");
    
    let image = document.createElement("img");
    image.src = song["images"]["waveform_m"];
    let h2 = document.createElement("h2");

    let playButton = document.createElement("a");
    playButton.classList.add("songButtons", "playButton");
    let favoriteButton = document.createElement("a");
    favoriteButton.classList.add("songButtons");
    favoriteButton.addEventListener("click", (event) => {
        console.log(event);

        favoriteButtonState(activeAccount, song, event.target, true);
    })
    
    
    songContainer.appendChild(image);
    songContainer.appendChild(h2);
    songContainer.appendChild(playButton);
    songContainer.appendChild(favoriteButton);
    
    main.appendChild(songContainer);

    favoriteButtonState(activeAccount, song, favoriteButton, false);
    
}

function favoriteButtonState(activeAccount, song, favoriteButton, clicked) {
    debugger;
    let favoriteSongIDs = activeAccount["favoriteSongIDs"];
    let isFavorite = false;
    let favoriteIndex;
    let songID = song["id"];

    for(let i = 0; i<favoriteSongIDs.length; i++){
        if(favoriteSongIDs[i] == songID){
            isFavorite = true;
            favoriteIndex = i;
        }
    }
    
    
    if(clicked){
        if(isFavorite){
            favoriteSongIDs = favoriteSongIDs.splice(favoriteIndex, 1);
            isFavorite = false;
        }else{
            favoriteSongIDs.push(songID);
            isFavorite = true;
        }
        activeAccount["favoriteSongIDs"] = favoriteSongIDs;
        localStorage.setItem("activeAccount", JSON.stringify(activeAccount));
    }

    if(isFavorite){
        favoriteButton.classList.add("isFavorite");
        favoriteButton.classList.remove("isNotFavorite");
    }else{
        favoriteButton.classList.add("isNotFavorite");
        favoriteButton.classList.remove("isFavorite");
    }
    
}

function logout(accounts, activeAccount){
    let logoutLink = document.querySelector("#logoutLink");
    logoutLink.addEventListener("click", () => {
        accounts.push(activeAccount);
        localStorage.setItem("accounts", JSON.stringify(accounts));
        localStorage.removeItem("activeAccount");
        location.href = "login.html";
    })
}

