/* Variables para el dibujo */
let birdDimensiones = 2;
let propiedadesTubo = {
  ancho: Math.floor((40 - 6) / 7),
  color: "green",
};

let state = {
  time: 0,
  bird: {
    x: 3,
    y: 20,
    w: birdDimensiones,
    h: birdDimensiones,
    vy: 0,
    color: "yellow",
  },
  tablero: {
    x: 0,
    y: 0,
    w: 40,
    h: 40,
    color: "#00FDEA",
  },
  nubes: [
    {
      x: 1,
      y: 3,
      w: 6,
      h: 4,
      color: "white",
    },
    {
      x: 9,
      y: 3,
      w: 6,
      h: 4,
      color: "white",
    },
    {
      x: 20,
      y: 3,
      w: 6,
      h: 4,
      color: "white",
    },
    {
      x: 33,
      y: 3,
      w: 6,
      h: 4,
      color: "white",
    },
  ],
  pipes: [newPipe()],
};
//Tuberia adicional
let pipeAd = {
  x: 40,
  y1: 10,
  y2: 20,
  w: propiedadesTubo.ancho,
  color: propiedadesTubo.color,
};
/* Contador de puntos */
let score = 0;

/* velocidad del juego */
let contadorVelocidad = 15;

/* Numeros aleatorias */
function aleatorio(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

/* Generar tubos */
function newPipe() {
  y1 = aleatorio(1, 40);
  y2 = aleatorio(1, 40);

  if (y1 == y2) {
    //si y1 == y2, arreglar
    return {
      x: 37,
      y1: 10,
      y2: 20,
      w: propiedadesTubo.ancho,
      color: propiedadesTubo.color,
    };
  }
  if (Math.abs(y1 - y2) < 4) {
    //si |y1-y2|<4 arreglar
    return {
      x: 40,
      y1: 10,
      y2: 40,
      w: propiedadesTubo.ancho,
      color: propiedadesTubo.color,
    };
  }
  if (y1 > y2) {
    //si y1 > y2
    return {
      x: 40,
      y1: y2,
      y2: y1,
      w: propiedadesTubo.ancho,
      color: propiedadesTubo.color,
    };
  } else {
    return {
      x: 40,
      y1: y1,
      y2: y2,
      w: propiedadesTubo.ancho,
      color: propiedadesTubo.color,
    };
  }
}

/* Dibujar */
function draw() {
  // dibujo del tablero
  Rect(
    state.tablero.x,
    state.tablero.y,
    state.tablero.w,
    state.tablero.h,
    state.tablero.color
  );
  // dibujo de las nubes
  for (let j = 0; j <= state.nubes.length - 1; j++) {
    Rect(
      state.nubes[j].x,
      state.nubes[j].y,
      state.nubes[j].w,
      state.nubes[j].h,
      state.nubes[j].color
    );
  }
  //dibujar tierra
  Rect(0, 39, 40, 1, "black");
  //dibujo de los tubos
  for (let i = 0; i <= state.pipes.length - 1; i++) {
    /* tubos en posicion de arriba */
    //Rect(x,y,w,h,color)
    Rect(
      state.pipes[i].x,
      0,
      state.pipes[i].w,
      state.pipes[i].y1,
      state.pipes[i].color
    );
    //posicion en state.pipes[i].x (x) es donde aparece la figura en el horizontal, state.pipes[i].y1 (y) es la posicion en vertical
    //state.pipes[i].w (w) es el ancho del tubo, state.pipes[i].h (h) sera la altura o distancia hacia abajo desde el punto y, y color es color
    Rect(
      state.pipes[i].x,
      state.pipes[i].y2,
      state.pipes[i].w,
      40 - state.pipes[i].y2,
      state.pipes[i].color
    );
    // dibujo del pajaro
    Rect(
      state.bird.x,
      state.bird.y,
      state.bird.w,
      state.bird.h,
      state.bird.color
    );
  }
}

/* Colicion */
function colide() {
  // esperar x segundos y crear un nuevo pipe
  state.time++;

  if (state.time > 16) {
    state.time = 0;
    state.pipes.push(newPipe());
  }
  //eliminar el pipe
  if (state.pipes[0].x < 0) {
    state.pipes.shift(); // eliminar el tubo
    //score
    score = score + 1;
    escribir(score);
  }

  /* coliciones con los limites del tablero */
  if (state.bird.y <= 0) {
    state.bird.vy = 0.3;
    state.bird.y = 1;
  } else if (state.bird.y >= 39) {
    state.bird.vy = -0.3;
    state.bird.y = 38;
  }

  /* colision con los tubos */
  for (let i = 0; i < state.pipes.length; i++) {
    let pipe = state.pipes[i];
    for (let j = state.pipes[i].y1; j <= state.pipes[i].y2; j++) {
      if (state.bird.x > pipe.x && state.bird.x < pipe.x + pipe.w) {
        if (state.bird.y < pipe.y1 || state.bird.y + state.bird.h > pipe.y2) {
          state.tablero.color = "red";
          draw();
          endGame();
        }
      }
    }
  }
}

/* funcion de actualizacion */
function update() {
  // movimiento del pajaro
  state.bird.y = state.bird.y + state.bird.vy;
  state.bird.vy = state.bird.vy + 0.2;
  //mover las nubes
  for (let j = 0; j <= state.nubes.length - 1; j++) {
    state.nubes[j].x =
      state.nubes[j].x +
      2 * (Math.ceil((Math.random() - 0.5) * 2) < 1 ? -1 : 1);
    //state.nubes[j].y = state.nubes[j].y + (Math.ceil((Math.random() - 0.5) * 2) < 1 ? -1 : 1);
  }
  // mover la tuberia hacia la izquierda
  for (let i = 0; i <= state.pipes.length - 1; i++) {
    state.pipes[i].x = state.pipes[i].x - 1;
  }
  colide();
  draw(); //dibujar
}

function keydown(evt) {
  /* movimientos por evento de teclas */
  key = evt.key;
  // console.log(key)
  if (key == " ") {
    // no le cambies la posicion, cambiale la velocidad
    state.bird.vy = state.bird.vy - 1;
  }
  draw();
  if (key != " ") {
    state.tablero.color = "#33FFF3";
    runProgram();
  }
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

//ciclo
function ciclo() {
  update();
  draw();
}

function endGame() {
  state.bird.y = 20;
  state.pipes = [];
  pauseAnimation();
  //posicion inicial del bird
}

function pauseAnimation() {
  state.pipes.push(pipeAd);
  clearInterval(intervalo);
}

//llamar la funcion con un lapso de tiempo
function runProgram() {
  state.tablero.color = "#00FDEA";
  score = -1;
  intervalo = setInterval(ciclo, 1000 / contadorVelocidad);
}

//Puntaje
function escribir(x) {
  /* escribir el valor que tiene la culebra */
  document.getElementById("score").innerHTML = x;
}
