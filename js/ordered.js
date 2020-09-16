//Fichier javascript exclusivement réservé à la page de la validation de la commande du site Oriteddies

//Variable qui récupère l'url de la page ordered.html avec le résultat comme paramètre
let url = new URL(window.location.href);

//Variables récupérant le prénom et le nom de l'utilisateur
let prenom = url.searchParams.get("prenom");
let nom = url.searchParams.get("nom");

//Variable récupérant le prix total de la commande
let total = url.searchParams.get("total");

//Variable récupérant l'identifiant de la commande
let id = url.searchParams.get("id");

//Variable récupérant la boîte html pour afficher le résultat de la commande
let validationCommande = document.getElementById("validationCommande");

//Titre remerciant l'utilisateur pour sa commande
let titreMerci = document.createElement("h2");
titreMerci.setAttribute("id", "titreMerci");
titreMerci.innerHTML = "Merci " + prenom + " " + nom + " pour votre commande.";
validationCommande.appendChild(titreMerci);

//Paragraphe indiquant le montant de la commande
let montantCommande = document.createElement("p");
montantCommande.setAttribute("id", "montantCommande");
montantCommande.innerHTML = "Montant de la commande : " + total + "€";
validationCommande.appendChild(montantCommande);

//Paragraphe indiquant le numéro de la commande
let numeroCommande = document.createElement("p");
numeroCommande.setAttribute("id", "numeroCommande");
numeroCommande.innerHTML = "Commande n°" + id;
validationCommande.appendChild(numeroCommande);

//Suppression des données contenues dans le localStorage
//Le panier est vide
localStorage.clear();