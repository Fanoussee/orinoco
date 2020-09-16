//Fichier javascript exclusivement réservé à la page Produit pour un "teddy" du site Oriteddies

//Variable qui récupère l'url de la page product.html avec l'identifiant comme paramètre
let url = new URL(window.location.href);
//Variable récupérant l'identifiant du produit sélectionné
let id = url.searchParams.get("id");
//Variable récupérant la boîte html qui contiendra le produit sélectionné
let productSolo = document.getElementById("product-solo");
//Variable contenant toutes les informations du produit sélectionné
let produit = "";
//Variable récupérant les valeurs contenues dans le localStorage
//Le localStorage contient éventuellement les produits sélectionnés dans le panier
let localStock = localStorage;
//Variable qui contiendra la couleur sélectionnée par l'utilisateur
let colorSelect = "";

//Variable récupérant la promesse de la requête d'accès à l'API teddies
let accesApiTeddies = accesApi("get", "http://localhost:3000/api/teddies/" + id, null);
accesApiTeddies.then(
    function (result) {
        produit = result;
        creerFicheProduit();
        ajouterAuPanier();
    }).catch(
        function (erreur) {
            let alerte = document.createElement("h2");
            alerte.innerHTML = erreur;
            productSolo.appendChild(alerte);
        });

//Liste des fonctions utilisées

function creerFicheProduit() {
    productSolo.appendChild(nomProduit());
    productSolo.appendChild(photoProduit());
    productSolo.appendChild(resumeProduit());
    productSolo.appendChild(prixProduit());
    productSolo.appendChild(choixCouleurs());
    productSolo.appendChild(boutonsPanier());
}

function ajouterAuPanier() {
    let bouton = document.getElementById("boutonPanier");
    bouton.addEventListener("click", function () {
        selectionCouleur();
        produitEnCours();
    });
}

function nomProduit() {
    let boxName = document.createElement("h2");
    boxName.setAttribute("id", "titreProduit");
    boxName.innerHTML = produit.name;
    return boxName;
}

function photoProduit() {
    let boxPhoto = document.createElement("p");
    boxPhoto.setAttribute("id", "image");
    let photo = document.createElement("img");
    photo.setAttribute("src", produit.imageUrl);
    photo.setAttribute("height", "400px");
    boxPhoto.appendChild(photo);
    return boxPhoto;
}

function resumeProduit() {
    let descriptionProduit = document.createElement("div");
    descriptionProduit.setAttribute("id", "descriptionProduit");
    let resume = document.createElement("p");
    resume.setAttribute("id", "resume");
    resume.innerHTML = produit.description;
    descriptionProduit.appendChild(resume);
    return descriptionProduit;
}

function prixProduit() {
    let price = document.createElement("p");
    price.setAttribute("id", "prix");
    price.innerHTML = produit.price / 100 + "€";
    return price;
}

function choixCouleurs() {
    let choixCouleurs = document.createElement("div");
    choixCouleurs.setAttribute("id", "choixCouleurs");
    let couleursDispo = document.createElement("p");
    couleursDispo.innerHTML = "Couleurs disponibles : ";
    choixCouleurs.appendChild(couleursDispo);
    choixCouleurs.appendChild(couleursProduit());
    return choixCouleurs;
}

function couleursProduit() {
    let form = document.createElement("form");
    let select = document.createElement("select");
    select.setAttribute("id", "couleur");
    let couleurs = produit.colors;
    for (let index = 0; index < couleurs.length; index++) {
        let option = document.createElement("option");
        option.setAttribute("class", "options");
        option.innerHTML = couleurs[index];
        option.setAttribute("value", couleurs[index]);
        if (index == 0) {
            produitEnCours.couleur = couleurs[0];
        }
        select.appendChild(option);
    }
    form.appendChild(select);
    return form;
}

function boutonsPanier() {
    let boiteBoutons = document.createElement("div");
    boiteBoutons.setAttribute("id", "bouton");
    boiteBoutons.appendChild(btnVoirPanier());
    boiteBoutons.appendChild(btnAjouterPanier());
    return boiteBoutons;
}

function btnVoirPanier(){
    let btnVoirPanier = document.createElement("button");
    btnVoirPanier.setAttribute("type", "button");
    btnVoirPanier.innerHTML = "Voir le panier";
    btnVoirPanier.setAttribute("OnClick", "window.location='basket.html'");
    return btnVoirPanier;
}

function btnAjouterPanier(){
    let btnAjouterPanier = document.createElement("button");
    btnAjouterPanier.setAttribute("id", "boutonPanier");
    btnAjouterPanier.setAttribute("type", "button");
    btnAjouterPanier.innerHTML = "Ajouter au panier";
    return btnAjouterPanier;
}

function selectionCouleur() {
    let select = document.getElementById("couleur");
    colorSelect = document.getElementById("couleur").value;
    select.addEventListener("click", function () {
        colorSelect = document.getElementById("couleur").value;
    });
}

function produitEnCours() {
    if (localStock.length == 0) {
        localStock.setItem("id" + 0, produit._id);
        localStock.setItem("photo" + 0, produit.imageUrl);
        localStock.setItem("nom" + 0, produit.name);
        localStock.setItem("couleur" + 0, colorSelect);
        localStock.setItem("prix" + 0, produit.price);
    } else {
        let compteur = (localStock.length) / 5;
        localStock.setItem("id" + compteur, produit._id);
        localStock.setItem("photo" + compteur, produit.imageUrl);
        localStock.setItem("nom" + compteur, produit.name);
        localStock.setItem("couleur" + compteur, colorSelect);
        localStock.setItem("prix" + compteur, produit.price);
    }
}