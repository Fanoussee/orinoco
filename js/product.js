let url = new URL(window.location.href);
let id = url.searchParams.get("id");
let productSolo = document.getElementById("product-solo");
let produit = "";
let localStock = localStorage;
console.log("localStock sur la page Produit");
console.log(localStock);
let colorSelect = "";

function accesApi(type, url, envoi) {
    type = type.toUpperCase();
    let erreur = "Erreur de requête !";
    if (type == "GET" || type == "POST") {
        return new Promise(function (resolve, reject) {
            let request = new XMLHttpRequest();
            let statut = true;
            request.onreadystatechange = function () {
                if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                    resolve(JSON.parse(this.response));
                } else {
                    statut = false;
                }
            };
            if (!(statut)) {
                reject(erreur);
            }
            request.open(type, url);
            request.send(envoi);
        });
    } else {
        statut = false;
        console.error("Erreur de type de requête. Choisir entre GET et POST.");
    }
}

let accesApiTeddies = accesApi("get", "http://localhost:3000/api/teddies/" + id, null);
accesApiTeddies.then(
    function (result) {
        produit = result;
        creerFicheProduit();
        ajouterAuPanier();
    }).catch(
        function (erreur) {
            console.log(erreur);
        });

function produitEnCours() {
    if(localStock.length == 0){
        localStock.setItem("photo"+0, produit.imageUrl);
        localStock.setItem("nom"+0, produit.name);
        localStock.setItem("couleur"+0, colorSelect);
        localStock.setItem("prix"+0, produit.price);
    }else{
        let compteur = localStock.length/4;
        localStock.setItem("photo"+compteur, produit.imageUrl);
        localStock.setItem("nom"+compteur, produit.name);
        localStock.setItem("couleur"+compteur, colorSelect);
        localStock.setItem("prix"+compteur, produit.price);
    }
}

function ajouterAuPanier() {
    let bouton = document.getElementById("boutonPanier");
    bouton.addEventListener("click", function () {
        selectionCouleur();
        produitEnCours();
        console.log("localStock après clic sur Ajout au panier");
        console.log(localStock);
    });
}

function selectionCouleur() {
    let select = document.getElementById("couleur");
    colorSelect = document.getElementById("couleur").value;
    select.addEventListener("click", function () {
        colorSelect = document.getElementById("couleur").value;
    });
    console.log(colorSelect);
}

function creerFicheProduit() {
    productSolo.appendChild(nomProduit());
    productSolo.appendChild(photoProduit());
    productSolo.appendChild(resumeProduit());
    productSolo.appendChild(prixProduit());
    productSolo.appendChild(choixCouleurs());
    productSolo.appendChild(boutonPanier());
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

function boutonPanier() {
    let boiteBouton = document.createElement("div");
    boiteBouton.setAttribute("id", "bouton");
    let btnVoirPanier = document.createElement("button");
    btnVoirPanier.setAttribute("type", "button");
    btnVoirPanier.innerHTML = "Voir le panier";
    btnVoirPanier.setAttribute("OnClick", "window.location='basket.html'");
    boiteBouton.appendChild(btnVoirPanier);
    let boutonPanier = document.createElement("button");
    boutonPanier.setAttribute("id", "boutonPanier");
    boutonPanier.setAttribute("type", "button");
    boutonPanier.innerHTML = "Ajouter au panier";
    boiteBouton.appendChild(boutonPanier);
    return boiteBouton;
}