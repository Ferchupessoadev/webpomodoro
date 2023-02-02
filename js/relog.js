"use strict";

class relog {
    constructor(){
        this.fecha = new Date();
        this.hr;
        this.min;
        this.sec;
        this.meses = [ 'Enero' , 'Febrero' , 'Marzo' , 'Abril' , 'Mayo' , 'Junio' , 'Julio' , 'Agosto' , 'Septiembre' , 'Octubre' , 'Noviembre' , 'Diciembre'];
        this.dias = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
        this.diaSemana;
        this.dia;
        this.mes;
        this.year;
        this.fechaTexto;
        this.horaHTML = document.getElementById('hora');
        this.fechaHTML = document.getElementById('fecha');
        this.mostrarRelog();
        this.runRelog();
    }

    runRelog() {
        setInterval(() => {
            this.mostrarRelog();
        }, 1000);
    }

    mostrarRelog() {
        this.fecha = new Date();
        this.hr = this.formatHora(this.fecha.getHours());
        this.min = this.formatHora(this.fecha.getMinutes());
        this.sec = this.formatHora(this.fecha.getSeconds());
        this.horaHTML.innerHTML = `${this.hr}:${this.min}:${this.sec}`; 
        this.diaSemana = this.dias[this.fecha.getDay()];
        this.dia = this.fecha.getDate();
        this.mes = this.meses[this.fecha.getMonth()];
        this.year = this.fecha.getFullYear();
        this.fechaTexto = `${this.diaSemana} | ${this.dia} de ${this.mes} | ${this.year}`;
        this.fechaHTML.innerHTML = this.fechaTexto;
    }
    
    formatHora(hora) {
        if(hora < 10) hora = '0' + hora;
        return hora;
    }
}

export default relog