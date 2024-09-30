const fs = require("fs"); // Importing fs to allow us to use it.
const readline = require('readline-sync');  // Import readline-sync for synchronous input
const inputFile = "./common_passwords.txt"
const outputFile = "./checking_password_log.txt";


// No need for a comment as the function name is self-describing.
function getCurrentDateTimeFormatted() {
  const currentDate = new Date();

  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-indexed
  const year = String(currentDate.getFullYear());
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');

  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}

function readInFile(filename){
  const data = fs.readFileSync(inputFile, "utf-8")
  const lines = data.split(/\n/)
  return lines;
}

const passwordCriteria = {
    length: /.{8,}/,                    // Minimum 8 characters
    uppercase: /[A-Z]/,                // Must have uppercase letters
    lowercase: /[a-z]/,                // Must have lowercase letters
    digit: /[0-9]/,                    // Must have digits
    specialChar: /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\|=]/  // Must have special characters
};

function isStrongPassword(password) {
    // Check each condition using the predefined regex
    return passwordCriteria.length.test(password) &&
           passwordCriteria.uppercase.test(password) &&
           passwordCriteria.lowercase.test(password) &&
           passwordCriteria.digit.test(password) &&
           passwordCriteria.specialChar.test(password);
}

function getPasswordStrength(password) {
    const conditionsPassed = [
        passwordCriteria.length.test(password),
        passwordCriteria.uppercase.test(password),
        passwordCriteria.lowercase.test(password),
        passwordCriteria.digit.test(password),
        passwordCriteria.specialChar.test(password)
    ].filter(x => x === true).length;
  
    if (conditionsPassed === 5) {
      return "Strong";
    } else if (conditionsPassed >= 3) {
      return "Medium";
    } else {
      return "Weak";
    }
  }


function getPasswordFromUser() {
    const password = readline.question("Please enter your password: ", {
        hideEchoBack: true  // Masks the password input for privacy
    });
    const currentDateTime = getCurrentDateTimeFormatted();
    fs.appendFileSync(outputFile, `${currentDateTime}\n`, "utf-8");
    if (poorPasswords.includes(password)){
      console.log("It is in the array")
    }else{
      console.log("not in the array")
    }
    const strength = getPasswordStrength(password);
    console.log(`Password strength: ${strength}`);

    if (strength === "Strong") {
        console.log("Your password is strong.");
    } else {
        console.log("Password does not meet the criteria. Please enter a different password.");
        getPasswordFromUser();  
    }
}

// End of functions

// Call a function to read in the data from a file.
const poorPasswords = readInFile(inputFile); 

// Enter code to read in the 25 most common passwords from the text file here.
getPasswordFromUser();






