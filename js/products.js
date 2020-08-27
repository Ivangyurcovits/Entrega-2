const ORDER_ASC_BY_COST = "cost -> COST";
const ORDER_DESC_BY_COST = "COST -> cost";
const ORDER_BY_RELEVANCE = "SOLDCOST -> soldcost";

//---------------------------------------------------------------------------

var productsArray = [];
var minCost = undefined;
var maxCost = undefined;


function sortCost(criterio, array) {
    let result = [];
    if (criterio === ORDER_ASC_BY_COST) {
        result = array.sort(function (a,b) {
            if (a.cost < b.cost) {return -1;}
            if (a.cost > b.cost) {return 1;}
            return 0;
        });
    }else if(criterio === ORDER_DESC_BY_COST) {
        result = array.sort(function (a,b){
            if (a.cost > b.cost) {return -1;}
            if (a.cost < b.cost) {return 1;}
            return 0;
        });
    }else if(criterio === ORDER_BY_RELEVANCE) {
        result = array.sort(function (a, b){
            if (a.soldCount > b.soldCount) {return -1;}
            if (a.soldCount < b.soldCount) {return 1;}
            return 0;
        });
    }
    return result;
}

function showProductsList(array) {

    let htmlContentToAppend = "";
    htmlContentToAppend += "<h1 align='center'>PRODUCTOS</h1><br>" ;
    for (let i = 0; i < array.length; i++) {
        let product = array[i];

        if (((minCost == undefined) || (minCost != undefined && parseInt(product.cost) >= minCost)) && 
        ((maxCost == undefined) || (maxCost != undefined && parseInt(product.cost) <= maxCost))){

        
        htmlContentToAppend += "<img src=" + product.imgSrc + "> <br>";
        htmlContentToAppend += "<strong>" + product.name + "</strong> <br>" + "PRECIO:  " + product.cost + "<br>" + product.description + "<hr>";
        }
    
        document.getElementById("prod").innerHTML = htmlContentToAppend;
    }

}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;

            showProductsList(productsArray);
        }
    });
    
    document.getElementById("sortCostAsc").addEventListener("click", function(){
        productsArray = sortCost(ORDER_ASC_BY_COST, productsArray);
        showProductsList(productsArray);
    })
    
    document.getElementById("sortCostDesc").addEventListener("click", function(){
        productsArray = sortCost(ORDER_DESC_BY_COST, productsArray);
        showProductsList(productsArray);
    })

    document.getElementById("sortRelevance").addEventListener("click", function (){
        productsArray = sortCost(ORDER_BY_RELEVANCE, productsArray);
        showProductsList(productsArray);
    })

    document.getElementById("filter").addEventListener("click", function(){
        
        minCost =document.getElementById("rank-min").value;
        maxCost = document.getElementById("rank-max").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
            minCost = parseInt(minCost);
        }else{
            minCost = undefined;
        }
        
        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
            maxCost = parseInt(maxCost);
        }else{
            maxCost = undefined;
        }
        showProductsList(productsArray);
    });
    document.getElementById("clean").addEventListener("click", function(){
        document.getElementById("rank-min").value = "";
        document.getElementById("rank-max").value = "";

        minCost = undefined;
        maxCost = undefined;

        showProductsList(productsArray);
    })

});
