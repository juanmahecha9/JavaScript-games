/* Variables */
let colorBackground = "black";
let colorSnake = "white";
let colorComida = ["blue", "red", "green", "#FFFFE0", "#FAF0E6"];

function Juego() {
  /* funcion principal */
  this.snake = new Snake(); /* funcion culebra */
  this.comida = new Comida(); /* funcion de la comida */

  this.ctx = canvas.getContext("2d");
  this.scale = 15; /* escala del tablero */
  this.nx = Math.floor(
    canvas.width / this.scale
  ); /* cuantos pixeles caben en x */
  this.ny = Math.floor(
    canvas.height / this.scale
  ); /* cuantos pixeles caben en y  */

  this.step = function () {
    /* dibujar las funciones, loop */
    this.snake.step(this); /* Dibuja la culebra */
    this.comida.step(this); /* Dibuja la comida */

    this.dibujar(); /* Dibuja */
    this.wait(); /* espera para el siguiente paso  */
  };

  this.dibujar = function () {
    /* dibujar */
    this.Rect(
      0,
      0,
      this.nx,
      this.ny,
      colorBackground
    ); /*  tamaño del tablero y color del tablero*/

    this.snake.dibujar(this); /* dibujar culebra */
    this.comida.dibujar(this); /* dibujar comida */
  };
  this.keydown = function (evt) {
    /* eventos del teclado */
    this.snake.keydown(evt.key); /* la culebra depende del evento */
  };

  this.Rect = function (x, y, w, h, color) {
    /* dibujo del tablero, tamaño y color del canvas */
    this.ctx.fillStyle = color;
    this.ctx.fillRect(
      x * this.scale,
      y * this.scale,
      w * this.scale - 1,
      h * this.scale - 1
    ); /* definir el tamaño del tablero */
  };

  this.wait = function () {
    /* funcion esperar */
    var valor = document.getElementById("velocidad")
      .value; /* Obtener el valor del input designado a la velocidad deljuego */
    setTimeout(
      this.step.bind(this),
      1000 / valor
    ); /* Velocidad del juego, entre mas pequeño el demominador mas lento el tiempo */
  };

  document.addEventListener(
    "keydown",
    this.keydown.bind(this)
  ); /* Escuchar el evebti del teclado */
  this.wait(); /* esperar, esta es la velocidad del juego */
}

function Snake() {
  this.l = 2; /* tamaño inicial culebra */
  this.trace = []; /* vector de sombra */
  this.x = aleatorio(2, 38); /* punto de inicio en x */
  this.y = aleatorio(2, 38); /* punto de inicio en y  */
  this.vx = 0; /* velocidad */
  this.vy = 1; /* velocidad */

  this.step = function (game) {
    /* DEPENDE DE UN JUEGO */
    this.x =
      this.x +
      this
        .vx; /* posicion en x o y es igual a la posicion mas una velocidad en x o y */
    this.y = this.y + this.vy;
    /* movimientos de la culebra por el campo */
    if (this.x >= game.nx) this.x = 0;
    if (this.y >= game.ny) this.y = 0;
    if (this.x < 0) this.x = game.nx - 1;
    if (this.y < 0) this.y = game.ny - 1;

    for (var i = 0; i < this.trace.length; i++) {
      /* validar si se come la comida */
      var pos = this.trace[i];
      if (pos.x == game.comida.x && pos.y == game.comida.y) {
        /* la culebra esta en la posicion de la comida?, si pasa es sumar 1 a la longitud de la culebra */
        this.l = this.l + 1;
        game.comida.reset(game);
      }
      if (pos.x == this.x && pos.y == this.y)
        this.l = 2; /* choque de la culebra con ella misma */
    }

    this.trace.push({
      x: this.x,
      y: this.y,
    }); /* aeradir los pasos de la sombra */

    escribir(
      this.trace.length - 1 - 2
    ); /* Puntuacion actual de la culebra, toca restar 1 y al igual el valor inicial de la culebra osea 2*/

    while (this.trace.length > this.l)
      this.trace.shift(); /* para que se vea solo la culebra  */
  };

  this.dibujar = function (game) {
    /* dibujar la culebra */
    for (var i = 0; i < this.trace.length; i++) {
      /* dibujar las sombra  */
      var pos = this.trace[i];
      game.Rect(
        pos.x,
        pos.y,
        1,
        1,
        colorSnake
      ); /* longitud, dibujando la posicion x y */
    }
  };

  this.keydown = function (key) {
    /* movimientos de la culebra por evento de teclas */
    if (key == "ArrowDown") {
      /* tecla hacia abajo */
      this.vx = 0;
      this.vy = 1; /* Posicion */
    } else if (key == "ArrowUp") {
      /* tecla hacia arriba */
      this.vx = 0;
      this.vy = -1; /* Posicion */
    } else if (key == "ArrowLeft") {
      /* tecla hacia la izquierda */
      this.vx = -1; /* Posicion */
      this.vy = 0;
    } else if (key == "ArrowRight") {
      /* tecla hacia la derecha */
      this.vx = 1; /* Posicion */
      this.vy = 0;
    }
  };
}

function Comida() {
  /* dibujar la comida */
  this.x = aleatorio(3, 37); /* posicion de la comida */
  this.y = aleatorio(3, 37); /* posicion de la comida */
  this.step = function (game) {}; /*  */
  this.dibujar = function (game) {
    /* dibujar cuadricula de la comida */
    let color = aleatorio(0, 4);
    game.Rect(this.x, this.y, 1, 1, colorComida[color]);
  };

  this.reset = function (game) {
    /* poner una nueva comida */
    this.x = Math.floor(Math.random() * game.nx);
    this.y = Math.floor(Math.random() * game.ny);
  };
}

function aleatorio(inferior, superior) {
  /* posicion aleatoria */
  let numPosibilidades = superior - inferior; //cuantos numeros hay para generar
  let aleatorio = Math.random() * (numPosibilidades + 1);
  aleatorio = Math.floor(aleatorio);
  return inferior + aleatorio;
}

function escribir(x) {
  /* escribir el valor que tiene la culebra */
  document.getElementById("cont1").innerHTML = x;
}

window.onload = function () {
  /* cargar todo el script despues de cargar la pagina  */
  new Juego(); /* Instanciar un nuevo juego */
};
