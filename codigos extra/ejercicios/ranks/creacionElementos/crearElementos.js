let x = 0;
const div = document.getElementById("div");
const button = document.createElement("button");
button.type = "button";
button.innerText = x;
button.setAttribute("class", "btn");
button.setAttribute("onclick", "add()");

div.appendChild(button);

add = function () {
  x = x + 1;
  button.innerText = x;
};

//

document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("btn");

  button.addEventListener("click", (e) => {
    const count = Number(e.currentTarget.innerText) + 1;

    e.currentTarget.innerText = count;
  });
});

