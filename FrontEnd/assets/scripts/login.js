        // Page de code qui correspond au processus de login //

//Fonction de login contenant les conditions de validation du formulaire//        
async function loginUser() {
    const form = document.querySelector("form");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const emailPattern = /^[a-zA-Z\d.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
        console.log(email, password);

        if (!email.match(emailPattern)) {
            alert("Le format de l'e-mail est incorrect. Veuillez entrer une adresse e-mail valide.");
            return;
        }
        
        if (password.trim() === "") {
            alert("Veuillez entrer un mot de passe.");
            return;
        }
        
        const user = {
            email: email,
            password: password
        };
        // requête fetch méthode POST //
        try {
            const response = await fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });
            
            const data = await response.json();
            let token = data.token;
            localStorage.setItem("Token", token);
            console.log(data, token);
        
            if (data.userId === 1) {
                window.location.href = "../index.html";
            } else {
                alert("Utilisateur inconnu")
            }

        } catch (error) {
            console.error("Une erreur s'est produite :", error);
        }
    });
}

loginUser();

let token = localStorage.getItem("Token");
const modeEdition = document.querySelector(".mode-edition");
const boutonModifier = document.querySelectorAll(".bouton-modifier");
const sectionFiltres = document.querySelector(".filtres");
const login = document.querySelector(".login__lien");

//redirection de l'utilisateur et admin logout//

if (token) {
  modeEdition.style.display = "flex";
  boutonModifier.forEach(button => button.style.display = "flex");
  sectionFiltres.style.display = "none";

  login.innerText = "logout";
  login.addEventListener("click", () => {
      localStorage.removeItem("Token")
      window.location.href = "login.html"
  })
}
