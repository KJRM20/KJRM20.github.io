function copyEmail(){
    var textarea = document.getElementById('email-text');
    textarea.select();
    textarea.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(textarea.value).then(function() {
        let mensaje = document.getElementById('popup');
        if(langButton.textContent == "ES"){
            mensaje.querySelector('p').innerHTML = "El correo ha sido copiado al portapapeles.";
        }else{
            mensaje.querySelector('p').innerHTML = "The e-mail has been copied to the clipboard.";
        }
        mensaje.classList.remove('hidden');
        setTimeout(()=>{
            mensaje.classList.add('hidden');
        },3500)
    }).catch(function(error) {
        console.error("Error al copiar el texto: ", error);
    });
}