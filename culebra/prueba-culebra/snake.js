const UP = "up";

var state = {
  food: {
    x: 20,
    y: 10,
  },
  snake: {
    trail: [  // definimos que el ultimo es la cabeza
      {x: 5, y: 15}, 
      {x: 6, y: 15},
      {x: 7, y: 15},
      {x: 8, y: 15},
      {x: 9, y: 15},
      {x: 10, y: 15},
    ],
    vel: UP,
    len: 3,
  }

}

function draw(){
   // background
   Rect(0,0,40, 40, "red")
   // food
   Rect(state.food.x, state.food.y, 1, 1, 'green');
   // snake
   for(i=0; i<state.snake.trail.length; i++){
     Rect(state.snake.trail[i].x,state.snake.trail[i].y, 1,1,"black")
   }
}

function colide(){
  // detect boundaries
  var head = state.snake.trail[state.snake.trail.length -1];
  if(head.x > 40){
    head.x = 0;
    head.y = head.y + 1;
  }

  // eat food
  // morir!
}

function update(){
  var head = state.snake.trail[state.snake.trail.length -1];
  // physics!
  var new_head = {
    x: head.x + 1,
    y: head.y ,
  }
  state.snake.trail.push(new_head);
  while (state.snake.trail.length > state.snake.len) state.snake.trail.shift(); 

  colide();
  draw();
}


ctx = canvas.getContext('2d');
scale = 15; /* escala del tablero */
nx = Math.floor(canvas.width / scale); /* cuantos pixeles caben en x */
ny = Math.floor(canvas.height / scale); /* cuantos pixeles caben en y  */
Rect = function (x, y, w, h, color) { /* dibujo del tablero, tamaño y color del canvas */
  ctx.fillStyle = color;
  ctx.fillRect(x * scale, y * scale, w * scale - 1, h * scale - 1) /* definir el tamaño del tablero */
};

draw()