//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById ("boton").addEventListener("click", function(e){
        let email = document.getElementById ("inputEmail");
        let password = document.getElementById ("inputPassword");
        let completo = true;
        
        if (email.value === "") {
            email.classList.add("error");
            completo = false;
        }

        if (password.value === ""){
            password.classList.add("error");
            completo = false;
        }

        if (completo) {
            if (email.value, password.value) {
                localStorage.setItem('User-Logged', JSON.stringify({email: email.value}));
                window.location = "index.html"
            }else{
                alert ("Usuario o contraseña incorrecto!")
            }
        }else{
            alert ("Falta completar datos!")
        }
    })

});