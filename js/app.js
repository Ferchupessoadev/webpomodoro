"use strict";
import Alarm from './alarm.js';
import Settings from './settings.js';


addEventListener("DOMContentLoaded",()=>{
    const settings = new Settings(); 
    const alarm = new Alarm();
    settings.setAlarm(alarm);
    settings.rederTimes();
    alarm.setSettings(settings);
    
})
