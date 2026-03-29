# Les villes de France

## Trouver les villes de France selon les lettres qui les composent
# 2.Fonction spécifique
Cette fonction a pour but de calculer la distance entre la ville et l'ENSG. Si la checkbox est cochée, cette distance apparaît dans le popup,
en plus du nom de la ville. 
On créé donc une condition dans la fonction rechercher() de la Vue js, si la checkbox est cochée, on calcule la distance entre chaque ville 
et l'ENSG, grâce à la fonction Leaflet *distanceTo*, qu'on appelle sur l'objet latlngensg qui est un objet qui représente un point géographique
de latitude et longitude définies. Cette fonction renvoie la distance en mètres et non arrondie, on l'arrondie avec *Math.round()* et on la 
convertie en km en divisant par 1000.
