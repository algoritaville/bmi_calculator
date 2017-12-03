'use strict'
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
