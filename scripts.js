console.log("iniciando");
//Seleciona os elementos do form
const amount = document.querySelector("#amount");
const expense = document.querySelector("#expense"); 
const category = document.querySelector("#category");
const form = document.querySelector("form");


// Seleciona os elementos da lista 
const expenseList = document.querySelector("ul");   
const expenseQuantity =  document.querySelector("aside header p span");
const expenseTotal = document.querySelector("aside header h2");


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

//Metodo adiciona um novo item na lista 
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

        //Cria o valor despesa 
        const expenseAmount = document.createElement("span");
        expenseAmount.classList.add("expense-amount");
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
        .toUpperCase()
        .replace("R$", "")}`;


        //Cria o icone de remover

        const removeIcon = document.createElement("img");
        removeIcon.classList.add("remove-icon");
        removeIcon.setAttribute("src", "img/remove.svg");
        removeIcon.setAttribute("alt","Remover");


        // Adiciona name e category na div das informaçoes da despesa
        expenseInfo.append(expenseName, expenseCategory);

        //Adiciona as informaçoes no item
        
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon);

        //Adiciona o item na lista

        expenseList.append(expenseItem);

        //Atualiza os totais 
        
          updateTotals();

    } catch (error) {

        alert("Não foi possível atualizar a lista de despesas.");
       console.log(error); 

    }
  

}

//Atualiza os totais de despesas 

function updateTotals(){

    try {
        //Recupera os itens (LI)da nossa lista (UL)
        
        //Estou 
        const items = expenseList.children;
        
        //Atualiza a quantidade de itens da lista
        expenseQuantity.textContent = `${items.length} ${items.length> 1 ? "Despesas" : "Despesa"}`
        
        // Variavel para incrementar o total 

        let total = 0;

        // O FOR vai pecorrer cada item da lista (li), pegando o valor e somando
        for(let item =0; item < items.length; item++){


            const itemAmount = items[item].querySelector(".expense-amount");

            // Remover caracteres não numéricos e substutui a virgula pelo ponto
            let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",",".");

            // converte o valor para float
            value = parseFloat(value);

            //Verifica se é um número valido 
            if(isNaN(value)){
                return alert("Não foi possivel calcular");

            }

            // incrementar o valor total 

            total += Number(value)

            


        }

        // Criando a Span para adicionar R$ formatado 
        
        const symbolBRL = document.createElement("small");
        symbolBRL.textContent = "R$"


        // Formata o valor e remove o R$ que será exibido pela small com um estilo customizado

         total = formatCurrencyBRL(total).toUpperCase().replace("R$", "");

        // Limpa o comteúdo do elemento

        expenseTotal.innerHTML = "";

        //Adiciona o simbolo da moeda e o valor formatado 
        expenseTotal.append(symbolBRL, total);

    } catch (error) {
        console.log(error);
        alert("Algo deu errado... Tente novamente mais tarde");
        
    }


}
