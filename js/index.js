let listProducts = document.getElementById("list-Products");

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

let accesApiTeddies = accesApi("get", "http://localhost:3000/api/teddies", null);
accesApiTeddies.then(
    function (result) {
        listProducts.appendChild(creerTeddies());
        for (let index = 0; index < result.length; index++) {
            creerUnProduit(result[index]);
        }
    }).catch(
        function (erreur) {
            console.log(erreur);
        });

function creerTeddies(){
    let teddies = document.createElement("div");
    teddies.setAttribute("class", "produitEnListe");
    return teddies;
}

function creerUnProduit(product){
    let produit = document.createElement("a");
    produit.setAttribute("href", "../html/product.html" + "?id=" + product._id);
    produit.setAttribute("class", "product");
    produit.appendChild(photoProduit(product));
    produit.appendChild(nomProduit(product));
    produit.appendChild(resumeProduit(product));
    produit.appendChild(prixProduit(product));
    listProducts.appendChild(produit);
}

function nomProduit(product){
    let boxName = document.createElement("p");
    boxName.setAttribute("class", "nomProduit");
    boxName.innerHTML = product.name;
    return boxName;
}

function photoProduit(product){
    let boxPhoto = document.createElement("p");
    boxPhoto.setAttribute("class", "boiteImages");
    let photo = document.createElement("img");
    photo.setAttribute("src", product.imageUrl);
    photo.setAttribute("class", "images");
    boxPhoto.appendChild(photo);
    return boxPhoto;
}

function resumeProduit(product){
    let resume = document.createElement("p");
    resume.setAttribute("class", "resumeProduits");
    resume.innerHTML = product.description;
    return resume; 
}

function prixProduit(product){
    let price = document.createElement("p");
    price.setAttribute("class", "prixProduits");
    price.innerHTML = product.price/100 + "€";
    return price;
}