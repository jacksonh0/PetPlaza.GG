//Settings
const weburl = window.location.origin;
const BotUsername = "PetPlazaBot";
const BotProfile = "https://www.roblox.com/users/1234567890/profile";
const VipServerLink = "https://www.roblox.com/share?code=c05069a02818f748ae05e781e3420498&type=Server";
const orderPrefix = "PPGG";
const validOrderId = "PPGG2876";  // Only this order ID is valid
//Settings End

let orderName;
let email;
let username;

function sendAPIrequest(type, endpoint, data) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open(type, weburl + "/clientApi" + endpoint, true);
        xhr.withCredentials = true;
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText))
                } else {
                    reject({
                        status: xhr.status,
                        response: xhr.responseText ? JSON.parse(xhr.responseText) : undefined
                    })
                }
            }
        };
        if (type == "POST" && data) {
            xhr.setRequestHeader('Content-Type', "application/json");
            xhr.send(JSON.stringify(data));
        } else {
            xhr.send();
        }
    });
}

function displayContainer(containerId) {
    document.querySelectorAll(".container > *").forEach((e) => {
        if (e.id == containerId) {
            e.classList.remove("hidden");
        } else {
            e.classList.add("hidden");
        }
    })
}

function showErrorContainer(error) {
    const errorContainer = document.querySelector("#error-container");
    const errorButton = errorContainer.querySelector("button");
    const errorTitle = errorContainer.querySelector(".titleText");
    const errorLabel = errorContainer.querySelector(".text");

    errorTitle.innerText = "An Error Occured";
    errorLabel.innerText = error;
    displayContainer("error-container");
}

// Order and Email Container
const orderContainer = document.querySelector("#info-container");
const orderInput = orderContainer.querySelector("#orderNumber");
const emailInput = orderContainer.querySelector("#email");
const orderButton = orderContainer.querySelector(".primaryBtn");

orderInput.placeholder = validOrderId;

const orderRegex = new RegExp(`^${validOrderId}$`, 'i');

orderInput.oninput = () => {
    if (orderRegex.test(orderInput.value)) {
        orderInput.classList.remove("error");
        if (emailRegex.test(emailInput.value)) {
            emailInput.classList.remove("error");
            orderButton.disabled = false;
        } else {
            emailInput.classList.add("error");
            orderButton.disabled = true;
        }
    } else {
        orderInput.classList.add("error");
        orderButton.disabled = true;
    }
};

const emailRegex = /^\w+([\.\-\+]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

emailInput.oninput = () => {
    if (emailRegex.test(emailInput.value)) {
        emailInput.classList.remove("error");
        if (orderRegex.test(orderInput.value)) {
            orderInput.classList.remove("error");
            orderButton.disabled = false;
        } else {
            orderInput.classList.add("error");
            orderButton.disabled = true;
        }
    } else {
        emailInput.classList.add("error");
        orderButton.disabled = true;
    }
};

function orderButtonPressed() {
    orderName = orderInput.value;
    if (orderName !== validOrderId) {
        return showErrorContainer("Invalid Order ID");
    }
    email = emailInput.value;
    if (!emailRegex.test(email)) {
        return showErrorContainer("Invalid Email Address");
    }
    emailInput.disabled = true;
    orderInput.disabled = true;
    orderButton.disabled = true;
    const ButtonTxt = orderButton.innerText;
    orderButton.innerText = "Checking...";

    sendAPIrequest("GET", `/verifyOrder?orderId=${orderName}&email=${email}`).then((resp) => {
        if (!resp["error"]) {
            displayContainer("user-container");
        }
    }).catch((err) => {
        emailInput.disabled = false;
        orderInput.disabled = false;
        orderButton.disabled = false;
        orderButton.innerText = ButtonTxt;
        showErrorContainer(err.response.error ? err.response.error : "Unknown Error");
    });
}

function userButtonPressed() {
    username = document.querySelector("#robloxUsername").value;
    sendAPIrequest("GET", `/userData?username=${username}`).then((resp) => {
        let thumbnail = resp.data.thumbnail;
        document.querySelector("#confirmation-container .userThumbnail").setAttribute("src", thumbnail);
        displayContainer("confirmation-container");
    }).catch((err) => {
        showErrorContainer("User not found");
    })
}

function claimButtonPressed() {
    sendAPIrequest("POST", "/claim", {
        username: username,
        email: email,
        orderId: orderName
    }).then((resp) => {
        displayContainer('bot-container');
    }).catch((err) => {
        showErrorContainer("Error during claim");
    })
}
