console.log("iniciando");
//Seleciona os elementos do form
const amount = document.querySelector("#amount");
const expense = document.querySelector("#expense"); 
const category = document.querySelector("#category");
const form = document.querySelector("form");


// Seleciona os elementos da lista 
const expenseList = document.querySelector("ul");   

//Evento que esta capturando o valor do input
amount.oninput = ()=>{
    //A variavel recebe o valor de amount e com a equacao tira caracteres 
    let value = amount.value.replace(/\D/g, "");

    //Transformar o valor em centavos 
    value = Number(value) / 100;

    //esta passando o valor de amount para o valor convertido de formatCurrencyBRL
    amount.value = formatCurrencyBRL(value);
    
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
    
    //chamando o metodo que criamos abaixo
    expenseAdd(newExpense);
}


function expenseAdd(newExpense){

    try {
        //Cria um elemento de li para adicionar na lista (UL)

        const expenseItem = document.createElement("li");
        expenseItem.classList.add("expense");

        //Cria o icone da categoria

        const expenseIcon = document.createElement("img");
        expenseIcon.setAttribute("src",`img/${newExpense.category_id}.svg`);
        expenseIcon.setAttribute("alt", newExpense.category_name);

        //Cria a info da despesa 
        const expenseInfo = document.createElement("div");
        expenseInfo.classList.add("expense-info");

        //Nome da despesa
        const expenseName = document.createElement("strong");
        expenseName.textContent = newExpense.expense;

        //Cria a categoria da despesa
        const expenseCategory = document.createElement("span");
        expenseCategory.textContent = newExpense.category_name;

        // Adiciona name e category na div das informaçoes da despesa
        expenseInfo.append(expenseName, expenseCategory);

        //Adiciona as informaçoes no item
        
        expenseItem.append(expenseIcon, expenseInfo);

        //Adiciona o item na lista

        expenseList.append(expenseItem);



    } catch (error) {

        alert("Não foi possível atualizar a lista de despesas.");
       console.log(error); 

    }

}