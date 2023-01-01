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
        this.sound = "bell.mp3";//valor del efecto por defecto.
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
        this.MILISEGUNDOS = 1000;
        this.timeSection = "Pomodoro";
        this.killInterval = false;
        this.timerEnd = false;
        this.oneSeg = 59;
        this.timeActual = null;
        this.soundProcess;
        this.soundRunning;
    }

    setSettings(setting) {
        this.setting = setting;
        this.times = this.setting.getTimes();
    }

    pause() {
        this.userClickedTwice = true;
        this.timeRunning = false;
        this.killInterval = true;
    }

    changeSound(sound) {
        this.sound = sound;
        (this.sound == "bell") ? this.sound = this.sound+".mp3" : this.sound = this.sound + ".ogg"; 
    }

    colocarContadoresEnCero() {
        this.contMin = 0;
        this.contSeg = 0;
        this.time = 0;
        this.wasFalseTimeRunning = false;
        this.userClickedTwice = false;
        this.timeRunning = false;
        this.soundInProcess = false; 
        this.timeInProcess = false;   
    }




    disminuirMin(){
        this.contMin += 1;
        if(this.contMin === this.timeActual && this.contSeg === this.oneSeg) {
            clearInterval(this.interval); 
            this.timerEnd = true;
            this.seconds.textContent = `${this.secondsText}`;
            this.timeMinutes.innerHTML = this.time;
            this.colocarContadoresEnCero();
            this.soundInProcess = true;
            this.soundHTML.innerHTML = `<audio src="./sounds/${this.sound}" autoplay></audio>`
            this.soundRunning = setInterval(()=> {
                if(!this.killInterval) this.soundHTML.innerHTML = `<audio src="./sounds/${this.sound}" autoplay></audio>`;
                else this.stopSoundAlert()
            },1000);
        } else if (!this.timerEnd) {
            this.time -= 1;
            this.secondsText = this.oneSeg;
            this.contSeg = 0;
        }  
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
            if (this.contSeg < this.oneSeg)  {
                // decrease by one second.
                this.contSeg++; 
                this.secondsText -= 1
            } else this.disminuirMin();
            // mostrar segundos restantes.
            (this.secondsText.toString().length < 2) ? this.seconds.innerHTML = `0${this.secondsText}` : this.seconds.innerHTML = this.secondsText;
            
            // mostrar minutos restantes.
            (this.time.toString().length < 2) ? this.timeMinutes.innerHTML = `0${this.time}` : this.timeMinutes.innerHTML = this.time;
        },this.MILISEGUNDOS);
    }
 


    toogleBtnStart() {
        if (!this.timeRunning && !this.wasFalseTimeRunning) {
            //correr tiempo.
            if (this.timerEnd) {
                this.btnStart.textContent = `START`;
                this.killInterval = true;
                return;
            }
            this.timeInProcess = true;
            this.timeRunning = true;
            this.btnStart.textContent = `STOP`;
            this.times = this.setting.getTimes();
            let indexTime;
            this.timeSections.forEach((time,index) => (time.className == "times mode-active") ? indexTime = index: indexTime = indexTime);
            this.timer(this.times[indexTime]); 
            
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

    reloadAnimation() {
        this.btnReload.style.animation = `rotateReload 1s ease-in-out`;
        setTimeout(()=>{
            this.btnReload.style.animation = "none";
        },1200);
    }

    stopSoundAlert() {
        (this.timeActual.toString().length < 2) ? this.timeMinutes.innerHTML = `0${this.timeActual}` : this.timeMinutes.innerHTML = `${this.timeActual}`;
        this.seconds.innerHTML = "00";
        this.timerEnd = false;
        this.killInterval = false;
        this.soundInProcess = false;
        this.btnStart.textContent = "START";
        clearInterval(this.soundRunning);
    }

    reloadTimer() {
        this.reloadAnimation();
        if (this.timeInProcess) {
            clearInterval(this.interval); 
            (this.timeActual.toString().length < 2) ? this.timeMinutes.innerHTML = `0${this.timeActual}` : this.timeMinutes.innerHTML = `${this.timeActual}`;
            this.seconds.innerHTML = "00";
            this.btnStart.textContent = `START`;
            this.timeRunning = false;
            this.timeInProcess = false;
            this.killInterval = false;
            this.timerEnd = false;
            this.colocarContadoresEnCero();
        } else if (this.soundInProcess) {
            this.stopSoundAlert();
        } 
    }
    
    
    changeTimes(times) {
        this.times = times;
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
        if(this.modeAlert == "settings")  this.setting.onClickForOpenModal();
        this.colocarContadoresEnCero();
        this.onClickTime(this.timeSection);
        this.btnStart.textContent = "START";
        this.modal.style.display = "none";
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
        (modo == "settings")  ? textModal.innerHTML = alertConfString : textModal.innerHTML = spanChangeAlertString;     
    }

    changeStatusOfTime(timeSection) {
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
            this.changeStatusOfTime(timeSection);
            this.timeSection = timeSection;
        } else if (!this.soundInProcess) {
            (!this.timeRunning) ? this.wasFalseTimeRunning = true : this.wasFalseTimeRunning = false;
            clearInterval(this.interval);
            // we pause the timer.
            this.pause()
            // open the modal of alert because is the time running.
            this.openModalOfAlert(timeSection,"time sections");
        }    
    }
}




export default Alarm;
