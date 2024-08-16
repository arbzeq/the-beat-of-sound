window.addEventListener("load", () => {
    console.log("login.js");
    let form = document.querySelector("form");
    let info = document.querySelector("#info");


    form.addEventListener("submit", (event) => {
        
        info.style.display = "none";
        info.style.color = "green";

        event.preventDefault();

        try {
            
            let username = event.target.username.value;
            let password = event.target.password.value;
            console.log("password is ", password);
            
            if(username.length < 4){
                throw new Error("Invalid username.");
            }
            //Get accounts from localstorage. Returns null if it doesn't exist.
            let accounts = JSON.parse(localStorage.getItem("accounts"));

            //If the accounts object in localStorage is empty, create an empty one.
            if(!accounts){
                accounts = [];
            }
            
            let userAccount = null;
            let accountIndex = 0;
            for(let i = 0; i<accounts.length; i++) {
                let account =accounts[i];
                console.log(account);
                if(username == account["username"]){
                    userAccount = account;
                    accountIndex = i;
                }
            };

            if(userAccount){
                console.log("Useraccount", userAccount);
                if(password == userAccount["password"]){
                    localStorage.setItem("activeAccount", JSON.stringify(userAccount));
                    accounts.splice(accountIndex, 1);
                    localStorage.setItem("accounts", JSON.stringify(accounts));
            
                }else{
                    throw new Error("Wrong password.")
                }
            }else{
                throw new Error("Username does not exist.")
            }

            location.href = "music.html"
        }catch(errorMessage){
            console.log(errorMessage);
            info.textContent = errorMessage;
            info.style.color = "red";
        }

        info.style.display = "block";
        
    })
    
});

