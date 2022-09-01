const indiceTimeStudy = 0;
const indiceTimeShortBreak = 1;
const indiceTimeLongBreak = 2;
export default class Alarm {
    constructor() {
        this.setting = null;
        this.timeMinutes = document.querySelector(".minutes");
        this.twoPoints = document.querySelector(".two-points");
        this.seconds = document.querySelector(".seconds");
        this.btnStartOrStop = document.querySelector(".btn-start");
        this.timeSections = document.querySelectorAll(".times");
        this.timeSections.forEach(section => section.addEventListener("click",(e)=> this.onClickTime(e.target)));
    }

    setSettings(setting) {
        this.setting = setting;
    }

    onClickTime(timeSection) {
        const times = this.setting.getTimes();
        switch (timeSection.innerHTML) {
            case "Time study":
                if(times[indiceTimeStudy].toString().length < 2) this.timeMinutes.innerHTML = `0${times[indiceTimeStudy]}`;
                else this.timeMinutes.innerHTML = `${times[indiceTimeStudy]}`;
                this.seconds.innerHTML = "00";
                this.timeSections.forEach(section => section.classList.remove("mode-active"));
                timeSection.classList.add("mode-active");
            break;
            case "Short break":
                if(times[indiceTimeShortBreak].toString().length < 2) this.timeMinutes.innerHTML = `0${times[indiceTimeShortBreak]}`;
                else this.timeMinutes.innerHTML = `${times[indiceTimeShortBreak]}`;
                this.seconds.innerHTML = "00";
                this.timeSections.forEach(section => section.classList.remove("mode-active"));
                timeSection.classList.add("mode-active");
            break;
            case "Long break":
                if(times[indiceTimeLongBreak].toString().lenght < 2) this.timeMinutes.innerHTML = `0${times[indiceTimeLongBreak]}`;
                else this.timeMinutes.innerHTML = `${times[indiceTimeLongBreak]}`
                this.seconds.innerHTML = "00";
                this.timeSections.forEach(section => section.classList.remove("mode-active"));
                timeSection.classList.add("mode-active");
            break;
            default:
                this.timeMinutes.innerHTML = "x";
                this.seconds.innerHTML = "x";
                console.log("deja de intentar hackear la página pelutudo");
        }      
    }
}
