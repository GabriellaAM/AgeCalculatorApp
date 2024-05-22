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

      limparErros()

      const qtdDias = calcularIdade();
      respYears.textContent = qtdDias.years;
      respMonths.textContent = qtdDias.months;
      respDays.textContent = qtdDias.days;

    } else {
      calcularIdade();
      validarData();
    }

  } else {
    errorMessageValidDay();
  }
});

function limparErros() {

  document.querySelectorAll('.activelabelinput2').forEach(label => label.classList.remove('activelabelinput2'))
  document.querySelectorAll('.activeinput2').forEach(input => input.classList.remove('activeinput2'))
  document.querySelectorAll('.activelabelinput').forEach(label => label.classList.remove('activelabelinput'))
  document.querySelectorAll('.activeinput1').forEach(input => input.classList.remove('activeinput1'))

  errorMessageDivMonth.style.color = "transparent";
  errorMessageDivYear.style.color = "transparent";
  errorMessageDivDay.style.color = "transparent";

}

function errorMessageValidDay() {

  let inserirdia = parseFloat(inputDay.value);
  let inserirmes = parseFloat(inputMonth.value);
  let inserirano = parseFloat(inputYear.value);

  let campoBorda;
  let labelRed;

  if (inserirdia == 0) {
    campoBorda = document.querySelectorAll('input')[0];
    labelRed = document.querySelector('.labelinputdia');

    errorMessageDivDay.style.color = "hsl(0, 100%, 67%)";
    errorMessageDivDay.innerText = "Must be a valid day";

    campoBorda.classList.add('activeinput1');
    labelRed.classList.add('activelabelinput');
  }

  if (isNaN(inserirdia)) {
    campoBorda = document.querySelectorAll('input')[0];
    labelRed = document.querySelector('.labelinputdia');

    errorMessageDivDay.style.color = "hsl(0, 100%, 67%)";
    errorMessageDivDay.innerText = "This field is required";

    campoBorda.classList.add('activeinput1');
    labelRed.classList.add('activelabelinput');
  }

  if (inserirmes == 0) {
    campoBorda = document.querySelectorAll('input')[1];
    labelRed = document.querySelector('.labelinputmes');

    errorMessageDivMonth.style.color = "hsl(0, 100%, 67%)";
    errorMessageDivMonth.innerText = "Must be a valid month";

    campoBorda.classList.add('activeinput1');
    labelRed.classList.add('activelabelinput');
  }

  if (isNaN(inserirmes)) {
    campoBorda = document.querySelectorAll('input')[1];
    labelRed = document.querySelector('.labelinputmes');

    errorMessageDivMonth.style.color = "hsl(0, 100%, 67%)";
    errorMessageDivMonth.innerText = "This field is required";

    campoBorda.classList.add('activeinput1');
    labelRed.classList.add('activelabelinput');
  }

  if (inserirano == 0) {
    campoBorda = document.querySelectorAll('input')[2];
    labelRed = document.querySelector('.labelinputano');

    errorMessageDivYear.style.color = "hsl(0, 100%, 67%)";
    errorMessageDivYear.innerText = "Must be a valid year";

    campoBorda.classList.add('activeinput1');
    labelRed.classList.add('activelabelinput');
  }

  if (isNaN(inserirano)) {
    campoBorda = document.querySelectorAll('input')[2];
    labelRed = document.querySelector('.labelinputano');

    errorMessageDivYear.style.color = "hsl(0, 100%, 67%)";
    errorMessageDivYear.innerText = "This field is required";

    campoBorda.classList.add('activeinput1');
    labelRed.classList.add('activelabelinput');
  }
}

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

  limparErros()

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

    if (labelRed && labelRed.classList.contains('activelabelinput2')) {
      labelRed.classList.remove('activelabelinput2');
    }

    if (campoBorda && campoBorda.classList.contains('activeinput2')) {
      campoBorda.classList.remove('activeinput2');
    }

    errorMessageDivYear.style.color = "hsl(0, 100%, 67%)";
    errorMessageDivYear.innerText = "Must be in the past";
    errorMessageDivMonth.style.color = "transparent";
    errorMessageDivDay.style.color = "transparent";


    campoBorda.classList.add('activeinput2');
    labelRed.classList.add('activelabelinput2');

    return false;
  }

  if (anoNascimento === anoAtual && (mesNascimento > mesAtual && mesNascimento < 13)) {

    labelRed = document.querySelector('.activelabelinput2');

    if (labelRed && labelRed.classList.contains('activelabelinput2')) {
      labelRed.classList.remove('activelabelinput2');
    }

    campoBorda = document.querySelector('.activeinput2');

    if (campoBorda && campoBorda.classList.contains('activeinput2')) {
      campoBorda.classList.remove('activeinput2');
    }

    campoBorda = document.querySelectorAll('input')[1];
    labelRed = document.querySelector('.labelinputmes');

    errorMessageDivMonth.style.color = "hsl(0, 100%, 67%)";
    errorMessageDivMonth.innerHTML = "Must be in the past";
    errorMessageDivYear.style.color = "transparent";
    errorMessageDivDay.style.color = "transparent";

    campoBorda.classList.add("activeinput2");
    labelRed.classList.add('activelabelinput2');

    return false;
  }

  if (anoNascimento === anoAtual && mesNascimento === mesAtual && diaNascimento > diaAtual) {

    labelRed = document.querySelector('.activelabelinput2');

    if (labelRed && labelRed.classList.contains('activelabelinput2')) {
      labelRed.classList.remove('activelabelinput2');
    }

    campoBorda = document.querySelector('.activeinput2');

    if (campoBorda && campoBorda.classList.contains('activeinput2')) {
      campoBorda.classList.remove('activeinput2');
    }

    campoBorda = document.querySelectorAll('input')[0];
    labelRed = document.querySelector('.labelinputdia');

    errorMessageDivDay.style.color = "hsl(0, 100%, 67%)";
    errorMessageDivDay.innerText = "Must be in the past";
    errorMessageDivMonth.style.color = "transparent";
    errorMessageDivYear.style.color = "transparent";

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

    if (labelRedAno && labelRedAno.classList.contains('activelabelinput')) {
      labelRedAno.classList.remove('activelabelinput');
    }

    if (labelRedMes && labelRedMes.classList.contains('activelabelinput')) {
      labelRedMes.classList.remove('activelabelinput');
    }

    if (campoBordaMes && campoBordaMes.classList.contains('activeinput1')) {
      campoBordaMes.classList.remove('activeinput1');
    }

    if (campoBordaAno && campoBordaAno.classList.contains('activeinput1')) {
      campoBordaAno.classList.remove('activeinput1');
    }

    errorMessageDivDay.style.color = "hsl(0, 100%, 67%)";
    errorMessageDivDay.innerText = "Must be a valid day";
    errorMessageDivMonth.style.color = "transparent";
    errorMessageDivYear.style.color = "transparent";

    campoBordaDia.classList.add('activeinput1');
    labelRedDia.classList.add('activelabelinput');

    return false;
  }

  if (mes < 1 || mes > 12) {

    if (labelRedDia && labelRedDia.classList.contains('activelabelinput')) {
      labelRedDia.classList.remove('activelabelinput');
    }

    if (labelRedAno && labelRedAno.classList.contains('activelabelinput')) {
      labelRedAno.classList.remove('activelabelinput');
    }

    if (campoBordaAno && campoBordaAno.classList.contains('activeinput1')) {
      campoBordaAno.classList.remove('activeinput1');
    }

    if (campoBordaDia && campoBordaDia.classList.contains('activeinput1')) {
      campoBordaDia.classList.remove('activeinput1');
    }

    errorMessageDivMonth.style.color = "hsl(0, 100%, 67%)";
    errorMessageDivMonth.innerText = "Must be a valid month";
    errorMessageDivDay.style.color = "transparent";
    errorMessageDivYear.style.color = "transparent";

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