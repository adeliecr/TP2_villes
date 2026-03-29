
// Initialisation
let map;
let markers;
let markerEnsg;

document.addEventListener('DOMContentLoaded', function() {

  map = L.map('map').setView([46.619261, 2.5], 6);
  const MainLayer = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
  });
  MainLayer.addTo(map);

  // couches marker
  markers = L.layerGroup().addTo(map);
  markerEnsg = L.layerGroup().addTo(map);

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
      if (this.saisie === '') {
          alert('Entrez au moins une lettre.');
          }

        else {
          fetch('/villes?type=' + this.type + '&saisie=' + this.saisie)  
          .then(response => response.json())
          .then(data => {                                                  
              // Supprimer les marqueurs précédents
              markers.clearLayers();
              markerEnsg.clearLayers()
              
              map.setView([46.619261, 2.5], 6);       // Recentrage a chaque fois

              if (data.length === 0) {  
                alert('Aucune ville trouvée pour cette recherche.');
              } 
              else {
                let ensgAjoute = false                //empecher la superposition des markers ensg dans le foreach
                data.forEach(ville => {
                
                  const marker = L.marker([ville.lat, ville.lon]).addTo(markers);
                  if (this.calculdist) {              // == si checkbox cochée
                    const latlngEnsg = L.latLng(48.841083, 2.587404)
                    const latlngVille = L.latLng(ville.lat, ville.lon)
                    const distanceEnsg = latlngEnsg.distanceTo(latlngVille) //renvoi en mètres
                    marker.bindPopup('Je suis la ville de ' + ville.nom + ', je me situe à ' + Math.round(distanceEnsg/1000) + " km de l'ENSG"); //Afficher en km
                    
                    if (!ensgAjoute) {
                      const redIcon = new L.Icon({     //icone personnalisée depuis dépot git qui héberge markers
                        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
                        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34],
                        shadowSize: [41, 41]
                      });
                      L.marker((latlngEnsg), {icon: redIcon}).addTo(markerEnsg).bindPopup("Je suis l'ENSG").openPopup();
                      ensgAjoute = true
                    }
                  }
                  
                  else {                              // == si checkbox pas cochée
                    marker.bindPopup('Je suis la ville de ' + ville.nom);
                  }
                })
              }
        })
      }
    },

    recherchespeciale(type,saisie) {     //finit par 'zza', contient 'ign', commence par 'rien'
      this.type=type
      this.saisie=saisie
      this.rechercher()
    },
  }
}).mount('#app')
});

