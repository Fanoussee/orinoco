let produitsSelectionnes = localStorage;
let panier = document.getElementById("list-panier");
let totalPrix = 0;
let products = [];

//Insertion du titre de la page
let titrePanier = document.createElement("h2");
titrePanier.innerHTML = "Panier ";
titrePanier.setAttribute("id", "titrePanier");
panier.appendChild(titrePanier);

if (produitsSelectionnes.length == 0) {
    let panierVide = document.createElement("h3");
    panierVide.innerHTML = "Le panier est vide !";
    panier.appendChild(panierVide);
} else {
    let tailleProdSelect = produitsSelectionnes.length / 5;
    for (let index = 0; index < tailleProdSelect; index++) {
        products.push(produitsSelectionnes.getItem("id" + index));
        creerProduit(index);
    }
    totalArticles();
    creerFormulaire();
    boiteBoutons();
    console.log(products);
}

//Création d'une boîte qui contiendra un produit
function creerProduit(index) {
    let boiteProduit = document.createElement("div");
    boiteProduit.setAttribute("class", "boiteProduit");
    boiteProduit.appendChild(photoProduit(index));
    boiteProduit.appendChild(nomProduit(index));
    boiteProduit.appendChild(couleurProduit(index));
    boiteProduit.appendChild(prixProduit(index));
    panier.appendChild(boiteProduit);
}

function photoProduit(index) {
    let photo = document.createElement("img");
    photo.setAttribute("height", "100px");
    photo.setAttribute("src", produitsSelectionnes.getItem("photo" + index));
    return photo;
}

function nomProduit(index) {
    let nom = document.createElement("h3");
    nom.setAttribute("class", "nomProduit");
    nom.innerHTML = produitsSelectionnes.getItem("nom" + index);
    return nom;
}

function couleurProduit(index) {
    let couleur = document.createElement("p");
    couleur.setAttribute("class", "couleurProduit");
    couleur.innerHTML = "<strong>Personnalisation :</strong> "
        + produitsSelectionnes.getItem("couleur" + index);
    return couleur;
}

function prixProduit(index) {
    let prix = document.createElement("p");
    prix.setAttribute("class", "prixProduit");
    let prixEuros = produitsSelectionnes.getItem("prix" + index) / 100;
    prix.innerHTML = "" + produitsSelectionnes.getItem("prix" + index) / 100 + " €";
    totalPrix += prixEuros;
    return prix;
}

function totalArticles() {
    let boxTotal = document.createElement("div");
    boxTotal.setAttribute("id", "totalPrix");
    let total = document.createElement("p");
    total.innerHTML = "Montant total : " + totalPrix + " €";
    boxTotal.appendChild(total);
    panier.appendChild(boxTotal);
}

function creerFormulaire(){
    let form = document.createElement("form");
    form.appendChild(creerNoms());
    form.appendChild(creerAdresse());
    form.appendChild(creerEmail());
    form.appendChild(creerLegende());
    panier.appendChild(form);

}

function creerNoms(){
    let noms = document.createElement("div");
    noms.appendChild(creerNom());
    noms.appendChild(creerPrenom());
    return noms;
}

function creerNom(){
    let nom = document.createElement("p");
    let labelNom = document.createElement("label");
    labelNom.setAttribute("for", "nom");
    labelNom.innerHTML = "Nom" + "<strong>*</strong>";
    let saisieNom = document.createElement("input");
    saisieNom.setAttribute("autofocus", "true");
    saisieNom.setAttribute("required", "true");
    saisieNom.setAttribute("type", "text");
    saisieNom.setAttribute("name", "nom");
    saisieNom.setAttribute("minlength", "3");
    nom.appendChild(labelNom);
    nom.appendChild(saisieNom);
    return nom;
}

function creerPrenom(){
    let prenom = document.createElement("p");
    let labelPrenom = document.createElement("label");
    labelPrenom.setAttribute("for", "prenom");
    labelPrenom.innerHTML = "Prénom" + "<strong>*</strong>";
    let saisiePrenom = document.createElement("input");
    saisiePrenom.setAttribute("required", "true");
    saisiePrenom.setAttribute("type", "text");
    saisiePrenom.setAttribute("name", "prenom");
    saisiePrenom.setAttribute("minlength", "3");
    prenom.appendChild(labelPrenom);
    prenom.appendChild(saisiePrenom);
    return prenom;
}

function creerAdresse(){
    let adresse = document.createElement("div");
    adresse.appendChild(creerRue());
    adresse.appendChild(creerVille());
    return adresse;
}

function creerRue(){
    let rue = document.createElement("p");
    let labelRue = document.createElement("label");
    labelRue.setAttribute("for", "adresse");
    labelRue.innerHTML = "Adresse" + "<strong>*</strong";
    let saisieRue = document.createElement("input");
    saisieRue.setAttribute("required", "true");
    saisieRue.setAttribute("type", "text");
    saisieRue.setAttribute("name", "adresse");
    saisieRue.setAttribute("minlength", "3");
    rue.appendChild(labelRue);
    rue.appendChild(saisieRue);
    return rue;
}

function creerVille(){
    let ville = document.createElement("p");
    let labelVille = document.createElement("label");
    labelVille.setAttribute("for", "ville");
    labelVille.innerHTML = "Ville" + "<strong>*</strong>";
    let saisieVille = document.createElement("input");
    saisieVille.setAttribute("required", "true");
    saisieVille.setAttribute("type", "text");
    saisieVille.setAttribute("name", "ville");
    saisieVille.setAttribute("minlength", "3");
    ville.appendChild(labelVille);
    ville.appendChild(saisieVille);
    return ville;
}

function creerEmail(){
    let boiteEmail = document.createElement("div");
    let email = document.createElement("p");
    let labelEmail = document.createElement("label");
    labelEmail.setAttribute("for", "email");
    labelEmail.innerHTML = "Adresse Email" + "<strong>*</strong>";
    let saisieEmail = document.createElement("input");
    saisieEmail.setAttribute("required", "true");
    saisieEmail.setAttribute("type", "email");
    saisieEmail.setAttribute("name", "email");
    email.appendChild(labelEmail);
    email.appendChild(saisieEmail);
    boiteEmail.appendChild(email);
    return boiteEmail;
}

function creerLegende(){
    let legende = document.createElement("p");
    legende.setAttribute("id", "legende");
    legende.innerHTML = "<strong>*</strong> : Champs obligatoires.";
    return legende;
}

function boiteBoutons() {
    let boxBtn = document.createElement("div");
    boxBtn.setAttribute("id", "boxBtn");
    boxBtn.appendChild(viderPanier());
    boxBtn.appendChild(validerCommande());
    panier.appendChild(boxBtn);
}

function viderPanier() {
    let btnVider = document.createElement("button");
    btnVider.setAttribute("class", "bouton");
    btnVider.setAttribute("type", "button");
    btnVider.setAttribute("OnClick", "window.location='basket.html'");
    btnVider.innerHTML = "Vider le panier";
    btnVider.addEventListener("click", function () {
        localStorage.clear();
    });
    return btnVider;
}

function validerCommande() {
    let btnCommande = document.createElement("button");
    btnCommande.setAttribute("class", "bouton");
    btnCommande.setAttribute("type", "button");
    btnCommande.setAttribute("OnClick", "window.location='ordered.html'");
    btnCommande.innerHTML = "Valider la commande";
    return btnCommande;
}