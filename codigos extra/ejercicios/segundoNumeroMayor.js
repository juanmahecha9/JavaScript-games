function getSecondLargest(nums) {
  let max = -Infinity,
    result = -Infinity; // valor maximo y minimos
  for (const value of nums) {
    const nr = Number(value);

    if (nr > max) {
      [result, max] = [max, nr]; // guardar maximo
    } else if (nr < max && nr > result) {
      result = nr; // nuevo segundo
    }
  }

  return result;
}

/* try and catch */
typeof s !== "string"
  ? console.log("s.split is not a function")
  : (s = s.split("").reverse().join(""));

console.log(s);

function reverseString(s) {
  try {
    s = s.split("").reverse().join("");
  } catch (e) {
    console.log("s.split is not a function");
  }

  console.log(s);
}

/* Retornar letras dependiendo de que letra comience */
switch (s[0]) {
  case "a" || "e" || "o" || "i" || "u":
    letter = "A";
    break;

  case "b" || "c" || "d" || "f" || "g":
    letter = "B";
    break;

  case "h" || "j" || "k" || "l" || "m":
    letter = "C";
    break;

  case "z" ||
    "n" ||
    "p" ||
    "q" ||
    "r" ||
    "s" ||
    "t" ||
    "v" ||
    "w" ||
    "x" ||
    "y":
    letter = "D";
}
