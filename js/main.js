let salarioBase = 1000000;
let horasPlus = document.getElementsByClassName('hora-ex');
let subsidioTransporte = 117172;
let deduccionesTotales = 0, horaBase = 0, vrHrExDiOr = 0, vrHrExDiDoFes = 0, vrHrExNocOr = 0, vrHrExNocDoFes = 0, vrRecNocOr = 0, vrRecNocDoFes = 0, vrRecDom = 0, horasNormales = 0, recargoDominical = 0, recargoDominicalNoc = 0, recargoNocturnos = 0, totalDom = 0, totalDomNoc = 0, totalNoc = 0;
let totalExtraDom = 0, totalExtraDomNoc = 0, totalExtraNoc = 0, totalOrdinaria = 0, extraOrdinaria = 0;
let extraDominicales = 0, extrasDominicalesNoc = 0, extrasNocturnas = 0;
let recargoNoCompensadoNoc = 0, recargoNoCompensado = 0;
let horasXDomNoc = 0, horasXNoc = 0, horasXDom = 0, horasXOrd = 0, horasXSC = 0, horasXSCNoc = 0;
let totalNoCompensado = 0, totalNoCompensadoNoc = 0, vrNoCompensado = 0, vrNoCompensadoNoc = 0
let festivos  = ['2022,1,1','2022,1,10','2022,3,21','2022,4,14','2022,4,15','2022,5,1','2022,5,30','2022,6,20','2022,6,27','2022,7,4','2022,7,20','2022,8,7','2022,8,15','2022,10,17','2022,11,7','2022,12,8','2022,12,25'];
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
let cuerpo = document.querySelector('body');


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
    openModal(diafechado);
}
selecthe()

function openModal () {
    modal.classList.add("modalOpen");
    window.scrollTo(0,0) 
    cuerpo.style.height = '100%';
    cuerpo.style.overflow = 'hidden';
    for (let i = 0; i < seleccionTurno.length; i++) {
        seleccionTurno[i].addEventListener('click', turnInit)
    }
}

function cerrarModal () {
    modal.classList.remove('modalOpen')
    cuerpo.style.overflow = 'visible';
}
document.querySelector('.descanso').addEventListener('click', () => {
    turno.value = '';
    cerrarModal();
    turnSelect.classList.add('diaDescanso');
    turnSelect.classList.remove('fulled');
})

function turnInit () {
    turnSelect = this;
    changeTurn(turnSelect);
}

function changeTurn (turnSelect) {
    turno.value = turnSelect.textContent;
    document.querySelector('.descanso').addEventListener('click', () => {
        turno.value = '';
        cerrarModal();
    })
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

    cerrarModal();
}

cerrar.addEventListener('click', () => {
    cerrarModal();
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
        diaBuscado.lastChild.classList.add('fulled');
        if(element.horaExtras != 0) {
            diaBuscado.lastChild.textContent = element.horario + " + " +element.horaExtras;
        } else {
            diaBuscado.lastChild.textContent = element.horario;
        }
        if (turno.value != 0) {
            diaBuscado.lastChild.classList.add('fulled')
        }
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
        totalNoc = 0;
        totalOrdinaria = 0;
        totalExtraDom = 0;
        totalExtraNoc = 0;
        totalExtraDomNoc = 0;
        horasXDom = 0, horasXDomNoc = 0, horasXOrd = 0, horasXNoc = 0, horasXSC = 0, horasXSCNoc = 0;
        totalNoCompensado = 0;
        totalNoCompensadoNoc = 0;
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
  vrHrExNocDoFes = Math.round(horaBase * 2.5);
  vrRecNocOr = Math.round(horaBase * 0.35);
  vrRecNocDoFes = Math.round(horaBase * 1.1);
  vrRecDom = Math.round(horaBase * 0.75);
  vrNoCompensado = Math.round(horaBase * 1.75)
  vrNoCompensadoNoc = Math.round(horaBase * 2.1)
  calendario.forEach(e => {
    let fechaNomina = new Date(e.fecha + ',' + e.horario)
    // console.log(e.fecha);
    for (let i = 0; i < 8; i++) {
        calcNomina(fechaNomina, e)
    }
    fechaNomina.setTime(fechaNomina.getTime() + 45 * 60 * 1000);
    for (let i = 0; i < e.horaExtras * 4; i++) {
        calcExtras(fechaNomina, e);
    }
    // let nomina = `<div class="container"><div class="fecha-hora"><p>${e.fecha.replace(/,/g, '-')}</p><p>${e.horario}(${e.horaExtras})</p></div><div><p>Dom/Fes:</p><p>$${recargoDominical}</p></div><div><p>D-F Noc:</p><p>$${recargoDominicalNoc}</p></div></div>`
    // drawPago.innerHTML += nomina;
    let contenedor = document.createElement('div');
    let titulo = document.createElement('div');
    let fecha = document.createElement('p');
    let horario = document.createElement('p')
    contenedor.classList.add('container');
    titulo.classList.add("fecha-hora");
    fecha.textContent = e.fecha.replace(/,/g, "-");
    horario.textContent = e.horario + '(' + e.horaExtras + ')'
    titulo.appendChild(fecha);
    titulo.appendChild(horario);
    contenedor.appendChild(titulo);
    if (recargoNocturnos > 0) {
      agregarNomina(recargoNocturnos, 'Noc:', contenedor)
    }
    if (recargoDominical > 0) {
      agregarNomina(recargoDominical, 'Dom/Fes:', contenedor)
    }
    if (recargoDominicalNoc > 0) {
      agregarNomina(recargoDominicalNoc, 'D-F Noc:', contenedor)
    }
    if (recargoNoCompensadoNoc > 0) {
      agregarNomina(recargoNoCompensadoNoc, 'SC Noc:', contenedor)
    }
    if (recargoNoCompensado > 0) {
      agregarNomina(recargoNoCompensado, 'SC Ord:', contenedor)
    }

    drawPago.appendChild(contenedor);
    extrasDominicalesNoc = 0;
    extrasNocturnas = 0;
    extraOrdinaria = 0;
    extraDominicales = 0;
    recargoNocturnos = 0;
    recargoDominicalNoc = 0;
    recargoDominical = 0;
    recargoNoCompensado = 0;
    recargoNoCompensadoNoc = 0;
    horaExtras = 0;
  })
  let numeroNomina = totalDom + totalDomNoc + totalNoc + salarioBase + subsidioTransporte + totalOrdinaria + totalExtraNoc + totalExtraDom + totalExtraDomNoc + totalNoCompensado + totalNoCompensadoNoc;
  deduccionesTotales = (numeroNomina-subsidioTransporte) * 0.04;
  numeroNomina = numeroNomina - deduccionesTotales + deduccionesTotales;
  let salarioNeto = numeroNomina - deduccionesTotales - deduccionesTotales;
  let drawTotales = `<p class="totalNomina">Total Nomina: $${moneda(Math.round(salarioNeto))}</p><div class="total"><p>Salario Base</p><p>$${moneda(salarioBase)}</p></div><div class="total"><p>Subsidio de transporte</p><p>$${moneda(subsidioTransporte)}</p></div><div class="total"><p>Rec. Nocturnos:</p><p>$${moneda(totalNoc)}</p></div><div class="total"><p>Rec. Dom y Fest:</p><p>$${moneda(totalDom)}</p></div><div class="total"><p>Rec. Dom y Fest Noc.:</p><p>$${moneda(totalDomNoc)}</p></div>`
  totales.innerHTML = drawTotales
    
  if (totalNoCompensado > 0) {
      agregarHora(totales, 'Total SC', totalNoCompensado, 'totalSC', horasXSC);
  }
  if (totalNoCompensadoNoc > 0) {
      agregarHora(totales, 'Total SC NOC', totalNoCompensadoNoc, 'totalSCNoc', horasXSCNoc);
  }
  if (totalOrdinaria > 0) {
      agregarHora(totales, 'Total HE Ordinaria', totalOrdinaria, 'totalHEOrd', horasXOrd);
  }
  if (totalExtraNoc > 0) {
      agregarHora(totales, 'Total HE Noc.', totalExtraNoc, 'totalHENoc', horasXNoc);
  }
  if (totalExtraDom > 0) {
    agregarHora(totales, 'Total HE Dom. Or.', totalExtraDom, 'totalHEDom', horasXDom);
  }
  if (totalExtraDomNoc > 0) {
      agregarHora(totales, 'Total HE Dom. Noc.', totalExtraDomNoc, 'totalHEDomNoc', horasXDomNoc);
  }
  deducciones('Deducción EPS', totales);
  deducciones('Deducción AFP', totales);
}

function agregarNomina (hora, texto, padre) {
  let elemento = document.createElement('div');
  let elemento2 = document.createElement('p');
  let valorHorac = document.createElement('p');
  elemento2.textContent = texto;
  valorHorac.textContent = "$" + hora;
  elemento.appendChild(elemento2);
  elemento.appendChild(valorHorac);
  padre.appendChild(elemento)
}

function agregarHora (elementoPadre, hora, valorHora, clase, numeroHoras) {
    let elemento = document.createElement('div');
    let elemento2 = document.createElement('p');
    let valorHorac = document.createElement('p');
    elemento.classList.add('total')
    elemento2.classList.add(clase)
    elemento2.innerHTML=`${hora}: (${numeroHoras})`
    valorHorac.innerHTML=`$${moneda(Math.round(valorHora))}`;
    elemento.appendChild(elemento2);
    elemento.appendChild(valorHorac);
    elementoPadre.appendChild(elemento);
  }
  
  function deducciones (titulo, padre) {
    let elemento = document.createElement('div');
    let elemento2 = document.createElement('p');
    let valorHorac = document.createElement('p');
    elemento.classList.add('total')
    elemento2.classList.add('deducciones')
    elemento2.innerHTML=`${titulo}:`
    valorHorac.innerHTML=`-$${moneda(Math.round(deduccionesTotales))}`;
    valorHorac.style.color = 'red';
    elemento.appendChild(elemento2);
    elemento.appendChild(valorHorac);
    padre.appendChild(elemento);
    
}
function moneda (dinero) {
    let resultado = Intl.NumberFormat('es-IN', {style: 'currency', currency: 'COP', minimumFractionDigits: 0}).format(dinero);
    return resultado
}
function calcExtras (fechaNomina,) {
    let horaPago = fechaNomina.getHours();
    let diaPago = fechaNomina.getDay();
    let mes  = fechaNomina.getMonth() + 1
    let compararFestivos = fechaNomina.getFullYear() + ',' + mes + ',' + fechaNomina.getDate();
    console.log(compararFestivos);
    console.log(festivos.includes(compararFestivos));
    
    if (horaPago >= 21 || horaPago <= 5) {
        if (diaPago == 0 || festivos.includes(compararFestivos)) {
            extrasDominicalesNoc += vrHrExNocDoFes / 4;
            totalExtraDomNoc += vrHrExNocDoFes / 4;
            horasXDomNoc += 0.25;
        } else {
            extrasNocturnas += vrHrExNocOr / 4;
            totalExtraNoc += vrHrExNocOr / 4;
            horasXNoc += 0.25;
        }
    } else {
        if (diaPago == 0 || festivos.includes(compararFestivos)) {
            extraDominicales += vrHrExDiDoFes / 4 ;
            totalExtraDom += vrHrExDiDoFes / 4;
            horasXDom += 0.25;
        } else {
            extraOrdinaria += vrHrExDiOr / 4;
            totalOrdinaria += vrHrExDiOr / 4;
            horasXOrd += 0.25;
        }
    }
    fechaNomina.setTime(fechaNomina.getTime() + 15 * 60 * 1000);
}
function calcNomina (fechaNomina, e) {
    let horaPago = fechaNomina.getHours();
    let diaPago = fechaNomina.getDay();
    let mes  = fechaNomina.getMonth() + 1
    let compararFestivos = fechaNomina.getFullYear() + ',' + mes + ',' + fechaNomina.getDate();
    console.log(compararFestivos);
    console.log(festivos.includes(compararFestivos));
    if (horaPago >= 21 || horaPago <= 5) {
        if (festivos.includes(compararFestivos)) {
          recargoNoCompensadoNoc += vrNoCompensadoNoc;
          totalNoCompensadoNoc += vrNoCompensadoNoc;
          horasXSCNoc += 1;
        }
        else if (diaPago == 0) {
            recargoDominicalNoc += vrRecNocDoFes;
            totalDomNoc += vrRecNocDoFes;
        } else {
            recargoNocturnos += vrRecNocOr;
            totalNoc += vrRecNocOr;
        }
    } else {
      if (festivos.includes(compararFestivos)) {
        recargoNoCompensado += vrNoCompensado;
        totalNoCompensado += vrNoCompensado;
        horasXSC += 1;
      }
      else if (diaPago == 0) {
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
        element.addEventListener('click', iniciarCambio);
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