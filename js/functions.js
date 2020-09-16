//Liste de fonctions communes ou générales pouvant être utilisées pour n'importe quel projet

function accesApi(type, url, envoi) {
    type = type.toUpperCase();
    if (type == "GET" || type == "POST") {
        return new Promise(function (resolve, reject) {
            let request = new XMLHttpRequest();
            request.onreadystatechange = function () {
                if (type == "GET" && this.readyState == 4 && this.status == 200) {
                    resolve(JSON.parse(this.response));
                } else if (type == "POST" && this.readyState == 4 && this.status == 201) {
                    resolve(JSON.parse(this.responseText));
                } else if (this.readyState == 4 && this.status == 0) {
                    reject("La connexion avec l'API a échouée.");
                } else if (this.readyState == 4 && this.status == 404) {
                    reject("L'API n'existe pas");
                }
                //Voir pour le cas où le readyState n'est pas à "quatre"                
            };
            request.open(type, url);
            if (type == "POST") {
                request.setRequestHeader("Content-type", "application/json");
            }
            request.send(JSON.stringify(envoi));
        });
    } else {
        statut = false;
        alert("Erreur de type de requête. Choisir entre GET et POST.");
    }
}

function convertMapToObject(map) {
    let object = {};
    for (let [key, value] of map) {
        object[key] = value;
    }
    return object;
}