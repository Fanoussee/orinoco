//Liste de fonctions communes ou générales pouvant être utilisées pour n'importe quel projet

/**
 * Cette fonction permet d'effectuer 2 types de requêtes sur une API.
 * GET (envoi=null) et POST (envoir=objet JSON).
 * @param {string} type le type de la requête, GET ou POST
 * @param {string} url l'url de l'API
 * @param {JSON} envoi un objet JSON en cas de requête POST ou null pour une requête GET
 * @returns objet Promise 
 */
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
                } else if(this.readyState == 4){
                    reject("Erreur inconnue");
                }
            };
            request.open(type, url);
            if (type == "POST") {
                request.setRequestHeader("Content-type", "application/json");
            }
            request.send(JSON.stringify(envoi));
        });
    } else {
        alert("Erreur de type de requête. Choisir entre GET et POST.");
    }
}

/**
 * Cette fonction permet de convertir une Map en objet.
 * Cela est utile pour pouvoir l'insérer ensuite dans un objet JSON.
 * @param {Map} map une map avec des clés et des valeurs 
 */
function convertMapToObject(map) {
    let object = {};
    for (let [key, value] of map) {
        object[key] = value;
    }
    return object;
}