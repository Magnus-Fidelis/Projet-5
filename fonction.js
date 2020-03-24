
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

 function buttonbuy(response, panier)
 {
     let i = loadProduit();
     let produitchoisi = new Map([]);
     produitchoisi.set("name", response[i].name);
     produitchoisi.set("image", response[i].imageUrl);
     produitchoisi.set("_id", response[i]._id);
     produitchoisi.set("price", response[i].price);
     produitchoisi.set("otherData", keysvaluesObjets(response, i));
     panier.push(produitchoisi);
     console.log(panier);
 
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
  