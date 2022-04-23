/////////////////////////////////////////////////////
let clicked = null;
let fecha = new Date()
let contenedor = null;
let turnSelect = null;
let dia = null;
let calendario = [];
let modal = document.querySelector('.modal');
let cerrar = document.querySelector('.cerrar');
let turno = document.querySelector('#turno');

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
    mes.innerText = `${meses[fecha.getMonth()]} ${anoActual}`
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
    let dtFecha = {
        mes: mesActual + 1,
        ano: anoActual
    }
    crEvent(dtFecha);
}
document.querySelector('.previo').addEventListener('click', () => {
    fecha.setMonth(fecha.getMonth() - 1);
    generarCalendario();
})
document.querySelector('.posterior').addEventListener('click', () => {
    fecha.setMonth(fecha.getMonth() + 1);
    generarCalendario();
})

function crEvent (dtFecha) {
    let dia = document.querySelectorAll('.day')
    for (let i = 0; i < dia.length; i++) {
        dia[i].addEventListener('click', modal)
    }
    function modal () {
        clicked = this;
        evento(clicked, dtFecha);
    }
}

function evento (clicked, dtFecha) {
    contenedor = clicked.lastChild;
    dia = clicked.firstChild.textContent;
    dtFecha['dia'] = Number(dia);
    let diafechado = [dtFecha['ano'], dtFecha['mes'], dtFecha['dia']]
    contenedor.style.backgroundColor = "blue";
    openModal();
    calendario.push(empujarCalend(diafechado));
    console.log(calendario)
}

function empujarCalend (diafechado) {
    return diafechado;
}

/////////////////////////////////////////////////////////////////
let seleccionTurno = document.getElementsByClassName('pre-turno');
function openModal () {
    modal.classList.add("modalOpen");
    for (let i = 0; i < seleccionTurno.length; i++) {
        seleccionTurno[i].addEventListener('click', turnInit)
    }
    cerrar.addEventListener('click', () => {
        modal.classList.remove('modalOpen');
    })
}

function turnInit () {
    turnSelect = this;
    changeTurn(turnSelect);
}


function changeTurn (turnSelect) {
    turno.value = turnSelect.textContent;
    contenedor.textContent = turno.value;
}


// function guardarTurno () {
    
    // }
    
    
    // function fechaActual () {
        //     return
        // }
generarCalendario();