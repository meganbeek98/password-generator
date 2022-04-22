// Set the Dominant Elements (EL)
const resultEL = document.getElementById("result");
const copybtnEL = document.getElementById("copy");
const lengthEL = document.getElementById("length");
const uppercaseEL = document.getElementById("uppercase");
const numbersEL = document.getElementById("numbers");
const symbolsEL = document.getElementById("symbols");
const genbtnEL = document.getElementById("generate");

const form = document.getElementById("passGenForm");

// Array setup for special Characters (Char)
const UPPERCASE_Char = arrayFromLowToHigh(65, 90);
const LOWERCASE_Char = arrayFromLowToHigh(97, 122);
const NUMBERS_Char = arrayFromLowToHigh(48, 57);
const SYMBOLS_Char = arrayFromLowToHigh(33, 47)
  .concat(arrayFromLowToHigh(58, 64))
  .concat(arrayFromLowToHigh(91, 96))
  .concat(arrayFromLowToHigh(123, 126));

  // Character Code Generating Function
function arrayFromLowToHigh(low, high) {
  const array = [];
  for (let i = low; i <= high; i++) {
    array.push(i);
  }
  return array;
}

// The Generate (GEN) Password Function
let passwordGEN = (
  Char_Amount,
  incl_UPPERCASE,
  incl_NUMBERS,
  incl_SYMBOLS
) => {
  let Char_RULES = LOWERCASE_Char;     // RULES for Characters (Char)
  if (incl_UPPERCASE) Char_RULES = Char_RULES.concat(UPPERCASE_Char);
  if (incl_SYMBOLS) Char_RULES = Char_RULES.concat(SYMBOLS_Char);
  if (incl_NUMBERS) Char_RULES = Char_RULES.concat(NUMBERS_Char);
  const passCharacters = [];
  for (let i = 0; i < Char_Amount; i++) {
    const characterCode =
      Char_RULES[Math.floor(Math.random() * Char_RULES.length)];
    passCharacters.push(String.fromCharCode(characterCode));
  }
  return passCharacters.join("");
};

// The Copy Button -- EventListener
copybtnEL.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const pass_ToCopy = resultEL.innerText;
  // IF Password result container is EMPTY
  if (!pass_ToCopy) return;
  // Copy Functionality
  textarea.value = pass_ToCopy;
  document.body.appendChild(textarea);
  textarea.select();
  navigator.clipboard.writeText(pass_ToCopy);
  textarea.remove();
  alert("Your secure password has been copied to clipboard!");
});

// Taking in to account the options that are selected -- THEN, generating the random password when submitbtn ("Generate Password" btn) is clicked
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const Char_Amount = lengthEL.value;
  const incl_UPPERCASE = uppercaseEL.checked;      // incl == "include"
  const incl_NUMBERS = numbersEL.checked;         // "      "
  const incl_SYMBOLS = symbolsEL.checked;        // "      "
  const password = passwordGEN(
    Char_Amount,
    incl_UPPERCASE,
    incl_NUMBERS,
    incl_SYMBOLS
  );
  resultEL.innerText = password;
});