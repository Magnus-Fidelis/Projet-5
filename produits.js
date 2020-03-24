
function keysObjets(listeobjets, numeroobjet){
    let keys = [];
        for (let [key, value] of Object.entries(listeobjets[numeroobjet])){
        
    
            keys.push(key);
            
        }
    
       
    
    return keys;
    }
    
    function valuesObjets(listeobjets, numeroobjet){
        let values = [];
            for (let [key, value] of Object.entries(listeobjets[numeroobjet])){
            
        
                values.push(value);
            }
        
           
        
        return values;
        }
    
        
    function keysvaluesObjets(listeobjets, numeroobjet){
        let keys_values = new Map([]);
        
            for (let [key, value] of Object.entries(listeobjets[numeroobjet])){
            
                if(key != "name" && key != "age" && key != "description" &&  key != "imageUrl" &&  key != "titre" &&  key != "price" &&  key != "_id")
                keys_values.set(key, value);
                
            }
            
            keys_values.set(1, ["a", "n", "e", "s", "c", "a"]);  
        const keys_values_object = Object.fromEntries(keys_values);
        
        return keys_values_object;
        }
    
    function saveData(numeroproduit){
        var ProduitChoisi = numeroproduit;
        //converts to JSON string the Object
        ProduitChoisi = JSON.stringify(ProduitChoisi);
        //creates a base-64 encoded ASCII string
        ProduitChoisi = btoa(ProduitChoisi);
        //save the encoded accout to web storage
        localStorage.removeItem('_ProduitChoisi');
        localStorage.setItem('_ProduitChoisi', ProduitChoisi);
        
    }
    
    function loadProduit(){
    
        var ProduitChoisi = localStorage.getItem('_ProduitChoisi');
        if (!ProduitChoisi) return false;
        
        //decodes a string data encoded using base-64
        ProduitChoisi = atob(ProduitChoisi);
        //parses to Object the JSON string
        ProduitChoisi = JSON.parse(ProduitChoisi);
        return ProduitChoisi;
    }

function loadData() {
    var nomliens = localStorage.getItem('_nomliens');
    if (!nomliens) return false;
    localStorage.removeItem('_nomliens');
    //decodes a string data encoded using base-64
    nomliens = atob(nomliens);
    //parses to Object the JSON string
    nomliens = JSON.parse(nomliens);
 
 
    console.log(nomliens)
    return nomliens;
 }

 let totalprice = 0;
 function buttonbuy(response, panier)
 {
     let i = loadProduit();
     let j = 0;
     let Personnalisations = []
     let othersData = keysvaluesObjets(response, i);

     for (let [key, value]of Object.entries(otherData))
     {
         j++;
         let Personnalisation = document.getElementById("ChoixOption" + j);
         let choix = Personnalisation.selectedIndex;
         let Personnalisationchoix = Personnalisation.options[choix].text
         Personnalisations.push(Personnalisationchoix);


		 }
		 

		let init = document.getElementById('contenu_panier');
		init.innerHTML = "";



     let produitchoisi = new Map([]);
     produitchoisi.set("name", response[i].name);
     produitchoisi.set("image", response[i].imageUrl);
     produitchoisi.set("_id", response[i]._id);
     produitchoisi.set("price", response[i].price);
     produitchoisi.set("otherData", Personnalisations);
     panier.push(produitchoisi);
		 console.log(panier);

		 for (let Produit of panier)
		 {
				 let newDiv = document.createElement("div");
				 newDiv.classList.add("Objet");
				 init.appendChild(newDiv);
 
				 let newPforName = document.createElement("p");
				 newDiv.appendChild(newPforName);
 
				 let newName = document.createTextNode("Nom:" + " " + Produit.get("name"));
				 newPforName.appendChild(newName);
 
				 let newPforPersonnalisation = document.createElement("p"); 
				 newDiv.appendChild(newPforPersonnalisation);
 
				 let otherData = document.createTextNode("Options:" + " " + Produit.get("otherData"));
				 newPforPersonnalisation.appendChild(otherData);
 
 
				 let newPforPrice = document.createElement("p");
				 newDiv.appendChild(newPforPrice);
 
				 let price = document.createTextNode("Prix:" + " " + Produit.get("price") + "$");
				 newPforPrice.appendChild(price);
			 
				 totalprice = totalprice + Produit.get("price");
		 }
		 
		let newPforTotalPrice = document.createElement("p");
		init.appendChild(newPforTotalPrice);

		let newTotalprice = document.createTextNode("Prix total:" + " " + totalprice + "$");
		console.log(totalprice);
		newPforTotalPrice.appendChild(newTotalprice);
 
 }
 
 function voirpanier(panier)
 {
    let paniers = mapToObject(panier);
    console.log(paniers);
    paniers = JSON.stringify(paniers);
    localStorage.setItem('_paniers', paniers);
    window.location.href='panier.html';

 }

 function mapToObject(maps){
    let paniers = [];
    for(let i in maps)
    {
    const obj = Object.fromEntries(maps[i]);
    paniers.push(obj);
    }
    return(paniers);
  } 
  
  
 nomliens = loadData();
 console.log(nomliens)
 var i = 0;
 let panier = [];
 

 document.getElementById('Voir_panier').addEventListener('click', voirpanier.bind(null, panier));
 
    var request = new XMLHttpRequest();
    request.onreadystatechange = function()
    {
      
       
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200)
        {
            var response = JSON.parse(this.responseText); // on reçoit un tableau de plusieurs tableau
            otherData = keysvaluesObjets(response, i); // on récupère les données dont le nom et le contenu ne nous sont pas connu à l'avance (les couleurs, les lentilles, le type de bois,...)
            saveData(i);
            document.getElementById('titre').innerHTML = response[i].name;
						document.getElementById('image').innerHTML = "<img id='images' src='"+response[i].imageUrl+"'>";
						console.log(response[i].description);
            document.getElementById('description').innerHTML = ""+ response[i].description;
            document.getElementById('price').innerHTML =  response[i].price; 

            if (otherData != undefined) // si il y a des données non standard elles généreront automatiquement un nouveau sélecteur avec leurs options afin de personnalisé le panier. 
            {
								let j = 0;
								let mySelect_Title = document.createElement('p')
								mySelect_Title.id = "Title_Option"
								
                for (let [key, value]of Object.entries(otherData))
                {
                    j++;
                    let mySelect = document.createElement('select')
                    mySelect.id = "ChoixOption" + j;
                    value.forEach(element => {
                        let myOption = document.createElement('option');
                        myOption.attributes.value = element
                        myOption.innerHTML = element
                        mySelect.appendChild(myOption);
                    });
										document.getElementById('dataname').appendChild(mySelect_Title)
										mySelect_Title.appendChild(mySelect)
                }
            }

// Bouton d'achat

            
            document.getElementById('produitsuivant').addEventListener('click', function(e) // Si on appuie sur le bouton on passe au produit suivant
            {
                i++;
                saveData(i);
                console.log(i);
    
                document.getElementById('dataname').innerHTML = "";
                if (i < response.length)
                {
                    
                    
                    

                    otherData = keysvaluesObjets(response, i);
                    document.getElementById('titre').innerHTML = response[i].name;
                    document.getElementById('image').innerHTML = "<img id='images' src='"+response[i].imageUrl+"'>";
                    document.getElementById('description').innerHTML ="description:" + response[i].description;
                    document.getElementById('price').innerHTML =  response[i].price;
        
										if (otherData != undefined) // si il y a des données non standard elles généreront automatiquement un nouveau sélecteur avec leurs options afin de personnalisé le panier. 
										{
												let j = 0;
												let mySelect_Title = document.createElement('p')
												mySelect_Title.id = "Title_Option"
												
												for (let [key, value]of Object.entries(otherData))
												{
														j++;
														let mySelect = document.createElement('select')
														mySelect.id = "ChoixOption" + j;
														value.forEach(element => {
																let myOption = document.createElement('option');
																myOption.attributes.value = element
																myOption.innerHTML = element
																mySelect.appendChild(myOption);
														});
														document.getElementById('dataname').appendChild(mySelect_Title)
														mySelect_Title.appendChild(mySelect)
												}
										}
                
                }
                else 
                {
                    i = 0;
                    saveData(i);

                    otherData = keysvaluesObjets(response, i);
                    document.getElementById('titre').innerHTML = response[i].name;
                    document.getElementById('image').innerHTML = "<img id='images' src='"+response[i].imageUrl+"'>";
                    document.getElementById('description').innerHTML = "description:" + response[i].description;
                    document.getElementById('price').innerHTML =  "" + response[i].price;
        
										if (otherData != undefined) // si il y a des données non standard elles généreront automatiquement un nouveau sélecteur avec leurs options afin de personnalisé le panier. 
										{
												let j = 0;
												let mySelect_Title = document.createElement('p')
												mySelect_Title.id = "Title_Option"
												
												for (let [key, value]of Object.entries(otherData))
												{
														j++;
														let mySelect = document.createElement('select')
														mySelect.id = "ChoixOption" + j;
														value.forEach(element => {
																let myOption = document.createElement('option');
																myOption.attributes.value = element
																myOption.innerHTML = element
																mySelect.appendChild(myOption);
														});
														document.getElementById('dataname').appendChild(mySelect_Title)
														mySelect_Title.appendChild(mySelect)
												}
										}
        
            
                
                } 
            })

						document.getElementById('produitprecedent').addEventListener('click', function(e) // Si on appuie sur le bouton on passe au produit suivant
            {
                i--;
                saveData(i);
                console.log(i);
    
                document.getElementById('dataname').innerHTML = "";
                if (i < response.length & i > 0)
                {
                    
                    
                    

                    otherData = keysvaluesObjets(response, i);
                    document.getElementById('titre').innerHTML = response[i].name;
                    document.getElementById('image').innerHTML = "<img id='images' src='"+response[i].imageUrl+"'>";
                    document.getElementById('description').innerHTML ="description:" + response[i].description;
                    document.getElementById('price').innerHTML =  response[i].price;
        
if (otherData != undefined) // si il y a des données non standard elles généreront automatiquement un nouveau sélecteur avec leurs options afin de personnalisé le panier. 
            {
								let j = 0;
								let mySelect_Title = document.createElement('p')
								mySelect_Title.id = "Title_Option"
								
                for (let [key, value]of Object.entries(otherData))
                {
                    j++;
                    let mySelect = document.createElement('select')
                    mySelect.id = "ChoixOption" + j;
                    value.forEach(element => {
                        let myOption = document.createElement('option');
                        myOption.attributes.value = element
                        myOption.innerHTML = element
                        mySelect.appendChild(myOption);
                    });
										document.getElementById('dataname').appendChild(mySelect_Title)
										mySelect_Title.appendChild(mySelect)
                }
            }
                
                }
                else 
                {
                    i = 0;
                    saveData(i);

                    otherData = keysvaluesObjets(response, i);
                    document.getElementById('titre').innerHTML = response[i].name;
                    document.getElementById('image').innerHTML = "<img id='images' src='"+response[i].imageUrl+"'>";
                    document.getElementById('description').innerHTML = "description:" + response[i].description;
                    document.getElementById('price').innerHTML =  "" + response[i].price;
        
if (otherData != undefined) // si il y a des données non standard elles généreront automatiquement un nouveau sélecteur avec leurs options afin de personnalisé le panier. 
            {
								let j = 0;
								let mySelect_Title = document.createElement('p')
								mySelect_Title.id = "Title_Option"
								
                for (let [key, value]of Object.entries(otherData))
                {
                    j++;
                    let mySelect = document.createElement('select')
                    mySelect.id = "ChoixOption" + j;
                    value.forEach(element => {
                        let myOption = document.createElement('option');
                        myOption.attributes.value = element
                        myOption.innerHTML = element
                        mySelect.appendChild(myOption);
                    });
										document.getElementById('dataname').appendChild(mySelect_Title)
										mySelect_Title.appendChild(mySelect)
                }
            }
        
            
                
                } 
            })
            
             
            document.getElementById('button_buy').addEventListener('click', buttonbuy.bind(null, response, panier)); 
        

        };
    }

request.open("GET", "http://localhost:3000/api/" + nomliens);
request.send(); 

document.getElementById('liste_produits').addEventListener('change', function(e) {
    document.getElementById('dataname').innerHTML = "";
    nomliens = this.options[this.selectedIndex].id;
    i = 0;
    saveData(i);

      var request = new XMLHttpRequest();
    request.onreadystatechange = function()
    {
      
       
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200)
        {
            var response = JSON.parse(this.responseText); // on reçoit un tableau de plusieurs tableau
            otherData = keysvaluesObjets(response, i); // on récupère les données dont le nom et le contenu ne nous sont pas connu à l'avance (les couleurs, les lentilles, le type de bois,...)
            saveData(i);
            document.getElementById('titre').innerHTML = response[i].name;
						document.getElementById('image').innerHTML = "<img id='images' src='"+response[i].imageUrl+"'>";
						console.log(response[i].description);
            document.getElementById('description').innerHTML = ""+ response[i].description;
            document.getElementById('price').innerHTML =  response[i].price; 

            if (otherData != undefined) // si il y a des données non standard elles généreront automatiquement un nouveau sélecteur avec leurs options afin de personnalisé le panier. 
            {
								let j = 0;
								let mySelect_Title = document.createElement('p')
								mySelect_Title.id = "Title_Option"
								
                for (let [key, value]of Object.entries(otherData))
                {
                    j++;
                    let mySelect = document.createElement('select')
                    mySelect.id = "ChoixOption" + j;
                    value.forEach(element => {
                        let myOption = document.createElement('option');
                        myOption.attributes.value = element
                        myOption.innerHTML = element
                        mySelect.appendChild(myOption);
                    });
										document.getElementById('dataname').appendChild(mySelect_Title)
										mySelect_Title.appendChild(mySelect)
                }
            }

            let olds = document.getElementById('produitsuivant');
            let newEs = olds.cloneNode(true);
            olds.parentNode.replaceChild(newEs, olds);

            document.getElementById('produitsuivant').addEventListener('click', function(e) // Si on appuie sur le bouton on passe au produit suivant
            {
                i++;
                saveData(i);
                
                document.getElementById('dataname').innerHTML = "";
                if (i < response.length)
                {
                    
                    
                    

                    otherData = keysvaluesObjets(response, i);
                    document.getElementById('titre').innerHTML = response[i].name;
                    document.getElementById('image').innerHTML = "<img id='images' src='"+response[i].imageUrl+"'>";
                    document.getElementById('description').innerHTML ="description:" + response[i].description;
                    document.getElementById('price').innerHTML =  "" + response[i].price;
        
										if (otherData != undefined) // si il y a des données non standard elles généreront automatiquement un nouveau sélecteur avec leurs options afin de personnalisé le panier. 
										{
												let j = 0;
												let mySelect_Title = document.createElement('p')
												mySelect_Title.id = "Title_Option"
												
												for (let [key, value]of Object.entries(otherData))
												{
														j++;
														let mySelect = document.createElement('select')
														mySelect.id = "ChoixOption" + j;
														value.forEach(element => {
																let myOption = document.createElement('option');
																myOption.attributes.value = element
																myOption.innerHTML = element
																mySelect.appendChild(myOption);
														});
														document.getElementById('dataname').appendChild(mySelect_Title)
														mySelect_Title.appendChild(mySelect)
												}
										}
                    i++;
                    saveData(i);
                    
                }
                else 
                {
                    i = 0;
                    saveData(i);
                    otherData = keysvaluesObjets(response, i);
                    document.getElementById('titre').innerHTML = response[i].name;
                    document.getElementById('image').innerHTML = "<img id='images' src='"+response[i].imageUrl+"'>";
                    document.getElementById('description').innerHTML = "description:" + response[i].description;
                    document.getElementById('price').innerHTML =  "" +  response[i].price;
        
										if (otherData != undefined) // si il y a des données non standard elles généreront automatiquement un nouveau sélecteur avec leurs options afin de personnalisé le panier. 
										{
												let j = 0;
												let mySelect_Title = document.createElement('p')
												mySelect_Title.id = "Title_Option"
												
												for (let [key, value]of Object.entries(otherData))
												{
														j++;
														let mySelect = document.createElement('select')
														mySelect.id = "ChoixOption" + j;
														value.forEach(element => {
																let myOption = document.createElement('option');
																myOption.attributes.value = element
																myOption.innerHTML = element
																mySelect.appendChild(myOption);
														});
														document.getElementById('dataname').appendChild(mySelect_Title)
														mySelect_Title.appendChild(mySelect)
												}
										}
        
            
                
                }
						})
						
						document.getElementById('produitprecedent').addEventListener('click', function(e) // Si on appuie sur le bouton on passe au produit suivant
            {
                i--;
                saveData(i);
                console.log(i);
    
                document.getElementById('dataname').innerHTML = "";
                if (i < response.length & i > 0)
                {
                    
                    
                    

                    otherData = keysvaluesObjets(response, i);
                    document.getElementById('titre').innerHTML = response[i].name;
                    document.getElementById('image').innerHTML = "<img id='images' src='"+response[i].imageUrl+"'>";
                    document.getElementById('description').innerHTML ="description:" + response[i].description;
                    document.getElementById('price').innerHTML =  response[i].price;
        
										if (otherData != undefined) // si il y a des données non standard elles généreront automatiquement un nouveau sélecteur avec leurs options afin de personnalisé le panier. 
										{
												let j = 0;
												let mySelect_Title = document.createElement('p')
												mySelect_Title.id = "Title_Option"
												
												for (let [key, value]of Object.entries(otherData))
												{
														j++;
														let mySelect = document.createElement('select')
														mySelect.id = "ChoixOption" + j;
														value.forEach(element => {
																let myOption = document.createElement('option');
																myOption.attributes.value = element
																myOption.innerHTML = element
																mySelect.appendChild(myOption);
														});
														document.getElementById('dataname').appendChild(mySelect_Title)
														mySelect_Title.appendChild(mySelect)
												}
										}
                
                }
                else 
                {
                    i = 0;
                    saveData(i);

                    otherData = keysvaluesObjets(response, i);
                    document.getElementById('titre').innerHTML = response[i].name;
                    document.getElementById('image').innerHTML = "<img id='images' src='"+response[i].imageUrl+"'>";
                    document.getElementById('description').innerHTML = "description:" + response[i].description;
                    document.getElementById('price').innerHTML = "" + response[i].price;
        
										if (otherData != undefined) // si il y a des données non standard elles généreront automatiquement un nouveau sélecteur avec leurs options afin de personnalisé le panier. 
										{
												let j = 0;
												let mySelect_Title = document.createElement('p')
												mySelect_Title.id = "Title_Option"
												
												for (let [key, value]of Object.entries(otherData))
												{
														j++;
														let mySelect = document.createElement('select')
														mySelect.id = "ChoixOption" + j;
														value.forEach(element => {
																let myOption = document.createElement('option');
																myOption.attributes.value = element
																myOption.innerHTML = element
																mySelect.appendChild(myOption);
														});
														document.getElementById('dataname').appendChild(mySelect_Title)
														mySelect_Title.appendChild(mySelect)
												}
										}
        
            
                
                } 
            })

            let old = document.getElementById('button_buy');
            let newE = old.cloneNode(true);
            old.parentNode.replaceChild(newE, old);
            document.getElementById('button_buy').addEventListener('click', buttonbuy.bind(null, response, panier));  


        };
    }

request.open("GET", "http://localhost:3000/api/" + nomliens);
request.send(); 
    

    
})



/*
const url = "http://localhost:3000/api/" + nomliens
request.open("GET", url);
                    for (value of Object.values(datas))
                    {
                        console.log(value);
                        console.log(datas);
                        document.getElementById('dataname').innerHTML += `<option value="${value}"> ${value} </option>`;
                    }

        for(let tableau of response){
            
            console.log(i); // On a désormais un tableau à chaque "bouclage"

            for (let [key, value] of Object.entries(tableau)){
                document.getElementById('produitchoisi').innerHTML = "<p>" + key + value + "</p>";
                console.log(key, value)
    
            }
document.getElementById('price').innerHTML = "<p>"+response[i][Object.keys(response[i])[3]]+"</p>";
        }*/



