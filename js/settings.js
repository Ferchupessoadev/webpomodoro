import onClicksSettings from './components/onClick-settings.js' 

const indiceTimeStudy = 0;
const indiceTimeShortBreak = 1;
const indiceTimeLongBreak = 2;

export default class Settings {
    constructor() {
        this.alarm = null;
        this.times = [45,5,15];
        this.changeValueOfTimes = {
            changeTimeStudy:true,
            changeTimeShorBreak:true,
            changeTimeLongBreak:true,
        };
        this.onClickSetting = new onClicksSettings;
        this.btnCerrarSettings = document.querySelector(".button-cerrar");
        this.btnSettings = document.querySelector(".settings");
        this.btnSettings.addEventListener("click",()=> this.onClickSetting.onClickForOpenModal());
        this.btnCerrarSettings.addEventListener("click",()=> this.onClickSetting.onClickForCloseModal())
        this.btnConfOk = document.querySelector(".button-ok");
        this.btnConfOk.classList.add("ok-verifcad");
        this.btnConfOk.addEventListener("click",()=>this.changeTimes())
        this.inputsConf = document.querySelectorAll(".container-times__input");
        this.inputsConf.forEach((inputConf,index)=> {
            inputConf.value = this.times[index];
            inputConf.addEventListener("input",(e) => this.checkValue(e.target.value,index));
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

    changeTrueOrFalseOfTimes(index,varTrueOrfalse) {
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
            default:
                console.log("no se como llegaste hasta aca en el flujo del programa");
                break;
        }
    }

    checkValue(inputValue,indexOfTimes) {
        if(parseInt(inputValue) >= 1 && parseInt(inputValue) <= 60) {
            this.changeTrueOrFalseOfTimes(indexOfTimes,true);
        } else {
            this.changeTrueOrFalseOfTimes(indexOfTimes,false);
        }

        if(this.changeValueOfTimes.changeTimeStudy && this.changeValueOfTimes.changeTimeShorBreak && this.changeValueOfTimes.changeTimeLongBreak) {
           this.btnConfOk.classList.add("ok-verifcad");
           this.changeValues = true;
        } else {
            this.btnConfOk.classList.remove("ok-verifcad");
            this.changeValues = false;
        }
    } 

    changeTimes() {
        this.times[indiceTimeStudy] = this.inputsConf[indiceTimeStudy].value;
        this.times[indiceTimeShortBreak] = this.inputsConf[indiceTimeShortBreak].value;
        this.times[indiceTimeLongBreak] = this.inputsConf[indiceTimeLongBreak].value;
    }
}