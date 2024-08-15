window.addEventListener("load", () =>    {

    async function callAPI(){

        try{
            let url = "https://freesound.org/apiv2/search/text/";
            let apiHeader = {
                method: "GET",
                headers: {
                    Authorization: "Token AJU6BYIOVzeAYlZGs5558TKdKNde9WKqSQTataCh",
                    query: "piano"
                }
            }

        
            let data = await response.json();
            console.log(data);
        } 
        catch(error){
            console.log(error);
        }
        
        

        

    }

    callAPI();
})