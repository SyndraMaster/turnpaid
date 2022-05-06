let salarioBase = 1000000;
let horaBase = Math.round(salarioBase/240);
let vrHrExDiOr = Math.round(horaBase * 1.25);
let vrHrExDiDoFes = Math.round(horaBase * 2);
let vrHrExNocOr = Math.round(horaBase * 1.75);
let vrHrExNocFoFes = Math.round(horaBase * 2.5);
let vrRecNocOr = Math.round(horaBase * 0.35);
let vrRecNocDoFes = Math.round(horaBase * 1.1);
let vrRecDom = Math.round(horaBase * 0.75);
let horasNormales = 0;
let recargoDominical = 0;
let recargoDominicalNoc = 0;
let recargoNocturnos = 0;
let totalDom = 0;
let totalDomNoc = 0
let totalNoc = 0
/////////////////////////////////////////////////////
let seleccionTurno = document.getElementsByClassName('pre-turno');
let clicked = null;
let fecha = new Date()
let contenedor = null;
let turnSelect = null;
let dia = null;
let calendario =[];
let modal = document.querySelector('.modal');
let cerrar = document.querySelector('.cerrar');
let turno = document.querySelector('#turno');
let diafechado = [];
let diaBuscado = null;
let terminar = document.querySelector('.terminar');
let cerrarNomina = document.querySelector('.cerrarNomina');
let drawPago = document.querySelector('.turnosContainer');
let totales = document.querySelector('.totales');
let guardar = document.querySelector('.confirmar');
function generarCalendario () {
    fecha.setDate(1);
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
    let dtFecha = {
        mes: mesActual + 1,
        ano: anoActual
    }
    mes.innerText = `${meses[fecha.getMonth()]} ${anoActual}`
    let days = '';
    for (let x = indexPrimerDia; x > 0; x--) {
      days += `<div class='prev-days'><p>${ultDiaMesPrevio - x + 1}</p></div>`;
    }
    for (let i = 1; i <= diasTotalesMes; i++) {
        days += `<div class="day" id="a${anoActual}_${mesActual + 1}_${i}"><p>${i}</p><div class="day-container"></div></div>`;
        diasMes.innerHTML = days;          
        }
    for (let j = 0; j < siguientesDias; j++) {
        days += `<div class='post-days'><p>${j + 1}</div>`;
        diasMes.innerHTML = days;
    }
    recuperarFechas();
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
    diafechado = [dtFecha['ano'], dtFecha['mes'], dtFecha['dia']];
    contenedor.classList.add('fulled');
    openModal(diafechado);
}

function openModal () {
    modal.classList.add("modalOpen");
    for (let i = 0; i < seleccionTurno.length; i++) {
        seleccionTurno[i].addEventListener('click', turnInit)
    }
}

function agregarJson (turno, diafechado) {
    if(calendario.find(e => e.fecha == diafechado.toString()) != null) {
        calendario.find(e => e.fecha == diafechado.toString()).horario = turno;
    }
    else {
        calendario.push({
            fecha: diafechado.toString(),
            horario: turno
        })
    }
    modal.classList.remove('modalOpen');
}

cerrar.addEventListener('click', () => {
    modal.classList.remove('modalOpen');
})

function turnInit () {
    turnSelect = this;
    changeTurn(turnSelect);
}


function changeTurn (turnSelect) {
    turno.value = turnSelect.textContent;
    contenedor.textContent = turno.value;
}

function recuperarFechas () {
    calendario.forEach(e => 
        reescribirFecha(e)
        );
        
    }
    
    function reescribirFecha (element) {
        let arreglo = '#a' + element.fecha.replace(/,/g, '_');
        diaBuscado = document.querySelector(`${arreglo}`);
        if (diaBuscado != null) {
            diaBuscado.lastChild.textContent = element.horario;
        diaBuscado.lastChild.classList.add('fulled')
    }
}
terminar.addEventListener('click', () => {
    let mesAnterior = fecha.getMonth();
    let mesActual = fecha.getMonth() + 1
    drawPago.innerHTML = ''
    consolidarNomina(mesAnterior, mesActual)
    console.log(totalNoc);
    console.log(totalDom);
    console.log(totalDomNoc);
    document.querySelector('.drawNomina').style.display = 'flex'
    cerrarNomina.addEventListener('click', () => {
        document.querySelector('.drawNomina').style.display = 'none';
        document.querySelector('.calendar').style.display = "flex";
        totalDom = 0;
        totalDomNoc = 0;
        totalNoc=0;
    })
    document.querySelector('.calendar').style.display = "none";
})
guardar.addEventListener('click', () => {
    agregarJson(turno.value, diafechado)
    turno.value = '';
})

function consolidarNomina (mes1, mes2) {
    calendario.forEach(e => {
        // console.log(e.horario)
        let fechaNomina = new Date(e.fecha + ',' + e.horario)
        for (let i = 0; i < 8; i++) {
            calcNomina(fechaNomina)
        }
        let nomina = `<div class="container"><div class="fecha-hora"><p>${e.fecha}</p><p>${e.horario}</p></div><div><p>Rec. Noc:</p><p>$${recargoNocturnos}</p></div><div><p>Rec. Dom:</p><p>$${recargoDominical}</p></div><div><p>Dom. Noc:</p><p>$${recargoDominicalNoc}</p></div></div>`
        drawPago.innerHTML += nomina;
        console.log(e.fecha);
        recargoNocturnos = 0
        recargoDominicalNoc = 0
        recargoDominical = 0
        // console.log(fechaNomina.getDay());
        
    })
    let drawTotales = `<p>Recargos Totales:</p><div>Recargos Nocturnos: ${totalNoc}</div><div>Recargos Dominicales:${totalDom}</div><div>Recargos Dominicales Noc.:${totalDomNoc}</div>`
    totales.innerHTML = drawTotales
}


function calcNomina (fechaNomina) {
    let horaPago = fechaNomina.getHours();
    let diaPago = fechaNomina.getDay();
    if (horaPago >= 21 || horaPago <= 5) {
        if (diaPago == 0) {
            console.log('Nocturna dominical');
            recargoDominicalNoc += vrRecNocDoFes;
            totalDomNoc += vrRecNocDoFes;
        } else {
            recargoNocturnos += vrRecNocOr;
            totalNoc += vrRecNocOr;
        }
    } else {
        if (diaPago == 0) {
            console.log('recargo dominical');
            console.log(recargoDominical);
            recargoDominical += vrRecDom;
            totalDom += vrRecDom;
        }
    }
    fechaNomina.setTime(fechaNomina.getTime() + 1 * 60 * 60 * 1000);
}
generarCalendario();