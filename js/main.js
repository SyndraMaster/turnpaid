// let meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
// let diasSemana = ['Lun', 'Mar', 'Mié', 'Jues', 'Vie', 'Sáb', 'Dom']
// let contenedor = document.querySelector('.container');
// let fecha = new Date();
// let mesActual = fecha.getMonth() + 1;
// let anoActual = fecha.getFullYear();
// let diasMes = new Date(anoActual, mesActual, 0).getDate();
// let mes = document.createElement('h3');
// mes.className = 'mes';
// contenedor.appendChild(mes)
// mes.innerText = `${meses[mesActual]} ${anoActual}`;


// function generarCalendario () {
    //     let tabla = document.createElement('table')
    //     tabla.className = 'tabla-fechas';
    //     contenedor.appendChild(tabla);
//     agregarEncabezados(tabla);
// }


// function agregarEncabezados (tabla) {
    //     let encabezados = document.createElement('tr')
//     tabla.appendChild(encabezados);
//     for (let i = 0; i < diasSemana.length; i++) {
    //         const element = diasSemana[i];
    //         let titulos = document.createElement('th')
    //         titulos.className = 'tabla-titulos'
    //         titulos.innerText = element
    //         encabezados.appendChild(titulos)
    //     }
    // }
// function generarDias () {
    //     for (let i = 0; i < diasMes; i++) {
        //         let dia = document.createElement
//     }
// }


// generarCalendario()

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////
let fecha = new Date()
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
    let meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    let diasMes = document.querySelector('.dias-mes');
    mes.innerText = `${meses[fecha.getMonth()]}`
    let days = '';
    for (let x = indexPrimerDia; x > 0; x--) {
        days += `<div class='prev-days'><p>${ultDiaMesPrevio - x + 1}</p></div>`
    }
    for (let i = 1; i <= diasTotalesMes; i++) {
        days += `<div><p>${i}</p><div class="day-container">Contenedor</div></div>`
        diasMes.innerHTML = days;
    }
    for (let j = 0; j < siguientesDias; j++) {
        days += `<div class='post-days'><p>${j + 1}</p><div class="day-container">Contenedor</div></div>`
        diasMes.innerHTML = days;
    }
}
document.querySelector('.previo').addEventListener('click', () => {
    fecha.setMonth(fecha.getMonth() - 1)
    generarCalendario();
})
document.querySelector('.posterior').addEventListener('click', () => {
    fecha.setMonth(fecha.getMonth() + 1)
    generarCalendario();
})
generarCalendario();