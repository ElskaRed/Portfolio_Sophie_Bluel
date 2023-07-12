fetch("http://localhost:5678/api/works",{
  headers: {"accept": "application/json", "Content-Type": "application/json"}
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
    data.forEach((item, index) => {
      const imageUrl = item.imageUrl;
      const description = item.title;

      const gallery = document.querySelector(".gallery");
      const figureElement = document.createElement("figure");
      gallery.appendChild(figureElement);

      const imgElement = document.createElement("img");
      imgElement.src = imageUrl;
      imgElement.alt = item.title;
      figureElement.appendChild(imgElement);

      const figcaptionElement = document.createElement("figcaption");
      figcaptionElement.textContent = item.title;
      figureElement.appendChild(figcaptionElement);
    });
  })
  .catch(error => {
    console.log("Une erreur s\'est produite:", error);
  });