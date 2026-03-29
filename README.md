# Les villes de France

## Trouver les villes de France selon les lettres qui les composent

## Description
L'application utilise : 
- **PHP** avec le framework Flight pour gérer les routes et faire les requêtes SQL à la base de données "geobase"
- **MySQL** pour exploiter les données de la table "communes" de la base de données "geobase"
- La librairie **Leaflet.js** pour l'affichage de la carte, des éléments dessus ; marqueurs, popups, et pour l'utilisation de fonctions 
- La librairie **Vue.js** pour l'interface utilisateur : gestion du formulaire et des interactions avec la carte
- Le **dépôt GitHub leaflet-color-markers** de *pointhi* pour l'icône du marqueur rouge

# 1.Fonctionnement 
L'application permet d'afficher des marqueurs correspondant à des villes sur une carte de France metropolitaine, selon les caractères dans leurs noms. Il est possible de sélectionner dans un menu le type :
- commence par
- se termine par
- contient.
  
Le ou les lettre.s sont ensuite saisies dans la barre de recherche, et il faut cliquer sur le bouton OK pour lancer la recherche. Le nombre de villes maximum qui peut apparaître est limité à 20. 

3 boutons déjà paramétrés lancent trois recherches différentes :
- ZZA lance la recherche avec le type "se termine par" et la saisie "zza"
- IGN lance la recherche avec le type "contient" et la saisie "ign"
- RIEN lance la recherche avec le type "commence par" et la saisie "rien"

Il est possible de cliquer sur les marqueurs pour faire apparaitre le popup de la ville coresspondante, qui affiche "Je suis la ville de [nom de la ville]"

# 2.Fonctionnalité spécifique

Cette fonctionnalité a pour but de calculer la distance entre chaque ville de la recherche et l'ENSG, et de faire apparaître un marqueur rouge sur l'emplacement de l'ENSG avec un popup qui s'ouvre automatiquement : "Je suis l'ENSG". 

Si la checkbox associée "Afficher la distance de chaque villes à l'ENSG" est cochée, et qu'une recherche qui renverra au moins une ville est lancée (via les boutons paramétrés ou avec la barre de recherche), le marqueur rouge et son popup apparaissent, et la distance apparaît dans chaque popup de chaque ville de la recherche, en plus du nom de la ville. 

Cette distance est calculée grâce à la fonction de la librairie Leaflet.js *distanceTo*.  Cette fonction renvoie la distance en mètres et non arrondie, donc elle est arrondie avec la fonction *Math.round()* de JavaScript et convertie en km en divisant par 1000. 
