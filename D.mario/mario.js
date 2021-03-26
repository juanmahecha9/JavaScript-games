let screen0 = {
  tablero: { x: 0, y: 0, w: 40, h: 40, color: "blue" },
  superficies: [],
  enemigosSyD: [
    {
      x: 20,
      y: 28,
      w: 1,
      h: 1,
      color: "white",
      vx: 0,
    },
  ],
  time: 0,
};
screen0.superficies.push(...newSurfaceX(39, 0, 20)); //suelo
screen0.superficies.push(...newSurfaceX(39, 27, 40)); //suelo

screen0.superficies.push(...newSurfaceX(29, 15, 22)); //plataformas flotantes
screen0.superficies.push(...newSurfaceX(26, 10, 18)); //plataformas flotantes
screen0.superficies.push(...newSurfaceX(24, 20, 25)); //plataformas flotantes
screen0.superficies.push(...newSurfaceX(21, 23, 28)); //plataformas flotantes
screen0.superficies.push(...newSurfaceX(19, 17, 22)); //plataformas flotantes
screen0.superficies.push(...newSurfaceX(15, 22, 25)); //plataformas flotantes
screen0.superficies.push(...newSurfaceX(13, 26, 29)); //plataformas flotantes

screen0.superficies.push(...newSurfaceY(30, 13, 40)); //plataforma

screen0.superficies.push(...newSurfaceT(18, 36, 40)); //tubos
screen0.superficies.push(...newSurfaceT(22, 33, 40)); //tubos

let screen1 = {
  tablero: { x: 0, y: 0, w: 40, h: 40, color: "#05A8FF" },
  superficies: [],
  enemigosSyD: [],
  time: 0,
};
screen1.superficies.push(...newSurfaceX(39, 0, 10));
screen1.superficies.push(...newSurfaceX(39, 0, 10));
screen1.superficies.push(...newSurfaceX(39, 15, 25));
screen1.superficies.push(...newSurfaceX(39, 30, 40));

screen1.superficies.push(...newSurfaceT(21, 36, 40));

let screen2 = {
  tablero: { x: 0, y: 0, w: 40, h: 40, color: "#2305FF" },
  superficies: [],
  enemigosSyD: [],
  time: 0,
};
//
screen2.superficies.push(...newSurfaceX(39, 0, 3));
screen2.superficies.push(...newSurfaceY(4, 38, 40));
screen2.superficies.push(...newSurfaceY(5, 36, 40));
for (let step = 6; step <= 20; step++) {
  screen2.superficies.push(...newSurfaceY(step, 40 - step, 40));
}
for (let step = 25; step <= 36; step++) {
  screen2.superficies.push(...newSurfaceY(step, 34, 40));
}
screen2.superficies.push(...newSurfaceY(38, 34, 40));

let state = {
  screen: [screen0, screen1, screen2],
  user: { x: 0, y: 33, w: 1, h: 1, color: " black" },
  nubes: [
    { x: 1, y: 1, w: 2, h: 2, color: "white" },
    { x: 5, y: 2, w: 2, h: 2, color: "white" },
    { x: 10, y: 1, w: 2, h: 2, color: "white" },
    { x: 15, y: 2, w: 2, h: 2, color: "white" },
    { x: 20, y: 1, w: 2, h: 2, color: "white" },
    { x: 25, y: 2, w: 2, h: 2, color: "white" },
    { x: 30, y: 1, w: 2, h: 2, color: "white" },
    { x: 35, y: 2, w: 2, h: 2, color: "white" },
  ],
};
//crear enemigos

//Variable que define la pantalla
let numberScreen = 0;
//conatdor de vidas
let vidas = 4;

//Contexto y funcion RECT
ctx = canvas.getContext("2d");
scale = 15;
nx = Math.floor(canvas.width / scale);
ny = Math.floor(canvas.heigth / scale);
Rect = function (x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * scale, y * scale, w * scale - 1, h * scale - 1);
};

function draw() {
  let pantalla = eval("screen" + numberScreen);
  //agregar la pantalla al vector de pantallas
  state.screen.push(pantalla);
  let dibujo = state.screen[numberScreen];
  //dibujo del tablero
  Rect(
    dibujo.tablero.x,
    dibujo.tablero.y,
    dibujo.tablero.w,
    dibujo.tablero.h,
    dibujo.tablero.color
  );
  //dibujo de la superficie
  for (pixel of dibujo.superficies) {
    Rect(pixel.x, pixel.y, pixel.w, pixel.h, pixel.color);
  }
  //dibujo enemigos
  for (pixel of dibujo.enemigosSyD) {
    Rect(pixel.x, pixel.y, pixel.w, pixel.h, pixel.color);
  }
  //dibujo de las nubes
  for (pixel of state.nubes) {
    Rect(pixel.x, pixel.y, pixel.w, pixel.h, pixel.color);
  }
  //dibujo del usuario
  Rect(
    state.user.x,
    state.user.y,
    state.user.w,
    state.user.h,
    state.user.color
  );
}

//Crear superficies horizontal
function newSurfaceX(y0, x0, x1) {
  var res = [];
  for (i = x0; i < x1; i++) {
    res.push({ x: i, y: y0, w: 1, h: 1, color: "orange" });
  }
  return res;
}
//crear superficie vertical
function newSurfaceY(x0, y0, y1) {
  var res = [];
  for (j = y0; j < y1; j++) {
    res.push({ x: x0, y: j, w: 1, h: 1, color: "orange" });
  }
  return res;
}
//crear tubos
function newSurfaceT(x0, y0, y1) {
  var res = [];
  for (j = y0; j < y1; j++) {
    res.push({ x: x0, y: j, w: 3, h: 1, color: "green" });
  }
  return res;
}

// funcion para el movimiento del sapo
function keydown(evt) {
  state.key = evt.key;
}
document.addEventListener(
  "keydown",
  keydown
); /* Escuchar el evebti del teclado */

update = function () {
  //mover las nubes
  for (let nube in state.nubes) {
    state.nubes[nube].x = state.nubes[nube].x - 1;
    if (state.nubes[nube].x == 40) {
      state.nubes[nube].x = 0;
    } else if (state.nubes[nube].x == 0) {
      state.nubes[nube].x = 40;
    }
  }

  updateUser(state.user); //update usuario
  updateEnemigosSyD(state.screen[numberScreen].enemigosSyD, state.user); //update enemiegos SysD
  colide();
  escribir("cont1", vidas); // contador de las vidas
  pauseAnimation(vidas);
  draw();
};
colide = function () {};

function updateUser(user) {
  var new_x, new_y;
  if (user.x >= 40) {
    user.x = 0;
    numberScreen = numberScreen + 1;
    if (numberScreen > 2) {
      numberScreen = 0;
    }
  }
  if (user.y >= 40) {
    user.x = 0;
    user.y = 33;
  }
  // esta en la plataforma
  let isOnSurface = isXYOnSurface(user.x, user.y); //superficie
  //cae si no esta en una superfice
  if (!isOnSurface) {
    //cae si no esta en una superficie
    state.user.y2 = !!state.user.y2 - 1;
    if (state.user.y2 < 0) {
      state.user.y++;
      state.user.y2 = 4;
    }
  }
  //
  new_x = state.user.x;
  new_y = state.user.y;
  //mover el usuario
  if (state.key == "ArrowLeft") {
    new_x = state.user.x - 1;
  } else if (state.key == "ArrowRight") {
    new_x = state.user.x + 1;
  } // eventopara saltar
  else if (state.key == " ") {
    if (isOnSurface) {
      new_y = state.user.y - 4;
    }
  }
  if (isXYGoodPosition(new_x, new_y)) {
    state.user.x = new_x;
    state.user.y = new_y;
  }
  state.key = null;
  // matar al enemigo
  let pixel = state.screen[numberScreen].enemigosSyD;
  for (i = 0; i <= pixel - 1; i++) {
    if (user.x == pixel[i].x && user.y - 1 == pixel[i].y) {
      pixel.splice(i,1)
    }
  }
}

function updateEnemigosSyD(enemigo, user) {
  // actualizacion de los movimientos
  for (let i = 0; i <= enemigo.length - 1; i++) {
    //movimiento de los enemigos
    let time = state.screen[numberScreen].time++;
    if (time > 10) {
      enemigo[i].x = enemigo[i].x + enemigo[i].vx;
      time = 0;
    }
    let isOnSurface = isXYOnSurface(enemigo[i].x, enemigo[i].y); //esta en la superficie
    if (!isOnSurface) {
      //cae si no esta en una superficie
      enemigo[i].y2 = !!enemigo[i].y2 - 1;
      if (enemigo[i].y2 < 0) {
        enemigo[i].y++;
        enemigo[i].y2 = 4;
      }
    }

    //ir a buscar al enemigo
    if (enemigo[i].x >= user.x) {
      enemigo[i].vx = -1;
    } else if (enemigo[i].x <= user.x) {
      enemigo[i].vx = 1;
    }

    // el el enemigo toca al usuario
    /* if (enemigo[i].x == user.x && enemigo[i].y == user.y) {
      alert("Crash...!");
      user.x = 0;
      user.y = 30;
      //restar vidas
      vidas = vidas - 1;
    } */
  }
}

function isXYGoodPosition(x, y) {
  // chequea que la posicion no sea una superficie (o un enemigo)
  return !isXYOnArray(x, y, state.screen[numberScreen].superficies);
}

function isXYOnSurface(x, y) {
  return isXYOnArray(x, y + 1, state.screen[numberScreen].superficies);
}
function isXYOnArray(x, y, array) {
  for (let j = 0; j <= array.length - 1; j++) {
    for (let w = 0; w <= array[j].w - 1; w++) {
      if (array[j].x + w == Math.round(x) && array[j].y == Math.round(y)) {
        return true;
      }
    }
  }
  return false;
}
//
function isXYOnBarril(x, y) {
  return isXYOnArray(x, y, state.barriles);
}
//ecribir
function escribir(id, x) {
  document.getElementById(id).innerHTML = x;
}

//Pausar animacion
function pauseAnimation(x) {
  if (x <= 0) {
    clearInterval(intervalo);
  }
}
function ciclo() {
  update();
  draw();
}

intervalo = setInterval(ciclo, 1000 / 10);
