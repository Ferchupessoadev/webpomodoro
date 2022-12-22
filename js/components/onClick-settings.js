"use strict";


export default class onClicksSettings {
    constructor() {

        this.modal = document.querySelector(".modal-conf");
        this.inputsConf = document.querySelectorAll(".container-times__input");
    }

    setAlarm(alarm) {
        this.alarm = alarm
    }

    onClickForOpenModal(times) {
        this.modal.classList.add("modal-active");
        this.inputsConf.forEach((input,index)=> input.value = times[index]);
    }

    onClickForCloseModal(timeSection) {
        this.modal.classList.remove("modal-active");
        this.seconds.innerHTML = "00";
        document.querySelectorAll(".times").forEach(section => section.classList.remove("mode-active"));
        timeSection.classList.add("mode-active");
    }

    onClickForOpenSelectedOption() {
        const options = document.querySelector(".selected__div-option");
        options.classList.toggle("open-selected-conf");
        (options.className == "selected__div-option open-selected-conf") ? options.style.transform = "translateY(-20px)" : options.style.transform = "translateY(-70px)";
    }

    onClickAutoBreaks(breakHTML) {
        
    }
}
