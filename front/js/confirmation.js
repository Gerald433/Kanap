// Adresse url avec l'Id de commande mis à jour
const orderId = getOrderId()

// intégration de la valeur d'orderId dans le html
displayOrderId(orderId)



function getOrderId() {
    const myKeysValues = window.location.search;
    const urlParams = new URLSearchParams(myKeysValues);
    return urlParams.get('orderId');
    
}

function displayOrderId(orderId) {
    const orderIdElement = document.querySelector("#orderId")
    orderIdElement.textContent = orderId
}

localStorage.removeItem('basket')









