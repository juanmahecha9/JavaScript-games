//Estado
let state = {
  tablero: {
    x: 0,
    y: 0,
    w: 40,
    h: 40,
    color: "black",
  },
  sapo: {
    x: random(10, 30), //aleatorio de 1 en 1 para la posicion inicial del sapo
    y: 38,
    y0: 38, //Posicion inicial en el juego
    w: 3,
    h: 2,
    color: "orange",
    vx: 2, //cuanto se desplaza en x
    vy: 2, //cuanto se desplaza en y
  },
  tierra: [
    {
      x: 0,
      y: 0,
      w: 40,
      h: 2,
      color: "green",
    },
    {
      x: 0,
      y: 22,
      w: 40,
      h: 2,
      color: "#0FDF05",
    },
    {
      x: 0,
      y: 38,
      w: 40,
      h: 2,
      color: "#0FDF05",
    },
  ],
  lago: {
    x: 0,
    y: 2,
    w: 40,
    h: 22,
    color: "#0927A0",
  },
  troncos: [newTronco()],
  lanchas: [newLancha()],
  carros: [
    {
      x: 18,
      y: 34,
      w: 5,
      h: 2,
      color: "#DF05D5",
    },
    {
      x: 20,
      y: 20,
      w: 5,
      h: 2,
      color: "#DF05D5",
    },
    {
      x: 24,
      y: 24,
      w: 5,
      h: 2,
      color: "#DF05D5",
    },
    {
      x: 20,
      y: 28,
      w: 5,
      h: 2,
      color: "#DF05D5",
    },
    {
      x: 23,
      y: 34,
      w: 5,
      h: 2,
      color: "#DF05D5",
    },
    newCarro(),
  ],
  time: 0,
  timeTronco: 0,
  colorVidas: ["red", "#F3B77E", "#F7963B"],
};

//Vidas
let vidas = 3;

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
  //Dibujo del lago
  Rect(
    state.lago.x,
    state.lago.y,
    state.lago.w,
    state.lago.h,
    state.lago.color
  );
  //Dibujar tierra
  for (let i = 0; i <= state.tierra.length - 1; i++) {
    let tierra = state.tierra[i];
    Rect(tierra.x, tierra.y, tierra.w, tierra.h, tierra.color);
  }
  //Dibujar troncos
  for (let j = 0; j <= state.troncos.length - 1; j++) {
    let tronco = state.troncos[j];
    Rect(tronco.x, tronco.y, tronco.w, tronco.h, tronco.color);
  }
  //Dibujar lancha
  for (let k = 0; k <= state.lanchas.length - 1; k++) {
    let lancha = state.lanchas[k];
    //  Rect(lancha.x, lancha.y, lancha.w, lancha.h, lancha.color);
  }
  //Dibujar carros
  for (let l = 0; l <= state.carros.length - 1; l++) {
    let carro = state.carros[l];
    Rect(carro.x, carro.y, carro.w, carro.h, carro.color);
  }
  //Dibujar sapo
  Rect(
    state.sapo.x,
    state.sapo.y,
    state.sapo.w,
    state.sapo.h,
    state.sapo.color
  );
};

//Crear nuevos troncos
function newTronco() {
  //Funcion de crear troncos posicion de 2 a 20
  return {
    x: 0,
    y: aleatorio(2, 20),
    w: 5,
    h: 2,
    color: "brown",
  };
}
//Crear la lancha
function newLancha() {
  return {
    x: 0,
    y: aleatorio(0, 36),
    w: 5,
    h: 2,
    color: "white",
  };
}
function newCarro() {
  // tienen que estar entre 22 y 38 -2
  // espacio para los carros
  return {
    x: 0,
    y: aleatorio(24, 36), // de dos en dos
    w: 3,
    h: 2,
    color: "#DF05D5",
  };
}

// funcion para el movimiento del sapo
function keydown(evt) {
  key = evt.key;
  if (key == "ArrowUp") {
    state.sapo.y = state.sapo.y - state.sapo.vy;
  } else if (key == "ArrowDown") {
    state.sapo.y = state.sapo.y + state.sapo.vy;
  } else if (key == "ArrowLeft") {
    state.sapo.x = state.sapo.x - state.sapo.vx;
  } else if (key == "ArrowRight") {
    state.sapo.x = state.sapo.x + state.sapo.vx;
  }
}
document.addEventListener(
  "keydown",
  keydown
); /* Escuchar el evebti del teclado */

//funcion update
update = function () {
  //Movimiento del tronco
  for (let tronco in state.troncos) {
    state.troncos[tronco].x = state.troncos[tronco].x + 1;
  }
  //Movimiento lancha
  for (let lancha in state.lanchas) {
    state.lanchas[lancha].x = state.lanchas[lancha].x + 1;
  }
  //Movimiento del carro
  for (let carro in state.carros) {
    state.carros[carro].x = state.carros[carro].x + 1;
  }

  colide();
  escribir("cont1", vidas); // contador de las vidas
  draw();

  //pausar juego por perdia de vidas
  if (vidas == 0) {
    pauseAnimation();
    const button = document.createElement("button");
    button.type = "button";
    button.innerText = "Reiniciar juego.";
    button.setAttribute("id", "iniciar");
    button.setAttribute("class", "btn btn-outline-success");
    button.setAttribute("onclick", "iniciar()");
    const agregar = document.getElementById("inicioJuego");
    agregar.appendChild(button);
    //poner vidas en el contador
    vidas = 3;
  }
};

//Coliciones
colide = function () {
  //Si sale por la parte de arriba, vuele por abajo
  if (state.sapo.y < 0) {
    state.sapo.y = state.sapo.y0; //Posicion inicial en el juego
    state.sapo.x = random(10, 30); //cada vez que regresa al punto de partida y0, se movera aleatoriamente a la izquierda o derecha
  } else if (state.sapo.y >= 39) {
    //El sapo no puede retroceder por el limite inferior
    state.sapo.y = state.sapo.y = 38;
  } else if (state.sapo.x <= 0) {
    //si llega a los limite lateral izquierdo no puede pasar
    state.sapo.x = 0;
  } else if (state.sapo.x >= 39) {
    //si llega a los limite lateral derecho no puede pasar
    state.sapo.x = 36;
  }

  //esperar n segundos para crear el tronco y la lancha
  state.time++;
  if (state.time > 4) {
    state.time = 0;
    state.carros.push(newCarro());
    state.troncos.push(newTronco()); // tronco
  }

  //Colicion del sapo y los carros
  for (let carro = 0; carro <= state.carros.length - 1; carro++) {
    for (let cont = 0; cont <= state.sapo.w - 1; cont++) {
      // (state.sapo.x == state.carros[carro].x && state.sapo.y == state.carros[carro].y)
      if (
        state.sapo.x == state.carros[carro].x + cont &&
        state.sapo.y == state.carros[carro].y
      ) {
        // vidas = vidas - 1;
        alert("Rana aplastada");
        state.sapo.y = 38;
        vidas = vidas - 1;
        state.sapo.color = state.colorVidas[vidas];
      }
    }
  }

  //Colicion del sapo y los troncos
  for (let tronco = 0; tronco <= state.troncos.length - 1; tronco++) {
    for (let cont = 0; cont <= state.sapo.w - 1; cont++) {
      // (state.sapo.x == state.carros[carro].x && state.sapo.y == state.carros[carro].y)
      if (
        state.sapo.x == state.troncos[tronco].x + cont &&
        state.sapo.y == state.troncos[tronco].y
      ) {
        // vidas = vidas - 1;
        alert("Rana aplastada");
        state.sapo.y = 38;
        vidas = vidas - 1;
        state.sapo.color = state.colorVidas[vidas];
      }
    }
  }

  //limpiar datos que van desapareciendo
  for (carro in state.carros) {
    if (state.carros[carro].x > 39) {
      state.carros.shift();
    }
  }

  //mover la rana en conjunto con el madero
  /* for (let tronco in state.troncos) {
        if(state.sapo.x == state.troncos[tronco].x && state.sapo.y == state.troncos[tronco].y + tronco){
            console.log('en el tronco')
        }
    } */

   /*  let isOnSurface = isXYOnSurface(state.sapo.x,state.sapo.y);
    if(isOnSurface){
      alert()
    } */
};

//Generador de numeros aletorios de 1 en 1
function random(min, max) {
  return min + Math.floor(Math.random() * (max - min));
}
//Evaluar si esta en la plataforma
function isXYOnSurface(x, y) {
  return isXYOnArray(x, y + 1, state.troncos);
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

//Inicio del juego
function iniciar() {
  //eliminar boton de inicio
  let d = document.getElementById("inicioJuego");
  let d_nested = document.getElementById("iniciar");
  let throwawayNode = d.removeChild(d_nested);
  state.sapo.color = "orange";
  intervalo = setInterval(ciclo, 1000 / 10);
}

//Pausar animacion
function pauseAnimation() {
  clearInterval(intervalo);
}
