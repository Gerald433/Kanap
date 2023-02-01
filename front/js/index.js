// rechercher les canapés
const REPONSE = await fetch("http://localhost:3000/api/products")
let canapes = await REPONSE.json()



console.log(canapes)





for (let i = 0 ; i<canapes.length ; i++) {
// Création du lien <a></a>
const linkTo =  document.createElement("a")
let elementItems = document.getElementById ("items") 
elementItems.appendChild(linkTo)

linkTo.href = "./product.html?id=" + canapes[i]._id




// Création de l'article <article></article>
const article = document.createElement("article")
linkTo.appendChild(article)





// Création de l'image dans l'article
const image = document.createElement("img")
image.src = canapes[i].imageUrl
image.alt = canapes[i].altTxt

article.appendChild(image)




// Création du titre h3
const titleH3 = document.createElement("h3")
titleH3.className = "productName"
titleH3.textContent = canapes[i].name

article.appendChild(titleH3)

// Création du paragraphe p
const paragraphe = document.createElement("p")
paragraphe.className = "productDescription"
paragraphe.textContent = canapes[i].description

article.appendChild(paragraphe)
}




