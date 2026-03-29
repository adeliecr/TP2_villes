
console.log('BON')

// Initialisation de la carte
var map ;
var markers;

document.addEventListener('DOMContentLoaded', function() {

  map = L.map('map').setView([46.619261, 2.5], 6);
  var MainLayer = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
  });
  MainLayer.addTo(map);
  // couche markers
  markers = L.layerGroup().addTo(map);


// VUE JS capturer ce que l'user tape : v-model et déclencher action
// au click => @click
  Vue.createApp({
  data() {
    return {
      saisie:'',
      type:'commence',
      calculdist:false

    };
},

  methods: {
    rechercher () {
      // afficher la saisie et le type de saisie ds la console
      
      console.log(this.saisie, this.type)
      // fetch () appelle villes.php?type=x&saisie=y
      // villes.php fait la requete sql a la bdd
      // renvoie un json avec les villes. fetch() recup ce json
      // puis placement des marqueurs en fonction
      if (this.saisie === '') {
          console.log('pas de lettres');
          alert('Entrez au moins une lettre.');
          }

        else {
          fetch('/villes?type=' + this.type + '&saisie=' + this.saisie)
          //converti réponse en json (objet lisible)
          .then(response => response.json())
          // appel api
          .then(data => {
              // affiche tableau villes reçues
              console.log(data) 
              // Supprimer les marqueurs précédents
              markers.clearLayers();
              // Recentrage a chaque fois
              map.setView([46.619261, 2.5], 6);

              console.log('villes trouvées:', data.length);
              if (data.length === 0) {  
                console.log('Aucune ville trouvée ');
                alert('Aucune ville trouvée pour cette recherche.');
              } 
              else {
                data.forEach(ville => {
                  // marker
                  var marker = L.marker([ville.lat, ville.lon]).addTo(markers);
                  
                  // popup
                  if (this.calculdist) {
                    var latlngensg=L.latLng(48.841083, 2.587404)
                    var latlngville=L.latLng(ville.lat, ville.lon)
                    var distanceensg=latlngensg.distanceTo( latlngville) //renvoi en mètres
                    marker.bindPopup('Je suis la ville de ' + ville.nom + ', je me situe à ' + Math.round(distanceensg/1000) + " km de l'ENSG"); //Afficher en km
                  }

                  else {
                    marker.bindPopup('Je suis la ville de ' + ville.nom);
                  }
                })
              }
        })
      }
    },

    recherchespeciale(type,saisie) {
      // villes qui finissent par zza
      // villes qui contiennent denis
      // villes qui commencent par rien
      this.type=type
      this.saisie=saisie
      this.rechercher()
    },
  }
}).mount('#app')
});





// fetch 


