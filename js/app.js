const bill = document.getElementById("inp-bill");
const tipBtn = document.querySelectorAll('.btn');
const customBtn = document.getElementById("input-btn");


let billValue = 0.0;
let tipValue = 0.15;
let customBtnValue = 0;

bill.addEventListener('input', setBillValue);

tipBtn.forEach(btn => {
    btn.addEventListener('click', handleClick);
})

customBtn.addEventListener('input', setTipValue);

//check for numbers
function validateFloat(s) {
    var rgx = /^[0-9]*\.?[0-9]*$/;
    return s.match(rgx);
}


function setBillValue() {
  if (bill.value.includes(",")) {
    bill.value = bill.value.replace(",", ".");
  }

  //exclude letters
  if (!validateFloat(bill.value)) {
    bill.value = bill.value.substring(0, bill.value.length - 1);
  }

  //return value as a floating point number
  billValue = parseFloat(bill.value);
}

function setTipValue() {
    if (!validateFloat(customBtn.value)) {
        customBtn.value = customBtn.value.substring(0, customBtn.value.length - 1);
        console.log(customBtn.value)
    }

    tipValue = parseFloat(customBtn.value/100)
    
    tipBtn.forEach((btn) => {
      btn.classList.remove("btn-active");
    });
}

function handleClick(event) {

    //clear active state
    tipBtn.forEach(btn => {
        btn.classList.remove('btn-active')
        //set active state
        if (event.target.innerHTML == btn.innerHTML) {
            btn.classList.add('btn-active');
            tipValue = parseFloat(btn.innerHTML) / 100;
        }
    });

    //clear custom tip
    customBtn.value = '';
}