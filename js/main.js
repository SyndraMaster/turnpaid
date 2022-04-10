

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////
let clicked = null;
let fecha = new Date()
let contenedor = null;
let turnSelect = null;

function generarCalendario () {
    fecha.setDate(1)
    let mesActual = fecha.getMonth();
    let indexPrimerDia = fecha.getDay();
    let anoActual = fecha.getFullYear();
    let diasTotalesMes = new Date(anoActual, mesActual + 1, 0).getDate();
    let ultDiaMesPrevio = new Date(anoActual, mesActual, 0).getDate();
    let ultimoDiaIndice = new Date (anoActual, mesActual + 1, 0).getDay()
    let siguientesDias = 7 - ultimoDiaIndice - 1;
    let mes = document.querySelector('.mes')
    let meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    let diasMes = document.querySelector('.dias-mes');
    mes.innerText = `${meses[fecha.getMonth()]}`
    let days = '';
    for (let x = indexPrimerDia; x > 0; x--) {
        days += `<div class='prev-days'><p>${ultDiaMesPrevio - x + 1}</p></div>`;
    }
    for (let i = 1; i <= diasTotalesMes; i++) {
        days += `<div class="day" dt-day="${i}"><p>${i}</p><div class="day-container"></div></div>`;
        diasMes.innerHTML = days;
    }
    for (let j = 0; j < siguientesDias; j++) {
        days += `<div class='post-days'><p>${j + 1}</p><div class="day-container"></div></div>`;
        diasMes.innerHTML = days;
    }
}
document.querySelector('.previo').addEventListener('click', () => {
    fecha.setMonth(fecha.getMonth() - 1);
    generarCalendario();
})
document.querySelector('.posterior').addEventListener('click', () => {
    fecha.setMonth(fecha.getMonth() + 1);
    generarCalendario();
})
generarCalendario();

function crEvent () {
    let dia = document.querySelectorAll('.day')
    for (let i = 0; i < dia.length; i++) {
        dia[i].addEventListener('click', modal)
    }
    function modal () {
        clicked = this;
        evento(clicked);
    }
}

function evento (clicked) {
    contenedor = clicked.lastChild;
    contenedor.style.backgroundColor = "blue";
    openModal(contenedor);
    console.log(contenedor);
}

//////////////////////////////////////////////////////////////////////////////////////////
function openModal (contenedor) {
    
}
crEvent();
let turno = document.querySelector('#turno');
turno.addEventListener('change', () => {
    console.log(turno.value);
})
let seleccionTurno = document.getElementsByClassName('pre-turno');
for (let i = 0; i < seleccionTurno.length; i++) {
    seleccionTurno[i].addEventListener('click', turnInit)
}
function turnInit () {
    turnSelect = this;
    changeTurn(turnSelect);
}
function changeTurn (turnSelect) {
    turno.value = turnSelect.textContent;
    console.log(turnSelect.textContent)
}
