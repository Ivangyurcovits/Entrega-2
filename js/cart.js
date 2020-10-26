
var productArray = [];

function calcTotal() {
    let subs = document.getElementsByClassName("subtotal");
    let suma = 0;
    for (let i = 0; i < subs.length; i++) {
        suma += parseInt(subs[i].innerHTML)
    }
    document.getElementById("total").innerText = suma;
    calcShipping();
}

function calcSubtotal(unitCost, i) {
    let count = parseInt(document.getElementById(`count${i}`).value);
    let subtotal = count * unitCost;
    document.getElementById(`productSubtotal${i}`).innerHTML = subtotal;
    calcTotal();
}

function remove(i){
    productArray.splice(i, 1);
}
function showProduct(array) {
    let content = "";
    for (let i = 0; i < array.length; i++) {
        let articles = array[i];
        let unitCost = articles.unitCost;
        let currency = articles.currency;
        if (currency === "USD") {
            articles.unitCost = articles.unitCost * 40;
        }
        let sub = articles.unitCost * articles.count;
        content += `
        <tr>
            <td> <img src='${articles.src}' width="50px"></td>
            <td colspan="3"> ${articles.name}</td>
            <td>${articles.currency}</td>
            <td> ${unitCost}</td>
            <td><input style="width:60px;" onchange="calcSubtotal(${articles.unitCost}, ${i})" type="number" id="count${i}" value="${articles.count}" min="1"></td>
            <td><span class="subtotal" id="productSubtotal${i}" style="font-weight:bold;" > ${sub}</span></td>
        </tr>
        `
        document.getElementById("list").innerHTML = content;
    }
    calcTotal();
}
/*function coinConvert(moneda, cantidad) {
    switch (moneda) {
        case "USD":
            moneda = 40;
            break;
        case "UYU":
            moneda=1;
            break;
    }
    var resultado = moneda * cantidad;
    return resultado;
}
*/
function selectPay() {
    var pay = document.getElementsByName("wayToPay");
    for (var i = 0; i < pay.length; i++) {
        if (pay[i].checked && (pay[i].value) == "1") {
            document.getElementById("cardDetails").classList.remove("d-none");
            document.getElementById("bankDetails").classList.add("d-none");
        } else if (pay[i].checked && (pay[i].value) == "2") {
            document.getElementById("cardDetails").classList.add("d-none");
            document.getElementById("bankDetails").classList.remove("d-none");
        }
    }
}
function validPay() {
    let numCard = document.getElementById("numCard").value;
    let titularCard = document.getElementById("titularCard").value;
    let securityCard = document.getElementById("securityCard").value;
    let account = document.getElementById("account").value;
    let wayToPay = document.getElementsByName("wayToPay");
    let validatePay = true;

    for (var i = 0; i < wayToPay.length; i++) {
        if (wayToPay[i].checked && (wayToPay[i].value) == "1") {
            if (numCard == "" || titularCard == "" || securityCard == "") {
                validatePay = false;
            } else {
                validatePay = true;
            }
        } else if (wayToPay[i].checked && (wayToPay[i].value) == "2") {
            if (account == "") {
                validatePay = false;
            } else {
                validatePay = true;
            }
        }
    }
    return validatePay;
}

function calcShipping() {
    let total = parseInt(document.getElementById("total").innerHTML);
    let shipping;

    let elements = document.getElementsByName("shipping");
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].checked) {
            shipping = parseInt(elements[i].value);
        }
    }

    let totalWithShipping = total + (total / 100 * shipping);

    let content = `
    <tr>
        <td>${total}</td>
        <td>${total / 100 * shipping}</td>
        <td>${totalWithShipping}</td>

    </tr>
    `
    document.getElementById("totalShipping").innerHTML = content;
}

document.addEventListener("DOMContentLoaded", function (e) {

    let userLogged = localStorage.getItem('User-Logged');
    if (!userLogged) {
        localStorage.setItem('login-need', JSON.stringify({
            from: "cart.html",
            msg: "Tienes que estar logueado para acceder al carro de compras."
        }));
        window.location = "login.html";
    }

    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productArray = resultObj.data.articles;
            showProduct(productArray);
            calcShipping()
        }
    });

    let elements = document.getElementsByName("shipping");
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener("change", function () {
            calcShipping()
        });
    }

    let payType = document.getElementsByName("wayToPay");
    for (var i = 0; i < payType.length; i++) {
        payType[i].addEventListener("change", function () {
            selectPay();
        });
    }

    let form = document.getElementById('needs-validation');
    form.addEventListener('submit', function (e) {
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            if (validPay()) {
                document.getElementById("btnPay").classList.remove("btn-primary");
                document.getElementById("btnPay").classList.remove("btn-danger");
                document.getElementById("btnPay").classList.add("btn-success");
                document.getElementById("pay").innerHTML = `
                <br>
                <div class="alert alert-success alert-dismissible show" role="alert">
                <strong>Método de pago ingresado</strong>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                `;
            } else {
                e.preventDefault();
                e.stopPropagation();
                document.getElementById("btnPay").classList.remove("btn-primary");
                document.getElementById("btnPay").classList.remove("btn-success");
                document.getElementById("btnPay").classList.add("btn-danger");
                document.getElementById("pay").innerHTML = `
                <br>
                <div class="alert alert-danger alert-dismissible show" role="alert">
                <strong>Ingresa una forma de pago!</strong>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                `;
            }
        }else{
            if (validPay()){
                document.getElementById("buy").innerHTML = `
                <br><div class="alert alert-success alert-dismissible show" role="alert">
                <strong>Felicidades!</strong>
                <p>su compra ha sido realizada.</p>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="window.location.href='index.html'">
                    <span aria-hidden="true">&times;</span>
                </button>
                <div/>
                `;
            }else{
                e.preventDefault();
                e.stopPropagation();
                document.getElementById("btnPay").classList.remove("btn-primary");
                document.getElementById("btnPay").classList.remove("btn-success");
                document.getElementById("btnPay").classList.add("btn-danger");
                document.getElementById("pay").innerHTML = `
                <br>
                <div class="alert alert-danger alert-dismissible show" role="alert">
                <strong>Ingresa una forma de pago!</strong>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                `;
            }
        }
        form.classList.add('was-validated');
    });

});