
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">          
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Accueil</title>

    <link rel="stylesheet" href="assets/carte.css">

    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
    crossorigin=""
    />
     <!-- Make sure you put this AFTER Leaflet's CSS -->
    <script 
        src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        crossorigin="">
    </script>

    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script src="assets/carte.js"></script>
    
</head>
<body>

<h1>Villes de France</h1>

<!-- Formulaire users -->
<!-- v-model permet de mettre a jour le champs qd la variable change -->
<div id='app'>
    <form>
        <label for="city">Rechercher une ville : </label>
        <select v-model="type" class='menu'>
            <option value="commence">Commence par</option>
            <option value="contient">Contient</option>
            <option value="finit">Finit par</option>
        </select>
        <input type="text" v-model="saisie" id="city" name="city" placeholder="Entrez des lettres">
        <button type='button' @click='rechercher' class='btn'>OK</button> <br><br>
        <div id = 'speciales'>
            <button type = 'button' @click = "recherchespeciale('finit','zza')" class='btn'> ZZA </button>
            <button type = 'button' @click = "recherchespeciale('contient','ign')" class='btn'> IGN </button>
            <button type = 'button' @click = "recherchespeciale('commence','rien')" class='btn'> RIEN </button>
        </div>
    </form>
</div>

<div id="map"></div>



</body>
</html>
