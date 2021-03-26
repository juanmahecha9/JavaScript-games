let altoBarra = 5;
let scoreP1 = 0;
let scoreP2 = 0;

//Estado
var state = {
  barra1: {
    x: 0,
    y: 5,
    h: altoBarra,
    color: "blue",
  },
  barra2: {
    x: 39,
    y: 5,
    h: altoBarra,
    color: "green",
  },
  ball: {
    x: aleatorio(19, 21),
    y: aleatorio(0, 39),
    //velocidad aleatoria
    vx: Math.ceil((Math.random() - 0.5) * 2) < 1 ? -1 : 1, //La función Math. ceil() devuelve el entero mayor o igual más próximo a un número dado
    vy: Math.ceil((Math.random() - 0.5) * 2) < 1 ? -1 : 1,
    color: "white",
  },
  red: {
    x: 20,
    y: 0,
    width: 0.2,
    height: canvas.height,
    color: "white",
  },
  tablero: {
    x: 0,
    y: 0,
    w: 40,
    h: 40,
    color: "black",
  },
};

function draw() {
  // background
  Rect(
    state.tablero.x,
    state.tablero.y,
    state.tablero.w,
    state.tablero.h,
    state.tablero.color
  );

  Rect(state.barra1.x, state.barra1.y, 1, state.barra1.h, state.barra1.color); //barra jugador 1
  Rect(state.barra2.x, state.barra2.y, 1, state.barra2.h, state.barra2.color); //barra jugador2
  Rect(state.ball.x, state.ball.y, 1, 1, state.ball.color); //bola

  Rect(
    state.red.x,
    state.red.y,
    state.red.width,
    state.red.height,
    state.red.color
  ); //red
}

function colide() {
  /* Parte superior e inferior */
  if (state.ball.y > 38) {
    //colicion en y, zona inferior
    state.ball.vy = -1;
  } else if (state.ball.y < 1) {
    //colicion en y zona suoerior
    state.ball.vy = 1;

    /* Laterales */
  } else if (state.ball.x > 39) {
    //Colicion en la zona de las x (derecha), punto
    // state.ball.vx = -1;
    //puntaje jugador izquierda
    scoreP1 = scoreP1 + 1;
    escribirP1(scoreP1);
    reset();
    if (scoreP1 == 10) {
      //Crear boton
      const button = document.createElement("button");
      button.type = "button";
      button.innerText = "Reiniciar juego.";
      button.setAttribute("id", "iniciar");
      button.setAttribute("class", "btn btn-outline-success");
      button.setAttribute("onclick", "iniciar()");
      const agregar = document.getElementById("inicioJuego");
      agregar.appendChild(button);
      //Letrero ganador
      const h2 = document.createElement("h2");
      h2.innerText = " Ganador";
      const ganador = document.getElementById("ganador1");
      ganador.appendChild(h2);

      endGame();
    }
  } else if (state.ball.x < 0) {
    //Colicion en la zona de las x (izquierda), punto
    // state.ball.vx = 1;
    //puntaje jugador derecha
    scoreP2 = scoreP2 + 1;
    if (scoreP2 == 10) {
      //Crear boton
      const button = document.createElement("button");
      button.type = "button";
      button.innerText = "Reiniciar juego.";
      button.setAttribute("id", "iniciar");
      button.setAttribute("class", "btn btn-outline-success");
      button.setAttribute("onclick", "iniciar()");
      const agregar = document.getElementById("inicioJuego");
      agregar.appendChild(button);
      //Letrero ganador
      const h2 = document.createElement("h2");
      h2.innerText = " Ganador";
      const ganador = document.getElementById("ganador2");
      ganador.appendChild(h2);

      endGame();
    }
    escribirP2(scoreP2);
    reset();
  }

  /* Con el ciclo for se recorre la altura de la barra siempre hasta el total de la altura de total de la barra evaluada */
  //choque con la barra 1
  for (i = 0; i <= altoBarra; i++) {
    if (state.ball.x == state.barra1.x && state.ball.y == state.barra1.y + i) {
      //la bola toca la paleta
      state.ball.vx = -state.ball.vx;
      state.ball.color = "red";
    }
  }

  //choque con la barra 2
  for (i = 0; i <= altoBarra; i++) {
    if (state.ball.x == state.barra2.x && state.ball.y == state.barra2.y + i) {
      //la bola toca la paleta
      state.ball.vy = -state.ball.vy;
      state.ball.vx = -state.ball.vx;
      state.ball.color = "yellow";
    }
  }
  //hacer que las barras no se salgan del tablero
  if (state.barra1.y <= 0) {
    state.barra1.y = 0;
  } else if (state.barra1.y + (state.barra1.h - 1) >= 40) {
    state.barra1.y = 40 - state.barra1.h;
  }
  if (state.barra2.y <= 0) {
    state.barra2.y = 0;
  } else if (state.barra2.y + (state.barra2.h - 1) >= 40) {
    state.barra2.y = 40 - state.barra2.h;
  }
}

function update() {
  state.ball.x = state.ball.x + state.ball.vx; //Mover en diagonal
  state.ball.y = state.ball.y + state.ball.vy; //Mover eb diagonal
  colide(); //evaluar colicion
  draw(); //dibujar
}

function reset() {
  /* reiniciar fuego */
  state.ball.x = aleatorio(10, 30);
  state.ball.y = aleatorio(1, 38);
  // cambio de direccion de la bola
  state.ball.vy = -state.ball.vy;
  state.ball.vx = -state.ball.vx;
}

/* numero aletarorio para aparecer en el reset */
function aleatorio(inferior, superior) {
  let numPosibilidades = superior - inferior; //cuantos numeros hay para generar
  let aleatorio = Math.random() * (numPosibilidades + 1);
  aleatorio = Math.floor(aleatorio);
  return inferior + aleatorio;
}

function keydown(evt) {
  /* movimientos de la culebra por evento de teclas */
  key = evt.key;
  // console.log(key)
  if (key == "k" || key == "K") {
    /* tecla hacia abajo */
    state.barra2.y = state.barra2.y + 1;
  } else if (key == "o" || key == "O") {
    /* tecla hacia arriba */
    state.barra2.y = state.barra2.y - 1;
  } else if (key == "Z" || key == "z") {
    state.barra1.y = state.barra1.y + 1;
  } else if (key == "A" || key == "a") {
    state.barra1.y = state.barra1.y - 1;
  }
  draw();
}

document.addEventListener(
  "keydown",
  keydown
); /* Escuchar el evebti del teclado */

ctx = canvas.getContext("2d");
scale = 15; /* escala del tablero */
nx = Math.floor(canvas.width / scale); /* cuantos pixeles caben en x */
ny = Math.floor(canvas.height / scale); /* cuantos pixeles caben en y  */
Rect = function (x, y, w, h, color) {
  /* dibujo del tablero, tamaño y color del canvas */
  ctx.fillStyle = color;
  ctx.fillRect(
    x * scale,
    y * scale,
    w * scale - 1,
    h * scale - 1
  ); /* definir el tamaño del tablero */
};

draw(); /* dibujar */

//Puntaje J1
function escribirP1(x) {
  /* escribir el valor que tiene la culebra */
  document.getElementById("scoreP1").innerHTML = x;
}
//Puntaje J2
function escribirP2(x) {
  /* escribir el valor que tiene la culebra */
  document.getElementById("scoreP2").innerHTML = x;
}
//ciclo
function ciclo() {
  update();
  draw();
}

function endGame() {
  scoreP2 = 0;
  scoreP1 = 0;
  pauseAnimation();
  //posicion inicial del bird
}
function pauseAnimation() {
  //Limpiar intervalo, poner en 0
  clearInterval(intervalo);
}

function runGame() {
  //llamar la funcion con un lapso de tiempo
  intervalo = setInterval(ciclo, 1000 / 12);
}

function iniciar() {
  let d = document.getElementById("inicioJuego");
  let d_nested = document.getElementById("iniciar");
  let throwawayNode = d.removeChild(d_nested);
  // inicio del ciclo
  runGame();
}
