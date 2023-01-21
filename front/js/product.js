//Récupérer l'id à afficher (se trouve dans l'url)

const myKeysValues = window.location.search;
const urlParams = new URLSearchParams(myKeysValues);
const kanapId = urlParams.get('id');


// panier vide
let basket = [];

//Si la clef "basket" est trouvé dans le LS, alors on stock cette valeur
if (localStorage.getItem("basket") !== null) {
    basket = JSON.parse(localStorage.getItem("basket"))
}



fetch("http://localhost:3000/api/products/" + kanapId)
    .then(res => {

        return res.json()

    })
    .then(kanape => {

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

        // Ecoute au click du bouton
        const btnAddCart = document.getElementById("addToCart")
        btnAddCart.addEventListener("click", function () {

            // Fonction déclenchée suite au click...

            // Je récupère les éléments du dom pour les manipuler
            const selColor = document.getElementById("colors")
            const inpQuant = document.getElementById("quantity")

            // Objet contenant les éléments à passer au local storage
            const produit = {
                id: kanapId,
                color: selColor.value,
                quantity: Number(inpQuant.value)
            }




            // 2 Erreurs possibles à traiter: 

            // 1er - Si Couleur non renseignée
            if (selColor.value === "") {
                alert("Veuillez renseigner la couleur")
                return
            }


            // 2eme -  Si Quantité non renseignée (traduction de string en number avec parseInt)
            if (parseInt(inpQuant.value) <= 0) {
                alert("Veuillez renseigner la quantité")
                return
            }

            // Exigence de quantité
            if (produit.quantity < 1 || produit.quantity > 100) {
                alert("Veuillez sélectionner une quantité comprise entre 1 et 100.")
                return
            }




            // la valeur sera push dans basket

            let productFound
            for (let i = 0; i < basket.length; i++) {
                if (basket[i].id === produit.id && basket[i].color === produit.color) {
                    productFound = basket[i]
                }

            }
            if (productFound === undefined) {
                basket.push(produit)
            } else {
                productFound.quantity += produit.quantity
            }

            localStorage.setItem("basket", JSON.stringify(basket))




        })


    })
    .catch(err => {
        console.log("dans le catch")
        console.error(err)
    })








