const form = document.querySelector('#form-contact')
    form.addEventListener('submit', handleSubmit)

async function handleSubmit(event){
    event.preventDefault()
    const _form = new FormData(this)
    console.log(_form.get('name'))
    const response = await fetch(this.action,{
        method: this.method,
        body: _form,
        headers:{
            'Accept': 'application/json'
        }
    })

    if(response.ok){
        this.reset()
        let mensaje = document.getElementById('popup');
        if(langButton.textContent == "ES"){
            mensaje.querySelector('p').innerHTML = "Gracias por ponerte en contacto conmigo<br>¡Te escribiré pronto!";
        }else{
            mensaje.querySelector('p').innerHTML = "Thanks you for contacted me<br>I will write you soon!";
        }
        mensaje.classList.remove('hidden');
        setTimeout(()=>{
            mensaje.classList.add('hidden');
        },3500)
    }
}