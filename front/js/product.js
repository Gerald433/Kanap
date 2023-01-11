//Récupérer l'id à afficher (se trouve dans l'url)

const myKeysValues = window.location.search;
const urlParams = new URLSearchParams(myKeysValues);
const kanapId = urlParams.get('id');


fetch ("http://localhost:3000/api/products/" + kanapId)
.then(res=>{
    
    return res.json()

})
.then(kanape=>{
   
    const image = document.createElement("img")
    
    image.src = kanape.imageUrl
    
    image.alt = kanape.altTxt
    
    const divContain = document.getElementsByClassName("item__img")
   
    divContain[0].appendChild(image)
    
    console.log("dans le then")

    const titleH1 = document.getElementById("title")
    titleH1.textContent = kanape["name"]

    const price = document.getElementById("price")
    price.textContent = kanape["price"]

    const description = document.getElementById("description")
    description.textContent = kanape["description"]

    // const colors = document.getElementsByAttributeName("value")
    // colors.textContent = kanape["colors"["0","1","2"]]


    for(i=0; i<kanape[0["".length]]; i++){
       if ([i] !== ""){

        console.log("ca passe")

        let colorOption = document.createElement("option")
        colorOption.textContent = kanape["colors"[i]]
        let eltOption = document.getElementById("colors")
        eltOption.appendChild(colorOption)
       }
    }



    







    
})
.catch(err=>{
    console.log("dans le catch")
    console.log(err)
})









// let url = new URL(response);

// let id = url.searchParams.get("id");


// console.log ("id")

// Récupérer le nom du produit



// Récupérer le prix du produit


// Récupérer la description du produit


// Récupérer les couleurs du produit.


// function displayImg(img){
//     const templateElt = document.getElementById("")
//     const cloneElt = document.importNode(templateElt.content, true)

//     cloneElt.getElementById("item__img").href += "?id=" + img.id

// }


