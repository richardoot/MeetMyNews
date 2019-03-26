<?php

  //Variables
    $country = 'fr';
    $triePar = 'sortBy';
    //$elementRecherche = 'Samsung'; //Pour le test
    //$elementRecherche = $_GET['recherche'];
    //$typeRecherche = 'everything'; // 'top-headlines'
    //$categorie = $_GET['categorie'];

  //Traitements
    //Récupération de l'article
      if(isset($_GET['recherche'])){
        $attr = rawurlencode($_GET['recherche']);
        $urlNewsApi = 'https://newsapi.org/v2/everything?' . 'q=' . $attr . '&apiKey=a1b822da6e074842bb4cd2063a7a03f7';
        //$urlNewsApi =
        $jsonArticles = file_get_contents($urlNewsApi, false);
        $jsonArticles = json_decode($jsonArticles);

        $typeRequete = "recherche par element";
      }
      elseif (isset($_GET['categorie'])) {
        $attr = rawurlencode($_GET['categorie']);
        $urlNewsApi = 'https://newsapi.org/v2/top-headlines?' . 'category=' . $attr . '&apiKey=a1b822da6e074842bb4cd2063a7a03f7';
        $jsonArticles = file_get_contents($urlNewsApi, false);
        $jsonArticles = json_decode($jsonArticles);

        $typeRequete = "recherche par categorie";
      }
      elseif (isset($_GET['pays'])) {
        $attr = rawurlencode($_GET['pays']);
        $urlNewsApi = 'https://newsapi.org/v2/top-headlines?' . 'country=' . $attr . '&apiKey=a1b822da6e074842bb4cd2063a7a03f7';
        $jsonArticles = file_get_contents($urlNewsApi, false);
        $jsonArticles = json_decode($jsonArticles);

        $typeRequete = "recherche par pays";
      }
      else {
        $reponse = ["Code" => "-2",
                    "message" => "Veuillez saisir un parametre valide"];
        $reponse = json_encode($reponse);
        echo $reponse;
        exit(1);
      }


    //Récupérartion du language de traduction
      if(isset($_GET['langue'])){
        $langueTraduction = $_GET['langue'];
        $langueTraduction = rawurlencode($langueTraduction);
      }else {
        $reponse = ["Code" => "-2",
                    "message" => "Veuillez saisir une langue"];
        $reponse = json_encode($reponse);
        echo $reponse;
        exit(1);

      }

    //Traduction des article
      for($i=0 ; $i < 20 ; $i++){
        //Récupération du titre et du descriptif de l'article à traduire
          $leTitre = $jsonArticles->articles[$i]->title;
          $leDescriptif = $jsonArticles->articles[$i]->description;
          $leTitre = rawurlencode($leTitre);
          $leDescriptif = rawurlencode($leDescriptif);
          //echo $leTitre . '<br><br>';
          //echo $leDescriptif . '<br><br>';


        //Detecttion langage article
          $urlDetection = 'https://translation.googleapis.com/language/translate/v2/detect?q=' . $leTitre . '&key=AIzaSyCMuD-2Lhej39xZX5EwvkCDdmhBdoH0wWk';
          //$urlDetection->header('Authorization' => 'Bearer ya29.GlvXBk78yzRqg1czUKf5w9FSqttmJxZQ4kiBL0B_9Vi98AVQ42w8dy3mck1BbhED4xashAx9GmivDWRyss-3eCo89W3soHCIV25Imjfcb4IAmwB5tbDGwPTXvg7F')
          $jsonLangueDetecte = file_get_contents($urlDetection, false);
          $jsonLangueDetecte = json_decode($jsonLangueDetecte);

          //Récupération dans le json du language détecté
          $langageSource = $jsonLangueDetecte->data->detections[0][0]->language;

          //echo 'Langage source : ' . $langageSource . '<br><br><br>';

          //Vérifier que le language source n'est pas le language choisie par l'utilisateur car pas la peine de traduire dans la même langue
          if($langageSource != $langueTraduction){
            //Traduction de l'article
              //Traduction du titre
              //echo 'Je suis rentré<br><br><br>';

                $urlTraductionTitre = 'https://translation.googleapis.com/language/translate/v2?q=' . $leTitre . '&target=' . $langueTraduction . '&source=' . $langageSource . '&key=AIzaSyCMuD-2Lhej39xZX5EwvkCDdmhBdoH0wWk';
                $jsonTitreTraduit = file_get_contents($urlTraductionTitre, false);
                $jsonTitreTraduit = json_decode($jsonTitreTraduit);

                //Récupération du titre traduit dans le json
                  $TitreTraduit = $jsonTitreTraduit->data->translations[0]->translatedText;

              //Traduction du descriptif
                $urlTraductinD = 'https://translation.googleapis.com/language/translate/v2?q=' . $leDescriptif . '&target=' . $langueTraduction . '&source=' . $langageSource . '&key=AIzaSyCMuD-2Lhej39xZX5EwvkCDdmhBdoH0wWk';
                $jsonDescriptifTraduit = file_get_contents($urlTraductinD, false);
                $jsonDescriptifTraduit = json_decode($jsonDescriptifTraduit);

                //Récupération du descriptif traduit dans le json
                  $DescriptifTraduit = $jsonDescriptifTraduit->data->translations[0]->translatedText;

            //Remplacement dans le json des titre et descriptif en VO
              //Remplacement du titre dans le json de base en VO
                $jsonArticles->articles[$i]->title = $TitreTraduit;

              //Remplacement du descriptif dans le json de base en VO
                $jsonArticles->articles[$i]->description = $DescriptifTraduit;
          }
      }


        if ($jsonArticles->status == "ok") {

          if($jsonArticles->totalResults == 0){
            $reponse = ["Code" => "0",
                        "totalResults" => $jsonArticles->totalResults,
                        "typeRequete" => $typeRequete,
                        "message" => "Pas d'article correspondant à cette recherche"];
          }
          else if(isset($jsonArticles->message) &&  $jsonArticles->message == "The request is invalid."){
            $reponse = ["Code" => "-1",
                        "message" => "La requete n'est pas valide vérifier les paramètres"];
          }
          else {
            $reponse = ["Code" => "200",
                        "totalResults" => $jsonArticles->totalResults,
                        "typeRequete" => $typeRequete,
                        "articles" => $jsonArticles->articles,
                        "langue" => $langueTraduction];
          }

        }

      //Encodage et affichage du JSON
        $reponse = json_encode($reponse);

        echo $reponse;

?>
