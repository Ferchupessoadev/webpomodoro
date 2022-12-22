"use strict";
const indiceTimeStudy = 0;
const indiceTimeShortBreak = 1;
const indiceTimeLongBreak = 2;
const alertConfString = "esta seguro/a que desea entrar a las configuraciones si lo hace el temporizador que esta corriendo volvera a su estado inicial.";
const spanChangeAlertString = "Estas seguro/a que desea cambiar de lapso de tiempo.El temporizador volvera a su estado inicial.";

class Alarm {
    constructor() {
	    this.main = document.querySelector(".main");
        this.soundHTML = document.getElementById("sonidos");
        this.sound = "bell";//valor del efecto por defecto.
        this.setting = null;
        this.timeInProcess = false;
        this.timeRunning = false;
        this.soundInProcess = false;
        this.wasFalseTimeRunning = false;
        this.btnStart = document.querySelector(".btn-start");
        this.btnStart.addEventListener("click",(e) => this.toogleBtnStart(e));
        this.btnReload = document.getElementById("reload-timer");
        this.btnReload.addEventListener("click",()=> this.reloadTimer());
        this.timeMinutes = document.querySelector(".minutes");
        this.twoPoints = document.querySelector(".two-points");
        this.seconds = document.querySelector(".seconds");
        this.timeSections = document.querySelectorAll(".times");
        this.timeSections.forEach((section) => section.addEventListener("click",(e)=> this.onClickTime(e.target)));
        this.modal = document.querySelector(".modal-alert");
        this.btnCambiarTiempo = document.querySelector(".modal__button-si");
        this.btnCambiarTiempo.addEventListener("click",()=> this.cambiarTiempoEnAlerta());
        this.btnNoCambiarTiempo = document.querySelector(".modal__button-no");
        this.btnNoCambiarTiempo.addEventListener("click",()=> this.noCambiarTiempoEnAlerta())
        this.userClickedTwice = false;
        this.times;
        this.secondsText = this.oneSeg;
        this.contSeg = 0;
        this.contMin = 0;
        this.time = 0;
        this.interval;
        this.sound;
        this.MILISEGUNDOS = 10;
        this.timeSection = null;
        this.modeAlert = "time sections";
        this.killInterval = false;
        this.timerEnd = false;
        this.oneSeg = 59;
        this.timeActual = null;
        this.soundProcess;
    }

    setSettings(setting) {
        this.setting = setting;
        this.times = this.setting.getTimes();
    }


    changeSound(sound) {
        this.sound = sound;
        console.log(this.sound)
    }

    colocarContadoresEnCero() {
        this.contMin = 0;
        this.contSeg = 0;
        this.time = 0;
        this.wasFalseTimeRunning = false;
        this.userClickedTwice = false;
        this.timeRunning = false;
        this.soundInProcess = false;    
    }

    pause() {
        clearInterval(this.interval)
        this.userClickedTwice = true;
        this.timeRunning = false;
        this.killInterval = true;
    }

    disminuirSeg() {
        this.contSeg++;
        this.secondsText -= 1;
    }

    
    checkStopSound(userChosenSound) {
        if(!this.killInterval) this.soundHTML.innerHTML = `<audio src="./sounds/${userChosenSound}" autoplay></audio>`;
        else {
            (this.timeActual.toString().length < 2) ? this.timeMinutes.innerHTML = `0${this.timeActual}` : this.timeMinutes.innerHTML = `${this.timeActual}`;
            this.seconds.innerHTML = "00";
            this.timerEnd = false;
            this.killInterval = false;
            this.soundInProcess = false;
            this.timeInProcess = false;
            clearInterval(this.soundProcess);
        }
    }


    disminuirMin(){
        this.contMin += 1;
        if(this.contMin === this.timeActual && this.contSeg === this.oneSeg) {
            clearInterval(this.interval); 
            this.timerEnd = true;
            this.seconds.textContent = `${this.secondsText}`;
            this.timeMinutes.innerHTML = this.time;
            this.colocarContadoresEnCero();
            let userChosenSound;
            if (this.sound == "digital") userChosenSound = "digital.ogg";
            else if (this.sound == "bell") userChosenSound = "bell.mp3";
            this.checkStopSound(userChosenSound);
            this.soundInProcess = true;
            this.soundProcess = setInterval(()=> {this.checkStopSound(userChosenSound)},1000);
        }
        if (!this.timerEnd) {
            this.time -= 1;
            this.secondsText = this.oneSeg;
            this.contSeg = 0;
        }  
    }

    mostrarTiempo() {
        // mostrar segundos restantes.
        (this.secondsText.toString().length < 2) ? this.seconds.innerHTML = `0${this.secondsText}` : this.seconds.innerHTML = this.secondsText;
        
        // mostrar minutos restantes.
        (this.time.toString().length < 2) ? this.timeMinutes.innerHTML = `0${this.time}` : this.timeMinutes.innerHTML = this.time;
    }
    


    timer(time) {  
        this.timeActual = time;
        this.killInterval = false;
        if (!this.userClickedTwice) {
            this.time = this.timeActual;
            (this.timeActual == 1) ? ((this.contSeg = 0),(this.time -= 1),(this.secondsText = this.oneSeg)): this.contSeg = this.oneSeg;
            
        }
        this.userClickedTwice = false;
        this.interval = setInterval(()=>{
                (this.timerEnd) ? clearInterval(this.interval): this.timerEnd = false;
                (this.contSeg < this.oneSeg) ? this.disminuirSeg() : this.disminuirMin();
                this.mostrarTiempo();
        },this.MILISEGUNDOS);
    }
 


    toogleBtnStart(e) {
        if (!this.timeRunning && !this.wasFalseTimeRunning) {
            //correr tiempo.
            if (!this.timerEnd) {
                this.timeInProcess = true;
                this.timeRunning = true;
                this.btnStart.textContent = `STOP`;
                this.times = this.setting.getTimes();
                let indexTime;
                this.timeSections.forEach((time,index) => (time.className == "times mode-active") ? indexTime = index: indexTime = indexTime);
                this.timer(this.times[indexTime]); 
            } else {
                this.btnStart.textContent = `START`;
                this.killInterval = true;
            }
        } else {
            //Frenar tiempo.
            clearInterval(this.interval)
            this.wasFalseTimeRunning = false;
            this.killInterval = true;
            this.userClickedTwice = true;
            this.timeRunning = false;
            this.btnStart.textContent = `START`;
        }
    }


    reloadTimer() {
        if (this.timeInProcess) {
            (this.timeActual.toString().length < 2) ? this.timeMinutes.innerHTML = `0${this.timeActual}` : this.timeMinutes.innerHTML = `${this.timeActual}`;
            this.seconds.innerHTML = "00";
            this.timeInProcess = false;
            this.btnStart.textContent = `START`;
            this.killInterval = true;
            this.soundInProcess = false;
            this.btnReload.style.animation = `rotateReload 1s ease-in-out`;
            setTimeout(()=>{
                this.btnReload.style.animation = "none";
            },1200);

            if (this.soundInProcess) {   
                clearInterval(this.soundProcess);
            } else {
                clearInterval(this.interval);
                this.colocarContadoresEnCero();
                
            }
        } else {
            this.btnReload.style.animation = `rotateReload 1s ease-in-out`;
            setTimeout(()=>{
                this.btnReload.style.animation = "none";
            },1200);
        }
    }

    changeTimes(times) {
        this.times = times;
        console.log(this.times);
        (this.times[indiceTimeStudy].toString().length < 2) ? this.timeMinutes.textContent = `0${this.times[indiceTimeStudy]}`:this.timeMinutes.textContent = `${this.times[indiceTimeStudy]}`;
        this.timeSections[indiceTimeStudy].classList.add("mode-active");
        this.timeSections[indiceTimeShortBreak].classList.remove("mode-active");
        this.timeSections[indiceTimeLongBreak].classList.remove("mode-active");
        this.seconds.textContent = "00";
        this.secondsText = 60;
        this.btnStart.textContent = `START`;
        this.timeRunning = false;
        this.contMin = 0;
        this.contSeg = 0;
        this.time = 0;
        this.userClickedTwice = false;
    }


    cambiarTiempoEnAlerta() {
        this.modal.style.display = "none";
        this.colocarContadoresEnCero();
        if (this.modeAlert == "settings") {
            this.setting.onClickForOpenModal(this.setting.times)
        } else {
            this.timeInProcess = false;
            this.onClickTime(this.timeSection);    
            this.btnStart.textContent = "START";
        }
    }

    noCambiarTiempoEnAlerta() {
        this.modal.style.display = "none";
        this.toogleBtnStart();
        this.wasFalseTimeRunning = false;
    }

    openModalOfAlert(timeSection,modo) {
	    this.modal.style.display = "flex";
        this.timeSection = timeSection;
        this.modeAlert = modo;
        const textModal = this.modal.firstElementChild.firstElementChild;
        (this.modeAlert == "settings")  ? textModal.innerHTML = alertConfString : textModal.innerHTML = spanChangeAlertString;     
    }

    cambiarEstadoTiempo(timeSection) {
        this.seconds.innerHTML = "00";
        this.timeSections.forEach(section => section.classList.remove("mode-active"));
        timeSection.classList.add("mode-active");
    }

    changeTimeSection(times,index) {
        (times[index].toString().length < 2) ? this.timeMinutes.innerHTML = `0${times[index]}` : this.timeMinutes.innerHTML = `${times[index]}`;
        this.timeActual = times[index];
    }

    onClickTime(timeSection) {
        const times = this.setting.getTimes();
        if(!this.timeInProcess && !this.soundInProcess) {
            switch (timeSection.innerHTML) {
                case "Pomodoro":this.changeTimeSection(times,indiceTimeStudy);break;
                case "Short break":this.changeTimeSection(times,indiceTimeShortBreak);break;
                case "Long break":this.changeTimeSection(times,indiceTimeLongBreak);break;
            } 
            this.cambiarEstadoTiempo(timeSection)
        } else {
            if (!this.soundInProcess) {
                (!this.timeRunning) ? this.wasFalseTimeRunning = true : this.wasFalseTimeRunning = false;
                this.pause()
                this.openModalOfAlert(timeSection,"time sections");
            }
        }    
    }
}




export default Alarm;