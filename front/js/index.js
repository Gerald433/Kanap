// rechercher les canapés
const REPONSE = await fetch("http://localhost:3000/api/products")
let canapes = await REPONSE.json()



console.log(canapes)

/* résultat du console Log = Affiche 1 tableau composé de 8 objets:

Décomposition type d'un objet:

0: 
altTxt:"Photo d'un canapé bleu, deux places"
colors: (3) ['Blue', 'White', 'Black']
description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
imageUrl: "http://localhost:3000/images/kanap01.jpeg"
name: "Kanap Sinopé"
price: 1849
_id: "107fb5b75607497b96722bda5b504926"
*/





/*HTML    A créer:

<a href="./product.html?id=42">
            <article>
              <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
              <h3 class="productName">Kanap name1</h3>
              <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
            </article>
          </a> -->



*/





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





console.log (linkTo)