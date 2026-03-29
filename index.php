<?php

declare(strict_types=1);

require_once 'flight/Flight.php';

Flight::route('/', function() {
    Flight::render('accueil');
});


$link = mysqli_connect('localhost', 'root', 'root', 'geobase', 3306);
mysqli_set_charset($link, "utf8");


Flight::set('geobase', $link);                    // stock


Flight::route('/villes', function() {
    $link = Flight::get('geobase');                 //récupère
    $type = Flight::request()->query->type;       // commence-finit-contient
    $saisie = Flight::request()->query->saisie;   // lettres
    $villes = [];                                 // valeur par défaut = [] pour toujours renvoyer du json valide
    if ($saisie != '') {
        if ($type == 'commence') {
            $resultat = $saisie.'%';
            }
        
        elseif ($type == 'contient') {

            $resultat = '%'.$saisie.'%';
            }

        elseif ($type == 'finit') {
            $resultat = '%'.$saisie;

            }
        
        else {                                     // valeur par défaut  
            $type = 'commence';
            $resultat = $saisie.'%';               
        }

        
        $requete = mysqli_prepare($link, "SELECT nom, ST_X(ST_GeomFromText(ST_AsText(ST_Centroid(geometry)),4326)) AS lon
                                            ,ST_Y(ST_GeomFromText(ST_AsText(ST_Centroid(geometry)),4326)) AS lat from geobase.communes where nom like ? limit 20 " );
            mysqli_stmt_bind_param($requete, "s", $resultat );
            mysqli_stmt_execute($requete); 
            $res = mysqli_stmt_get_result($requete);
            $villes = mysqli_fetch_all($res, MYSQLI_ASSOC); 
             
    }
    
Flight::json($villes);
});

Flight::start();

?>

