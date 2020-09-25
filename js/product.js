//Fichier javascript exclusivement réservé à la page Produit pour afficher un seul produit
let titreSite = document.getElementById("titreSite");
titreSite.innerHTML = "Ori" + type_produit;
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
//Variable qui contiendra la personnalisation sélectionnée par l'utilisateur
let persoSelection = "";

//Variable récupérant la promesse de la requête d'accès à l'API
let getApi = accesApi("get", api + "/" + id, null);
getApi.then(
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
    productSolo.appendChild(persoProduit());
    productSolo.appendChild(boutonsPanier());
}

function persoProduit() {
    let persoProduit = document.createElement("div");
    persoProduit.setAttribute("id", "persoProduit");
    let titrePerso = document.createElement("p");
    titrePerso.innerHTML = "Personnalisation : ";
    persoProduit.appendChild(titrePerso);
    persoProduit.appendChild(listPersoProduit());
    return persoProduit;
}

function listPersoProduit() {
    let form = document.createElement("form");
    let select = document.createElement("select");
    select.setAttribute("id", "listPersoProduit");
    
    let listeChoix = "";
    if (type_produit == "teddies") {
        listeChoix = produit.colors;
    } else if (type_produit == "cameras") {
        listeChoix = produit.lenses;
    } else if (type_produit == "furniture") {
        listeChoix = produit.varnish;
    }

    for (let index = 0; index < listeChoix.length; index++) {
        let option = document.createElement("option");
        option.setAttribute("class", "options");
        option.innerHTML = listeChoix[index];
        option.setAttribute("value", listeChoix[index]);
        select.appendChild(option);
    }
    form.appendChild(select);
    return form;
}

function selectPerso() {
    let select = document.getElementById("listPersoProduit");
    persoSelection = select.value;
    console.log(persoSelection);
    select.addEventListener("click", function () {
        persoSelection = select.value;
    });
}


function ajouterAuPanier() {
    let bouton = document.getElementById("boutonPanier");
    bouton.addEventListener("click", function () {
        selectPerso();
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

function boutonsPanier() {
    let boiteBoutons = document.createElement("div");
    boiteBoutons.setAttribute("id", "bouton");
    boiteBoutons.appendChild(btnVoirPanier());
    boiteBoutons.appendChild(btnAjouterPanier());
    return boiteBoutons;
}

function btnVoirPanier() {
    let btnVoirPanier = document.createElement("button");
    btnVoirPanier.setAttribute("type", "button");
    btnVoirPanier.innerHTML = "Voir le panier";
    btnVoirPanier.setAttribute("OnClick", "window.location='basket.html'");
    return btnVoirPanier;
}

function btnAjouterPanier() {
    let btnAjouterPanier = document.createElement("button");
    btnAjouterPanier.setAttribute("id", "boutonPanier");
    btnAjouterPanier.setAttribute("type", "button");
    btnAjouterPanier.innerHTML = "Ajouter au panier";
    return btnAjouterPanier;
}

function produitEnCours() {
    if (localStock.length == 0) {
        localStock.setItem("id" + 0, produit._id);
        localStock.setItem("photo" + 0, produit.imageUrl);
        localStock.setItem("nom" + 0, produit.name);
        localStock.setItem("perso" + 0, persoSelection);
        localStock.setItem("prix" + 0, produit.price);
    } else {
        let compteur = (localStock.length) / 5;
        localStock.setItem("id" + compteur, produit._id);
        localStock.setItem("photo" + compteur, produit.imageUrl);
        localStock.setItem("nom" + compteur, produit.name);
        localStock.setItem("perso" + compteur, persoSelection);
        localStock.setItem("prix" + compteur, produit.price);
    }
}