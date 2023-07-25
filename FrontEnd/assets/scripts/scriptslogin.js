document.getElementById("login__form").addEventListener("submit", function(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
      alert("Le format de l'e-mail est incorrect. Veuillez entrer une adresse e-mail valide.");
      return;
  }
  const formData = {
      email: email,
      password: password
  };

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
})
.then(response => response.json())
.then(data => {
    console.log(data);
})
.catch(error => {
    console.error("Une erreur s'est produite :", error);
});
});