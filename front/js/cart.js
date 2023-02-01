
//-------------------------------------------------
// init
//-------------------------------------------------
const REPONSE = await fetch("http://localhost:3000/api/products")
let canapes = await REPONSE.json()
console.log(canapes)
const itemParent = document.querySelector("#cart__items")

let listObjets = JSON.parse(localStorage.basket)
let sum = 0
let mult = 0


//-------------------------------------------------
// Création du panier
//-------------------------------------------------
// inspection du localStorage avec boucle for
for (let i = 0; i < listObjets.length; i++) {
  let objetId = listObjets[i].id
  let objetColor = listObjets[i].color
  let objetQuantity = listObjets[i].quantity

  // comparaison entre tableau du localStorage, et la liste d'objets de la réponse fetch
  let elementFound
  for (let j = 0; j < canapes.length; j++) {
    // si l'id d'un objet est strictement égal à l'id d'un canapé, alors elementFound stock les renseignements de l'objet canapé
    if (listObjets[i].id === canapes[j]._id) {
      elementFound = canapes[j]
      break
    }
  }
  // Si elementFound est défini, on crée la structure html attendue
  if (elementFound !== undefined) {

    // Création de l'article 
    const articleCartItem = document.createElement("article")

    itemParent.appendChild(articleCartItem)

    articleCartItem.className = "cart__item"
    articleCartItem.setAttribute("data-id", objetId)
    articleCartItem.setAttribute("data-color", objetColor)

    // Création de la div enfant 
    const divImg = document.createElement("div")
    articleCartItem.appendChild(divImg)
    divImg.className = "cart__item__img"

    // Création de l'image 
    const image = document.createElement("img")
    divImg.appendChild(image)
    image.src = elementFound.imageUrl
    image.alt = elementFound.altTxt

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
    name.textContent = elementFound.name
    nameColorPrice.appendChild(name)

    // création couleur du produit
    const color = document.createElement("p")
    color.textContent = objetColor
    nameColorPrice.appendChild(color)

    // création price du produit
    const price = document.createElement("p")
    price.textContent = elementFound.price + " €"
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
    i_quantity.setAttribute("value", objetQuantity)
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
      console.log(listObjets)

      recalculTotalQuantity()
      recalculTotalPrice()
    })



    //-------------------------------------------------
    // Incrémentation des totaux
    //-------------------------------------------------
    sum += objetQuantity;
    mult += elementFound.price * objetQuantity

  }


  //-------------------------------------------------
  //Injection des totaux
  //-------------------------------------------------
  let placement = document.querySelector("#totalQuantity")
  placement.textContent = sum
  let placementBis = document.querySelector("#totalPrice")
  placementBis.textContent = mult
}



//-------------------------------------------------
// Mes fonctions
//-------------------------------------------------

function recalculTotalQuantity() {

  let sum = 0
  for (let i = 0; i < listObjets.length; i++) {

    let quantity = listObjets[i].quantity

    sum += quantity;



  }
  let placement = document.querySelector("#totalQuantity")
  placement.textContent = sum
}

function recalculTotalPrice() {
  let toto = 0
  let mult = 0
  for (let i = 0; i < listObjets.length; i++) {
    let elementFound
    for (let j = 0; j < canapes.length; j++) {
      // si l'id d'un objet est strictement égal à l'id d'un canapé, alors elementFound stock les renseignements de l'objet canapé
      if (listObjets[i].id === canapes[j]._id) {
        elementFound = canapes[j]
        break
      }
    }

    let quantity = listObjets[i].quantity
    toto += (quantity * elementFound.price)

    console.log(quantity)
    console.log(elementFound.price)

  }
  let placementBis = document.querySelector("#totalPrice")
  placementBis.textContent = toto
}

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



//-------------------------------------------------
// vérification de renseignements formulaire
//-------------------------------------------------

// Prénom
let firstName = document.getElementById("firstName")

firstName.addEventListener("input", function () {
  let regexFirstName = /^[a-zàâäéèêëïîôöùûüÿç-]{1,15}$/i
  let resultControlFirstName = regexFirstName.test(firstName.value)
  let errorMessage = document.getElementById("firstNameErrorMsg")
  if (resultControlFirstName === false) {
    errorMessage.textContent = "Ce champ n'accepte que les caractères alphabétiques dans la limite de 1 à 15"
    return
  } else {
    errorMessage.textContent = ""
    return
  }
})

// nom
let lastName = document.getElementById("lastName")

lastName.addEventListener("input", function () {
  let regexLastName = /^[a-zàâäéèêëïîôöùûüÿç-]{1,15}$/i
  let resultControlLastName = regexLastName.test(lastName.value)
  let errorMessage = document.getElementById("lastNameErrorMsg")
  if (resultControlLastName === false) {
    errorMessage.textContent = "Ce champ n'accepte que les caractères alphabétiques dans la limite de 1 à 15"
    return
  } else {
    errorMessage.textContent = ""
    return
  }
})


// adress
let address = document.getElementById("address")

address.addEventListener("input", function () {
  let regexAddress = /^[a-z0-9-\sàâäéèêëïîôöùûüÿç]{1,50}$/i
  let resultControlAddress = regexAddress.test(address.value)
  let errorMessage = document.getElementById("addressErrorMsg")
  if (resultControlAddress === false) {
    errorMessage.textContent = "Ce champ n'accepte que les caractères alphanumériques dans la limite de 1 à 50"
    return
  } else {
    errorMessage.textContent = ""
    return
  }
})


// city
let city = document.getElementById("city")

city.addEventListener("input", function () {
  let regexCity = /^[a-z\sàâäéèêëïîôöùûüÿç-]{1,40}$/i
  let resultControlCity = regexCity.test(city.value)
  let errorMessage = document.getElementById("cityErrorMsg")
  if (resultControlCity === false) {
    errorMessage.textContent = "Ce champ n'accepte que les caractères alphabétiques dans la limite de 1 à 40"
    return
  } else {
    errorMessage.textContent = ""
    return
  }
})


// Email
let email = document.getElementById("email")

email.addEventListener("input", function () {
  let regexEmail = /^([a-z\d_\.-]+)@([a-z\d\.-]+)\.([a-z\.]{2,6})$/
  let resultControlEmail = regexEmail.test(email.value)
  let errorMessage = document.getElementById("emailErrorMsg")
  if (resultControlEmail === false) {
    errorMessage.textContent = "Ce champ doit contenir un '@' et n'accepte que les caractères alphabétiques minuscules et numériques dans la limite de 1 à 40"
    return
  } else {
    errorMessage.textContent = ""
    return
  }
})

//-------------------------------------------------
// Création d'un objet de contact
//-------------------------------------------------



/**
 *
 * Expects request to contain:
 * contact: {
 *   firstName: string,
 *   lastName: string,
 *   address: string,
 *   city: string,
 *   email: string
 * }
 * products: [string] <-- array of product _id
 *
 */



// solution plus intéressante
// products: listObjets.map((objet) =>objet.id)



//-------------------------------------------------
// Valider la commande
//-------------------------------------------------


let order = document.getElementById("order")

order.addEventListener("click", function (event) {
  event.preventDefault()
  // 1ere etape vérifier que tous les input sont bons
  // si c est ok envoyer le formulaire sinon afficher une alerte
  let body = {
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
  }
  console.log(body)
})





// chercher l'élément et le stocker dans une variable
//







    // ///////////////////////////////////
    // TABLEAU RENSEIGNEMENTS CLIENTS ///
    // //////////////////////////////////

    // const arrayClient = []
    // arrayId.push(document.getElementById("firstName"))
    // arrayId.push(document.getElementById("lastName"))
    // arrayId.push(document.getElementById("address"))
    // arrayId.push(document.getElementById("city"))
    // arrayId.push(document.getElementById("email"))


    //   // console.log(arrayClient)

    //   /////////////////////////////////////////////////////////////////////////





    //   // input.addEventListener ("change" , reaction() {
