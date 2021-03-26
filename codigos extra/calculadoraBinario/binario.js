let elem = document.getElementById("res"); // obtener el div de respuesta

//Agregar el cero
function clickZero() {
  elem.innerHTML += "0";
}
//Agregar el uno
function clickUno() {
  elem.innerHTML += "1";
}

//Mirar si hay una operacion
function operacion() {
  if (
    elem.innerHTML.endsWith("+") ||
    elem.innerHTML.endsWith("-") ||
    elem.innerHTML.endsWith("*") ||
    elem.innerHTML.endsWith("/")
  ) {
    return true;
  }
}

//operaciones
function clickSum() {
  if (elem.innerHTML.length != 0 && !operacion()) {
    elem.innerHTML += "+";
  }
}

function clickRes() {
  if (elem.innerHTML.length != 0 && !operacion()) {
    elem.innerHTML += "-";
  }
}

function clickMul() {
  if (elem.innerHTML.length != 0 && !operacion()) {
    elem.innerHTML += "*";
  }
}

function clickDiv() {
  if (elem.innerHTML.length != 0 && !operacion()) {
    elem.innerHTML += "/";
  }
}

function clickClr() {
  elem.innerHTML = "";
}

//Solucion de la operacion
const btnEql = document.getElementById("btnEql");
btnEql.onclick = function () {
  let s = res.innerHTML; //respuesta
  s = Math.floor(eval(s.replace(/([01]+)/g, "0b$1"))).toString(2); //expresion binaria
  res.innerHTML = s;
};
