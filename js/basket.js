//Fichier javascript exclusivement réservé à la page Panier
let titreSite = document.getElementById("titreSite");
titreSite.innerHTML = "Ori" + type_produit;
//Variable récupérant la boîte html qui contiendra les instances du panier
let panier = document.getElementById("list-panier");
//Variable qui contient le prix total des produits sélectionnés
let totalPrix = 0;
//Tableau qui contient uniquement les id des produits sélectionnés
let products = [];
//Map qui contient les informations de contact saisies par l'utilisateur
let contact = new Map();
//Booléen qui confirme ou infirme la validité des données saisies par l'utilisateur
let donneesValides;

//Création du titre de la page
creerTitrePage();
//Vérification du panier
verifierPanier();

//Liste des fonctions utilisées

function creerTitrePage() {
    let titrePanier = document.createElement("h2");
    titrePanier.innerHTML = "Panier ";
    titrePanier.setAttribute("id", "titrePanier");
    panier.appendChild(titrePanier);
}

//Vérification du panier :
//S'il est vide affichage "Le panier est vide !" à la place du titre "Panier" précédemment créé
//Sinon création de la liste des produits sélectionnés
function verifierPanier() {
    if (localStorage.length == 0) {
        let panierVide = document.createElement("h3");
        panierVide.innerHTML = "Le panier est vide !";
        panier.appendChild(panierVide);
    } else {
        //La taille des produits sélectionnées est divisée par  car elle contient cinq informations :
        //L'id, le nom, la photo, la personnalisation et le prix
        let tailleProdSelect = localStorage.length / 5;
        for (let index = 0; index < tailleProdSelect; index++) {
            //Récupération de l'identifiant dans le tableau "products" pour pouvoir l'envoyer ensuite à la commande
            products.push(localStorage.getItem("id" + index));
            creerProduit(index);
        }
        totalArticles();
        creerFormulaire();
        boiteBoutons();
    }
}

//Création d'une boîte qui contiendra un produit
function creerProduit(index) {
    let boiteProduit = document.createElement("div");
    boiteProduit.setAttribute("class", "boiteProduit");
    boiteProduit.appendChild(photoProduit(index));
    boiteProduit.appendChild(nomProduit(index));
    boiteProduit.appendChild(persoProduit(index));
    boiteProduit.appendChild(prixProduit(index));
    panier.appendChild(boiteProduit);
}

function photoProduit(index) {
    let photo = document.createElement("img");
    photo.setAttribute("height", "100px");
    photo.setAttribute("src", localStorage.getItem("photo" + index));
    return photo;
}

function nomProduit(index) {
    let nom = document.createElement("h3");
    nom.setAttribute("class", "nomProduit");
    nom.innerHTML = localStorage.getItem("nom" + index);
    return nom;
}

function persoProduit(index) {
    let personnalisation = document.createElement("p");
    personnalisation.setAttribute("class", "persoProduit");
    personnalisation.innerHTML = "<strong>Personnalisation :</strong> "
        + localStorage.getItem("perso" + index);
    return personnalisation;
}

function prixProduit(index) {
    let prix = document.createElement("p");
    prix.setAttribute("class", "prixProduit");
    let prixEuros = localStorage.getItem("prix" + index) / 100;
    prix.innerHTML = "" + localStorage.getItem("prix" + index) / 100 + " €";
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

function creerFormulaire() {
    let form = document.createElement("form");
    form.appendChild(creerNoms());
    form.appendChild(creerAdresse());
    form.appendChild(creerEmail());
    form.appendChild(creerLegende());
    panier.appendChild(form);
}

function creerNoms() {
    let noms = document.createElement("div");
    noms.appendChild(creerNom());
    noms.appendChild(creerPrenom());
    return noms;
}

function creerNom() {
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
    saisieNom.setAttribute("id", "nom");
    nom.appendChild(labelNom);
    nom.appendChild(saisieNom);
    return nom;
}

function creerPrenom() {
    let prenom = document.createElement("p");
    let labelPrenom = document.createElement("label");
    labelPrenom.setAttribute("for", "prenom");
    labelPrenom.innerHTML = "Prénom" + "<strong>*</strong>";
    let saisiePrenom = document.createElement("input");
    saisiePrenom.setAttribute("required", "true");
    saisiePrenom.setAttribute("type", "text");
    saisiePrenom.setAttribute("name", "prenom");
    saisiePrenom.setAttribute("minlength", "3");
    saisiePrenom.setAttribute("id", "prenom");
    prenom.appendChild(labelPrenom);
    prenom.appendChild(saisiePrenom);
    return prenom;
}

function creerAdresse() {
    let adresse = document.createElement("div");
    adresse.appendChild(creerRue());
    adresse.appendChild(creerVille());
    return adresse;
}

function creerRue() {
    let rue = document.createElement("p");
    let labelRue = document.createElement("label");
    labelRue.setAttribute("for", "adresse");
    labelRue.innerHTML = "Adresse" + "<strong>*</strong";
    let saisieRue = document.createElement("input");
    saisieRue.setAttribute("required", "true");
    saisieRue.setAttribute("type", "adress");
    saisieRue.setAttribute("name", "adresse");
    saisieRue.setAttribute("minlength", "3");
    saisieRue.setAttribute("id", "adresse");
    rue.appendChild(labelRue);
    rue.appendChild(saisieRue);
    return rue;
}

function creerVille() {
    let ville = document.createElement("p");
    let labelVille = document.createElement("label");
    labelVille.setAttribute("for", "ville");
    labelVille.innerHTML = "Ville" + "<strong>*</strong>";
    let saisieVille = document.createElement("input");
    saisieVille.setAttribute("required", "true");
    saisieVille.setAttribute("type", "text");
    saisieVille.setAttribute("name", "ville");
    saisieVille.setAttribute("minlength", "3");
    saisieVille.setAttribute("id", "ville");
    ville.appendChild(labelVille);
    ville.appendChild(saisieVille);
    return ville;
}

function creerEmail() {
    let boiteEmail = document.createElement("div");
    let email = document.createElement("p");
    let labelEmail = document.createElement("label");
    labelEmail.setAttribute("for", "email");
    labelEmail.innerHTML = "Adresse Email" + "<strong>*</strong>";
    let saisieEmail = document.createElement("input");
    saisieEmail.setAttribute("required", "true");
    saisieEmail.setAttribute("type", "email");
    saisieEmail.setAttribute("name", "email");
    saisieEmail.setAttribute("id", "email");
    email.appendChild(labelEmail);
    email.appendChild(saisieEmail);
    boiteEmail.appendChild(email);
    return boiteEmail;
}

function creerLegende() {
    let legende = document.createElement("p");
    legende.setAttribute("id", "legende");
    legende.innerHTML = "<strong>*</strong> : Champs obligatoires.";
    return legende;
}

function boiteBoutons() {
    let boxBtn = document.createElement("div");
    boxBtn.setAttribute("id", "boxBtn");
    boxBtn.appendChild(viderPanier());
    verifDonnees();
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
        products = [];
        totalPrix = 0;
    });
    return btnVider;
}

//Si le panier est vide et que l'utilisateur clique sur le bouton valider commande
//Alors affichage d'une fenêtre d'alerte et rafraichissement de la page panier
//Si les données ont été correctement saisies par l'utilisateur
//Alors transformation du tableau Products et Contact en objet pour faciliter l'envoi en requête POST

function validerCommande() {
    let btnCommande = document.createElement("button");
    btnCommande.setAttribute("class", "bouton");
    btnCommande.setAttribute("type", "submit");
    btnCommande.innerHTML = "Valider la commande";
    btnCommande.setAttribute("OnClick", "./ordered.html");
    btnCommande.addEventListener("click", function () {
        if (localStorage.length == 0) {
            alert("Votre panier est vide ! ");
            window.location = "./basket.html";
        } else if (donneesValides) {
            let objet = {
                "contact": convertMapToObject(contact),
                "products": products
            };
            let reqPost = accesApi("post", api + "/order", objet);
            reqPost.then(function (result) {
                localStorage.clear();
                localStorage.setItem("prenom", result.contact.firstName);
                localStorage.setItem("nom", result.contact.lastName);
                localStorage.setItem("id", result.orderId);
                localStorage.setItem("totalPrix", totalPrix);
                window.location = "./ordered.html";
            }).catch(function (error) {
                alert(error);
            });
        } else {
            alert("Les données saisies sont invalides!");
            window.location = "./basket.html";
        }
    });
    return btnCommande;
}

function verifDonnees() {
    verifNom();
    verifPrenom();
    verifAdresse();
    verifVille();
    verifEmail();
}

function verifNom() {
    let nom = document.getElementById("nom");
    nom.addEventListener("change", function (event) {
        let saisie = event.target.value;
        let tailleSaisie = saisie.length;
        if (tailleSaisie >= 3) {
            donneesValides = true;
            contact.set("lastName", saisie);
        } else {
            donneesValides = false;
        }
    });
}

function verifPrenom() {
    let prenom = document.getElementById("prenom");
    prenom.addEventListener("change", function (event) {
        let saisie = event.target.value;
        let tailleSaisie = saisie.length;
        if (tailleSaisie >= 3) {
            contact.set("firstName", saisie);
        } else {
            donneesValides = false;
        }
    });
}

function verifAdresse() {
    let adresse = document.getElementById("adresse");
    adresse.addEventListener("change", function (event) {
        let saisie = event.target.value;
        let tailleSaisie = saisie.length;
        if (tailleSaisie >= 3) {
            contact.set("address", saisie);
        } else {
            donneesValides = false;
        }
    });
}

function verifVille() {
    let ville = document.getElementById("ville");
    ville.addEventListener("change", function (event) {
        let saisie = event.target.value;
        let tailleSaisie = saisie.length;
        if (tailleSaisie >= 3) {
            contact.set("city", saisie);
        } else {
            donneesValides = false;
        }
    });
}

function verifEmail() {
    let email = document.getElementById("email");
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    email.addEventListener("change", function (event) {
        let saisie = event.target.value;
        if (saisie.match(regex)) {
            contact.set("email", saisie);
        } else {
            donneesValides = false;
        }
    });
}