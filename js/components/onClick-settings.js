export default class onClicksSettings {
    constructor() {
        this.modal = document.querySelector(".modal-conf");
    }

    onClickForOpenModal() {
        this.modal.classList.add("modal-active");
    }

    onClickForCloseModal(){
        this.modal.classList.remove("modal-active");
    }
}