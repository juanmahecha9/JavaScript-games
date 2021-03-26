//Funcion recibe un vector de datos,
// si es un numero par se multiplaca en 2
// y si es impar se multiplica en 3
function modifyArray(nums) {
  let newNums = [];

  for (i of nums) {
    if (nums[i] % 2 == 0) {
      newNums[i] = nums[i] * 2;
    } else {
      newNums[i] = nums[i] * 3;
    }
  }

  return newNums;
}
