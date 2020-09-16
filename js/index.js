//Ce fichier javascript est exclusivement réservé à la page d'accueil du site Oriteddies

//Variable qui récupère le contenant de la liste des produits
let listProducts = document.getElementById("list-Products");

//Variable récupérant la promesse de la requête d'accès à l'API teddies
let accesApiTeddies = accesApi("get", "http://localhost:3000/api/teddies", null);
accesApiTeddies.then(
    function (result) {
        for (let index = 0; index < result.length; index++) {
            creerUnProduit(result[index]);
        }
    }).catch(
        function (erreur) {
            let alerte = document.createElement("h2");
            alerte.innerHTML = erreur;
            listProducts.appendChild(alerte);
        });


//Liste des fonctions utilisées 

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