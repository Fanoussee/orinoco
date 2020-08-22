let url = new URL(window.location.href);
let id = url.searchParams.get("id");
let productSolo = document.getElementById("product-solo");

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
        productSolo.appendChild(nomProduit(result));
        productSolo.appendChild(photoProduit(result));
        productSolo.appendChild(resumeProduit(result));
        productSolo.appendChild(prixProduit(result));
        productSolo.appendChild(couleursProduit(result));
        productSolo.appendChild(ajouterPanier());
    }).catch(
        function (erreur) {
            console.log(erreur);
        });

function nomProduit(product) {
    let boxName = document.createElement("h2");
    boxName.setAttribute("id", "titreProduit");
    boxName.innerHTML = product.name;
    return boxName;
}

function photoProduit(product) {
    let boxPhoto = document.createElement("p");
    boxPhoto.setAttribute("class", "images");
    let photo = document.createElement("img");
    photo.setAttribute("src", product.imageUrl);
    photo.setAttribute("height", "400px");
    boxPhoto.appendChild(photo);
    return boxPhoto;
}

function resumeProduit(product) {
    let resume = document.createElement("p");
    resume.setAttribute("class", "resume");
    resume.innerHTML = product.description;
    return resume;
}

function prixProduit(product) {
    let price = document.createElement("p");
    price.setAttribute("class", "prix");
    price.innerHTML = product.price / 100 + "€";
    return price;
}

function couleursProduit(product) {
    let couleursDispo = document.createElement("p");
    couleursDispo.innerHTML = "Couleurs disponibles : ";
    productSolo.appendChild(couleursDispo);

    let form = document.createElement("form");
    let select = document.createElement("select");
    let optGroup = document.createElement("optgroup");
    let couleurs = product.colors;
    select.appendChild(optGroup);
    for (let index = 0; index < couleurs.length; index++) {
        let option = document.createElement("option");
        option.innerHTML = couleurs[index];
        option.setAttribute("value", couleurs[index]);
        option.setAttribute("name", couleurs[index]);
        optGroup.appendChild(option);
    }
    form.appendChild(select);
    return form;
}

function ajouterPanier(){
    let ajoutPanier = document.createElement("button");
    ajoutPanier.innerHTML = "Ajouter au panier";
    productSolo.appendChild(ajoutPanier);
}