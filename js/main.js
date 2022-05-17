let salarioBase = 1000000;
let horasPlus = document.getElementsByClassName('hora-ex');
let subsidioTransporte = 117172;
let deduccionAFP = 0;
let deduccionEPS = 0;
let horaBase = 0;
let vrHrExDiOr = 0;
let vrHrExDiDoFes = 0;
let vrHrExNocOr = 0;
let vrHrExNocFoFes = 0;
let vrRecNocOr = 0;
let vrRecNocDoFes = 0;
let vrRecDom = 0;
let horasNormales = 0;
let recargoDominical = 0;
let recargoDominicalNoc = 0;
let recargoNocturnos = 0;
let totalDom = 0;
let totalDomNoc = 0
let totalNoc = 0
let totalExtraDom, totalExtraDomNoc, totalExtraNoc, totalOrdinaria = 0;
let extraOrdinaria, extraDominicales, extrasDominicalesNoc, extrasNocturnas = 0;
/////////////////////////////////////////////////////
let seleccionTurno = document.getElementsByClassName('pre-turno');
let clicked = null;
let selected = null;
let fecha = new Date()
let currentColor = '';
let contenedor = null;
let turnSelect = null;
let dia = null;
let calendario =[];
let modal = document.querySelector('.modal');
let cerrar = document.querySelector('.cerrar');
let turno = document.querySelector('#turno');
let horaExtras = 0;
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
        days += `<div class="day" id="a${anoActual}_${mesActual + 1}_${i}"><p>${i}</p><div class="day-container" style="background-color: rgb(${currentColor}"></div></div>`;
        diasMes.innerHTML = days;          
        }
    for (let j = 0; j < siguientesDias; j++) {
        days += `<div class='post-days'><p>${j + 1}</div>`;
        diasMes.innerHTML = days;
    }
    
    recuperarFechas();
    crEvent(dtFecha);
    cambiarEsquema()
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
selecthe()

function openModal () {
    modal.classList.add("modalOpen");
    for (let i = 0; i < seleccionTurno.length; i++) {
        seleccionTurno[i].addEventListener('click', turnInit)
    }
}

function turnInit () {
    turnSelect = this;
    changeTurn(turnSelect);
}

function changeTurn (turnSelect) {
    turno.value = turnSelect.textContent;
    console.log(horaExtras)
    // contenedor.textContent = turno.value + '-' + horaExtras;
    // recuperarFechas();
}
function selecthe () {
    let horaSelect = null;
    for (let i = 0; i < horasPlus.length; i++) {
        horasPlus[i].addEventListener('click', initHoras)
    }
    function initHoras () {
        horaSelect = this;
        cambiarFondoHe(horaSelect);
    }
    function cambiarFondoHe (elemento) {
        for (let i = 0; i < horasPlus.length; i++) {
            horasPlus[i].classList.remove('active');
        }
        elemento.classList.add('active')
    }
    document.querySelector('.plus0').addEventListener('click', () => {
        horaExtras = 0;
        recuperarFechas()
    })
    document.querySelector('.plus1').addEventListener('click', () => {
        horaExtras = 1;
        recuperarFechas()
    })
    document.querySelector('.plus2').addEventListener('click', () => {
        horaExtras = 2;
        recuperarFechas()
    })
}
function agregarJson (turno, diafechado) {
    if(calendario.find(e => e.fecha == diafechado.toString()) != null) {
        calendario.find(e => e.fecha == diafechado.toString()).horario = turno;
        calendario.find(e => e.fecha == diafechado.toString()).horaExtras = horaExtras;
    }
    else {
        calendario.push({
            fecha: diafechado.toString(),
            horario: turno,
            horaExtras: horaExtras
        })
    }
    calendario.sort(function(a, b) { a = new Date(a.fecha); b = new Date(b.fecha); return a>b ? -1 : a<b ? 1 : 0; });

    modal.classList.remove('modalOpen');
}

cerrar.addEventListener('click', () => {
    modal.classList.remove('modalOpen');
})

function recuperarFechas () {
    calendario.forEach(e => 
        reescribirFecha(e)
        );
    }

function reescribirFecha (element) {
    let arreglo = '#a' + element.fecha.replace(/,/g, '_');
    diaBuscado = document.querySelector(`${arreglo}`);
    if (diaBuscado != null) {
        if(element.horaExtras != 0) {
            diaBuscado.lastChild.textContent = element.horario + " + " +element.horaExtras;
        } else {
            diaBuscado.lastChild.textContent = element.horario;

        }
        
        diaBuscado.lastChild.classList.add('fulled')
    }
}


terminar.addEventListener('click', () => {
    let mesAnterior = fecha.getMonth();
    let mesActual = fecha.getMonth() + 1
    drawPago.innerHTML = ''
    consolidarNomina(mesAnterior, mesActual)
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
    agregarJson(turno.value, diafechado, horaExtras)
    recuperarFechas();
    turno.value = '';
    horaExtras = 0;
    for (let i = 0; i < horasPlus.length; i++) {
        horasPlus[i].classList.remove('active');
    }
    
})


function consolidarNomina (mes1, mes2) {
    horaBase = Math.round(salarioBase/240);
    vrHrExDiOr = Math.round(horaBase * 1.25);
    vrHrExDiDoFes = Math.round(horaBase * 2);
    vrHrExNocOr = Math.round(horaBase * 1.75);
    vrHrExNocFoFes = Math.round(horaBase * 2.5);
    vrRecNocOr = Math.round(horaBase * 0.35);
    vrRecNocDoFes = Math.round(horaBase * 1.1);
    vrRecDom = Math.round(horaBase * 0.75);
    calendario.forEach(e => {
        let fechaNomina = new Date(e.fecha + ',' + e.horario)
        
        for (let i = 0; i < 8; i++) {
            calcNomina(fechaNomina)
        }
        for (let i = 0; i < e.horaExtras; i++) {
            calcExtras(fechaNomina)
        }
        let nomina = `<div class="container"><div class="fecha-hora"><p>${e.fecha.replace(/,/g, '-')}</p><p>${e.horario}</p></div><div><p>Rec. Noc:</p><p>$${recargoNocturnos}</p></div><div><p>Rec. Dom:</p><p>$${recargoDominical}</p></div><div><p>Dom. Noc:</p><p>$${recargoDominicalNoc}</p></div></div>`
        drawPago.innerHTML += nomina;
        recargoNocturnos = 0
        recargoDominicalNoc = 0
        recargoDominical = 0
        horaExtras = 0;
        
    })
    let numeroNomina = totalDom + totalDomNoc + totalNoc + salarioBase + subsidioTransporte;
    deduccionEPS = (numeroNomina-subsidioTransporte) * 0.04;
    deduccionAFP = (numeroNomina-subsidioTransporte) * 0.04;
    numeroNomina = numeroNomina - deduccionAFP + deduccionEPS;
    let salarioNeto = numeroNomina - deduccionAFP - deduccionEPS
    let drawTotales = `<p class="totalNomina">Total Nomina: $${moneda(Math.round(salarioNeto))}</p><div class="total"><p>Salario Base</p><p>$${moneda(salarioBase)}</p></div><div class="total"><p>Subsidio de transporte</p><p>$${moneda(subsidioTransporte)}</p></div><div class="total"><p>Rec. Nocturnos:</p><p>$${moneda(totalNoc)}</p></div><div class="total"><p>Rec. Dominicales:</p><p>$${moneda(totalDom)}</p></div><div class="total"><p>Rec. Dominicales Noc.:</p><p>$${moneda(totalDomNoc)}</p></div><div class="total"><p>Deducción EPS:</p><p>-$${moneda(Math.round(deduccionEPS))}</p></div><div class="total"><p>Deducción AFP:</p><p>-$${moneda(Math.round(deduccionAFP))}</p></div>`
    totales.innerHTML = drawTotales
}
function moneda (dinero) {
    let resultado = Intl.NumberFormat('es-IN', {style: 'currency', currency: 'COP', minimumFractionDigits: 0}).format(dinero);
    return resultado
}
function calcExtras (fechaNomina) {
    let horaPago = fechaNomina.getHours();
    let diaPago = fechaNomina.getDay();
    if (horaPago >= 21 || horaPago <= 5) {
        if (diaPago == 0) {
            extrasDominicalesNoc += vrHrExNocFoFes;
            totalExtraDomNoc += vrHrExNocFoFes;
            console.log(vrHrExNocFoFes)
        } else {
            extrasNocturnas += vrHrExNocOr;
            totalExtraNoc += vrHrExNocOr;
        }
    } else {
        if (diaPago == 0) {
            extraDominicales += vrHrExDiDoFes;
            totalExtraDom += vrHrExDiDoFes;
        } else {
            extraOrdinaria += vrHrExDiOr
            totalOrdinaria += vrHrExDiOr
        }
    }
    fechaNomina.setTime(fechaNomina.getTime() + 1 * 60 * 60 * 1000);
}
function calcNomina (fechaNomina) {
    let horaPago = fechaNomina.getHours();
    let diaPago = fechaNomina.getDay();
    if (horaPago >= 21 || horaPago <= 5) {
        if (diaPago == 0) {
            recargoDominicalNoc += vrRecNocDoFes;
            totalDomNoc += vrRecNocDoFes;
        } else {
            recargoNocturnos += vrRecNocOr;
            totalNoc += vrRecNocOr;
        }
    } else {
        if (diaPago == 0) {
            recargoDominical += vrRecDom;
            totalDom += vrRecDom;
        }
    }
    fechaNomina.setTime(fechaNomina.getTime() + 1 * 60 * 60 * 1000);
}

generarCalendario();

function cambiarEsquema() {
    let esquemaColorBack = document.querySelectorAll('h1, .mes-head, .day-container, .modal-titulo, .confirmar');
    let puestoTrabajo = document.querySelectorAll('.rol')
    for (let i = 0; i < puestoTrabajo.length; i++) {
        const element = puestoTrabajo[i];
        element.addEventListener('click', iniciarCambio)
    }


    function iniciarCambio () {
        selected = this;
        cambiarPuesto(selected)
    }

    function cambiarPuesto (selected) {
        for (let i = 0; i < puestoTrabajo.length; i++) {
            const element = puestoTrabajo[i];
            element.classList.remove('active')
        }
        selected.classList.add('active');
        for (let i = 0; i < esquemaColorBack.length; i++) {
            currentColor = getComputedStyle(selected).backgroundColor;
            esquemaColorBack[i].style.backgroundColor = currentColor;
        }
        switch (selected.textContent) {
            case 'Supervisor':
                salarioBase = 1591335;
                break;
            case 'Conductor':
                salarioBase = 1150000  
                break;
            default:
                salarioBase = 1000000
                break;
        }
    }
}