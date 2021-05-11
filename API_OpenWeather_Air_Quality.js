// Fonction permttant de rechercher la ville 
function localisation2() {
    var queryLoc = document.getElementById("queryLoc").value;
    // Appel de l'API en fonction de la latitude et la longitude de la ville
    var url = "https://api.openweathermap.org/geo/1.0/direct?q=" + queryLoc + "&limit=1&appid=932bf7e3763f417ca65743decf57a796"

    fetch(url)
        // On transforme la réponse de l'API en JSON, c'est plus simple.
        .then(rep => rep.json())
        // On traite le JSON
        .then((rep) => {
        console.log("response from geocoder : ", rep);

        var lat = rep[0].lat;
        console.log("response from lat : ", rep[0].lat);
        var lon = rep[0].lon;
        console.log("response from lon : ", rep[0].lon);
        // Appel de l'API en fonction de la latitude et la longitude de la ville
        var url1 = "https://api.openweathermap.org/data/2.5/air_pollution?lat=" + lat + "&lon=" + lon + "&appid=932bf7e3763f417ca65743decf57a796&lang=fr"

        fetch(url1)
            // On transforme la réponse de l'API en JSON, c'est plus simple.
            .then(data => data.json())
            // On traite le JSON
            .then((data) => {
                
                var element = document.getElementById("aqi_air");
                element.innerHTML =(data.list[0].main.aqi);
                if (data.list[0].main.aqi== 1){
                return element.innerHTML = "Qualité de l'air : Très bon"
                }
                else if (data.list[0].main.aqi==2){
                return element.innerHTML = "Qualité de l'air : Bon"
                }
                else if (data.list[0].main.aqi== 3){
                return element.innerHTML = "Qualité de l'air : Modéré"
                }
                else if (data.list[0].main.aqi== 4){
                return element.innerHTML = "Qualité de l'air : Mauvais"
                }
                else if (data.list[0].main.aqi==5){
                return element.innerHTML = "Qualité de l'air : Très Mauvais"
                }
                
            });
        });
}
