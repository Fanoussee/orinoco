let listProducts = document.getElementById("list-Products");

function accesApi(type, url, envoi) {
    type = type.toUpperCase();
    let erreur = "Erreur de requête !";
    if (type == "GET" || type == "POST") {
        return new Promise(function (resolve, reject) {
            let request = new XMLHttpRequest();
            let statut = true;
            let reponse = "";
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
        console.log(result);
        let teddies = document.createElement("div");
        teddies.setAttribute("class", "produitEnListe");
        listProducts.appendChild(teddies);

        for (let index = 0; index < result.length; index++) {
            const element = result[index];
            console.log(element);
            let boxName = document.createElement("p");
            boxName.innerHTML = element.name;
            let boxPhoto = document.createElement("p");
            let photo = document.createElement("img");
            photo.setAttribute("src", element.imageUrl);
            photo.setAttribute("height", "120px");
            let resume = document.createElement("p");
            resume.innerHTML = element.description;
            let price = document.createElement("p");
            price.innerHTML = element.price/100 + "€";

            boxPhoto.appendChild(photo);
            teddies.appendChild(boxPhoto);
            teddies.appendChild(boxName);
            teddies.appendChild(resume);
            teddies.appendChild(price);
        }
    }).catch(
        function (erreur) {
            console.log(erreur);
        });
