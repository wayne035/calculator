const speacialBtn = document.querySelectorAll(".special-key");//[AC, +/- , %]
const operatorBtn = document.querySelectorAll(".operator-key");// [/ , * , - , + , =]
const numberBtn = document.querySelectorAll(".number-key");// (0..9) (.)
let display = document.querySelector(".display");
let displayValue = "0";
let numberArray = [];
let dot_on = true;
let operator_on = true;
function save(){
    numberArray.push(displayValue);
    console.log(numberArray);
}
function number(value){
    operator_on = true;
    let btntext = value.target.textContent;
    if(displayValue === "0") displayValue ="";
    if (btntext === "."){
        if(dot_on){
            displayValue += btntext;
            display.textContent +=".";
            dot_on = false;
        }
    }else{
        displayValue += btntext;
        display.textContent = displayValue;
        save()
        numberArray.pop();
    }
}
function special(value){
    let btntext = value.target.textContent;
    if (btntext === "AC"){
        displayValue = "0";
        display.textContent ="0";
        numberArray = [];
    }
    if (btntext === "+/-"){
        if (display.textContent.includes("-")){
            display.textContent = display.textContent.substring(1);
            numberArray.shift();
        }else{
            display.textContent = "-" + display.textContent;
            numberArray.unshift("-");
        }
    }
    if (btntext === "%"){
        display.textContent = Number(displayValue)/100;
        displayValue = Number(displayValue)/100;
    }
}
function operator(value){
    let btntext = value.target.textContent;
    dot_on = true;
    save()
    displayValue ="";
    if(operator_on){
        if (btntext === "+"){
            numberArray.push("+");
            display.textContent ="+";
        }
        if (btntext === "–"){
            numberArray.push("-");
            display.textContent ="-";
        }
        if(btntext === "÷"){
            numberArray.push("/");
            display.textContent ="÷";
        }
        if(btntext === "×"){
            numberArray.push("*");
            display.textContent ="x";
        }
        operator_on = false;
    }
    if (btntext === "="){
        operator_on = true;
        let sum = Number(eval(numberArray.join('')).toPrecision(10));
        if(isNaN(sum)){
            display.textContent = "0";
            numberArray = [];
        }else{
            display.textContent = sum;
            numberArray = [];
            numberArray.push(sum);
        }
    }
}
for(let i=0 ; i< numberBtn.length ; i++) {
    numberBtn[i].addEventListener('click',number);
}
for(let i=0 ; i< speacialBtn.length ; i++) {
    speacialBtn[i].addEventListener('click',special);
}
for(let i=0 ; i< operatorBtn.length ; i++) {
    operatorBtn[i].addEventListener('click',operator);
}