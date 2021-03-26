const stateConst = {
  tablero: {
    x: 0,
    y: 0,
    w: 40,
    h: 40,
    color: "black",
  },
};
let state = {
  alien: [],
  alienN: [],
  user: {
    x: 19,
    y: 39,
    w: 4,
    h: 1,
    color: "#49FF05",
  },
  balas: [newBala()],
  balasAlien: [newBala()],
  time: 0,
};
state.alien.push(...newAlien(3, 18, 22));
state.alien.push(...newAlien(5, 17, 23));
state.alien.push(...newAlien(6, 15, 25));
state.alien.push(...newAlien(7, 10, 30));
state.alien.push(...newAlien(8, 15, 25));
state.alien.push(...newAlien(9, 5, 35));
state.alienN.push(...newAlien(10, 1, 4));
state.alienN.push(...newAlien(10, 7, 10));
state.alienN.push(...newAlien(10, 15, 18));
state.alienN.push(...newAlien(10, 30, 33));

//velocidad de las naves aleatorio
let vx = Math.ceil((Math.random() - 0.5) * 2) < 1 ? -1 : 1;
// conteo de vidas
let vidas = 3;
//contador velocidad de las balas
let vb = 10;
//Contexto y funcion RECT
ctx = canvas.getContext("2d");
scale = 15;
nx = Math.floor(canvas.width / scale);
ny = Math.floor(canvas.heigth / scale);
Rect = function (x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * scale, y * scale, w * scale - 1, h * scale - 1);
};

//Funcion de dibujo
draw = function () {
  //tablero
  const tablero = stateConst.tablero;
  Rect(tablero.x, tablero.y, tablero.w, tablero.h, tablero.color);
  //dibujar usuario
  const user = state.user;
  Rect(user.x, user.y, user.w, user.h, user.color);
  //dibujar naves
  for (pixel of state.alien) {
    Rect(pixel.x, pixel.y, 1, 1, "#FFF005");
  }
  //dibujar naves pequenhas
  for (pixel of state.alienN) {
    Rect(pixel.x, pixel.y, 1, 1, "red");
  }
  //dibujar balas
  for (bala of state.balas) {
    Rect(bala.x, bala.y, bala.w, bala.h, bala.color);
  }
  //dibujar balas alien
  for (bala of state.balasAlien) {
    Rect(bala.x, bala.y, bala.w, bala.h, bala.color);
  }
};

update = function () {
  //movimento de las naves
  for (pixel of state.alien) {
    pixel.x = pixel.x - vx;
  }
  //movimiento naves pequenhas
  for (pixel of state.alienN) {
    pixel.x = pixel.x + vx;
  }

  //movimiento de las balas
  for (bala of state.balas) {
    bala.y = bala.y - 1;
    //limite de las balas
    if (bala.y <= 0) {
      state.balas.shift();
    }
  }
  //movimiento de las balas alien
  for (bala of state.balasAlien) {
    bala.y = bala.y + 1;
    //limite de las balas
    if (bala.y == 40) {
      state.balasAlien.shift();
    }
  }
  //conteo de las vidas
  if (vidas == 0) {
    pauseAnimation();
    //agregar boton de reinicio
    const button = document.createElement("button");
    button.type = "button";
    button.innerText = "Reiniciar juego.";
    button.setAttribute("id", "iniciar");
    button.setAttribute("class", "btn btn-outline-success");
    button.setAttribute("onclick", "reiniciar()");
    const agregar = document.getElementById("inicioJuego");
    agregar.appendChild(button);
  }
  //escribir cantidad de vidas
  escribir(vidas);
  colide();
  draw();
};

colide = function () {
  nave(state.user);
  updateAlien(state.alien, state.alienN);
  updateBalas(state.balasAlien, state.balas, true); // para el choque de las balas
};

//Evento del teclado
function keydown(evt) {
  state.key = evt.key;
}
document.addEventListener("keydown", keydown);

//funcion de la nave
function nave(x) {
  let user = x;
  //condiciones de frontera
  if (user.x < 0) {
    //posicon del usuario  en x
    user.x = 0;
  } else if (user.x > 40 - user.w) {
    user.x = 40 - user.w;
  }
  //movimeintos
  if (state.key == "ArrowLeft") {
    state.user.x = state.user.x - 1;
  } else if (state.key == "ArrowRight") {
    state.user.x = state.user.x + 1;
  }
  //balas
  if (state.key == " " && state.balas.length <= 25) {
    state.balas.push(newBala(user.x + 1, user.y));
  }
  state.key = null; //limpiar el evento de tecla
  //toque de la nave con la bala del alien
  for (i of state.balasAlien) {
    for (x = 0; x <= user.w - 1; x++) {
      if (i.x == user.x + x && i.y == user.y) {
        vidas = vidas - 1;
      }
    }
  }
}

function updateAlien(x, y) {
  let pixel = x;
  for (i of pixel) {
    if (i.x == 39) {
      i.x = i.x - 39;
    } else if (i.x == 0) {
      i.x = i.x + 39;
    }
  }
  let pixel1 = y;
  for (i of pixel1) {
    if (i.x == 39) {
      i.x = i.x - 39;
    } else if (i.x == 0) {
      i.x = i.x + 39;
    }
  }
  //colicion de las naves y las balas
  updateBalas(pixel, state.balas, true);
  /*  for (i = 0; i <= pixel.length - 1; i++) {
    for (b = 0; b <= state.balas.length - 1; b++) {
      if (
        state.alien[i].x == state.balas[b].x &&
        state.alien[i].y == state.balas[b].y
      ) {
        console.log("piu" + pixel.length);
        state.alien.splice(i, 1); // eliminar nave
        state.balas.shift();
        // state.balas.splice(b, i); // desaparecer bala al colicionar
      }
    }
  } */

  //eliminar balas cunado chocan con los satelites
  flag = false;
  updateBalas(pixel1, state.balas, flag); //Para destruir las balas con los satelites
  /* for (i = 0; i <= pixel1.length - 1; i++) {
    for (b = 0; b <= state.balas.length - 1; b++) {
      if (
        state.alienN[i].x == state.balas[b].x &&
        state.alienN[i].y == state.balas[b].y
      ) {
        console.log(" no piu");
        //state.balas.shift();
        state.balas.shift(); // desaparecer bala al colicionar
      }
    }
  } */
  //Crear balas
  state.time++;
  if (state.time > vb) {
    let num = random(1, state.alien.length);
    state.balasAlien.push(
      newBala(state.alien[num].x, state.alien[num].y, "blue")
    );
    state.time = 0;
  }

  //movimiento de los aliens hasta dependiendo el numero de pixeles
  if (pixel.length == 32) {
    for (x of pixel1) {
      x.y = x.y + 5;
    }
  }
}

//verificacion de las balas
function updateBalas(array, array_, flag) {
  const toDelete1 = [];
  const toDelete2 = [];
  //primero ingresan las balas alien y despues las balas user
  for (x = 0; x <= array.length - 1; x++) {
    for (y = 0; y <= array_.length - 1; y++) {
      if (flag) {
        if (array[x].x == array_[y].x && array[x].y == array_[y].y) {
          toDelete1.push(x)
          toDelete2.push(y)
        }
      }
      if (!flag) {
        if (array[x].x == array_[y].x && array[x].y == array_[y].y) {
          //eliminar el elemento
          toDelete1.push(x)
        }
      }
    }
  }
  for(x of toDelete1){
    array.splice(x, 1)
  }
  for(x of toDelete2){
    array_.splice(x, 1)
  }
}

//funcion crear nuevos alien
function newAlien(y0, x0, x1) {
  var res = [];
  for (i = x0; i < x1; i++) {
    res.push({ x: i, y: y0 });
  }
  return res;
}

//crear balas
function newBala(x0, y0, color) {
  if (color == null) {
    color = "white";
  } else {
    color = color;
  }
  return {
    x: x0,
    y: y0,
    w: 1,
    h: 1,
    color: color,
  };
}

// escribir
//Escribir en el html
function escribir(x) {
  document.getElementById("cont1").innerText = x;
}
//random
function random(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}
//pausar el juego en caso de perder
function pauseAnimation() {
  clearInterval(intervalo);
}
//inicio del juego
ciclo = function () {
  update();
  draw();
};
iniciar = function () {
  let d = document.getElementById("inicioJuego");
  let d_nested = document.getElementById("iniciar");
  let throwawayNode = d.removeChild(d_nested);
  intervalo = setInterval(ciclo, 1000 / 15);
};
//Reiniciar
function reiniciar() {
  location.reload();
}
