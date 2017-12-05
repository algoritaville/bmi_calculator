'use strict'
function calculateMWW() {

    let sex = document.querySelector('input[name = "sex"]:checked').value
    let weight = document.getElementById("weight").value
    let triceps = document.getElementById("triceps").value
    let subscapula = document.getElementById("subscapula").value
    let abdominal = document.getElementById("abdominal").value
    let abdominalOption = document.getElementById("abdominalOption")

    let sf
    if (sex ==="m") {
        sf = (triceps > 0 && subscapula > 0 && abdominal > 0) ? +triceps + +subscapula + +abdominal : 0
        abdominalOption.style.display = "block"
    } else {
        sf = (triceps > 0 && subscapula > 0) ? +triceps + +subscapula : 0
        abdominalOption.style.display = "none"
    }
    let bd = (sf > 0) ? (1.0973 - sf * 0.000815) + (Math.pow(sf, 2) * 0.00000084) : 0

    let bf
    if (sex ==="m") {
        bf = (bd > 0) ? ((457/bd) - (4.142) * 100) : 0
    } else {
        bf = (bd > 0) ? 1.35 * sf - 0.012 * Math.pow(sf, 2) - 3.4 : 0
    }

    let fw = (sf > 0 && weight > 0) ? weight * bf / 100 : 0
    let lbm = (sf > 0 && weight > 0) ? weight - fw : 0
    let quotient = (sex === "m") ? 0.93 : 0.88
    let mww = (sf > 0 && weight > 0) ? lbm / quotient : 0

    document.getElementById("mww").value = mww.toFixed(2)

    let calculations = document.getElementById("calculations")
    calculations.innerHTML = "<ul>" +
                        "<li>SF:" + sf +
                        "</li>" +
                        "<li>Body Density: " + bd.toFixed(2) +
                        "</li>" +
                        "<li>Body Fat: " + bf.toFixed(2) + "%" +
                        "</li>" +
                        "<li>Lean Body Mass: " + lbm.toFixed(2) +
                        "</li>" +
                        "</ul>"

    let weightLossSchedule = document.getElementById("weightLossSchedule")
    let schedule = document.getElementById("weightLossSchedule").getElementsByTagName("tbody")[0]
    schedule.innerHTML = ""
    let w, x, y, z
    let currentWeight = +weight
    let previousWeight = currentWeight
    let percentLost = 0
    let i = 0
    let newRow
    //console.log("Minimum Weight: " + mww + ", Current Weight: " + currentWeight)

    if (weight > mww && weight - mww < 150) {
        weightLossSchedule.style.display = "block"
        while (currentWeight > mww) {
            //console.log(weightLossSchedule)
            currentWeight -= weight * 0.015
            i++
            percentLost = (previousWeight - currentWeight) / previousWeight * 100

            newRow = schedule.insertRow(schedule.rows.length)
            w = newRow.insertCell(0)
            w.innerHTML = i
            x = newRow.insertCell(1)
            x.innerHTML = (currentWeight).toFixed(2)
            y = newRow.insertCell(2)
            y.innerHTML = (weight - currentWeight).toFixed(2)
            z = newRow.insertCell(3)
            z.innerHTML = percentLost.toFixed(2)

            previousWeight = currentWeight
        }
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
//
// A weight loss of 1.5% of a wrestler’s total body weight per week on the descent, has been established
// by the IHSA. A wrestler will not be allowed to wrestle at the established minimum weight until the
// date specified on the body fat result sheet provided by the IHSA. These dates allow for a descent of
// 1.5% weight loss per week from the date of the body fat testing.
//
