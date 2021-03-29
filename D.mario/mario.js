let screen0 = {
  tablero: { x: 0, y: 0, w: 40, h: 40, color: "blue" },
  superficies: [],
  enemigosSyD: [
    {
      x: 28,
      y: 12,
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
  enemigosSyD: [
    {
      x: 20,
      y: 37,
      w: 1,
      h: 1,
      color: "white",
      vx: 0,
    },
  ],
  time: 0,
};
screen1.superficies.push(...newSurfaceX(39, 0, 10));
screen1.superficies.push(...newSurfaceX(39, 15, 25));
screen1.superficies.push(...newSurfaceX(39, 30, 40));

screen1.superficies.push(...newSurfaceT(13, 38, 40));
screen1.superficies.push(...newSurfaceT(21, 36, 40));

let screen2 = {
  tablero: { x: 0, y: 0, w: 40, h: 40, color: "#2305FF" },
  superficies: [],
  enemigosSyD: [
    {
      x: 36,
      y: 33,
      w: 1,
      h: 1,
      color: "white",
      vx: 0,
    },
  ],
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
//colores del usuario
let colorUsuarioVida = ["red", "#CE2775", "#837C7C", "#DCDCDC"];

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
  } else if (user.x <= 0) {
    user.x = 0;
  }
  if (user.y >= 40) {
    vidas = vidas - 1;
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
}

function updateEnemigosSyD(enemigo, user) {
  // actualizacion de los movimientos
  for (let i = 0; i <= enemigo.length - 1; i++) {
    //movimiento de los enemigos
    let time = state.screen[numberScreen].time++;
    if (time > 10) {
      //el enemigo no pasa de los tubos
      new_x = enemigo[i].x + enemigo[i].vx;
      if (isXYGoodPosition(new_x, enemigo[i].y)) {
        enemigo[i].x = new_x;
      }
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
    if (enemigo[i].x > user.x) {
      enemigo[i].vx = -1;
    } else if (enemigo[i].x < user.x) {
      enemigo[i].vx = 1;
    } else if (enemigo[i].x == user.x && enemigo[i].y == user.y) {
      // el enemigo alcazo al usuario
      vidas = vidas - 1;
      user.y = 30;
      user.x = 0;
      user.color = colorUsuarioVida[vidas - 1];
    }
    // fin del loop for
  }
  //eliminar al enemigo
  deleteEnemy(enemigo, user);
}
//para generar enemigos al azar al eliminar al primero
newEnemyPosition = function (array) {
  datoAleatorio = Math.floor(Math.random() * array.length);
  //console.log(datoAleatorio);
  return datoAleatorio;
};
//borrar elementos del vector de enemigos
function deleteEnemy(arrayEnemy, user) {
  const toDelete1 = [];
  //conteo de la cantidad de enemigos
  for (x = 0; x <= arrayEnemy.length - 1; x++) {
    //enemigo[i].x == user.x && enemigo[i].y == user.y + 1
    // si se sale de los limites del tablero
    if (arrayEnemy[x].x <= 0) {
      toDelete1.push(x);
    } else if (arrayEnemy[x].x >= 40) {
      toDelete1.push(x);
    } else if (arrayEnemy[x].y >= 40) {
      toDelete1.push(x);
    } else if (arrayEnemy[x].x == user.x && arrayEnemy[x].y == user.y + 1) {
      // si el enemigo es aplastado por el usuario
      toDelete1.push(x);
    }
  }
  for (x of toDelete1) {
    arrayEnemy.splice(x, 1);
    /* let newEnemy_ = newEnemy(state.screen[numberScreen].superficies);
      state.screen[numberScreen].enemigosSyD.push(newEnemy_) */
  }
  // nuevo enemigo
}
//crear nuevo enemigo
newEnemy = function (vectorS) {
  arraySuperficiesLength = vectorS.length; // arreglo de las superficies por pantalla tamanho
  arraySUperficiesData = vectorS; // arrelo de los datos de la superficie
  //dato aleatorio del arreglo
  datoAleatorio = Math.floor(Math.random() * arraySuperficiesLength);
  //console.log(arraySUperficiesData[datoAleatorio].x, arraySUperficiesData[datoAleatorio].y);
  let new_x = arraySUperficiesData[datoAleatorio].x;
  let new_y = arraySUperficiesData[datoAleatorio].y;
  // evaluar condiciones para la aparicion del nuevo enemigo
  if (new_x <= 1) {
    new_x = 1;
  } else if (new_x >= 39) {
    new_x = 39;
  } else if (new_y >= 38) {
    new_y = 38;
  }
  // objeto del nuevo enemigo
  return {
    x: new_x,
    y: new_y - 1,
    w: 1,
    h: 1,
    color: "white",
  };
};
// es una buena poscion?
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
ciclo = function () {
  update();
  draw();
};

intervalo = setInterval(ciclo, 1000 / 10);
