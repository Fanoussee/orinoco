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