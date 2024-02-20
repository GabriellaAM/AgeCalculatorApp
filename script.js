let arrowButton = document.querySelector('.arrow');
let inputDay = document.querySelector('.dia');
let inputMonth = document.querySelector('.mes');
let inputYear = document.querySelector('.ano');
let respYears = document.querySelector('.response-years');
let respMonths = document.querySelector('.response-months');
let respDays = document.querySelector('.response-days');
let errorMessageDivDay = document.querySelector('.error-messageday');
let errorMessageDivMonth = document.querySelector('.error-messagemonth');
let errorMessageDivYear = document.querySelector('.error-messageyear');

arrowButton.addEventListener('click', () => {
  if (validarData()) {
    const qtdDias = calcularIdade();
    respYears.textContent = qtdDias.years;
    respMonths.textContent = qtdDias.months;
    respDays.textContent = qtdDias.days;
  } else {
    alert("Data inválida!");
  }
});

function anoBissexto(ano) {
  return (ano % 4 == 0 && ano % 100 != 0) || ano % 400 == 0;
}

function diasNoMes(mes, ano) {
  if (mes === 1) {
    return anoBissexto(ano) ? 29 : 28;
  } else if ([0, 2, 4, 6, 7, 9, 11].includes(mes)) {
    return 31;
  } else {
    return 30;
  }
}

function calcularIdade() {

  const diaAtual = new Date().getDate();
  const mesAtual = new Date().getMonth() + 1;
  const anoAtual = new Date().getFullYear();
  const diaNascimento = parseInt(inputDay.value);
  const mesNascimento = parseInt(inputMonth.value);
  const anoNascimento = parseInt(inputYear.value);

  let qtdDias = 0;
  let qtdMeses = 0;
  let qtdAnos = 0;

  if (anoNascimento > anoAtual || (anoNascimento === anoAtual && mesNascimento > mesAtual) || (anoNascimento === anoAtual && mesNascimento === mesAtual && diaNascimento > diaAtual)) {
    alert("Data de nascimento inválida!");
    return;
  }

  qtdAnos = anoAtual - anoNascimento;
  if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
    qtdAnos--;
  }

  if (mesAtual <= mesNascimento) {
    qtdMeses = (12 - mesNascimento) + mesAtual;
  } else {
    qtdMeses = mesAtual - mesNascimento;
  }

  if (diaAtual < diaNascimento) {
    qtdMeses--;
    qtdDias = diasNoMes(mesAtual - 1, anoAtual) + diaAtual - diaNascimento;
  } else {
    qtdDias = diaAtual - diaNascimento;
  }

  return { years: qtdAnos, months: qtdMeses, days: qtdDias };
}

function validarData() {
  const dia = parseInt(inputDay.value);
  const mes = parseInt(inputMonth.value);
  const ano = parseInt(inputYear.value);

  if (dia < 1 || dia > 31 || mes < 1 || mes > 12) {
    return false;
  }

  if (dia === 31 && [4, 6, 9, 11].includes(mes)) {
    return false;
  }

  if (mes === 2 && dia > 29) {
    return false;
  }

  if (mes === 2 && dia === 29 && !anoBissexto(ano)) {
    return false;
  }

  return true;
}

document.addEventListener("DOMContentLoaded", function () {
  let card = document.querySelector('.container');

  card.classList.add('active');

  function typeWriter(elemento) {

    const rodapeArray = elemento.innerText.split('');

    elemento.innerHTML = '';

    rodapeArray.forEach((letra, i) => {

      setTimeout(function () {

        if (i == 13) {
          elemento.innerHTML += `<a href="https://www.frontendmentor.io/" class="frontend">${letra}</a>`;
        } else if (i > 13 && i < 28) {
          rodape.querySelector('a.frontend').innerHTML += letra;
        } else if (i == 38) {
          elemento.innerHTML += `<a href="https://github.com/GabriellaAM" class="name">${letra}</a>`;
        } else if (i > 37 && i < 53) {
          rodape.querySelector('a.name').innerHTML += letra;
        } else {
          elemento.innerHTML += letra;
        }
      }, 80 * i)

    });

  }

  const rodape = document.querySelector('.attribution');
  typeWriter(rodape);

});

function errorMessage(inputField) {
  const valor = parseFloat(inputField.value);
  let campoBorda;
  let labelRed;

  // Ajustando os campos de borda e rótulos de acordo com o campo de entrada
  if (inputField === inputDay) {
    campoBorda = document.querySelectorAll('input')[0];
    labelRed = document.querySelectorAll('label')[0];
  } else if (inputField === inputMonth) {
    campoBorda = document.querySelectorAll('input')[1];
    labelRed = document.querySelectorAll('label')[1];
  } else if (inputField === inputYear) {
    campoBorda = document.querySelectorAll('input')[2];
    labelRed = document.querySelectorAll('label')[2];
  }

  // Lógica para exibir mensagens de erro e adicionar/remover classes 'active'
  if (valor == 0 || isNaN(valor)) {
    if (inputField === inputDay) {
      errorMessageDivDay.innerText = "This field is required";
    } else if (inputField === inputMonth) {
      errorMessageDivMonth.innerText = "This field is required";
    } else if (inputField === inputYear) {
      errorMessageDivYear.innerText = "This field is required";
    }
    campoBorda.classList.add('active');
    labelRed.classList.add('active');
  } else {
    if (inputField === inputDay) {
      errorMessageDivDay.innerText = "";
    } else if (inputField === inputMonth) {
      errorMessageDivMonth.innerText = "";
    } else if (inputField === inputYear) {
      errorMessageDivYear.innerText = "";
    }
    campoBorda.classList.remove('active');
    labelRed.classList.remove('active');
  }
}

// Adicionando listeners de evento para cada campo de entrada
inputDay.addEventListener('blur', (event) => {
  errorMessage(event.target);
});

inputMonth.addEventListener('blur', (event) => {
  errorMessage(event.target);
});

inputYear.addEventListener('blur', (event) => {
  errorMessage(event.target);
});