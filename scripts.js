console.log("iniciando");
//Seleciona os elementos do form
const amount = document.querySelector("#amount");
const expense = document.querySelector("#expense"); 
const category = document.querySelector("#category");
const form = document.querySelector("form");

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
//Captura o evento de submit do form
form.onsubmit = (event)=>{
   
    //Para a funcao de recarregar pagina do button
    event.preventDefault();

    //Criamos um objeto com os detalhes da despesa
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        create_at: new Date(),
    }
    

}
