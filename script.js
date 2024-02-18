document.addEventListener("DOMContentLoaded", function () {
  let card = document.querySelector('.container');

  card.classList.add('active');

  function typeWriter(elemento) {
    const rodapeArray = elemento.innerText.split('');
    elemento.innerHTML = '';
    rodapeArray.forEach((letra, i) => {
      setTimeout(function() {
        elemento.innerHTML += letra;
      }, 75 * i)
    });
  }
  
  const rodape = document.querySelector('.attribution');
  typeWriter(rodape);

});

