const billInput = document.getElementById("inp-bill");
const tipBtn = document.querySelectorAll(".btn");
const customBtn = document.getElementById("input-btn");
const numOfPeopleInput = document.getElementById("number-of-people");
const peopleDestriction = document.querySelector(".people-destriction");
const results = document.querySelectorAll(".value");
const resetBtn = document.getElementById('resetBtn');

let billValue = 0.0;
let tipValue = 0.15;
let customBtnValue = 0;
let peopleValue = 1;

billInput.addEventListener("input", setBillValue);

tipBtn.forEach((btn) => {
  btn.addEventListener("click", handleClick);
});

customBtn.addEventListener("input", setTipCustomValue);

numOfPeopleInput.addEventListener("input", setNumOfPeople);

resetBtn.addEventListener('click', reset);

//check for numbers
function validateFloat(s) {
  var rgx = /^[0-9]*\.?[0-9]*$/;
  return s.match(rgx);
}

function setBillValue() {
  if (billInput.value.includes(",")) {
    billInput.value = billInput.value.replace(",", ".");
  }

  //exclude letters
  if (!validateFloat(billInput.value)) {
    billInput.value = billInput.value.substring(0, billInput.value.length - 1);
  }

  //return value as a floating point number
  billValue = parseFloat(billInput.value);

  calculateTip();
}

function setTipCustomValue() {
  if (!validateFloat(customBtn.value)) {
    customBtn.value = customBtn.value.substring(0, customBtn.value.length - 1);
    console.log(customBtn.value);
  }

  tipValue = parseFloat(customBtn.value / 100);

  tipBtn.forEach((btn) => {
    btn.classList.remove("btn-active");
  });

  if (customBtn.value !== "") {
    calculateTip();
  }
}

function setNumOfPeople() {
  if (numOfPeopleInput.value <= 0) {
    peopleDestriction.style.display = "inline";
  } else {
    peopleDestriction.style.display = "none";
  }

  if (!validateFloat(numOfPeopleInput.value)) {
    numOfPeopleInput.value = numOfPeopleInput.value.substring(
      0,
      numOfPeopleInput.value.length - 1
    );
  }

  peopleValue = parseFloat(numOfPeopleInput.value);

  calculateTip();
}

function handleClick(event) {
  //clear active state
  tipBtn.forEach((btn) => {
    btn.classList.remove("btn-active");
    //set active state
    if (event.target.innerHTML == btn.innerHTML) {
      btn.classList.add("btn-active");
      tipValue = parseFloat(btn.innerHTML) / 100;
    }
  });

  //clear custom tip
  customBtn.value = "";

  calculateTip();
}

function calculateTip() {
  if ((peopleValue) => 1) {
    let tipAmount = (billValue * tipValue) / peopleValue;
    let total = (billValue * (tipValue + 1)) / peopleValue;

    results[0].innerHTML = "$" + tipAmount.toFixed(2);
    results[1].innerHTML = "$" + total.toFixed(2);
  }

}

function reset() {
  billInput.value = '';
  setBillValue();

  tipBtn[2].click();

  numOfPeopleInput.value = '1';
  setNumOfPeople();

  results[0].innerHTML = '$0.00';
  results[1].innerHTML = "$0.00";
}