window.addEventListener("load", () => {
    console.log("register.js");
    let form = document.querySelector("form");
    
    console.log(form);
    let info = document.querySelector("#info");

    form.addEventListener("submit", (event) => {
        //Show info
        info.style.display = "block";

        event.preventDefault();

        console.log(event);
        try {
            
            let username = event.target.username.value;
            let password = event.target.password.value;
            let confirmPassword = event.target.confirmPassword.value;
            
            if(username.length < 4){
                throw new Error("Username must be at least 4 characters!");
            }
            //Get accounts from localstorage. Returns null if it doesn't exist.
            let accounts = JSON.parse(localStorage.getItem("accounts"));

            
            if(password != confirmPassword) {
                throw new Error("Passwords do not match!");
            }


            let newAccount = {
                "username": username,
                "password": password,
                "favoriteSongIDs": []
            };

            
            /*Add the account to accounts if username not taken.
            Create new array if accounts is empty.*/
            if(accounts) {
                let allUsernames = [];
        
                accounts.forEach((account) => {
                    allUsernames.push(account["username"]);
                });
        
                if(allUsernames.includes(username)){
                    throw new Error("Username already exists!");
                }

                accounts.push(newAccount);
            }else{
                accounts = [newAccount];
            }
            
            localStorage.setItem("accounts", JSON.stringify(accounts));
            
            info.textContent = "Account successfully created.";
            info.style.color = "green";
        }catch(errorMessage){
            info.textContent = errorMessage;
            info.style.color = "red";
        }
        
    })
    
});

