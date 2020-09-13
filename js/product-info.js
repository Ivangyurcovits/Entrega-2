var product = {};
var commentArray = [];

function showProduct(product, commentArray) {

    let info = "";
    let imgs = "";
    let comentarios = "<hr>";

    info += '<h3>' + product.name + '</h3>';
    info += '<strong>' + product.currency + product.cost + '</strong><br>';
    info += '<i>' + product.description + '</i> <br>';

    imgs += '<img class="img" src= "' + product.images[0] + '" height="200px"  HSPACE="8" VSPACE="8" alt="">';
    imgs += '<img class="img" src= "' + product.images[1] + '" height="200px"  HSPACE="8" VSPACE="8" alt="">';
    imgs += '<img class="img" src= "' + product.images[2] + '" height="200px"  HSPACE="8" VSPACE="8" alt="">';
    imgs += '<img class="img" src= "' + product.images[3] + '" height="200px"  HSPACE="8" VSPACE="8" alt="">';
    imgs += '<img class="img" src= "' + product.images[4] + '" height="200px"  HSPACE="8" VSPACE="8" alt="">';


    commentArray.forEach(function (comment) {
        let puntos = "";
        comentarios += '<strong>' + comment.user + '</strong> dijo: <br>';
        comentarios += '<p>' + comment.description + '</p>'
        for (let i = 1; i <= comment.score; i++) {
            puntos += '<span class="fa fa-star checked"></span>';
        }
        for (let i = comment.score + 1; i <= 5; i++) {
            puntos += '<span class="fa fa-star"></span>';
        }
        comentarios += '<sub>' + comment.dataTime + '</sub><br>';
        comentarios += '<div style="text-align: right;">' + puntos + '</div><br><hr>';


    });
    document.getElementById("content").innerHTML = info;
    document.getElementById("images").innerHTML = imgs;
    document.getElementById("comments").innerHTML = comentarios;


}


document.addEventListener("DOMContentLoaded", function (e) {
    let userLogged = localStorage.getItem('User-Logged');
    if (userLogged) {
        document.getElementById('newComment').style = "display: inline-block";
    }
    document.getElementById("sendComm").addEventListener("click", function () {
        let now = new Date();
        let dateTime = now.getFullYear() + '/' + now.getMonth() + '/' + now.getDate();
        dateTime = now.getHours() + ':' + now.getMinutes();

        let newComment = {
            score: parseInt(document.getElementById('newCal').value),
            description: document.getElementById('newComm').value,
            user: JSON.parse(localStorage.getItem('User-Logged')).email
        };
        commentArray.push(newComment);
        showProduct(product, commentArray);
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            commentArray = resultObj.data;
        }
    });

    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            showProduct(product, commentArray);
        }
    });
});