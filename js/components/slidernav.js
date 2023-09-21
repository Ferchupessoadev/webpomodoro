"use strict";

const managerNav = () => {
  let scrollActual = window.scrollY;
  let scrollAntiguo = scrollActual;

  addEventListener("scroll", () => {
    const nav = document.querySelector(".header");
    scrollAntiguo = scrollActual;
    scrollActual = window.scrollY;
    if (scrollActual > scrollAntiguo) {
      nav.style.transform = "translateY(-60px)";
    } else {
      nav.style.transform = "translateY(0px)";
    }
    if (window.scrollY == 0) {
      nav.style.background = "linear-gradient(to right,#00024d,#000120)";
    } else {
      nav.style.background = "rgba(255,255,255,0.1)";
    }
  });
};

export default managerNav;
