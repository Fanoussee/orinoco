let listProducts = document.getElementById("list-Products");

let accesApiTeddies = accesApi("get", "http://localhost:3000/api/teddies", null);
accesApiTeddies.then(
    function (result) {
        listProducts.appendChild(creerTeddies());
        for (let index = 0; index < result.length; index++) {
            creerUnProduit(result[index]);
        }
    }).catch(
        function (erreur) {
            console.log(erreur);
        });

function creerTeddies() {
    let teddies = document.createElement("div");
    teddies.setAttribute("class", "produitEnListe");
    return teddies;
}

function creerUnProduit(product) {
    //Création d'une boîte Produit contenant le produit et la boîte du prix
    let boxProduit = document.createElement("div");
    boxProduit.setAttribute("class", "boxProduit");
    //Création du produit
    let produit = document.createElement("a");
    produit.setAttribute("href", "../html/product.html" + "?id=" + product._id);
    produit.setAttribute("class", "product");
    produit.appendChild(photoProduit(product));
    produit.appendChild(nomProduit(product));
    produit.appendChild(resumeProduit(product));
    //Ajout de la boîte du prix à la boîte Produit
    boxProduit.appendChild(boxPrice(product));
    //Ajout du produit à la boîte Produit
    boxProduit.appendChild(produit);
    //Ajout de la boîte Produit à la liste des produits
    listProducts.appendChild(boxProduit);
}

function photoProduit(product) {
    let boxPhoto = document.createElement("p");
    boxPhoto.setAttribute("class", "boiteImages");
    let photo = document.createElement("img");
    photo.setAttribute("src", product.imageUrl);
    photo.setAttribute("class", "images");
    boxPhoto.appendChild(photo);
    return boxPhoto;
}

function nomProduit(product) {
    let boxName = document.createElement("p");
    boxName.setAttribute("class", "nomProduit");
    boxName.innerHTML = product.name;
    return boxName;
}

function resumeProduit(product) {
    let resume = document.createElement("p");
    resume.setAttribute("class", "resumeProduits");
    resume.innerHTML = product.description;
    return resume;
}

function boxPrice(product) {
    let boxPrice = document.createElement("p");
    boxPrice.setAttribute("class", "boxPrice");
    boxPrice.appendChild(prixProduit(product));
    return boxPrice;
}

function prixProduit(product) {
    let price = document.createElement("p");
    price.setAttribute("class", "prixProduits");
    price.innerHTML = product.price / 100 + "€";
    return price;
}