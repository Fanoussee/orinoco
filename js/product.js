let url = new URL(window.location.href);
let id = url.searchParams.get("id");
let productSolo = document.getElementById("product-solo");
let produit = "";

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
        
function produitEnCours(){
    localStorage.setItem("id", produit.id);
    localStorage.setItem("name", produit.name);
    localStorage.setItem("photo", produit.photo);
    localStorage.setItem("couleur", produit.couleur);
    localStorage.setItem("prix", produit.prix);
}

function ajouterAuPanier() {
    selectionCouleur();
    let bouton = document.getElementById("boutonPanier");
    bouton.setAttribute("onclick", "window.location.href='../html/basket.html'");
    bouton.addEventListener("click", function () {
        produitEnCours();
    });
}

function selectionCouleur(){
    let select = document.getElementById("couleur");
    select.addEventListener("click", function () {
        produitEnCours.couleur = document.getElementById("couleur").value;
    });
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
    let resume = document.createElement("p");
    resume.setAttribute("id", "resume");
    resume.innerHTML = produit.description;
    return resume;
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
    let boutonPanier = document.createElement("button");
    boutonPanier.setAttribute("id", "boutonPanier");
    boutonPanier.setAttribute("type", "button");
    boutonPanier.innerHTML = "Ajouter au panier";
    boiteBouton.appendChild(boutonPanier);
    return boiteBouton;
}

