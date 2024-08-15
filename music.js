window.addEventListener("load", () =>    {

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

    
    let searchInputElement = document.querySelector("#searchInput");
    console.log(searchInputElement);
    searchInputElement.addEventListener("keydown", (event) => {
        if(event.key == "Enter"){
            callAPI(event.target.value);
        }
    });
    

})