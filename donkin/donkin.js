//Estado y variables del juego
let state = {
  tablero: {
    x: 0,
    y: 0,
    w: 40,
    h: 40,
    color: "black",
  },
  surfaces: [],
  stairs: [],
  user: {
    x: 1,
    y: 38,
    w: 1,
    h: 1,
    color: "blue",
    vx: 1,
    vy: 1,
  },
  mono: {
    x: 37,
    y: -3,
    w: 3,
    h: 3,
    color: "orange",
  },
  // barriles: [newBarril(35, 9, 1, 1, 'white')], // de prueba
  barriles: [newBarril()],
  time: 0,
};

//superficie (x donde inica, hasta donde x finaliza y y es la altura de la plataforma)
state.surfaces.push(...newSurface(39, 0, 40));
state.surfaces.push(...newSurface(25, 0, 35));
state.surfaces.push(...newSurface(20, 5, 40));
state.surfaces.push(...newSurface(15, 0, 35));
state.surfaces.push(...newSurface(10, 5, 40));
//escaleras (x inicial, y donde inicia, y donde finaliza)
state.stairs.push(...newStair(25, 24, 39));
state.stairs.push(...newStair(7, 19, 25));
state.stairs.push(...newStair(27, 14, 20));
state.stairs.push(...newStair(10, 9, 15));

let vidas = 3;
let velocidadJuego = 7;

function newSurface(y0, x0, x1) {
  var res = [];
  for (i = x0; i < x1; i++) {
    res.push({ x: i, y: y0 });
  }
  return res;
}

//x0, posicion de inicio
//y0, altura de inio
//y1, altura de las escaleras, hasta que y1 llega
function newStair(x0, y0, y1) {
  var res = [];
  for (j = y0; j < y1; j++) {
    res.push({ x: x0, y: j });
  }
  return res;
}

//generar barriles
function newBarril(x, y, w, h, color) {
  return {
    x: x,
    y: y,
    w: w,
    h: h,
    color: color,
    vx: -1,
    vy: 0,
  };
}

//Contexto y funcion rect
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

//dibujar
draw = function () {
  //Dibujar tablero
  Rect(
    state.tablero.x,
    state.tablero.y,
    state.tablero.w,
    state.tablero.h,
    state.tablero.color
  );

  for (pixel of state.surfaces) {
    Rect(pixel.x, pixel.y, 1, 1, "#FFF005");
  }
  for (pixel of state.stairs) {
    Rect(pixel.x, pixel.y, 1, 1, "green");
  }
  //Dibujar mono
  Rect(
    state.mono.x,
    state.mono.y,
    state.mono.w,
    state.mono.h,
    state.mono.color
  );
  //Dibujar barriles
  for (barril of state.barriles) {
    Rect(barril.x, barril.y, barril.w, barril.h, barril.color);
  }
  //Dibujar usuario
  Rect(
    state.user.x,
    state.user.y,
    state.user.w,
    state.user.h,
    state.user.color
  );
};

// funcion para el movimiento del sapo
function keydown(evt) {
  state.key = evt.key;
}
document.addEventListener(
  "keydown",
  keydown
); /* Escuchar el evebti del teclado */

//Generador de numeros aletorios de 1 en 1
function random(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}

//Generador numeros aleatorios posicion de 2 en 2
function aleatorio(min, max) {
  let valor = min + Math.floor(Math.random() * (max - min));
  //evaluarsi el numero es mayor al limite superior
  if (valor > max) {
    valor = max;
  } else if (valor % 2 == 0) {
    valor = valor;
  } else {
    valor = valor + 1;
  }
  return valor;
}

//Escribir en el html
function escribir(id, x) {
  document.getElementById(id).innerHTML = x;
}

//Funcion de ciclo para la animacion
function ciclo() {
  update();
  draw();
}

//Pausar animacion
function pauseAnimation() {
  clearInterval(intervalo);
}

//Reiniciar
function reiniciar() {
  location.reload();
}
////////////////////////////////////////////

/* Funcionamiento del juego */
function isXYOnSurface(x, y) {
  return isXYOnArray(x, y + 1, state.surfaces);
}
function isXYOnStair(x, y) {
  return isXYOnArray(x, y, state.stairs);
}
function isXYOnArray(x, y, array) {
  for (let j = 0; j <= array.length - 1; j++) {
    if (array[j].x == Math.round(x) && array[j].y == Math.round(y)) {
      return true;
    }
  }
  return false;
}
function isXYOnBarril(x, y) {
  return isXYOnArray(x, y, state.barriles);
}
//funcion update
update = function () {
  //mover el barril
  for (let barril in state.barriles) {
    state.barriles[barril].x =
      state.barriles[barril].x + state.barriles[barril].vx;
  }
  colide();
  escribir("cont1", vidas); // contador de las vidas
  draw();

  if (vidas == 0) {
    pauseAnimation();
    const button = document.createElement("button");
    button.type = "button";
    button.innerText = "Reiniciar juego.";
    button.setAttribute("id", "iniciar");
    button.setAttribute("class", "btn btn-outline-success");
    button.setAttribute("onclick", "reiniciar()");
    const agregar = document.getElementById("inicioJuego");
    agregar.appendChild(button);
    //poner vidas en el contador
    vidas = 3;
  }
};

//Colisiones
colide = function () {
  //caida del mono, animaciON
  let monoSuperficie = false;
  if (state.mono.y != 7) {
    state.mono.y++;
  } else if (state.mono.y == 7) {
    monoSuperficie = true; //para activar el disparo de los barriles
  }

  //agregar barriles, solo si el mono ya esta en la superficie
  state.time++;
  if (state.time > random(10, 20) && monoSuperficie) {
    state.time = 0;
    state.barriles.push(newBarril(35, 9, 1, 1, "white")); //agregar barril
    console.log(velocidadJuego);
  }

  //matar al mono
  for (let q = 0; q <= state.mono.h - 1; q++) {
    if (
      Math.round(state.user.x) == state.mono.x &&
      Math.round(state.user.y) == state.mono.y + q
    ) {
      state.barriles = [];
      state.mono.y = 10;
    }
  }
  // si el mono toca el final del tablero
  if (state.mono.y == 40) {
    state.mono.y = -3;
    velocidadJuego = velocidadJuego + 2;
  }

  updateUser(state.user);

  for (barril of state.barriles) {
    updateBarril(barril);
  }
};

function updateUser(user) {
  //dependiendo de la posicion en x el usuario aparece por un lado o el otro al salir del limite del tablero
  if (user.x < 0) {
    //posicon del usuario  en x
    user.x = 40;
  } else if (state.user.x > 40) {
    user.x = 0;
  }

  //Uso de las escaleras
  let isOnStair = isXYOnStair(user.x, user.y);

  //usuario esta en la plataforma o en la escalera
  let isOnSurface = isXYOnSurface(user.x, user.y);
  if (!isOnSurface && !isOnStair) {
    //cae si no esta en una superficie
    state.user.y2 = !!state.user.y2 - 1;
    if (state.user.y2 < 0) {
      state.user.y++;
      state.user.y2 = 4;
    }
  }

  if (state.key == "ArrowLeft") {
    state.user.x = state.user.x - 1;
  } else if (state.key == "ArrowRight") {
    state.user.x = state.user.x + 1;
  } // eventopara saltar
  else if (state.key == "ArrowUp") {
    // si la proxima es escalera
    if (isOnStair && isXYOnStair(user.x, user.y - 1)) {
      state.user.y--;
    } else if (isOnSurface) {
      state.user.y = state.user.y - 3;
    }
  } else if (state.key == "ArrowDown") {
    if (isOnStair && isXYOnStair(user.x, user.y + 1)) {
      state.user.y++;
    }
  }
  state.key = null;

  //colicion con el barril
  let isCrashBarril = isXYOnBarril(user.x, user.y);
  if (isCrashBarril) {
    user.color = "red";
    alert("CRASHHHHH!");
    vidas = vidas - 1;
    user.x = 0;
    user.y = 38;
    user.color = "blue";
    //location.reload();
  }
}

function updateBarril(barril) {
  //movimientos del barril
  const isOnSurface = isXYOnSurface(barril.x, barril.y);
  if (!isOnSurface) {
    barril.y = barril.y + 1;
  }
  //Controlar cambio de direccion del moviento si chocan con una pared
  if (barril.x == 0) {
    barril.vx = 1;
  }
  if (barril.x == 39) {
    barril.vx = -1;
  }
  //borrar barril si terminan el tablero
  if (barril.x == 0 && barril.y == 38) {
    //barril.color = '#FF05F0'
    barril.x = -2;
    state.barriles.shift(); // borrar primer elemento del vector de los barriles
  }
}

/////////
//Inicio del juego
function iniciar() {
  let d = document.getElementById("inicioJuego");
  let d_nested = document.getElementById("iniciar");
  let throwawayNode = d.removeChild(d_nested);
  intervalo = setInterval(ciclo, 1000 / 10);
}
