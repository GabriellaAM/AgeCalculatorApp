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

    if (inserirdia == 0) {
      campoBorda = document.querySelectorAll('input')[0];
      labelRed = document.querySelector('.labelinputdia');

      errorMessageDivDay.style.color = "hsl(0, 100%, 67%)";
      errorMessageDivDay.innerText = "Must be a valid day";

      campoBorda.classList.add('activeinput1');
      labelRed.classList.add('activelabelinput1');
    }

    if (isNaN(inserirdia)) {
      campoBorda = document.querySelectorAll('input')[0];
      labelRed = document.querySelector('.labelinputdia');

      errorMessageDivDay.style.color = "hsl(0, 100%, 67%)";
      errorMessageDivDay.innerText = "This field is required";

      campoBorda.classList.add('activeinput1');
      labelRed.classList.add('activelabelinput1');
    }

    if (inserirmes == 0) {
      campoBorda = document.querySelectorAll('input')[1];
      labelRed = document.querySelector('.labelinputmes');

      errorMessageDivMonth.style.color = "hsl(0, 100%, 67%)";
      errorMessageDivMonth.innerText = "Must be a valid month";

      campoBorda.classList.add('activeinput1');
      labelRed.classList.add('activelabelinput1');
    }

    if (isNaN(inserirmes)) {
      campoBorda = document.querySelectorAll('input')[1];
      labelRed = document.querySelector('.labelinputmes');

      errorMessageDivMonth.style.color = "hsl(0, 100%, 67%)";
      errorMessageDivMonth.innerText = "This field is required";

      campoBorda.classList.add('activeinput1');
      labelRed.classList.add('activelabelinput1');
    }

    if (inserirano == 0) {
      campoBorda = document.querySelectorAll('input')[2];
      labelRed = document.querySelector('.labelinputano');

      errorMessageDivYear.style.color = "hsl(0, 100%, 67%)";
      errorMessageDivYear.innerText = "Must be a valid year";

      campoBorda.classList.add('activeinput1');
      labelRed.classList.add('activelabelinput1');
    }

    if (isNaN(inserirano)) {
      campoBorda = document.querySelectorAll('input')[2];
      labelRed = document.querySelector('.labelinputano');

      errorMessageDivYear.style.color = "hsl(0, 100%, 67%)";
      errorMessageDivYear.innerText = "This field is required";

      campoBorda.classList.add('activeinput1');
      labelRed.classList.add('activelabelinput1');
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

    campoBorda.classList.add('activeinput2');
    labelRed.classList.add('activelabelinput2');

    return false;
  }

  if (anoNascimento === anoAtual && (mesNascimento > mesAtual && mesNascimento < 13)) {

    campoBorda = document.querySelectorAll('input')[1];
    labelRed = document.querySelector('.labelinputmes');

    errorMessageDivMonth.style.color = "hsl(0, 100%, 67%)";
    errorMessageDivMonth.innerText = "Must be in the past";

    campoBorda.classList.add("activeinput2");
    labelRed.classList.add('activelabelinput2');

    return false;
  }

  if (anoNascimento === anoAtual && mesNascimento === mesAtual && diaNascimento > diaAtual) {
    campoBorda = document.querySelectorAll('input')[0];
    labelRed = document.querySelector('.labelinputdia');

    errorMessageDivDay.style.color = "hsl(0, 100%, 67%)";
    errorMessageDivDay.innerText = "Must be in the past";

    campoBorda.classList.add('activeinput2');
    labelRed.classList.add('activelabelinput2');

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

  campoBorda.classList.remove('activeinput2');
  labelRed.classList.remove('activelabelinput2');

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

    campoBordaDia.classList.add('activeinput1');
    labelRedDia.classList.add('activelabelinput');

    return false;
  }

  if (mes < 1 || mes > 12) {

    errorMessageDivMonth.style.color = "hsl(0, 100%, 67%)";
    errorMessageDivMonth.innerText = "Must be a valid month";

    campoBordaMes.classList.add('activeinput1');
    labelRedMes.classList.add('activelabelinput');

    return false;
  }

  if (dia === 31 && [4, 6, 9, 11].includes(mes)) {

    labelRed = document.querySelector('.labelinputdia');

    errorMessageDivDay.style.color = "hsl(0, 100%, 67%)";
    errorMessageDivDay.innerText = "Must be a valid date";

    campoBordaDia.classList.add('activeinput1');
    campoBordaMes.classList.add('activeinput1');
    campoBordaAno.classList.add('activeinput1');
    labelRedDia.classList.add('activelabelinput');
    labelRedMes.classList.add('activelabelinput');
    labelRedAno.classList.add('activelabelinput');

    return false;
  }

  if (mes === 2 && dia > 29) {

    labelRed = document.querySelector('.labelinputdia');

    errorMessageDivDay.style.color = "hsl(0, 100%, 67%)";
    errorMessageDivDay.innerText = "Must be a valid date";

    campoBordaDia.classList.add('activeinput1');
    campoBordaMes.classList.add('activeinput1');
    campoBordaAno.classList.add('activeinput1');
    labelRedDia.classList.add('activelabelinput');
    labelRedMes.classList.add('activelabelinput');
    labelRedAno.classList.add('activelabelinput');

    return false;
  }

  if (mes === 2 && dia === 29 && !anoBissexto(ano)) {

    labelRed = document.querySelector('.labelinputdia');

    errorMessageDivDay.style.color = "hsl(0, 100%, 67%)";
    errorMessageDivDay.innerText = "Must be a valid date";

    campoBordaDia.classList.add('activeinput1');
    campoBordaMes.classList.add('activeinput1');
    campoBordaAno.classList.add('activeinput1');
    labelRedDia.classList.add('activelabelinput');
    labelRedMes.classList.add('activelabelinput');
    labelRedAno.classList.add('activelabelinput');

    return false;
  }

  errorMessageDivDay.style.color = "transparent";
  errorMessageDivMonth.style.color = "transparent";

  labelRedDia.classList.remove('activelabelinput');
  labelRedMes.classList.remove('activelabelinput');
  labelRedAno.classList.remove('activelabelinput');

  campoBordaDia.classList.remove('activeinput1');
  campoBordaMes.classList.remove('activeinput1');
  campoBordaAno.classList.remove('activeinput1');

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

  if (isNaN(valor)) {
    if (inputField === inputDay) {
      errorMessageDivDay.style.color = "hsl(0, 100%, 67%)";
      errorMessageDivDay.innerText = "This field is required";
    } else if (inputField === inputMonth) {
      errorMessageDivMonth.style.color = "hsl(0, 100%, 67%)";
      errorMessageDivMonth.innerText = "This field is required";
    } else if (inputField === inputYear) {
      errorMessageDivYear.style.color = "hsl(0, 100%, 67%)";
      errorMessageDivYear.innerText = "This field is required";
    }

    campoBorda.classList.add('activeinput1');
    labelRed.classList.add('activelabelinput');
  }

  if (valor == 0) {
    if (inputField === inputDay) {
      errorMessageDivDay.style.color = "hsl(0, 100%, 67%)";
      errorMessageDivDay.innerText = "Must be a valid day";
    } else if (inputField === inputMonth) {
      errorMessageDivMonth.style.color = "hsl(0, 100%, 67%)";
      errorMessageDivMonth.innerText = "Must be a valid month";
    } else if (inputField === inputYear) {
      errorMessageDivYear.style.color = "hsl(0, 100%, 67%)";
      errorMessageDivYear.innerText = "Must be a valid year";
    }

    labelRed.classList.add('activelabelinput');
    campoBorda.classList.add('activeinput1');
  }

  else {

    if (inputField === inputDay) {
      errorMessageDivDay.style.color = "transparent";
    } else if (inputField === inputMonth) {
      errorMessageDivMonth.style.color = "transparent";
    } else if (inputField === inputYear) {
      errorMessageDivYear.style.color = "transparent";
    }

    labelRed.classList.remove('activelabelinput');
    campoBorda.classList.remove('activeinput1');
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