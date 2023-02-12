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
 * @description Envoie les données (formulaire de contact + produits) à l'API
 * @returns un objet contenant l'id de la commande
 */
async function postOrder(body) {
  let reponse = await fetch("http://localhost:3000/api/products/order", {
    method: 'POST',
    headers: {
      'content-type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(body)
  })

  if (!reponse.ok) {
    throw new Error("Impossible de récupérer les informations.")
  }

  return await reponse.json();
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
    if (products[i]._id === product.id) {
      productFound = products[i]
    }
  }
  return productFound
}

/**
 * @descriptipon Affiche un produit (provenant du LS)
 */
function displayProduct(lsProduct, apiProduct) {
  // Création de l'article 
  const articleCartItem = document.createElement("article")

  itemParent.appendChild(articleCartItem)

  articleCartItem.className = "cart__item"
  articleCartItem.setAttribute("data-id", lsProduct.id)
  articleCartItem.setAttribute("data-color", lsProduct.color)

  // Création de la div enfant 
  const divImg = document.createElement("div")
  articleCartItem.appendChild(divImg)
  divImg.className = "cart__item__img"

  // Création de l'image 
  const image = document.createElement("img")
  divImg.appendChild(image)
  image.src = apiProduct.imageUrl
  image.alt = apiProduct.altTxt

  // création de la div  cart__item__content
  const general = document.createElement("div")
  general.className = "cart__item__content"
  articleCartItem.appendChild(general)

  // création de la div cart__item__content__description
  const nameColorPrice = document.createElement("div")
  nameColorPrice.className = "cart__item__content__description"
  general.appendChild(nameColorPrice)

  // création nom du produit
  const name = document.createElement("h2")
  name.textContent = apiProduct.name
  nameColorPrice.appendChild(name)

  // création couleur du produit
  const color = document.createElement("p")
  color.textContent = lsProduct.color
  nameColorPrice.appendChild(color)

  // création price du produit
  const price = document.createElement("p")
  price.textContent = apiProduct.price + " €"
  nameColorPrice.appendChild(price)

  // création de la div divSettings
  const divSettings = document.createElement("div")
  divSettings.className = "cart__item__content__settings"
  general.appendChild(divSettings)

  // création de la div divQuantity
  const divQuantity = document.createElement("div")
  divQuantity.className = "cart__item__content__settings__quantity"
  divSettings.appendChild(divQuantity)

  // création p quantity
  const p_quantity = document.createElement("p")
  p_quantity.textContent = "Qté : "
  divQuantity.appendChild(p_quantity)

  // création input quantity
  const i_quantity = document.createElement("input")
  i_quantity.setAttribute("type", "number")
  i_quantity.setAttribute("name", "itemQuantity")
  i_quantity.setAttribute("min", "1")
  i_quantity.setAttribute("max", "100")
  i_quantity.setAttribute("value", lsProduct.quantity)
  i_quantity.className = "itemQuantity"

  divQuantity.appendChild(i_quantity)

  // création de la div divDelete
  const divDelete = document.createElement("div")
  divDelete.className = "cart__item__content__settings__delete"
  divSettings.appendChild(divDelete)

  // création <p class="deleteItem">Supprimer</p>
  const deleteItem = document.createElement("p")
  deleteItem.className = "deleteItem"
  deleteItem.textContent = "Supprimer"

  divSettings.appendChild(deleteItem)
  //-------------------------------------------------
  //                   Fin du panier
  //-------------------------------------------------





  //-------------------------------------------------
  // Détection du changement de la quantité
  //-------------------------------------------------
  i_quantity.addEventListener('change', function (event) {
    let index = findIndexOfCanape(articleCartItem)
    listObjets[index].quantity = event.target.valueAsNumber
    localStorage.setItem("basket", JSON.stringify(listObjets))

    recalculTotalQuantity()
    recalculTotalPrice()

  })


  //-------------------------------------------------
  // détection delete
  //-------------------------------------------------
  deleteItem.addEventListener("click", function () {
    itemParent.removeChild(articleCartItem)
    let index = findIndexOfCanape(articleCartItem)
    listObjets.splice(index, 1)
    localStorage.setItem("basket", JSON.stringify(listObjets))

    recalculTotalQuantity()
    recalculTotalPrice()
  })



  //-------------------------------------------------
  // Incrémentation des totaux
  //-------------------------------------------------
  sum += lsProduct.quantity;
  mult += apiProduct.price * lsProduct.quantity



  //-------------------------------------------------
  //Injection des totaux
  //-------------------------------------------------
  let placement = document.querySelector("#totalQuantity")
  placement.textContent = sum
  let placementBis = document.querySelector("#totalPrice")
  placementBis.textContent = mult
}

/**
 * @descriptipon Calcul le total de la quantité des articles et l'affiche
 */
function recalculTotalQuantity() {

  let sum = 0
  for (let i = 0; i < listObjets.length; i++) {

    let quantity = listObjets[i].quantity

    sum += quantity;



  }
  let placement = document.querySelector("#totalQuantity")
  placement.textContent = sum
}

/**
 * @descriptipon Calcul le prix total et l'affiche
 */
function recalculTotalPrice() {
  let toto = 0
  for (let i = 0; i < listObjets.length; i++) {
    let elementFound = findProduct(listObjets[i], canapes)

    let quantity = listObjets[i].quantity
    toto += (quantity * elementFound.price)
  }
  let placementBis = document.querySelector("#totalPrice")
  placementBis.textContent = toto
}

/**
 * @descriptipon Récupère l'id du canapé (au sein du DOM grâce à l'attribut data-id)
 * @param {*} articleCartItem 
 * @returns 
 */
function findIndexOfCanape(articleCartItem) {
  let index
  for (let j = 0; j < listObjets.length; j++) {
    if (listObjets[j].id === articleCartItem.getAttribute("data-id")) {
      index = j
      break
    }
  }
  return index
}


const canapes = await getProducts()
const itemParent = document.querySelector("#cart__items")

let listObjets = []
if (localStorage.basket) {
  listObjets = JSON.parse(localStorage.basket)
}

let sum = 0
let mult = 0

//-------------------------------------------------
// Création du panier
//-------------------------------------------------
// inspection du localStorage avec boucle for
for (let i = 0; i < listObjets.length; i++) {
  let apiProduct = findProduct(listObjets[i], canapes)

  // Si apiProduct est défini, on crée la structure html attendue
  if (apiProduct !== undefined) {
    const lsProduct = {
      id: listObjets[i].id,
      color: listObjets[i].color,
      quantity: listObjets[i].quantity
    }
    displayProduct(lsProduct, apiProduct)
  }
}


//-------------------------------------------------
// vérification de renseignements formulaire
//-------------------------------------------------
/**
 * @description Vérifie l'input du prénom
 */
function checkFirstName() {
  let errorMessageFirstName = document.getElementById("firstNameErrorMsg")
  // utiliser ds 2 endroit au click sur order et au changement valeur input
  let regexFirstName = /^[a-zàâäéèêëïîôöùûüÿç-]{1,15}$/i
  let resultControlFirstName = regexFirstName.test(firstName.value)
  firstNameHasError = resultControlFirstName
  if (firstName.value.length > 15) {
    errorMessageFirstName.textContent = "Votre prénom contient trop de caractères"

  } else if (firstName.value.length < 1) {
    errorMessageFirstName.textContent = "Votre prénom n'est pas renseigné"

  } else if (resultControlFirstName === false) {
    errorMessageFirstName.textContent = "Ce champ n'accepte que les caractères alphabétiques dans la limite de 1 à 15"


  } else {
    errorMessageFirstName.textContent = ""

  }

}

/**
 * @descriptipon Vérifie l'input du nom de famille
 */
function checkLastName() {
  let errorMessageLastName = document.getElementById("lastNameErrorMsg")
  let regexLastName = /^[a-zàâäéèêëïîôöùûüÿç-]{1,15}$/i
  let resultControlLastName = regexLastName.test(lastName.value)
  lastNameHasError = resultControlLastName
  if (lastName.value.length > 15) {
    errorMessageLastName.textContent = "Votre nom contient trop de caractères"
  } else if (lastName.value.length < 1) {
    errorMessageLastName.textContent = "Votre nom n'est pas renseigné"
  } else if (resultControlLastName === false) {
    errorMessageLastName.textContent = "Ce champ n'accepte que les caractères alphabétiques dans la limite de 1 à 15"

  } else {
    errorMessageLastName.textContent = ""

  }
}

/**
 * @descriptipon Vérifie l'input de l'adresse
 */
function checkAddress() {
  let errorMessageAddress = document.getElementById("addressErrorMsg")
  let regexAddress = /^[a-z0-9-\sàâäéèêëïîôöùûüÿç]{1,50}$/i
  let resultControlAddress = regexAddress.test(address.value)
  addressHasError = resultControlAddress
  if (address.value.length > 50) {
    errorMessageAddress.textContent = "Votre adresse contient trop de caractères"
  } else if (address.value.length < 1) {
    errorMessageAddress.textContent = "Votre adresse n'est pas renseignée"
  } else if (resultControlAddress === false) {
    errorMessageAddress.textContent = "Ce champ n'accepte que les caractères alphanumériques dans la limite de 1 à 50"
  } else {
    errorMessageAddress.textContent = ""

  }
}

/**
 * @descriptipon Vérifie l'input de la ville
 */
function checkCity() {
  let errorMessageCity = document.getElementById("cityErrorMsg")
  let regexCity = /^[a-z\sàâäéèêëïîôöùûüÿç-]{1,40}$/i
  let resultControlCity = regexCity.test(city.value)
  cityHasError = resultControlCity
  if (city.value.length > 40) {
    errorMessageCity.textContent = "Votre ville contient trop de caractères"
  } else if (city.value.length < 1) {
    errorMessageCity.textContent = "Votre ville n'est pas renseignée"
  } else if (resultControlCity === false) {
    errorMessageCity.textContent = "Ce champ n'accepte que les caractères alphabétiques dans la limite de 1 à 40"

  } else {
    errorMessageCity.textContent = ""

  }
}

/**
 * @descriptipon Vérifie l'input de l'email
 */
function checkEmail() {
  let errorMessageEmail = document.getElementById("emailErrorMsg")
  let regexEmail = /^([a-z\d_\.-]+)@([a-z\d\.-]+)\.([a-z\.]{2,6})$/
  let resultControlEmail = regexEmail.test(email.value)
  emailHasError = resultControlEmail
  if (resultControlEmail === false) {
    errorMessageEmail.textContent = "Ce champ doit contenir un '@' et n'accepte que les caractères alphabétiques minuscules et numériques dans la limite de 1 à 40"
  } else {
    errorMessageEmail.textContent = ""

  }
}

let firstName = document.getElementById("firstName")
let lastName = document.getElementById("lastName")
let address = document.getElementById("address")
let city = document.getElementById("city")
let email = document.getElementById("email")

// flag
let firstNameHasError = false
let lastNameHasError = false
let addressHasError = false
let cityHasError = false
let emailHasError = false

firstName.addEventListener("input", checkFirstName)
lastName.addEventListener("input", checkLastName)
address.addEventListener("input", checkAddress)
city.addEventListener("input", checkCity)
email.addEventListener("input", checkEmail)

const order = document.getElementById("order")
order.addEventListener("click", async function (event) {
  // changer la réaction du click par défaut
  event.preventDefault()
  // si c est ok envoyer le formulaire sinon afficher une alerte

  checkFirstName()
  checkLastName()
  checkAddress()
  checkCity()
  checkEmail()

  if (
    firstNameHasError === true &&
    lastNameHasError === true &&
    addressHasError === true &&
    cityHasError === true &&
    emailHasError === true
  ) {
    try {
      const result = await postOrder({
        contact: {
          firstName: firstName.value,
          lastName: lastName.value,
          address: address.value,
          city: city.value,
          email: email.value,
        },

        products: listObjets.map(function (objet) {
          return objet.id
        })
      })

      // on envoie
      let orderId = result.orderId
      document.location = "http://127.0.0.1:5500/P5-Dev-Web-Kanap/front/html/confirmation.html?orderId=" + orderId

    } catch (error) {
      alert("Quelquechose s'est mal passé. Impossible de traiter votre commande pour l'instant. Veuillez essayer ultérieurement.")
    }
  } else {

    alert("veuillez corriger les erreurs du formulaire")
  }
})