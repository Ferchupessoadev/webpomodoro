import onClicksSettings from './components/onClick-settings.js' 

const indiceTimeStudy = 0;
const indiceTimeShortBreak = 1;
const indiceTimeLongBreak = 2;

export default class Settings {
    constructor() {
        this.alarm = null;
        this.times = [45,5,15];
        this.onClickSetting = new onClicksSettings;
        this.btnCerrarSettings = document.querySelector(".button-cerrar");
        this.btnSettings = document.querySelector(".settings");
        this.btnSettings.addEventListener("click",()=> this.onClickSetting.onClickForOpenModal());
        this.btnCerrarSettings.addEventListener("click",()=> this.onClickSetting.onClickForCloseModal())
    }

    changeTimes(TimeStudy,timeShortBreak,timeLongBreak) {
        this.times[indiceTimeStudy] = TimeStudy;
    }

    getTimes() {
        return this.times;
    }
}