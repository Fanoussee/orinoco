//Fichier javascript exclusivement réservé à la page de la validation de la commande du site Oriteddies

//Variables récupérant le prénom et le nom de l'utilisateur
let prenom = localStorage.getItem("prenom");
let nom = localStorage.getItem("nom");

//Variable récupérant le prix total de la commande
let total = localStorage.getItem("totalPrix");

//Variable récupérant l'identifiant de la commande
let id = localStorage.getItem("id");

//Variable récupérant la boîte html pour afficher le résultat de la commande
let validationCommande = document.getElementById("validationCommande");

//Vérifier si les données saisies ne sont pas nulles

let donneesValides ;

if(nom == null){
    donneesValides = false;
}else if(prenom == null){
    donneesValides = false;
}else if(id == null){
    donneesValides = false;
}else if(total == null){
    donneesValides = false;
}else{
    donneesValides = true;
}

if (localStorage.length == 0 || !(donneesValides)) {
    let aucuneCommande = document.createElement("h2");
    aucuneCommande.setAttribute("id", "aucuneCommande");
    aucuneCommande.innerHTML = "Aucune commande n'a été passée.";
    validationCommande.appendChild(aucuneCommande);
} else {
    validationCommande.appendChild(remerciement());
    validationCommande.appendChild(afficherMontantCommande());
    validationCommande.appendChild(afficherNumeroCommande());
    //Suppression des données contenues dans le localStorage
    //Le panier est vide
    localStorage.clear();
}

//Paragraphe de remerciement pour la commande passé par l'utilisateur
function remerciement(){
    let remerciement = document.createElement("p");
    remerciement.setAttribute("id", "remerciement");
    remerciement.innerHTML = "Merci " + prenom + " " + nom + " pour votre commande.";
    return remerciement;
}

//Paragraphe indiquant le montant de la commande
function afficherMontantCommande(){
    let montantCommande = document.createElement("p");
    montantCommande.setAttribute("id", "montantCommande");
    montantCommande.innerHTML = "Montant de la commande : " + total + "€";
    return montantCommande;
}

//Paragraphe indiquant le numéro de la commande
function afficherNumeroCommande(){
    let numeroCommande = document.createElement("p");
    numeroCommande.setAttribute("id", "numeroCommande");
    numeroCommande.innerHTML = "Commande n°" + id;
    return numeroCommande;
}