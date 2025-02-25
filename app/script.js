
/**
 * This function will take a raw number containing text (that would come from eronious user input),
 * commas, and decimals and turn it into a number string that is split into an array for easy
 * formatting before being put into the DOM.
 * @param {string} stringNumber
 * @returns {Array} numbersArray
 */
function extractNumber(stringNumber) {
  const stringNumberLen = stringNumber.length;
  let numbersArray = [];
  let stripLeadingZero = true;
  for (let i = 0; i < stringNumberLen; i++) {
    if (stringNumber[i] !== "0") {
      stripLeadingZero = false;
    }
    if (!stripLeadingZero && stringNumber[i] !== "," && stringNumber[i] !== ".") {
      numbersArray.push(stringNumber[i]);
    }
  }
  return numbersArray;
}

/**
 * This function will take any number string array and insert commas and decimals where
 * appropriate and return a number string that can then be easily set into the DOM.
 * @param {Array} arrayNumber
 * @returns {string} formattedInt
 */
function makeProperNumber(arrayNumber) {
  let rawNum = arrayNumber;
  while (rawNum.length < 3) {
    rawNum.unshift("0");
  }
  let floatNum = parseFloat(rawNum.join("")) / 100;
  let floatStr = floatNum.toFixed(2).toString();
  const wholeInt = floatStr.slice(0, floatStr.indexOf("."));
  const decimalInt = floatStr.slice(floatStr.indexOf("."), floatStr.length);
  let count = 0;
  let wholeIntComma = "";
  for (let i = wholeInt.length - 1; i >= 0; i--) {
    if (count % 3 == 0 && count != 0) {
      wholeIntComma = `${wholeInt[i]},${wholeIntComma}`;
    } else {
      wholeIntComma = `${wholeInt[i]}${wholeIntComma}`;
    }
    count++;
  }
  const formattedInt = wholeIntComma + decimalInt;
  return formattedInt;
}


const priceInput = document.getElementById("priceInput");

priceInput.addEventListener("input", (e) => {
  const extractedNumber = extractNumber(e.target.value);
  const properNumber = makeProperNumber(extractedNumber);
  e.target.value = properNumber;
});
