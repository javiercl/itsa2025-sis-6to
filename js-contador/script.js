const data = localStorage.getItem("mydb")
document.getElementById("num").innerHTML = data ? data : '0'; 

function clickCounter(e) {
    e.preventDefault()
    let valor = document.getElementById("num")
    if (e.target.innerText == '+')
        valor.innerText = Number(valor.innerText) + 1
    else
        valor.innerText = Number(valor.innerText) - 1
    
    localStorage.setItem("mydb",valor.innerText)
}