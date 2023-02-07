/**
 * @description Récupère les produits via l'API
 * @returns un array de produits
 */
async function getProducts() {
    try {
        const reponse = await fetch("http://localhost:3000/api/products")
        if (!reponse.ok) {
            throw "Impossible de récupérer les informations."
        }
        let canapes = await reponse.json()
        return canapes
    } catch (error) {
        console.error(error)
        return []
    }

}
/**
 * @description Affiche un produit sur la page
 * @param {Object} kanap 
 */
function displayProduct(kanap) {
    // Création du lien <a></a>
    const linkTo = document.createElement("a")
    let elementItems = document.getElementById("items")
    elementItems.appendChild(linkTo)

    linkTo.href = "./product.html?id=" + kanap._id




    // Création de l'article <article></article>
    const article = document.createElement("article")
    linkTo.appendChild(article)





    // Création de l'image dans l'article
    const image = document.createElement("img")
    image.src = kanap.imageUrl
    image.alt = kanap.altTxt

    article.appendChild(image)




    // Création du titre h3
    const titleH3 = document.createElement("h3")
    titleH3.className = "productName"
    titleH3.textContent = kanap.name

    article.appendChild(titleH3)

    // Création du paragraphe p
    const paragraphe = document.createElement("p")
    paragraphe.className = "productDescription"
    paragraphe.textContent = kanap.description

    article.appendChild(paragraphe)
}

let canapes = await getProducts()
for (let i = 0; i < canapes.length; i++) {
    displayProduct(canapes[i])
}
