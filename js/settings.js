import onClicksSettings from './components/onClick-settings.js' 

const indiceTimeStudy = 0;
const indiceTimeShortBreak = 1;
const indiceTimeLongBreak = 2;

export default class Settings {
    constructor() {
        this.alarm = null;
        this.times = [45,5,15];
        this.changeValueOfTimes = {
            changeTimeStudy:false,
            changeTimeShorBreak:false,
            changeTimeLongBreak:false,
        };
        this.onClickSetting = new onClicksSettings;
        this.btnCerrarSettings = document.querySelector(".button-cerrar");
        this.btnSettings = document.querySelector(".settings");
        this.btnSettings.addEventListener("click",()=> this.onClickSetting.onClickForOpenModal());
        this.btnCerrarSettings.addEventListener("click",()=> this.onClickSetting.onClickForCloseModal())
        this.btnConfOk = document.querySelector(".button-ok");
        this.inputsConf = document.querySelectorAll(".container-times__input");
        this.inputsConf.forEach((inputConf,index)=> {
            inputConf.value = this.times[index];
            inputConf.addEventListener("input",(e)=>);
        })
    }


    setAlarm(alarm) {
        this.alarm = alarm;
        this.alarm.timeMinutes.innerHTML = this.times[indiceTimeStudy];
        this.alarm.timeSections[indiceTimeStudy].classList.add("mode-active") 
    }

    getTimes() {
        return this.times;
    }


    changeTimes(TimeStudy,timeShortBreak,timeLongBreak) {
        this.times[indiceTimeStudy] = TimeStudy;
        this.times[indiceTimeShortBreak] = timeShortBreak;
        this.times[indiceTimeLongBreak] = timeLongBreak;
    }
}