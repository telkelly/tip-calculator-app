const bill = document.getElementById("inp-bill");
const tipBtn = document.querySelectorAll('.btn');


let tipValue = 0.15;
let billValue = 0.0;

bill.addEventListener('input', setBillValue);
tipBtn.forEach(btn => {
    btn.addEventListener('click', handleClick);
})

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
    console.log(bill.value);
  }

  //return value as a floating point number
  billValue = parseFloat(bill.value);
}

function handleClick(event) {
    tipBtn.forEach(btn => {
        btn.classList.remove('btn-active')
        
        if (event.target.innerHTML == btn.innerHTML) {
            btn.classList.add('btn-active');
            tipValue = parseFloat(btn.innerHTML) / 100;
        }
    
    
    });

    console.log(tipValue)
}