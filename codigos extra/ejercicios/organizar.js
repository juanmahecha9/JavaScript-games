/* organizar las vocales primero que las consonantes en orden (a,e,i,o,u), y mantiene las consonates en el mismo orden de la palabra */
function vowelsAndConsonants(s) {
  for (let index = 0; index <= s.length - 1; index++) {
    /* recorrer la palabra */
    let letra; /* variable de la letra evaluada */
    letra = s[index]; /* Igualar la letra a la letra del momento */

    let v = [
      "a",
      "e",
      "i",
      "o",
      "u",
      "A",
      "E",
      "I",
      "O",
      "U",
      "ü",
      "é",
      "á",
      "í",
      "ó",
      "ú",
    ]; // vocales, vector de vocales evauadas
    if (v.includes(letra)) {
      console.log(letra);
    }
  }

  for (let index = 0; index <= s.length - 1; index++) {
    /* recorrer la palabra */
    let letra; /* variable de la letra evaluada */
    letra = s[index]; /* Igualar la letra a la letra del momento */

    let c = [
      "b",
      "c",
      "d",
      "f",
      "g",
      "h",
      "j",
      "k",
      "l",
      "m",
      "n",
      "p",
      "q",
      "r",
      "s",
      "t",
      "v",
      "w",
      "x",
      "y",
      "z",
      "B",
      "C",
      "D",
      "F",
      "G",
      "H",
      "J",
      "K",
      "L",
      "M",
      "N",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ]; // consonantes, vector de vocales evauadas
    if (c.includes(letra)) {
      console.log(letra);
    } else {
      continue;
    }
  }
}
