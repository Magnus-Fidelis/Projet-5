function loadData(){
    
	var saveitems = localStorage.getItem('_saveitems');
	if (!saveitems) return false;
	
	//decodes a string data encoded using base-64
	saveitems = atob(saveitems);
	//parses to Object the JSON string
	saveitems = JSON.parse(saveitems);
	return saveitems;
}

let Commande = loadData();
console.log(Commande);

let init = document.getElementById('init');
let totalprice = 0;
 for (let Produit of Commande.products)
 {
    totalprice = totalprice + Produit.price;
 }

 let newPforTotalPrice = document.createElement("p");
 init.appendChild(newPforTotalPrice);

 let newTotalprice = document.createTextNode("Prix total:" + " " + totalprice);
 newPforTotalPrice.appendChild(newTotalprice);
 
 let newPfororderId = document.createElement("p");
 init.appendChild(newPfororderId);

 let orderId = document.createTextNode("Order Id:" + " " + Commande.orderId);
 newPfororderId.appendChild(orderId);

 let date = new Date();

 document.getElementById('date').innerHTML = " " + date.getDate() + " " + (date.getMonth()+1) + " " + date.getFullYear();


 
 

