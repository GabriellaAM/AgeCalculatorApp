document.addEventListener("DOMContentLoaded", function () {
  let card = document.querySelector('.container');

  card.classList.add('active');

  function typeWriter(elemento) {

  const rodapeArray = elemento.innerText.split('');

  elemento.innerHTML = '';

  rodapeArray.forEach((letra, i) => {

    setTimeout(function() {

      console.log(letra);
      console.log(i);

      if(i == 13) {
        elemento.innerHTML += `<a href="https://www.frontendmentor.io/" class="frontend">${letra}</a>`;
      } else if(i > 13 && i < 28) {
        rodape.querySelector('a.frontend').innerHTML += letra;
      } else if(i == 38) {
        elemento.innerHTML += `<a href="https://github.com/GabriellaAM" class="name">${letra}</a>`;
      } else if(i > 37 && i < 53) {
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

