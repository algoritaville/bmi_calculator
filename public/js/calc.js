'use strict'

sf = () => {
    if (!isNaN(triceps) && !isNaN(subscapula) && !isNaN(abdominal)) {
        return(triceps + subscapula + abdominal)
    } else {
        return(0)
    }
}
bd = () => {
    if (sf() > 0) {
        return((1.0973 - sf() * 0.000815) + (Math.pow(sf(), 2) * 0.00000084))
    } else {
        return(0)
    }
}
bf = () => {
    if (sf() > 0) {
        return((((457/bd()) - (4.142) * 100)))
    } else {
        return (0)
    }
}
fw = () => {
    if (sf() > 0 && weight > 0) {
        return( weight * (bf() / 100))
    } else {
        return (0)
    }
}
lbm = () => {
    if (sf() > 0 && weight > 0) {
        return( weight - fw())
    } else {
        return (0)
    }
}
mww = () => {
    let quotient = 1;
    if (sex === "m") { quotient = 0.93 } else { quotient = 0.88 }
    if (sf() > 0 && weight > 0) {
        return( lbm() / quotient )
    } else {
        return (0)
    }
}

// Sum of SF = Triceps SF + Subscapula SF + Abdominal SF
// BD = (1.0973-(sum SF * .000815)) + ((sum SF)^2 * .00000084)
// % BF = (457/BD) - (4.142) x 100

// To calculate a wrestler's minimum weight based on 7% body fat you can use either of the
// following calculations.
// Minimum wrestling weight (MWW) = ([1-(%BF/100)] * TBW) / (.93)
// or
// Fat weight (FW) = TBW * (%BF / 100)
// Lean Body Mass (LBM) = TBW-FW
// MWW = (LBM) / .93
// NOTE: The IHSA will be using the Boileau Equation-Calculation for determining % body fat for female
// wrestlers.
// %BF=1.35 x (sum SF)-0.012 x (sum SF)2 -3.4
// Sum of SF = Triceps SF + Subscapula SF
// MWW (Females) = (LBM) / .88

function calculatePayment() {
let principal = document.getElementById("principal").value
let rate = document.getElementById("rate").value / 100
let term = document.getElementById("term").value
let payment = principal * rate * Math.pow((1.0 + rate), term) / (Math.pow((1.0 + rate), term) - 1.0)
let priorPrincipal = principal
let currentPrincipal = principal
let tableRef
let newRow
let x
let y
let z

document.getElementById("payment").value = payment.toFixed(2)

tableRef = document.getElementById("amortizationSchedule").getElementsByTagName("tbody")[0]
tableRef.innerHTML = ""

for (let i=1; i<term; i++) {
    priorPrincipal = currentPrincipal * (1 + rate) - payment
    currentPrincipal = priorPrincipal
    // i  priorPrincipal.toFixed(2) (payment * i).toFixed(2)
    newRow = tableRef.insertRow(tableRef.rows.length)
    x = newRow.insertCell(0)
    x.innerHTML = i
    y = newRow.insertCell(1)
    y.innerHTML = priorPrincipal.toFixed(2)
    z = newRow.insertCell(2)
    z.innerHTML = (payment * i).toFixed(2)
}


}
