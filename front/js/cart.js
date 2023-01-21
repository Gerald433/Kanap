// rechercher les canapés
const REPONSE = await fetch("http://localhost:3000/api/products")
let canapes = await REPONSE.json()



console.log(canapes)
/*

<h1>Votre panier</h1>
<section class="cart">
  <section id="cart__items">


  <!--  <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
    <div class="cart__item__img">
      <img src="../images/product01.jpg" alt="Photographie d'un canapé">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>Nom du produit</h2>
        <p>Vert</p>
        <p>42,00 €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
    </article> -->
    */





// 0: 
// altTxt: "Photo d'un canapé bleu, deux places"
// colors: (3) ['Blue', 'White', 'Black']
// description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
// imageUrl: "http://localhost:3000/images/kanap01.jpeg"
// name: "Kanap Sinopé"
// price: 1849
// _id: "107fb5b75607497b96722bda5b504926"


let listObjets = JSON.parse(localStorage.basket)

let sum = 0
let mult = 0
for (let i = 0; i < listObjets.length; i++) {

  let objetId = listObjets[i].id
  let objetColor = listObjets[i].color
  let objetQuantity = listObjets[i].quantity


  let elementFound
  for (let j = 0; j < canapes.length; j++) {
    console.log(listObjets[i].id, canapes[j]._id)
    if (listObjets[i].id === canapes[j]._id) {
      elementFound = canapes[j]
    }
  } console.log(elementFound)
  if (elementFound !== undefined) {
    // Création de l'article 

    const articleCartItem = document.createElement("article")
    const itemParent = document.querySelector("#cart__items")
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

    // création de la div cart__item__content__settings
    const cart__item__content__settings = document.createElement("div")
    cart__item__content__settings.className = "cart__item__content__settings"
    general.appendChild(cart__item__content__settings)

    // création de la div cart__item__content__settings__quantity
    const cart__item__content__settings__quantity = document.createElement("div")
    cart__item__content__settings__quantity.className = "cart__item__content__settings__quantity"
    cart__item__content__settings.appendChild(cart__item__content__settings__quantity)

    // création p quantity
    const p_quantity = document.createElement("p")
    p_quantity.textContent = "Qté : "
    cart__item__content__settings__quantity.appendChild(p_quantity)


    // input type = "number" class="itemQuantity" name = "itemQuantity" min = "1" max = "100" value = "42" >
    // création input quantity
    const i_quantity = document.createElement("input")
    i_quantity.setAttribute("type", "number")
    i_quantity.setAttribute("name", "itemQuantity")
    i_quantity.setAttribute("min", "1")
    i_quantity.setAttribute("max", "100")
    i_quantity.setAttribute("value", objetQuantity)
    i_quantity.className = "itemQuantity"
    cart__item__content__settings__quantity.appendChild(i_quantity)


    // parent = cart__item__content__settings
    // // <div class="cart__item__content__settings__delete">
    // <p class="deleteItem">Supprimer</p>
    // </div>

    // création de la div cart__item__content__settings__delete
    const cart__item__content__settings__delete = document.createElement("div")
    cart__item__content__settings__delete.className = "cart__item__content__settings__delete"
    cart__item__content__settings.appendChild(cart__item__content__settings__delete)



    // création <p class="deleteItem">Supprimer</p>
    const deleteItem = document.createElement("p")
    deleteItem.className = "deleteItem"
    deleteItem.textContent = "Supprimer"
    cart__item__content__settings.appendChild(deleteItem)





    //  <p>Total (<span id="totalQuantity"><!-- 2 --></span> articles) : <span id="totalPrice"><!-- 84,00 --></span> €</p>
    // ///////////////////////////////////////////////////////

   
  

    
    sum += objetQuantity;

    mult += elementFound.price * objetQuantity








    //  quant du LS * prix de la reponse fetch  

  }


  let placement = document.querySelector("#totalQuantity")
  placement.textContent = sum


  console.log(sum);




  let placementBis = document.querySelector("#totalPrice")
  placementBis.textContent = mult 


  console.log(mult);








  // function createElement(){

  // }














  // console.log(localStorage.basket.length)

  // function callItemFromStorage(){

  // }





}















