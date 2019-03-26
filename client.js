function retournerValueLangue(){
    let dropdownLangue = document.getElementById('idLangue');

    return dropdownLangue.value;
}

function afficherArticlesParCategorie(categorie){
  //Variables
    let parent = document.getElementById('idAffichage');
    let tailleDuContenu = parent.childNodes.length;

    let teamBlock = document.getElementById('idTeam');
    let tailleTeam = teamBlock.childNodes.length;

    let featBlock = document.getElementById('idFeatures');
    let tailleFeatures = featBlock.childNodes.length;

    let langueTrad = retournerValueLangue();

    //Si personne à définie de langue on met le français par défaut
      if(langueTrad == undefined){
        langueTrad = "fr";
      }

  //Traitements
    //Supprimer les enfants du div de CONTENU
      for (let i=0 ; i<tailleDuContenu ; i++){
        parent.removeChild(parent.childNodes[0]);
      }

    //Supprimer le block feat
      for (let i=0 ; i<tailleFeatures ; i++){
        featBlock.removeChild(featBlock.childNodes[0]);
      }

    //Supprimer le block team
      for (let i=0 ; i<tailleTeam ; i++){
        teamBlock.removeChild(teamBlock.childNodes[0]);
      }

  //Création de la requet
    let requete = new XMLHttpRequest();

  //Callback
    requete.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        //Creation du container
          let containerCarte = document.createElement("div");
          containerCarte.setAttribute("class","container-fluid");

          //Création ligne
            let ligneCarte = document.createElement("div");
            ligneCarte.setAttribute("class","row");

        //CREATION DES CARTES
        for(articleCourant in requete.response.articles){
          //console.log(requete.response.articles[articleCourant].author);
          console.log(requete.response.articles[articleCourant].title);
          console.log(requete.response.articles[articleCourant].description);
          console.log("Type Requete = " + requete.response.typeRequete);
          console.log("Langue = " + requete.response.langue);

          //Création de la colone
            let colCarte = document.createElement("div");
            colCarte.setAttribute("class","col-md-4 col-sm-6 col-xs-12");

          //Création de la carte
            let carte = document.createElement("div");
            carte.setAttribute("class","card mb-3");

          //Création titre + ajout dans la carte
            //Suprésion des carractères inatendu comme "&#039;"   =  '
              let leTitreTab = requete.response.articles[articleCourant].title.split('&#039;');
              let laTailleTitre = leTitreTab.length;

              let leTitre = leTitreTab[0];
              for(let j=1 ; j < laTailleTitre ; j++){
                leTitre += "'" + leTitreTab[j];
              }
              //alert(leTitre);

            //Création et ajout du texte du titre
              let txtTitre = document.createTextNode(leTitre);
              let titreCarte = document.createElement("h5");
              titreCarte.setAttribute("class","card-title");
              titreCarte.setAttribute("style","font-size: 15px;");
              titreCarte.appendChild(txtTitre);

            //Ajout du titre à la carte
              carte.appendChild(titreCarte);

          //Création et ajout de l'image
            //Création de Lien vers l'article complet
              /*let leLien = document.createElement("a");
              leLien.setAttribute("href",requete.response.articles[articleCourant].url);*/

            //Création de l'image de la carte
              let imgCarte = document.createElement("img");
              imgCarte.setAttribute("style","height: 40%; width: 100%; display: block;");
              imgCarte.setAttribute("src",requete.response.articles[articleCourant].urlToImage);
              imgCarte.setAttribute("onclick","window.open(\"" + requete.response.articles[articleCourant].url + "\",\"popupMMN\",\"width=500,height=500\")");

              //Ajout de l'image dans le lien
                //leLien.appendChild(imgCarte);

              //Ajout du lien dans la carte
                carte.appendChild(imgCarte);

          //Création et ajout du descriptif
            //Création emplacement descriptif de la carte
              let emplacementDescriptif = document.createElement("div");
              emplacementDescriptif.setAttribute("class","card-body");

            //Création du descriptif de la carte
              let txtDescriptif = document.createTextNode(requete.response.articles[articleCourant].description);
              let descriptifCarte = document.createElement("p");
              descriptifCarte.appendChild(txtDescriptif);
              descriptifCarte.setAttribute("class","card-text");
              descriptifCarte.setAttribute("style","font-size: 12px;");


            //Ajout descriptif dans l'emplacement
              emplacementDescriptif.appendChild(descriptifCarte);

            //Ajout de l'emplacement dans la carte
              carte.appendChild(emplacementDescriptif);


          //Ajout des éléments
            colCarte.appendChild(carte);
            ligneCarte.appendChild(colCarte);
            containerCarte.appendChild(ligneCarte);

        }
        //Ajouter le conteneur de carte dans la page
          parent.appendChild(containerCarte);

      }
    });

  //Appel de l'api
    let url = 'http://localhost/DUTINFO/M4102C-WebServices/Ledoux/TPP/server.php?categorie=' + categorie + '&langue=' + langueTrad + '&apiKey=a1b822da6e074842bb4cd2063a7a03f7';
    requete.open("GET",url);
    requete.responseType = 'json';
    requete.send();
}


function afficherArticlesParRecherche(){
  //Variables
    let parent = document.getElementById('idAffichage');
    let tailleDuContenu = parent.childNodes.length;

    let teamBlock = document.getElementById('idTeam');
    let tailleTeam = teamBlock.childNodes.length;

    let featBlock = document.getElementById('idFeatures');
    let tailleFeatures = featBlock.childNodes.length;

    let langueTrad = retournerValueLangue();

    let laRecherche = document.myForm.recherche.value;


    //Si personne à définie de langue on met le français par défaut
      if(langueTrad == undefined){
        langueTrad = "fr";
      }


  //Traitements
    //Supprimer les enfants du div de CONTENU
      for (let i=0 ; i<tailleDuContenu ; i++){
        parent.removeChild(parent.childNodes[0]);
      }

    //Supprimer le block feat
      for (let i=0 ; i<tailleFeatures ; i++){
        featBlock.removeChild(featBlock.childNodes[0]);
      }

    //Supprimer le block team
      for (let i=0 ; i<tailleTeam ; i++){
        teamBlock.removeChild(teamBlock.childNodes[0]);
      }

  //Création de la requet
    let requete = new XMLHttpRequest();

  //Callback
    requete.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        //Creation du container
          let containerCarte = document.createElement("div");
          containerCarte.setAttribute("class","container-fluid");

          //Création ligne
            let ligneCarte = document.createElement("div");
            ligneCarte.setAttribute("class","row");

        //CREATION DES CARTES
        for(articleCourant in requete.response.articles){
          //console.log(requete.response.articles[articleCourant].author);
          console.log(requete.response.articles[articleCourant].title);
          console.log(requete.response.articles[articleCourant].description);
          console.log("Type Requete = " + requete.response.typeRequete);
          console.log("Langue = " + requete.response.langue);

          //Création de la colone
            let colCarte = document.createElement("div");
            colCarte.setAttribute("class","col-md-4 col-sm-6 col-xs-12");

          //Création de la carte
            let carte = document.createElement("div");
            carte.setAttribute("class","card mb-3");

          //Création titre + ajout dans la carte
            //Suprésion des carractères inatendu comme "&#039;"   =  '
              let leTitreTab = requete.response.articles[articleCourant].title.split('&#039;');
              let laTailleTitre = leTitreTab.length;

              let leTitre = leTitreTab[0];
              for(let j=1 ; j < laTailleTitre ; j++){
                leTitre += "'" + leTitreTab[j];
              }
              //alert(leTitre);

            //Création et ajout du texte du titre
              let txtTitre = document.createTextNode(leTitre);
              let titreCarte = document.createElement("h5");
              titreCarte.setAttribute("class","card-title");
              titreCarte.setAttribute("style","font-size: 15px;");
              titreCarte.appendChild(txtTitre);

            //Ajout du titre à la carte
              carte.appendChild(titreCarte);

          //Création et ajout de l'image
            //Création Lien
              /*let leLien = document.createElement("a");
              leLien.setAttribute("href",requete.response.articles[articleCourant].url);*/


            //Création de l'image de la carte
              let imgCarte = document.createElement("img");
              imgCarte.setAttribute("style","height: 40%; width: 100%; display: block;");
              imgCarte.setAttribute("src",requete.response.articles[articleCourant].urlToImage);
              imgCarte.setAttribute("onclick","window.open(\"" + requete.response.articles[articleCourant].url + "\",\"popupMMN\",\"width=500,height=500\")");


            //Ajout de l'image dans le lien
              //leLien.appendChild(imgCarte);

            //Ajout du lien dans la carte
              carte.appendChild(imgCarte);

          //Création et ajout du descriptif
            //Création emplacement descriptif de la carte
              let emplacementDescriptif = document.createElement("div");
              emplacementDescriptif.setAttribute("class","card-body");

            //Création du descriptif de la carte
              let txtDescriptif = document.createTextNode(requete.response.articles[articleCourant].description);
              let descriptifCarte = document.createElement("p");
              descriptifCarte.appendChild(txtDescriptif);
              descriptifCarte.setAttribute("class","card-text");
              descriptifCarte.setAttribute("style","font-size: 12px;");


            //Ajout descriptif dans l'emplacement
              emplacementDescriptif.appendChild(descriptifCarte);

            //Ajout de l'emplacement dans la carte
              carte.appendChild(emplacementDescriptif);


          //Ajout des éléments
            colCarte.appendChild(carte);
            ligneCarte.appendChild(colCarte);
            containerCarte.appendChild(ligneCarte);

        }
        //Ajouter le conteneur de carte dans la page
          parent.appendChild(containerCarte);

      }
    });

  //Appel de l'api
    let url = 'http://localhost/DUTINFO/M4102C-WebServices/Ledoux/TPP/server.php?recherche=' + laRecherche + '&langue=' + langueTrad + '&apiKey=a1b822da6e074842bb4cd2063a7a03f7';
    requete.open("GET",url);
    requete.responseType = 'json';
    requete.send();
}


function afficherArticlesParPays(country){
  //Variables
    let parent = document.getElementById('idAffichage');
    let tailleDuContenu = parent.childNodes.length;

    let teamBlock = document.getElementById('idTeam');
    let tailleTeam = teamBlock.childNodes.length;

    let featBlock = document.getElementById('idFeatures');
    let tailleFeatures = featBlock.childNodes.length;

    let langueTrad = retournerValueLangue();

    //Si personne à définie de langue on met le français par défaut
      if(langueTrad == undefined){
        langueTrad = "fr";
      }


  //Traitements
    //Supprimer les enfants du div de CONTENU
      for (let i=0 ; i<tailleDuContenu ; i++){
        parent.removeChild(parent.childNodes[0]);
      }

    //Supprimer le block feat
      for (let i=0 ; i<tailleFeatures ; i++){
        featBlock.removeChild(featBlock.childNodes[0]);
      }

    //Supprimer le block team
      for (let i=0 ; i<tailleTeam ; i++){
        teamBlock.removeChild(teamBlock.childNodes[0]);
      }

  //Création de la requet
    let requete = new XMLHttpRequest();

  //Callback
    requete.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {

        //Creation du container
          let containerCarte = document.createElement("div");
          containerCarte.setAttribute("class","container-fluid");

          //Création ligne
            let ligneCarte = document.createElement("div");
            ligneCarte.setAttribute("class","row");

        //CREATION DES CARTES
        for(articleCourant in requete.response.articles){
          //console.log(requete.response.articles[articleCourant].author);
          console.log(requete.response.articles[articleCourant].title);
          console.log(requete.response.articles[articleCourant].description);
          console.log("Type Requete = " + requete.response.typeRequete);
          console.log("Langue = " + requete.response.langue);

          //Création de la colone
            let colCarte = document.createElement("div");
            colCarte.setAttribute("class","col-md-4 col-sm-6 col-xs-12");

          //Création de la carte
            let carte = document.createElement("div");
            carte.setAttribute("class","card mb-3");

          //Création titre + ajout dans la carte
            //Suprésion des carractères inatendu comme "&#039;"   =  '
              let leTitreTab = requete.response.articles[articleCourant].title.split('&#039;');
              let laTailleTitre = leTitreTab.length;

              let leTitre = leTitreTab[0];
              for(let j=1 ; j < laTailleTitre ; j++){
                leTitre += "'" + leTitreTab[j];
              }
              //alert(leTitre);

            //Création et ajout du texte du titre
              let txtTitre = document.createTextNode(leTitre);
              let titreCarte = document.createElement("h5");
              titreCarte.setAttribute("class","card-title");
              titreCarte.setAttribute("style","font-size: 15px;");
              titreCarte.appendChild(txtTitre);

            //Ajout du titre à la carte
              carte.appendChild(titreCarte);

          //Création et ajout de l'image
            //Création Lien
              /*let leLien = document.createElement("a");
              leLien.setAttribute("href",requete.response.articles[articleCourant].url);*/

            //Création de l'image de la carte
              let imgCarte = document.createElement("img");
              imgCarte.setAttribute("style","height: 40%; width: 100%; display: block;");
              imgCarte.setAttribute("src",requete.response.articles[articleCourant].urlToImage);
              imgCarte.setAttribute("onclick","window.open(\"" + requete.response.articles[articleCourant].url + "\",\"popupMMN\",\"width=500,height=500\")");


              //Ajout de l'image dans le lien
                //leLien.appendChild(imgCarte);

              //Ajout du lien dans la carte
                carte.appendChild(imgCarte);

          //Création et ajout du descriptif
            //Création emplacement descriptif de la carte
              let emplacementDescriptif = document.createElement("div");
              emplacementDescriptif.setAttribute("class","card-body");

            //Création du descriptif de la carte
              let txtDescriptif = document.createTextNode(requete.response.articles[articleCourant].description);
              let descriptifCarte = document.createElement("p");
              descriptifCarte.appendChild(txtDescriptif);
              descriptifCarte.setAttribute("class","card-text");
              descriptifCarte.setAttribute("style","font-size: 12px;");


            //Ajout descriptif dans l'emplacement
              emplacementDescriptif.appendChild(descriptifCarte);

            //Ajout de l'emplacement dans la carte
              carte.appendChild(emplacementDescriptif);


          //Ajout des éléments
            colCarte.appendChild(carte);
            ligneCarte.appendChild(colCarte);
            containerCarte.appendChild(ligneCarte);

        }
        //Ajouter le conteneur de carte dans la page
          parent.appendChild(containerCarte);

      }
    });

  //Appel de l'api
    let url = 'http://localhost/DUTINFO/M4102C-WebServices/Ledoux/TPP/server.php?pays=' + country + '&langue=' + langueTrad + '&apiKey=a1b822da6e074842bb4cd2063a7a03f7';
    requete.open("GET",url);
    requete.responseType = 'json';
    requete.send();
}


function choisirLangue(langueTraduction){
  //Variables
    let dropdownLangue = document.getElementById('idLangue');

  //Traitements
    //Changer Langue dans le dropdown
      if(langueTraduction == "fr"){
        dropdownLangue.innerHTML = "Français";
      } else if(langueTraduction == "en"){
        dropdownLangue.innerHTML = "English";
      } else if(langueTraduction == "es"){
        dropdownLangue.innerHTML = "Español";
      }

    //Définir la value
      dropdownLangue.value = langueTraduction;
}
