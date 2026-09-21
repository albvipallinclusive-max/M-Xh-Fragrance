document.addEventListener("DOMContentLoaded", function () {

    let cart = [];

    const cartButton = document.getElementById("cart-button");
    const cartWindow = document.getElementById("cart-window");
    const closeCart = document.getElementById("close-cart");

    const cartItems = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    const addButtons = document.querySelectorAll(".add-button");
const checkoutButton = document.getElementById("checkout-button");
const orderForm = document.getElementById("order-form");
const sendOrder = document.getElementById("send-order");

    // HAP SHPORTËN
    cartButton.addEventListener("click", function () {
        cartWindow.classList.add("active");
    });


    // MBYLL SHPORTËN
    closeCart.addEventListener("click", function () {
        cartWindow.classList.remove("active");
    });


    // MBYLL SHPORTËN KUR KLIKON JASHTË KUTISË
    cartWindow.addEventListener("click", function (event) {

        if (event.target === cartWindow) {
            cartWindow.classList.remove("active");
        }

    });


    // SHTO PRODUKT NË SHPORTË
    addButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const name = button.dataset.name;
            const price = Number(button.dataset.price);

            const existingProduct = cart.find(function (product) {
                return product.name === name;
            });


            if (existingProduct) {

                existingProduct.quantity++;

            } else {

                cart.push({
                    name: name,
                    price: price,
                    quantity: 1
                });

            }

            updateCart();

        });

    });


    // PËRDITËSO SHPORTËN
    function updateCart() {

        cartItems.innerHTML = "";

        let totalItems = 0;
        let totalPrice = 0;


        cart.forEach(function (product, index) {

            totalItems += product.quantity;

            totalPrice += product.price * product.quantity;


            const item = document.createElement("div");

            item.className = "cart-item";


            item.innerHTML = `
                <div>
                    <h4>${product.name}</h4>
                   <p>${product.price.toLocaleString("sq-AL")} L × ${product.quantity}</p>
                </div>

                <button data-index="${index}">
                    Hiq
                </button>
            `;


            const removeButton = item.querySelector("button");


            removeButton.addEventListener("click", function () {

                cart.splice(index, 1);

                updateCart();

            });


            cartItems.appendChild(item);

        });


        cartCount.textContent = totalItems;

        cartTotal.textContent = totalPrice.toLocaleString("sq-AL") + " L";

    }
checkoutButton.addEventListener("click", function () {

    if (cart.length === 0) {
        alert("Shporta është bosh.");
        return;
    }

    orderForm.classList.add("active");
sendOrder.addEventListener("click", function () {

    const name = document.getElementById("customer-name").value.trim();
    const phone = document.getElementById("customer-phone").value.trim();
    const city = document.getElementById("customer-city").value.trim();
    const address = document.getElementById("customer-address").value.trim();
    const note = document.getElementById("customer-note").value.trim();

    if (!name || !phone || !city || !address) {
        alert("Ju lutem plotësoni të gjitha fushat kryesore.");
        return;
    }

    let orderText = "POROSI E RE\n\n";

    orderText += "Emri: " + name + "\n";
    orderText += "Telefoni: " + phone + "\n";
    orderText += "Qyteti: " + city + "\n";
    orderText += "Adresa: " + address + "\n";

    if (note) {
        orderText += "Shënim: " + note + "\n";
    }

    orderText += "\nPRODUKTET:\n";

    cart.forEach(function (product) {

        orderText +=
            product.name +
            " x " +
            product.quantity +
            " = " +
            (product.price * product.quantity) +
            " Lekë\n";

    });

    let totalPrice = 0;

    cart.forEach(function (product) {
        totalPrice += product.price * product.quantity;
    });

    orderText += "\nTOTAL: " + totalPrice + " Lekë";

    const whatsappNumber = "355696963053";

const whatsappURL =
    "https://wa.me/" +
    whatsappNumber +
    "?text=" +
    encodeURIComponent(orderText);

window.open(whatsappURL, "_blank");
});
});
});