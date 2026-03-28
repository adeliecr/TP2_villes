<?php

declare(strict_types=1);

require_once 'flight/Flight.php';

Flight::route('/', function() {
    Flight::render('accueil');
});
// Flight::route('/test-db', function () {
//     $host = 'db';
//     $port = 5432;
//     $dbname = 'mydb';
//     $user = 'postgres';
//     $pass = 'postgres';

//     // Connexion BDD
//     $link = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$pass");

//     $sql = "SELECT * FROM points";
//     $query = pg_query($link, $sql);
//     $results = pg_fetch_all($query);
//     Flight::json($results);
// });

// route vers villes (tableau json)
// je dois recup les param de l'url (type et texte)

// 1 Récup ce que l'utilisateur a tapé
// 2 Interroger la BDD avec les infos 
// 3 Renvoyer resultat en JSON

$link = mysqli_connect('localhost', 'root', 'root', 'geobase', 3306);
mysqli_set_charset($link, "utf8");


Flight::set('geobase', $link);  // stock


Flight::route('/villes', function() {
    $link=Flight::get('geobase');            //récupère

    // Get les variables ds l'URL 
    // commence-finit-contient
    $type = Flight::request()->query->type;
    // lettres
    $saisie = Flight::request()->query->saisie;


    // // par défaut
    // if (isset($type)){
    //     $type=$type;
    //     }
    // else {
    //     $type = 'commence';
    // };

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
        
        $requete = mysqli_prepare($link, "SELECT nom, ST_X(ST_GeomFromText(ST_AsText(ST_Centroid(geometry)),4326)) AS lon
                                            ,ST_Y(ST_GeomFromText(ST_AsText(ST_Centroid(geometry)),4326)) AS lat from geobase.communes where nom like ? limit 20 " );
            mysqli_stmt_bind_param($requete, "s", $resultat );
            mysqli_stmt_execute($requete); //rempli
            $res = mysqli_stmt_get_result($requete);// recuperation des resultatsres
            $villes = mysqli_fetch_all($res, MYSQLI_ASSOC); //récupère les données dun objet
             
    }
    
    
    // // test
    // echo('OK');
    
// renvoyer en json
Flight::json($villes);
});

Flight::start();

?>

