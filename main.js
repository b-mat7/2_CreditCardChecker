// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


// Add your functions below:

// Check if a CreditCard is legit 
const validateCred = (cardNr) => {
    let luhnArr = [];
    let cardNrCopy = cardNr.slice();

    for (let i = cardNrCopy.length - 1; i >= 0; i--) {
        if (i % 2 === 0) {
            cardNrCopy[i] *= 2;
            if (cardNrCopy[i] > 9) {
                cardNrCopy[i] -= 9;
            };
        };
        luhnArr.unshift(cardNrCopy[i]);
    };
    // Return value for further processing
    return (luhnArr.reduce((acc, currVal) => acc + currVal) % 10 === 0) ? true : false;

    // Console + return for debugging
    // console.log(...luhnArr);
    // return(`Sum:${luhnArr.reduce((acc, currVal) => acc + currVal)} ` + `--> Modulo10:${(luhnArr.reduce((acc, currVal) => acc + currVal) %10 === 0) ? true : false}`);
};

// Check a batch (nested arrays) of cards and return the invalid cards as an array
const findInvalidCards = (listofCards) => {
    let invalidCards = [];
    let validCards = [];

    for (let i = 0; i < listofCards.length; i++) {
        if (validateCred(listofCards[i]) === false) {
            invalidCards.push(listofCards[i]);
        };
        validCards.push(listofCards[i]);
    };
    // Return value for processing
    return invalidCards;

    // Return value for debugging
    // return [invalidCards, validCards];
};

// Check which companies issued the invalid Cards (also a nested array)
const idInvalidCardCompanies = (listOfCards) => {
    let cardIssuers = [];
    for (let i = 0; i < listOfCards.length; i++) {
        switch (listOfCards[i][0]) {
            case 3:
                if (cardIssuers.indexOf('Amex') === -1) { cardIssuers.push('Amex') };
                break;
            case 4:
                if (cardIssuers.indexOf('Visa') === -1) { cardIssuers.push('Visa') };
                break;
            case 5:
                if (cardIssuers.indexOf('Mastercard') === -1) { cardIssuers.push('Mastercard') };
                break;
            case 6:
                if (cardIssuers.indexOf('Discover') === -1) { cardIssuers.push('Discover') };
                break;
        };
    };
    // Return value for processing
    return (cardIssuers.length === 0) ? 'Company not found' : cardIssuers;

};

// console.log(validateCred(valid1));                           // Test validateCred()
console.log(findInvalidCards(batch));                           // Test findInvalidCards()
console.log(idInvalidCardCompanies(findInvalidCards(batch)));   // Test idInvalidCardCompanies()