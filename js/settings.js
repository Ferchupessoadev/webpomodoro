"use strict";



const indiceTimeStudy = 0;
const indiceTimeShortBreak = 1;
const indiceTimeLongBreak = 2;

export default class Settings {
    constructor() {
        this.alarm = null;
        this.times = [25,5,10];
        this.changeValues = true;
        this.changeValueOfTimes = {
            changeTimeStudy:true,
            changeTimeShorBreak:true,
            changeTimeLongBreak:true,
        };
        this.btnCerrarSettings = document.querySelector(".button-cerrar");
        this.btnSettings = document.querySelector(".settings");
        this.btnSettings.addEventListener("click",()=> this.openModalConf());
        this.btnCerrarSettings.addEventListener("click",()=> this.onClickForCloseModal());
        this.btnConfOk = document.querySelector(".button-ok");
        this.selected = document.querySelector(".selected__div-view");
        this.selected.addEventListener("click",(e) => this.onClickForOpenSelectedOption());
        this.selectedText = document.querySelector(".selected__p");
        this.selectedOptions = document.querySelectorAll(".selected__li");
        this.selectedOptions.forEach(selectedOption => this.addListenerAndChangeSound(selectedOption));
        this.autoBreaksHTML = document.querySelectorAll(".section-break__div-check");
        this.autoBreaksHTML.forEach(autoBreakHTML => autoBreakHTML.addEventListener("click", e => this.changeAutoBreakStyles(autoBreakHTML)));
        this.btnConfOk.classList.add("ok-verificad");
        this.btnConfOk.addEventListener("click",()=> this.changeTimes())
        this.modal = document.querySelector(".modal-conf");
        this.inputsConf = document.querySelectorAll(".container-times__input");
        this.inputsConf.forEach((inputConf,index)=> {
            inputConf.value = this.times[index];
            inputConf.addEventListener("input",(e) => this.checkValue(e.target.value,index));
        });
        this.autoShortBreak = false;
    }

    setAlarm(alarm) {
        this.alarm = alarm;
    }

    // este metodo retorna los tiempos de intervalos a el objeto alarm. 
    getTimes() {
        return this.times;
    }

    addListenerAndChangeSound(selectedOption) {
        selectedOption.addEventListener("click",(e)=> {
            this.selectedText.textContent = e.target.textContent;
            this.onClickForOpenSelectedOption();
            this.alarm.changeSound(e.target.textContent.toLowerCase());
        })
    }

    changeAutoBreakStyles(autoBreakHTML) {
        let circleBackgroundColor = autoBreakHTML.firstElementChild;
        let circle = autoBreakHTML.lastElementChild; 
        circle.style.transform = "translateX(18px)";
        circleBackgroundColor.style.background = "rgb(120,230,140)";
    }

    onClickForOpenModal() {
        this.modal.classList.add("modal-active");
        this.inputsConf.forEach((input,index)=> input.value = this.times[index]);
    }

    onClickForCloseModal() {
        if (this.alarm.timeInProcess) {
            this.modal.classList.remove("modal-active");
            (this.times[indiceTimeStudy].toString().length < 2) ? this.alarm.timeMinutes.innerHTML = `0${this.times[indiceTimeStudy]}`: this.alarm.timeMinutes.innerHTML = this.times[indiceTimeStudy];
            this.alarm.seconds.innerHTML = "00";
            this.alarm.btnStart.innerHTML = "START";
            console.log(this.alarm.btnStart.innerHTML)
            this.alarm.cambiarEstadoTiempo(this.alarm.timeSection);
            this.alarm.colocarContadoresEnCero();
            this.timeInProcess = false;
        } else  this.modal.classList.remove("modal-active");
    }

    onClickForOpenSelectedOption() {
        const options = document.querySelector(".selected__div-option");
        options.classList.toggle("open-selected-conf");
        (options.className == "selected__div-option open-selected-conf") ? options.style.transform = "translateY(-20px)" : options.style.transform = "translateY(-70px)";
    }

    openModalConf() {
        if(this.alarm.timeRunning || this.alarm.timeInProcess) {
            clearInterval(this.alarm.interval);  
            let indexTime;
            this.alarm.timeSections.forEach((time,index) => (time.className == "times mode-active") ? indexTime = index : indexTime)
            this.alarm.userClickedTwice = true; 
            (!this.alarm.timeRunning) ? this.alarm.wasFalseTimeRunning = true : this.alarm.wasFalseTimeRunning = false;
            this.alarm.pause();
            this.alarm.openModalOfAlert(this.times[indexTime],"settings");
        } else this.onClickForOpenModal(this.times);
    }

    changeTrueOrFalseOfTimes(index,varTrueOrfalse) {
        switch (index) {
            case indiceTimeStudy: this.changeValueOfTimes.changeTimeStudy = varTrueOrfalse;break;
            case indiceTimeShortBreak: this.changeValueOfTimes.changeTimeShorBreak = varTrueOrfalse;break;
            case indiceTimeLongBreak:this.changeValueOfTimes.changeTimeLongBreak = varTrueOrfalse;break;
        }
    }

    // este metodo valida los datos introducidos en las entradas del modal de configuracion.
    checkValue(inputValue,indexOfTimes) {
        let isValided = false;
        if(parseInt(inputValue) >= 1 && parseInt(inputValue) <= 60) isValided = true; 
        this.changeTrueOrFalseOfTimes(indexOfTimes,isValided);

        this.changeValues = false;
        this.btnConfOk.classList.remove("ok-verificad");

        if (this.changeValueOfTimes.changeTimeStudy && this.changeValueOfTimes.changeTimeShorBreak && this.changeValueOfTimes.changeTimeLongBreak) {
           this.btnConfOk.classList.add("ok-verificad");
           this.changeValues = true;
        }
    } 

    //cambia los tiempos de estudio y descanso del temporizador.
    changeTimes() {
        if(this.changeValues) {
            this.times[indiceTimeStudy] = parseInt(this.inputsConf[indiceTimeStudy].value);
            this.times[indiceTimeShortBreak] = parseInt(this.inputsConf[indiceTimeShortBreak].value);
            this.times[indiceTimeLongBreak] = parseInt(this.inputsConf[indiceTimeLongBreak].value);
            this.onClickSetting.onClickForCloseModal();
            this.alarm.changeTimes(this.times);
        }      
    }
}
