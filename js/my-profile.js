//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    let profile = localStorage.getItem('profile');
    if (profile){
        profile = JSON.parse(profile);
        if (profile.imgUrl != ""){
            document.getElementById("imgProfile").src = profile.imgUrl;
        }
        document.getElementById('imgUrl').value = profile.imgUrl;
        document.getElementById('nombres').value = profile.nombres;
        document.getElementById('apellidos').value = profile.apellidos;
        document.getElementById('edad').value = profile.edad;
        document.getElementById('mail').value = profile.mail;
        document.getElementById('tel').value = profile.tel;

    }
    document.getElementById("confirmar").addEventListener("click", function(e){
        let passedvalidation = true;
        let imgUrl = document.getElementById('imgUrl');
        let nombres = document.getElementById('nombres');
        let apellidos = document.getElementById('apellidos');
        let edad = document.getElementById('edad');
        let mail = document.getElementById('mail');
        let tel = document.getElementById('tel');
        if (nombres.value === ''){
            nombres.classList.add('is-invalid');
            passedvalidation = false;
        }else{
            nombres.classList.remove('is-invalid');
        }
        if (apellidos.value === ''){
            apellidos.classList.add('is-invalid');
            passedvalidation = false;
        }else{
            apellidos.classList.remove('is-invalid');
        }
        if (mail.value === ''){
            mail.classList.add('is-invalid');
            passedvalidation = false;
        }else{
            mail.classList.remove('is-invalid');
        }
        if (passedvalidation){
            localStorage.setItem('profile', JSON.stringify({
                nombres: nombres.value,
                apellidos: apellidos.value,
                edad: edad.value,
                imgUrl: imgUrl.value,
                mail: mail.value,
                tel: tel.value
            }));
            window.location = "my-profile.html";
        }
    });
});