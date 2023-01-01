"use strict";
import Relog from './relog.js';
import Alarm from './alarm.js';
import Settings from './settings.js';

addEventListener("DOMContentLoaded",()=>{
    const alarm = new Alarm();
    const settings = new Settings(); 
    const relog = new Relog();
    alarm.setSettings(settings);
    settings.setAlarm(alarm);
})
