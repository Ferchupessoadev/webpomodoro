"use strict";

import {
    indiceTimeStudy,
    indiceTimeShortBreak,
    indiceTimeLongBreak,
} from "./timesPositions.js";

export default class Settings {
    constructor() {
        this.alarm = null;
        this.times = [];
        this.changeValues = true;
        this.changeValueOfTimes = {
            changeTimeStudy: true,
            changeTimeShorBreak: true,
            changeTimeLongBreak: true,
        };
        this.btnCerrarSettings = document.querySelector(".button-cerrar");
        this.btnSettings = document.querySelector(".settings");
        this.btnSettings.addEventListener("click", () => this.openModalConf());
        this.btnCerrarSettings.addEventListener("click", () =>
            this.onClickForCloseModal(),
        );
        this.btnConfOk = document.querySelector(".button-ok");
        this.selected = document.querySelector(".selected__div-view");
        this.selected.addEventListener("click", (e) =>
            this.onClickForOpenSelectedOption(),
        );
        this.selectedText = document.querySelector(".selected__p");
        this.selectedOptions = document.querySelectorAll(".selected__li");
        this.selectedOptions.forEach((selectedOption) =>
            this.addListenerAndChangeSound(selectedOption),
        );
        this.autoBreaksHTML = document.querySelectorAll(
            ".section-break__div-check",
        );
        this.autoBreaksHTML.forEach((autoBreakHTML) =>
            autoBreakHTML.addEventListener("click", (e) =>
                this.changeAutoBreaks(e.target),
            ),
        );
        this.btnConfOk.classList.add("ok-verificad");
        this.btnConfOk.addEventListener("click", () => this.changeTimes());
        this.modal = document.querySelector(".modal-conf");
        this.inputsConf = document.querySelectorAll(".container-times__input");
        this.inputsConf.forEach((inputConf, index) => {
            inputConf.value = this.times[index];
            inputConf.addEventListener("input", (e) =>
                this.checkValue(e.target.value, index),
            );
        });
        this.pomodorosRunnning = 0;
        this.autoShortBreak = false;
        this.autoLongBreak = false;
        this.soundReference;
        this.soundActual;
    }

    setAlarm(alarm) {
        this.alarm = alarm;
    }

    toFirstUpperCase(string) {
        const firstLetterSound = string[0].toUpperCase();
        let endString = string.length;
        string = string.slice(1, endString + 1);
        string = firstLetterSound + string;
        return string;
    }

    renderTimes() {
        if (
            localStorage.getItem("times") == null ||
            localStorage.getItem("times") == undefined ||
            localStorage.getItem("sound") == undefined
        ) {
            localStorage.setItem("times", JSON.stringify([25, 5, 10]));
            this.times = [25, 5, 10];
            this.alarm.timeMinutes.textContent = this.times[0];
            localStorage.setItem(
                "timeSection",
                this.alarm.timeSections[0].textContent,
            );
            this.alarm.renderTimeSection(
                localStorage.getItem("timeSection"),
                this.times,
            );
            this.alarm.seconds.textContent = "00";
            localStorage.setItem("sound", "digital.ogg");
            let sound = "digital";
            this.alarm.sound = sound + ".ogg";
            sound = this.toFirstUpperCase(sound);
            this.soundActual = sound;
            this.selectedText.textContent = sound;
            return;
        }
        this.times = JSON.parse(localStorage.getItem("times"));
        this.alarm.renderTimeSection(
            localStorage.getItem("timeSection"),
            this.times,
        );
        this.alarm.seconds.textContent = "00";
        let sound = localStorage.getItem("sound");
        this.alarm.sound = sound;
        sound = this.toFirstUpperCase(sound);
        sound == "Digital.ogg" ? (sound = "Digital") : (sound = sound);
        sound == "Bell.mp3" ? (sound = "Bell") : (sound = sound);
        this.soundActual = sound;
        this.selectedText.textContent = sound;
    }

    getTimes() {
        return this.times;
    }

    saveTimesInTheDataBase() {
        localStorage.setItem("times", JSON.stringify(this.times));
    }

    addListenerAndChangeSound(selectedOption) {
        selectedOption.addEventListener("click", (e) => {
            this.soundActual = this.selectedText.textContent;
            this.soundReference = e.target.textContent;
            this.selectedText.textContent = this.soundReference;
            this.onClickForOpenSelectedOption();
        });
    }

    changeAutoBreaks(autoBreakHTML) {
        let sectionBreakHTML;
        if (
            autoBreakHTML.classList == "section-break__div-color" ||
            autoBreakHTML.className == "section-break__div-circle"
        )
            sectionBreakHTML =
                autoBreakHTML.parentElement.parentElement.parentElement;
        else sectionBreakHTML = autoBreakHTML.parentElement.parentElement;
        let autoBreak = sectionBreakHTML.firstElementChild;
        let autoBreakCircle =
            sectionBreakHTML.lastElementChild.firstElementChild
                .lastElementChild;
        let autoBreakColor =
            sectionBreakHTML.lastElementChild.firstElementChild
                .firstElementChild;
        if (autoBreak.textContent == "Auto Start short break") {
            if (!this.autoShortBreak) {
                this.autoShortBreak = true;
                console.log("activar auto short break");
            } else {
                this.autoShortBreak = false;
                console.log("desactivar auto short break");
            }
        } else {
            if (!this.autoLongBreak) {
                this.autoLongBreak = true;
                console.log("activar auto long break");
            } else {
                this.autoLongBreak = false;
                console.log("desactivar auto long break");
            }
        }
    }

    onClickForOpenModal() {
        if (!this.alarm.soundInProcess) {
            this.modal.classList.add("modal-active");
            this.inputsConf.forEach(
                (input, index) => (input.value = this.times[index]),
            );
            this.selectedText.textContent = this.soundActual;
            this.soundReference = this.soundActual;
        }
    }

    overflowYBody(hidden) {
        const body = document.querySelector("body");
        body.style.overflowY = hidden;
    }

    onClickForCloseModal() {
        this.overflowYBody("auto");
        if (!this.alarm.timeInProcess) {
            this.modal.classList.remove("modal-active");
            return;
        }
        this.modal.classList.remove("modal-active");
        this.times[indiceTimeStudy].toString().length < 2
            ? (this.alarm.timeMinutes.innerHTML = `0${this.times[indiceTimeStudy]}`)
            : (this.alarm.timeMinutes.innerHTML = this.times[indiceTimeStudy]);
        this.alarm.seconds.innerHTML = "00";
        this.alarm.btnStart.innerHTML = "START";
        this.alarm.cambiarEstadoTiempo(this.alarm.timeSection);
        this.alarm.colocarContadoresEnCero();
        this.alarm.timeInProcess = false;
    }

    onClickForOpenSelectedOption() {
        const options = document.querySelector(".selected__div-option");
        options.classList.toggle("open-selected-conf");
        options.className == "selected__div-option open-selected-conf"
            ? (options.style.transform = "translateY(-20px)")
            : (options.style.transform = "translateY(-70px)");
    }

    openModalConf() {
        this.overflowYBody("hidden");
        if (!this.alarm.timeRunning && !this.alarm.timeInProcess) {
            this.onClickForOpenModal();
            return;
        }
        if (this.alarm.soundInProcess) {
            this.alarm.stopSoundAlert();
            this.onClickForOpenModal();
            return;
        }

        clearInterval(this.alarm.interval);
        let indexTime;
        this.alarm.timeSections.forEach((time, index) =>
            time.className == "times mode-active"
                ? (indexTime = index)
                : indexTime,
        );
        this.alarm.userClickedTwice = true;
        !this.alarm.timeRunning
            ? (this.alarm.wasFalseTimeRunning = true)
            : (this.alarm.wasFalseTimeRunning = false);
        this.alarm.pause();
        this.alarm.openModalOfAlert(this.alarm.timeSection, "settings");
    }

    changeTrueOrFalseOfTimes(index, varTrueOrfalse) {
        switch (index) {
            case indiceTimeStudy:
                this.changeValueOfTimes.changeTimeStudy = varTrueOrfalse;
                break;
            case indiceTimeShortBreak:
                this.changeValueOfTimes.changeTimeShorBreak = varTrueOrfalse;
                break;
            case indiceTimeLongBreak:
                this.changeValueOfTimes.changeTimeLongBreak = varTrueOrfalse;
                break;
        }
    }

    // este metodo valida los datos introducidos en las entradas del modal de configuracion solo se permiten numero entre 1 y 60.
    checkValue(inputValue, indexOfTimes) {
        let isValided = false;
        if (parseInt(inputValue) >= 1 && parseInt(inputValue) <= 60)
            isValided = true;
        this.changeTrueOrFalseOfTimes(indexOfTimes, isValided);

        this.changeValues = false;
        this.btnConfOk.classList.remove("ok-verificad");

        if (
            this.changeValueOfTimes.changeTimeStudy &&
            this.changeValueOfTimes.changeTimeShorBreak &&
            this.changeValueOfTimes.changeTimeLongBreak
        ) {
            this.btnConfOk.classList.add("ok-verificad");
            this.changeValues = true;
        }
    }

    //cambia los tiempos de estudio y descanso del temporizador y cierra el modal.
    changeTimes() {
        if (this.changeValues) {
            this.times[indiceTimeStudy] = parseInt(
                this.inputsConf[indiceTimeStudy].value,
            );
            this.times[indiceTimeShortBreak] = parseInt(
                this.inputsConf[indiceTimeShortBreak].value,
            );
            this.times[indiceTimeLongBreak] = parseInt(
                this.inputsConf[indiceTimeLongBreak].value,
            );
            this.saveTimesInTheDataBase();
            this.onClickForCloseModal();
            localStorage.setItem("sound", this.soundReference.toUpperCase());
            this.soundActual = this.soundReference;
            this.selectedText.innerHTML = this.soundActual;
            this.alarm.changeSound(this.soundReference.toLowerCase());
            this.alarm.changeTimes(this.times);
            this.alarm.onClickTime(this.alarm.timeSection);
        }
    }
}
