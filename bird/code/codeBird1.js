/* Variables para el dibujo */
let birdDimensiones = 2;
let propiedadesTubo = {
    ancho: Math.floor((40 - 6) / 7),
    color: 'green'
};

let state = {
    time: 0,
    bird: {
        x: 3,
        y: 20,
        w: birdDimensiones,
        h: birdDimensiones,
        vy: 0,
        color: 'yellow'
    },
    tablero: {
        x: 0,
        y: 0,
        w: 40,
        h: 40,
        color: '#00FDEA'
    },
    nubes: [
        {
            x: 1,
            y: 3,
            w: 6,
            h: 4,
            color: 'white'
        },
        {
            x: 9,
            y: 3,
            w: 6,
            h: 4,
            color: 'white'
        },
        {
            x: 20,
            y: 3,
            w: 6,
            h: 4,
            color: 'white'
        },
        {
            x: 33,
            y: 3,
            w: 6,
            h: 4,
            color: 'white'
        }
    ],
    pipes: [newPipe()]
};

/* Dibujar */
function draw() {
    // dibujo del tablero
    Rect(state.tablero.x, state.tablero.y, state.tablero.w, state.tablero.h, state.tablero.color);
    // dibujo de las nubes
    for (i = 0; i <= state.nubes.length - 1; i++) {
        let n = state.nubes[i]
        Rect(n.x, n.y, n.w, n.h, n.color);
    }
    // dibujo del pajaro
    Rect(state.bird.x, state.bird.y, state.bird.w, state.bird.h, state.bird.color);
    // dibujo de los tubos
    for (let i = 0; i <= state.pipes.length - 1; i++) {
        /* tubos en posicion de arriba */
        //Rect(x,y,w,h,color)
        Rect(state.pipes[i].x, 0, state.pipes[i].w, state.pipes[i].y1, state.pipes[i].color);
        //posicion en state.pipes[i].x (x) es donde aparece la figura en el horizontal, state.pipes[i].y1 (y) es la posicion en vertical
        //state.pipes[i].w (w) es el ancho del tubo, state.pipes[i].h (h) sera la altura o distancia hacia abajo desde el punto y, y color es color
        Rect(state.pipes[i].x, state.pipes[i].y2, state.pipes[i].w, 40 - state.pipes[i].y2, state.pipes[i].color);
    }
}
ctx = canvas.getContext('2d'); // definir contexto 2D del canvas
scale = 15; //escala del pixel
nx = Math.floor(canvas.width / scale); /* cuantos pixeles caben en x */
ny = Math.floor(canvas.height / scale); /* cuantos pixeles caben en y  */
//funcion dibujo
Rect = function (x, y, w, h, color) {
    //Definir color
    ctx.fillStyle = color;
    //Definir tamaño
    ctx.fillRect(x * scale, y * scale, w * scale - 1, h * scale - 1);
}

/* Numeros aleatorios */
function aleatorio(min, max) {
    return (min + Math.floor(Math.random() * (max - min)));
}

/* Funcion para crear tuberias */
function newPipe() {
    //Altura de y1
    y1 = aleatorio(1, 40);
    //Altura y2
    y2 = aleatorio(1, 40);
    let absoluto = Math.abs(y1 - y2);

    //Condiciones para crear la tuberia
    if (y1 == y2) {
        // si y1 == y2
        return {
            x: 40,
            y1: 10,
            y2: 20,
            w: propiedadesTubo.ancho,
            color: 'black'
        }
    } else if (y1 > y2) {
        return {
            x: 40,
            y1: y2,
            y2: y1,
            w: propiedadesTubo.ancho,
            color: 'blue'
        }
    } else if (absoluto <= 4) {
        // si |y1-y2| <=4
            return {
                x: 40,
                y1: 10,
                y2: 20,
                w: propiedadesTubo.ancho,
                color: 'red'
        }
    } else {
        return {
            x: 40,
            y1: y1,
            y2: y2,
            w: propiedadesTubo.ancho,
            color: propiedadesTubo.color
        }
    }

}

/* actualizar el tablero */
function update() {
    // movimiento de las nubes
    for (i = 0; i <= state.nubes.length - 1; i++) {
        state.nubes[i].y = state.nubes[i].y * Math.ceil((Math.random() - 0.5) * 2) < 1 ? -1 : 1;
    }
    // movimiento del pajaro
    state.bird.y = state.bird.y + state.bird.vy;
    state.bird.vy = state.bird + 0.2;
    //mover la tuberia hacia la izquierda
    for (let i = 0; i <= state.pipes.length - 1; i++) {
        state.pipes[i].x = state.pipes[i].x - 1
    }
    colide();
    draw();
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
        // contadorVelocidad = contadorVelocidad +5;
    }

    /* coliciones con los limites del tablero */
    if (state.bird.y <= 0) {
        state.bird.vy = 0.3
        state.bird.y = 1
    } else if (state.bird.y >= 39) {
        state.bird.vy = -.3
        state.bird.y = 38
    }

    /* colision con los tubos */
    for (let i = 0; i < state.pipes.length; i++) {
        let pipe = state.pipes[i];
        for (let j = state.pipes[i].y1; j <= state.pipes[i].y2; j++) {
            if (state.bird.x > pipe.x && state.bird.x < pipe.x + pipe.w) {
                if (state.bird.y < pipe.y1 || (state.bird.y + state.bird.h) > pipe.y2) {
                    state.background.color = 'red';
                    draw();
                    endGame();
                }
            }
        }

    }
}


/* Crear ciclo de uopdate y dibujo */
function ciclo() {
    update();
    draw();
}

/* intervalo de tiempo */
intervalo = setInterval(ciclo, 1000 / 10);