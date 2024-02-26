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

  let inserirdia = parseFloat(inputDay.value);
  let inserirmes = parseFloat(inputMonth.value);
  let inserirano = parseFloat(inputYear.value);

  if (!(inserirdia == 0 || isNaN(inserirdia)) && !(inserirmes == 0 || isNaN(inserirmes)) && !(inserirano == 0 || isNaN(inserirano))) {

    if (validarData() && calcularIdade()) {
      const qtdDias = calcularIdade();
      respYears.textContent = qtdDias.years;
      respMonths.textContent = qtdDias.months;
      respDays.textContent = qtdDias.days;
    } else {
      calcularIdade();
      validarData();
    }

  } else {

    let campoBorda;
    let labelRed;

    if (inputDay == 0 || isNaN(inputDay)) {

      campoBorda = document.querySelectorAll('input')[0];
      labelRed = document.querySelector('.labelinputdia');

      errorMessageDivDay.style.color = "hsl(0, 100%, 67%)";

      campoBorda.classList.add('active');
      labelRed.classList.add('active');
    }

    if (inputMonth == 0 || isNaN(inputMonth)) {

      campoBorda = document.querySelectorAll('input')[1];
      labelRed = document.querySelector('.labelinputmes');

      errorMessageDivMonth.style.color = "hsl(0, 100%, 67%)";

      campoBorda.classList.add('active');
      labelRed.classList.add('active');
    }

    if (inputYear == 0 || isNaN(inputYear)) {

      campoBorda = document.querySelectorAll('input')[2];
      labelRed = document.querySelector('.labelinputano');

      errorMessageDivYear.style.color = "hsl(0, 100%, 67%)";

      campoBorda.classList.add('active');
      labelRed.classList.add('active');
    }

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

  let campoBorda;
  let labelRed;

  if (anoNascimento > anoAtual) {
    campoBorda = document.querySelectorAll('input')[2];
    labelRed = document.querySelector('.labelinputano');

    errorMessageDivYear.style.color = "hsl(0, 100%, 67%)";
    errorMessageDivYear.innerText = "Must be in the past";

    campoBorda.classList.add('active');
    labelRed.classList.add('active');

    return false;
  }

  if (anoNascimento === anoAtual && (mesNascimento > mesAtual && mesAtual < 13)) {
    campoBorda = document.querySelectorAll('input')[1];
    labelRed = document.querySelector('.labelinputmes');

    errorMessageDivMonth.style.color = "hsl(0, 100%, 67%)";
    errorMessageDivMonth.innerText = "Must be in the past";

    campoBorda.classList.add('active');
    labelRed.classList.add('active');

    return false;
  }

  if (anoNascimento === anoAtual && mesNascimento === mesAtual && diaNascimento > diaAtual) {
    campoBorda = document.querySelectorAll('input')[0];
    labelRed = document.querySelector('.labelinputdia');

    errorMessageDivDay.style.color = "hsl(0, 100%, 67%)";
    errorMessageDivDay.innerText = "Must be in the past";

    campoBorda.classList.add('active');
    labelRed.classList.add('active');

    return false;
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

  let campoBordaDia = document.querySelector('.dia');
  let campoBordaMes = document.querySelector('.mes');
  let campoBordaAno = document.querySelector('.ano');
  let labelRedDia = document.querySelector('.labelinputdia');
  let labelRedMes = document.querySelector('.labelinputmes');
  let labelRedAno = document.querySelector('.labelinputano');

  if (dia < 1 || dia > 31) {

    errorMessageDivDay.style.color = "hsl(0, 100%, 67%)";
    errorMessageDivDay.innerText = "Must be a valid day";

    campoBordaDia.classList.add('active');
    labelRedDia.classList.add('active');

    return false;
  }

  if (mes < 1 || mes > 12) {

    errorMessageDivMonth.style.color = "hsl(0, 100%, 67%)";
    errorMessageDivMonth.innerText = "Must be a valid month";

    campoBordaMes.classList.add('active');
    labelRedMes.classList.add('active');

    return false;
  }

  if (dia === 31 && [4, 6, 9, 11].includes(mes)) {

    labelRed = document.querySelector('.labelinputdia');

    errorMessageDivDay.style.color = "hsl(0, 100%, 67%)";
    errorMessageDivDay.innerText = "Must be a valid date";

    campoBordaDia.classList.add('active');
    campoBordaMes.classList.add('active');
    campoBordaAno.classList.add('active');
    labelRedDia.classList.add('active');
    labelRedMes.classList.add('active');
    labelRedAno.classList.add('active');

    return false;
  }

  if (mes === 2 && dia > 29) {
    labelRed = document.querySelector('.labelinputdia');

    errorMessageDivDay.style.color = "hsl(0, 100%, 67%)";
    errorMessageDivDay.innerText = "Must be a valid date";

    campoBordaDia.classList.add('active');
    campoBordaMes.classList.add('active');
    campoBordaAno.classList.add('active');
    labelRedDia.classList.add('active');
    labelRedMes.classList.add('active');
    labelRedAno.classList.add('active');

    return false;
  }

  if (mes === 2 && dia === 29 && !anoBissexto(ano)) {
    labelRed = document.querySelector('.labelinputdia');

    errorMessageDivDay.style.color = "hsl(0, 100%, 67%)";
    errorMessageDivDay.innerText = "Must be a valid date";

    campoBordaDia.classList.add('active');
    campoBordaMes.classList.add('active');
    campoBordaAno.classList.add('active');
    labelRedDia.classList.add('active');
    labelRedMes.classList.add('active');
    labelRedAno.classList.add('active');

    return false;
  }

  labelRedDia.classList.remove('active');
  labelRedMes.classList.remove('active');
  labelRedAno.classList.remove('active');

  campoBordaDia.classList.remove('active');
  campoBordaMes.classList.remove('active');
  campoBordaAno.classList.remove('active');

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

  if (inputField === inputDay) {
    campoBorda = document.querySelectorAll('input')[0];
    labelRed = document.querySelector('.labelinputdia');
  } else if (inputField === inputMonth) {
    campoBorda = document.querySelectorAll('input')[1];
    labelRed = document.querySelector('.labelinputmes');
  } else if (inputField === inputYear) {
    campoBorda = document.querySelectorAll('input')[2];
    labelRed = document.querySelector('.labelinputano');
  }

  if (valor == 0 || isNaN(valor)) {
    if (inputField === inputDay) {
      errorMessageDivDay.style.color = "hsl(0, 100%, 67%)";
    } else if (inputField === inputMonth) {
      errorMessageDivMonth.style.color = "hsl(0, 100%, 67%)";
    } else if (inputField === inputYear) {
      errorMessageDivYear.style.color = "hsl(0, 100%, 67%)";
    }

    campoBorda.classList.add('active');
    labelRed.classList.add('active');

  } else {
    if (inputField === inputDay) {
      errorMessageDivDay.style.color = "transparent";
    } else if (inputField === inputMonth) {
      errorMessageDivMonth.style.color = "transparent";
    } else if (inputField === inputYear) {
      errorMessageDivYear.style.color = "transparent";
    }
    campoBorda.classList.remove('active');
    labelRed.classList.remove('active');
  }
}

inputDay.addEventListener('blur', (event) => {
  errorMessage(event.target);
});

inputMonth.addEventListener('blur', (event) => {
  errorMessage(event.target);
});

inputYear.addEventListener('blur', (event) => {
  errorMessage(event.target);
});