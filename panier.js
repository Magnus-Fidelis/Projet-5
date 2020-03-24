function loadData() {
    var paniers = localStorage.getItem('_paniers');
    if (!paniers) return false;
    localStorage.removeItem('_paniers');
    //decodes a string data encoded using base-64
    //parses to Object the JSON string
    paniers = JSON.parse(paniers);
    return paniers;
 }
 let ContenuPanier = loadData();
 console.log(ContenuPanier);

let init = document.getElementById('init');
let totalprice = 0;
 for (let Produit of ContenuPanier)
 {
     let newDiv = document.createElement("div");
     newDiv.classList.add("Objet");
     init.appendChild(newDiv);

     let newPforName = document.createElement("p");
     newDiv.appendChild(newPforName);

     let newName = document.createTextNode("Nom:" + " " + Produit.name);
     newPforName.appendChild(newName);

     let newPforPersonnalisation = document.createElement("p"); 
     newDiv.appendChild(newPforPersonnalisation);

     let otherData = document.createTextNode("Options:" + " " + Produit.otherData);
     newPforPersonnalisation.appendChild(otherData);


     let newPforPrice = document.createElement("p");
     newDiv.appendChild(newPforPrice);

     let price = document.createTextNode("Prix:" + " " + Produit.price);
     newPforPrice.appendChild(price);
	
    totalprice = totalprice + Produit.price;
 }

 let newPforTotalPrice = document.createElement("p");
 init.appendChild(newPforTotalPrice);

 let newTotalprice = document.createTextNode("Prix total:" + " " + totalprice);
 newPforTotalPrice.appendChild(newTotalprice);
 
 let date = new Date();

 document.getElementById('date').innerHTML = " " + date.getDate() + " " + (date.getMonth()+1) + " " + date.getFullYear();
 

var form = document.getElementById("form_id");
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);


function validForm() {
	let  name = document.getElementById('name').value;
	let  email = document.getElementById('email').value;
	let emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if ( name ==='' || email === '') {
		alert("S'il vous plaît veuillez remplir tout les champs")
		return false;
	}
	else if(!(email).match(emailReg)){
		alert("Email invalide")
		return false;
	}
	else{
		return true;
	}
	
}

function sendForm() {
	let  name = document.getElementById('name').value;
	let  email = document.getElementById('email').value;
	let  prenom = document.getElementById('prenom').value;
	let  ville = document.getElementById('ville').value;
	let contact = {
		email: email,
		nom: name,
		prenom: prenom,
		ville: ville,


	}
	let total = {
		contact: contact,
		products: ContenuPanier,
	}
	if(validForm()){
		var request = new XMLHttpRequest();
	request.open("POST", "http://localhost:3000/api/teddies/order");
	request.setRequestHeader("Content-Type", "application/json", );
	request.send(JSON.stringify(total));
	request.onreadystatechange = function () {
		let items = JSON.parse(request.response);
		setTimeout(function(){
			saveData(items)
			window.location.href = "confirmation.html"
		},2000);
	}
	}
}

 function saveData(items){
	var saveitems = items;
	//converts to JSON string the Object
	saveitems = JSON.stringify(saveitems);
	//creates a base-64 encoded ASCII string
	saveitems = btoa(saveitems);
	//save the encoded accout to web storage
	localStorage.removeItem('_saveitems');
	localStorage.setItem('_saveitems', saveitems);
	
}

/* Ajouter required côté js pour le formulaire 
vérifier plan conforme 

implanter suppression panier

Retour arrière depuis le panier

*/

