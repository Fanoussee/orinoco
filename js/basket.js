let produitsSelectionnes = localStorage;
//localStorage.clear();
let panier = document.getElementById("list-panier");
let totalPrix =0;

//Insertion du titre de la page
let titrePanier = document.createElement("h2");
titrePanier.innerHTML = "Panier ";
titrePanier.setAttribute("id", "titrePanier");
panier.appendChild(titrePanier);

if(produitsSelectionnes.length == 0){
    let panierVide = document.createElement("h3");
    panierVide.innerHTML = "Le panier est vide !";
    panier.appendChild(panierVide);
}else{
    let tailleProdSelect = produitsSelectionnes.length/4;

    for(let index = 0 ; index < tailleProdSelect; index++){
        
        //Création d'une boîte qui contiendra un produit
        let boiteProduit = document.createElement("div");
        boiteProduit.setAttribute("class", "boiteProduit");
        panier.appendChild(boiteProduit);

        //Insertion de la photo du produit
        let photo = document.createElement("img");
        photo.setAttribute("height", "100px");
        photo.setAttribute("src", produitsSelectionnes.getItem("photo"+index));
        boiteProduit.appendChild(photo);

        //Insertion du nom du produit
        let nom = document.createElement("h3");
        nom.setAttribute("class", "nomProduit");
        nom.innerHTML = produitsSelectionnes.getItem("nom"+index);
        boiteProduit.appendChild(nom);

        //Insertion de la couleur du produit
        let couleur = document.createElement("p");
        couleur.setAttribute("class", "couleurProduit");
        couleur.innerHTML = "<strong>Personnalisation :</strong> " + produitsSelectionnes.getItem("couleur"+index);
        boiteProduit.appendChild(couleur);

        //Insertion du prix du produit sélectionné
        let prix = document.createElement("p");
        prix.setAttribute("class", "prixProduit");
        let prixEuros = produitsSelectionnes.getItem("prix"+index)/100;
        prix.innerHTML = "" + produitsSelectionnes.getItem("prix"+index)/100 + " €";
        boiteProduit.appendChild(prix);

        totalPrix += prixEuros;
    }

    //Boîte contenant le total des articles
    let boxTotal = document.createElement("div");
    boxTotal.setAttribute("id", "totalPrix");
    let total = document.createElement("p");
    total.innerHTML = "Montant total : " + totalPrix + " €";
    boxTotal.appendChild(total);
    panier.appendChild(boxTotal);

    //Boîte contenant le bouton pour valider la commande
    let boxBtnCommande = document.createElement("div");
    boxBtnCommande.setAttribute("id", "boxBtnCommande");
    let btnCommande = document.createElement("button");
    btnCommande.setAttribute("id", "btnCommande");
    btnCommande.setAttribute("type", "button");
    btnCommande.innerHTML = "Valider la commande";
    boxBtnCommande.appendChild(btnCommande);
    panier.appendChild(boxBtnCommande);
}