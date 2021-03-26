function random(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

/* posiciones aleatorias */
function aleatorio(inferior, superior) {
  let numPosibilidades = superior - inferior; //cuantos numeros hay para generar
  let aleatorio = Math.random() * (numPosibilidades + 1);
  aleatorio = Math.floor(aleatorio);
  //console.log(aleatorio+inferior)
  return inferior + aleatorio;
}
