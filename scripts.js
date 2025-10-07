console.log("iniciando");

//Seleciona os elementos do form

const amount = document.querySelector("#amount");

//Evento que esta capturando o valor do input
amount.oninput = ()=>{
    //A variavel recebe o valor de amount e com a equacao tira caracteres 
    let value = amount.value.replace(/\D/g, "");

    //Transformar o valor em centavos 
    value = Number(value) / 100;

    //esta passando o valor de amount para o valor convertido de formatCurrencyBRL
    amount.value = formatCurrencyBRL(value);
    console.log(value);
}


function formatCurrencyBRL(value){
    //Formatando o valor no formato BRL 
    value = value.toLocaleString("pt-br", {
        style: "currency",
        currency:"BRL",
    })
    //Retorna o valor formatado 
    return value;

}
