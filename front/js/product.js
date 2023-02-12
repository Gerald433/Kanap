/**
 * Récupérer l'id du produit à afficher (l'id se trouve dans l'url)
 * @returns 
 */
function getId() {
    const myKeysValues = window.location.search;
    const urlParams = new URLSearchParams(myKeysValues);
    return urlParams.get('id');
}

/**
 * Récupère le panier (au sein du LS)
 * @returns un array d'objet représentant les canapés
 */
function getBasket() {
    // panier vide
    let basket = [];

    //Si la clef "basket" est trouvé dans le LS, sa valeur est stocké dans la variable basket
    if (localStorage.getItem("basket") !== null) {
        basket = JSON.parse(localStorage.getItem("basket"))
    }

    return basket
}

/**
 * 
 * @param {Object} produit Représente les données renseignés du canapé (au sein du DOM) 
 * @returns Vrai ou Faux, si les informations "saisies" sont conformes ou non 
 */
function isConform(produit) {
    // 1er - Si Couleur non renseignée
    if (produit.color === "") {
        alert("Veuillez renseigner la couleur")
        return false
    }

    // 2eme -  Si Quantité non renseignée (traduction de string en number avec parseInt)
    if (parseInt(produit.quantity) <= 0) {
        alert("Veuillez renseigner la quantité")
        return false
    }

    // Exigence de quantité
    if (produit.quantity < 1 || produit.quantity > 100) {
        alert("Veuillez sélectionner une quantité comprise entre 1 et 100.")
        return false
    }

    return true
}

/**
 * @descriptipon Cherche et retourne le produit désiré
 * @param {Object} product 
 * @param {Array} products 
 * @returns l'élément s'il à été trouvé, sinon, retourne undefined
 */
function findProduct(product, products) {
    let productFound = undefined
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === product.id && products[i].color === product.color) {
            productFound = products[i]
        }
    }
    return productFound
}

/**
 * @description Gère le click sur le bouton d'ajout du produit
 */
function handleClick(kanape) {

    // Je récupère les éléments du dom pour les manipuler
    const selColor = document.getElementById("colors")
    const inpQuant = document.getElementById("quantity")

    // Je stock les infos dans un objet "produit"
    const produit = {
        id: kanape._id,
        color: selColor.value,
        quantity: Number(inpQuant.value)
    }

    //Vérification des champs qui ont été "saisie"
    if (!isConform(produit)) {
        return
    }

    //Stockage des données dans l'array basket (représentant les données du LS)
    const productFound = findProduct(produit, basket)
    if (productFound === undefined) {
        basket.push(produit)
    } else {
        productFound.quantity += produit.quantity
    }

    //Mise à jour les données du local storage
    localStorage.setItem("basket", JSON.stringify(basket))
    alert("votre produit à bien été ajouté")
}

/**
 * @description Affiche le produit sur la page
 * @param {Objet} kanape représentant les données relative au canapé
 */
function displayProduct(kanape) {

    //Crée les élements et les ajoute à la page
    const image = document.createElement("img")
    image.src = kanape.imageUrl
    image.alt = kanape.altTxt

    const divContain = document.getElementsByClassName("item__img")
    divContain[0].appendChild(image)

    const titleH1 = document.getElementById("title")
    titleH1.textContent = kanape["name"]

    const price = document.getElementById("price")
    price.textContent = kanape["price"]

    const description = document.getElementById("description")
    description.textContent = kanape["description"]

    //  Boucle permettant de récupérer les différentes couleurs et de les intégrer comme enfants 
    for (let i = 0; i < kanape["colors"].length; i++) {

        let colorOption = document.createElement("option")
        colorOption.textContent = kanape["colors"][i]
        let eltOption = document.getElementById("colors")
        eltOption.appendChild(colorOption)

    }

    // Ajoute un évenement au click sur le bouton addToCart
    const btnAddCart = document.getElementById("addToCart")
    btnAddCart.addEventListener("click", function () {
        handleClick(kanape)
    })

}

let kanapId = getId()
const basket = getBasket()

fetch("http://localhost:3000/api/products/" + kanapId)
    .then(res => {
        if (!res.ok) {
            throw "Impossible de récupérer les informations."
        }
        return res.json()
    })
    .then(kanape => {
        displayProduct(kanape)
    })
    .catch(err => {
        console.log("dans le catch")
        console.error(err)
    })
