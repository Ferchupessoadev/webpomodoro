import Clock from './clock.js'
import Alarm from './alarm.js'
import Settings from './settings.js'

addEventListener("DOMContentLoaded",()=>{
    const alarm = new Alarm();
    const settings = new Settings(); 
    alarm.setSettings(settings);
    settings.setAlarm(alarm);
})