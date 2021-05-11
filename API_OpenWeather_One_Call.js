// Fonction permttant de rechercher la ville 
function localisation() {
    var queryLoc = document.getElementById("queryLoc").value;
    // Appel de l'API en fonction de la latitude et la longitude de la ville
    var url = "https://api.openweathermap.org/geo/1.0/direct?q=" + queryLoc + "&limit=1&appid=932bf7e3763f417ca65743decf57a796"

    fetch(url)
        // On transforme la réponse de l'API en JSON, c'est plus simple.
        .then(rep => rep.json())
        // On traite le JSON
        .then((rep) => {

        var lat = rep[0].lat;
        var lon = rep[0].lon;
        // Appel de l'API en fonction de la latitude et la longitude de la ville
        var url1 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,alert&appid=932bf7e3763f417ca65743decf57a796&lang=fr"

        fetch(url1)
            // On transforme la réponse de l'API en JSON, c'est plus simple.
            .then(data => data.json())
            // On traite le JSON
            .then((data) => {

                // Ajout des données actuelles
                var element = document.getElementById("zone_temp");
                element.innerHTML =(data.current.temp - 273.15).toFixed(1) + " °C";

                var element = document.getElementById("ressenti");
                element.innerHTML = "Ressenti : " + (data.current.feels_like - 273.15).toFixed(1) + " °C";

                var element = document.getElementById("zone_pression");
                element.innerHTML = "Pression : " + (data.current.pressure) + " hPa";

                var element = document.getElementById("zone_humidité");
                element.innerHTML = "Humidité : " + (data.current.humidity) + " %";

                var element = document.getElementById("zone_vent");

                function dir_vent(){
                    if (data.current.wind_deg == 0)
                    return 'N'
                    else if (0 < data.current.wind_deg < 90)
                    return 'NE'
                    else if (data.current.wind_deg == 90)
                    return 'E'
                    else if (90 < data.current.wind_deg < 180)
                    return 'SE'
                    else if (data.current.wind_deg == 180)
                    return 'S'
                    else if (180 < data.current.wind_deg < 270)
                    return 'SO'
                    else if (data.current.wind_deg == 270)
                    return 'O'
                    else if (270 < data.current.wind_deg < 360)
                    return 'NO'
                }

                element.innerHTML = "Vent : " + (data.current.wind_speed * 3.6).toFixed(1) + " km/h " + dir_vent();

                var element = document.getElementById("zone_uv");
                element.innerHTML = "Indice UV : " + (data.current.wind_speed).toFixed(0);

                var element = document.getElementById("description");
                element.innerHTML = (data.current.weather[0].description);

                var element = document.getElementById("icon");
                element.innerHTML = "<img src=\"http://openweathermap.org/img/wn/" + (data.current.weather[0].icon) + "@2x.png\">";
                
                var element = document.getElementById("date");
                var timeStamp = (data.current.dt), // le TimeStamp à convertir
                date = new Date(timeStamp * 1000); // pour obtenir le timeStamp en millisecondes
                journee = date.getDay(); // on récupère le jour de la semaine
                jour = date.getDate(); // on récupère le jour du mois
                mois = date.getMonth(); // on récupère le mois
                an = date.getFullYear(); // on récupère l'année
                
                function week(){
                    if (journee == 1) {
                    return "Lundi";
                    }
                    else if (journee == 2) {
                    return "Mardi";
                    }
                    else if (journee == 3) {
                    return "Mercredi";
                    }
                    else if (journee == 4) {
                    return "Jeudi";
                    }
                    else if (journee == 5) {
                    return "Vendredi";
                    }
                    else if (journee == 6) {
                    return "Samedi";
                    }
                    else if (journee == 0) {
                    return "Dimanche";
                    }
                }

                function month(){
                    if (mois == 0) {
                    return "Janvier";
                    }
                    else if (mois == 1) {
                    return "Février";
                    }
                    else if (mois == 2) {
                    return "Mars";
                    }
                    else if (mois == 3) {
                    return "Avril";
                    }
                    else if (mois == 4) {
                    return "Mai";
                    }
                    else if (mois == 5) {
                    return "Juin";
                    }
                    else if (mois == 6) {
                    return "Juillet";
                    }
                    else if (mois == 7) {
                    return "Août";
                    }
                    else if (mois == 8) {
                    return "Septembre";
                    }
                    else if (mois == 9) {
                    return "Octobre";
                    }
                    else if (mois == 10) {
                    return "Novembre";
                    }
                    else if (mois == 11) {
                    return "Décembre";
                    }
                }

                element.innerHTML = week() + " " + jour + " " + month() + " " + an;

                var element = document.getElementById("heure");
                var timeStamp = (data.current.dt), // le TimeStamp à convertir
                    date = new Date(timeStamp * 1000); // pour obtenir le timeStamp en millisecondes
                heure = date.getHours(); // on récupère l'heure
                min = date.getMinutes(); // on récupère les minutes

                function minute(){
                    if (min < 10)
                    return '0' + min;
                    else
                    return min;
                }

                element.innerHTML = heure + "h" + minute();

                var element = document.getElementById("lever");
                var timeStamp = (data.current.sunrise), // le TimeStamp à convertir
                    date = new Date(timeStamp * 1000); // pour obtenir le timeStamp en millisecondes
                heure = date.getHours(); // on récupère l'heure
                min = date.getMinutes(); // on récupère les minutes

                element.innerHTML = "Lever du soleil : " + heure + "h" + minute();


                var element = document.getElementById("coucher");
                var timeStamp = (data.current.sunset), // le TimeStamp à convertir
                    date = new Date(timeStamp * 1000); // pour obtenir le timeStamp en millisecondes
                heure = date.getHours(); // on récupère l'heure
                min = date.getMinutes(); // on récupère les minutes

                element.innerHTML = "Coucher du soleil : " + heure + "h" + minute();

                // On ajoute le graphique des données prévisionelles horaire : 
                var chart = c3.generate({
                    bindto: '#chart',
                    data: {
                    columns: [ // Variable de la donnée
                        [data.timezone,Math.round(data.hourly[0].temp - 273.15),Math.round(data.hourly[1].temp - 273.15),Math.round(data.hourly[2].temp - 273.15),Math.round(data.hourly[3].temp - 273.15),Math.round(data.hourly[4].temp - 273.15),Math.round(data.hourly[5].temp - 273.15),Math.round(data.hourly[6].temp - 273.15),Math.round(data.hourly[7].temp - 273.15), Math.round(data.hourly[8].temp - 273.15),Math.round(data.hourly[9].temp - 273.15),Math.round(data.hourly[10].temp - 273.15),Math.round(data.hourly[11].temp - 273.15),Math.round(data.hourly[12].temp - 273.15),Math.round(data.hourly[13].temp - 273.15),Math.round(data.hourly[14].temp - 273.15),Math.round(data.hourly[15].temp - 273.15),Math.round(data.hourly[16].temp - 273.15),Math.round(data.hourly[17].temp - 273.15),Math.round(data.hourly[18].temp - 273.15),Math.round(data.hourly[19].temp - 273.15),Math.round(data.hourly[20].temp - 273.15),Math.round(data.hourly[21].temp - 273.15),Math.round(data.hourly[22].temp - 273.15),Math.round(data.hourly[23].temp - 273.15),Math.round(data.hourly[24].temp - 273.15)],
                        [data.timezone_offset,Math.round(data.hourly[0].pop * 100), Math.round(data.hourly[1].pop * 100), Math.round(data.hourly[2].pop * 100), Math.round(data.hourly[3].pop * 100), Math.round(data.hourly[4].pop * 100), Math.round(data.hourly[5].pop * 100), Math.round(data.hourly[6].pop * 100), Math.round(data.hourly[7].pop * 100), Math.round(data.hourly[8].pop * 100), Math.round(data.hourly[9].pop * 100), Math.round(data.hourly[10].pop * 100), Math.round(data.hourly[11].pop * 100), Math.round(data.hourly[12].pop * 100), Math.round(data.hourly[13].pop * 100), Math.round(data.hourly[14].pop * 100), Math.round(data.hourly[15].pop * 100), Math.round(data.hourly[16].pop * 100), Math.round(data.hourly[17].pop * 100), Math.round(data.hourly[18].pop * 100), Math.round(data.hourly[19].pop * 100), Math.round(data.hourly[20].pop * 100), Math.round(data.hourly[21].pop * 100), Math.round(data.hourly[22].pop * 100), Math.round(data.hourly[23].pop * 100), Math.round(data.hourly[24].pop * 100),]
                    ],
                    types: {
                        [data.timezone]: 'spline',
                        [data.timezone_offset]: 'bar'
                    },
                    colors: { // Définition de la couleur
                        [data.timezone]: '#eb6e4b',
                        [data.timezone_offset]: '#d7efec'
                    },
                    names: { // Définition du nom des colonnes
                        [data.timezone]: 'Température',
                        [data.timezone_offset]: 'Probabilité de précipitations'
                    },
                    axes: {
                        [data.timezone_offset]: 'y2'
                    }
                    },
                    axis: {
                    y: { // Définition de l'axe des Y
                        label: {
                            text: 'Température (°C)',
                            position: 'outer-middle'
                        }
                    },
                    y2: {
                        show: true,
                        label: {
                        text: 'Probabilité de précipitations (%)',
                        position: 'outer-middle'
                        }
                    }
                    },
                });

                //  Ajout des données prévisionelles journalières 
                var element = document.getElementById("zone_temp1");
                element.innerHTML =(data.daily[1].temp.min - 273.15).toFixed(1) + " / " + (data.daily[1].temp.max - 273.15).toFixed(1) + " °C";

                var element = document.getElementById("description1");
                element.innerHTML = (data.daily[1].weather[0].description);

                var element = document.getElementById("icon1");
                element.innerHTML = "<img src=\"http://openweathermap.org/img/wn/" + (data.daily[1].weather[0].icon) + "@2x.png\">";

                var element = document.getElementById("date1");
                var timeStamp = (data.daily[1].dt), // le TimeStamp à convertir
                date = new Date(timeStamp * 1000); // pour obtenir le timeStamp en millisecondes
                journee = date.getDay(); // on récupère le jour de la semaine
                jour = date.getDate(); // on récupère le jour du mois
                mois = date.getMonth(); // on récupère le mois

                element.innerHTML = week() + " " + jour + " " + month();

                var element = document.getElementById("zone_temp2");
                element.innerHTML =(data.daily[2].temp.min - 273.15).toFixed(1) + " / " + (data.daily[2].temp.max - 273.15).toFixed(1) + " °C";

                var element = document.getElementById("description2");
                element.innerHTML = (data.daily[2].weather[0].description);

                var element = document.getElementById("icon2");
                element.innerHTML = "<img src=\"http://openweathermap.org/img/wn/" + (data.daily[2].weather[0].icon) + "@2x.png\">";

                var element = document.getElementById("date2");
                var timeStamp = (data.daily[2].dt), // le TimeStamp à convertir
                date = new Date(timeStamp * 1000); // pour obtenir le timeStamp en millisecondes
                journee = date.getDay(); // on récupère le jour de la semaine
                jour = date.getDate(); // on récupère le jour du mois
                mois = date.getMonth(); // on récupère le mois

                element.innerHTML = week() + " " + jour + " " + month();

                var element = document.getElementById("zone_temp3");
                element.innerHTML =(data.daily[3].temp.min - 273.15).toFixed(1) + " / " + (data.daily[3].temp.max - 273.15).toFixed(1) + " °C";

                var element = document.getElementById("description3");
                element.innerHTML = (data.daily[3].weather[0].description);

                var element = document.getElementById("icon3");
                element.innerHTML = "<img src=\"http://openweathermap.org/img/wn/" + (data.daily[3].weather[0].icon) + "@2x.png\">";

                var element = document.getElementById("date3");
                var timeStamp = (data.daily[3].dt), // le TimeStamp à convertir
                date = new Date(timeStamp * 1000); // pour obtenir le timeStamp en millisecondes
                journee = date.getDay(); // on récupère le jour de la semaine
                jour = date.getDate(); // on récupère le jour du mois
                mois = date.getMonth(); // on récupère le mois

                element.innerHTML = week() + " " + jour + " " + month();

                var element = document.getElementById("zone_temp4");
                element.innerHTML =(data.daily[4].temp.min - 273.15).toFixed(1) + " / " + (data.daily[4].temp.max - 273.15).toFixed(1) + " °C";

                var element = document.getElementById("description4");
                element.innerHTML = (data.daily[4].weather[0].description);

                var element = document.getElementById("icon4");
                element.innerHTML = "<img src=\"http://openweathermap.org/img/wn/" + (data.daily[4].weather[0].icon) + "@2x.png\">";

                var element = document.getElementById("date4");
                var timeStamp = (data.daily[4].dt), // le TimeStamp à convertir
                date = new Date(timeStamp * 1000); // pour obtenir le timeStamp en millisecondes
                journee = date.getDay(); // on récupère le jour de la semaine
                jour = date.getDate(); // on récupère le jour du mois
                mois = date.getMonth(); // on récupère le mois

                element.innerHTML = week() + " " + jour + " " + month();

                var element = document.getElementById("zone_temp5");
                element.innerHTML =(data.daily[5].temp.min - 273.15).toFixed(1) + " / " + (data.daily[5].temp.max - 273.15).toFixed(1) + " °C";

                var element = document.getElementById("description5");
                element.innerHTML = (data.daily[5].weather[0].description);

                var element = document.getElementById("icon5");
                element.innerHTML = "<img src=\"http://openweathermap.org/img/wn/" + (data.daily[5].weather[0].icon) + "@2x.png\">";

                var element = document.getElementById("date5");
                var timeStamp = (data.daily[5].dt), // le TimeStamp à convertir
                date = new Date(timeStamp * 1000); // pour obtenir le timeStamp en millisecondes
                journee = date.getDay(); // on récupère le jour de la semaine
                jour = date.getDate(); // on récupère le jour du mois
                mois = date.getMonth(); // on récupère le mois

                element.innerHTML = week() + " " + jour + " " + month();

                var element = document.getElementById("zone_temp6");
                element.innerHTML =(data.daily[6].temp.min - 273.15).toFixed(1) + " / " + (data.daily[6].temp.max - 273.15).toFixed(1) + " °C";

                var element = document.getElementById("description6");
                element.innerHTML = (data.daily[6].weather[0].description);

                var element = document.getElementById("icon6");
                element.innerHTML = "<img src=\"http://openweathermap.org/img/wn/" + (data.daily[6].weather[0].icon) + "@2x.png\">";

                var element = document.getElementById("date6");
                var timeStamp = (data.daily[6].dt), // le TimeStamp à convertir
                date = new Date(timeStamp * 1000); // pour obtenir le timeStamp en millisecondes
                journee = date.getDay(); // on récupère le jour de la semaine
                jour = date.getDate(); // on récupère le jour du mois
                mois = date.getMonth(); // on récupère le mois

                element.innerHTML = week() + " " + jour + " " + month();

                var element = document.getElementById("zone_temp7");
                element.innerHTML =(data.daily[7].temp.min - 273.15).toFixed(1) + " / " + (data.daily[7].temp.max - 273.15).toFixed(1) + " °C";

                var element = document.getElementById("description7");
                element.innerHTML = (data.daily[7].weather[0].description);

                var element = document.getElementById("icon7");
                element.innerHTML = "<img src=\"http://openweathermap.org/img/wn/" + (data.daily[7].weather[0].icon) + "@2x.png\">";

                var element = document.getElementById("date7");
                var timeStamp = (data.daily[7].dt), // le TimeStamp à convertir
                date = new Date(timeStamp * 1000); // pour obtenir le timeStamp en millisecondes
                journee = date.getDay(); // on récupère le jour de la semaine
                jour = date.getDate(); // on récupère le jour du mois
                mois = date.getMonth(); // on récupère le mois

                element.innerHTML = week() + " " + jour + " " + month();

            });
    });
}


