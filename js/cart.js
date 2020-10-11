
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
function showProduct(array) {
    let content = "";
    for (let i = 0; i < array.length; i++) {
        let articles = array[i];
        //let cost = coinConvert(articles.currency, articles.unitCost);
        let unitCost = articles.unitCost;
        let currency = articles.currency;
        if (currency === "USD") {
            articles.unitCost = articles.unitCost*40;
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
function calcShipping() {
    let total = parseInt(document.getElementById("total").innerHTML);
    let shipping;

    let elements = document.getElementsByName("shipping");
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].checked) {
            shipping = parseInt(elements[i].value);
        }
    }

    let totalWithShipping = total + shipping;

    let content = `
    <tr>
        <td>${total}</td>
        <td>${shipping}</td>
        <td>${totalWithShipping}</td>

    </tr>
    `
    document.getElementById("totalShipping").innerHTML = content;
}

document.addEventListener("DOMContentLoaded", function (e) {
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
});