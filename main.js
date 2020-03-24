function saveData(lienclique) {
    var nomliens = lienclique;
    //converts to JSON string the Object
    nomliens = JSON.stringify(nomliens);
    //creates a base-64 encoded ASCII string
    nomliens = btoa(nomliens);
    //save the encoded accout to web storage
    localStorage.setItem('_nomliens', nomliens);
 }


 var request = new XMLHttpRequest();
 request.onreadystatechange= function()
 {
		if (this.readyState == XMLHttpRequest.DONE && this.status ==200) 
		 {
			 var ours = JSON.parse(this.responseText);	// On reçoit un tableau des différentes catégories de produits	 
			 console.log('ours', ours);

			 document.getElementById('img1').innerHTML = "<img src='" + ours[0].imageUrl + "'>";
			}
 } 
request.open("GET", "http://localhost:3000/api/teddies/");
request.send(); 

var request = new XMLHttpRequest();
request.onreadystatechange= function()
{
	 if (this.readyState == XMLHttpRequest.DONE && this.status ==200)
		{
			var cameras = JSON.parse(this.responseText);	// On reçoit un tableau des différentes catégories de produits	 
			console.log('cameras', cameras);
			document.getElementById('img2').innerHTML = "<img src='" + cameras[0].imageUrl + "'>";
		 }
}
request.open("GET", "http://localhost:3000/api/cameras/");
request.send(); 


var request = new XMLHttpRequest();
request.onreadystatechange= function()
{
	 if (this.readyState == XMLHttpRequest.DONE && this.status ==200)
		{
			var furniture = JSON.parse(this.responseText);	// On reçoit un tableau des différentes catégories de produits	 
			console.log('furniture', furniture);
			document.getElementById('img3').innerHTML = "<img src='" + furniture[0].imageUrl + "'>";
		 }
}
request.open("GET", "http://localhost:3000/api/furniture/");
request.send(); 


document.getElementById('OursMain').addEventListener('click', function() {
  let nomliens = "teddies";
  saveData(nomliens);

});

document.getElementById('CameraVintage').addEventListener('click', function() {
  
  let nomliens = "cameras";
  saveData(nomliens);

});

document.getElementById('MeubleChene').addEventListener('click', function() {
  
  let nomliens = "furniture";
  saveData(nomliens);

});

/* saveData("test")

var request = new XMLHttpRequest();
request.onreadystatechange = function(){
 if (this.readyState == XMLHttpRequest.DONE && this.status == 200){
   var response = JSON.parse(this.responseText);
   console.log(response)
 }
}

request.open("GET", "http://localhost:3000/api/teddies");
request.send(); */

