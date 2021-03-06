//Ce fichier javascript est exclusivement réservé à la page d'accueil
let titreSite = document.getElementById("titreSite");
titreSite.innerHTML = "Ori" + type_produit;

//Variable qui récupère le contenant de la liste des produits
let listProducts = document.getElementById("list-Products");

//Variable récupérant la promesse de la requête d'accès à l'API
let getApi = accesApi("get", api, null);
getApi.then(
    function (result) {
        let tailleResult = result.length;
        let nombreLignes = 1;
        for (let index = 0; index < result.length; index++) {
            if(tailleResult - nbProduitParLigne > 0){
                nombreLignes += 1;
                tailleResult -= nbProduitParLigne;
            }
        }
        creerBlocProduits(nombreLignes, result);
    }).catch(
        function (erreur) {
            let alerte = document.createElement("h2");
            alerte.innerHTML = erreur;
            listProducts.appendChild(alerte);
        });

//Variable qui exprime le nombre de produits par ligne
//En fonction de la taille de la fenêtre du navigateur
//Pour 1275px nbProduitParLigne 2
let nbProduitParLigne = 3;
if(window.innerWidth < 1350){
    nbProduitParLigne = 2;
    if(window.innerWidth < 900){
        nbProduitParLigne = 1;
    }
}

//Liste des fonctions utilisées 

//Cette fonction permet de rassembler les produits par groupe de 3
//Pour une meilleure visibilité à l'écran
function creerBlocProduits(nombre, result){
    let indexProduit = 0;
    for(let index=0; index < nombre; index++){
        let box = document.createElement("div");
        box.setAttribute("class", "groupeProduits");
        for(let indexDeux = 0 ; indexDeux < nbProduitParLigne ; indexDeux++){
            if(indexProduit < result.length){
                box.appendChild(creerUnProduit(result[indexProduit]));
                indexProduit += 1;
            }
        }
        listProducts.appendChild(box);
    }
    //console.log(window.innerWidth);
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
    return boxProduit;
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