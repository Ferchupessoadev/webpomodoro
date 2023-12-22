"use strict";
import Alarm from "./alarm.js";
import Settings from "./settings.js";
import sliderNav from "./components/slidernav.js";
import TodoList from "./todo-list.js";
import { moveScrollToTimer, moveScrollToTodoList } from "./components/moveScrolls.js"
addEventListener("DOMContentLoaded", () => {
  const settings = new Settings();
  const alarm = new Alarm();
  settings.setAlarm(alarm);
  settings.rederTimes();
  alarm.setSettings(settings);
  sliderNav();
  const todoList = new TodoList();
  const modalNav = document.querySelector(".modal-nav");
  const header = document.querySelector(".header");
  const nav = document.querySelector(".nav");
  const body = document.querySelector("body");
  const btnTimer = document.querySelector(".header__h1")
  const btnTodoList = document.querySelector(".header__h2")
  btnTimer.addEventListener("click", () => moveScrollToTimer())
  btnTodoList.addEventListener("click", () => moveScrollToTodoList())
  let navIsVisible = false;
  const toogleBtnNav = () =>
    navIsVisible ? (navIsVisible = false) : (navIsVisible = true);
  const btnNavbar = document.querySelector(".icon-nav");
  btnNavbar.addEventListener("click", () => {
    toogleBtnNav();
    if (navIsVisible) {
      btnNavbar.children[0].style.display = "none";
      btnNavbar.children[1].style.display = "flex";
      nav.style.transform = "translateX(0px)";
      modalNav.style.display = "flex";
      body.style.overflowY = "hidden";
      if (scrollY > 0)
        header.style.background = "linear-gradient(to right,#00024d,#000120)";
    } else {
      btnNavbar.children[0].style.display = "flex";
      btnNavbar.children[1].style.display = "none";
      nav.style.transform = "translateX(-100%)";
      modalNav.style.display = "none";
      body.style.overflowY = "auto";
      if (scrollY > 0) header.style.background = "rgba(255,255,255,0.1)";
    }
  });
  modalNav.addEventListener("click", () => {
    btnNavbar.children[0].style.display = "flex";
    btnNavbar.children[1].style.display = "none";
    nav.style.transform = "translateX(-100%)";
    modalNav.style.display = "none";
    body.style.overflowY = "auto";
    navIsVisible = false;
  });
});
