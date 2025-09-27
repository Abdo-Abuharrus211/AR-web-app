
const contactTriggers = document.getElementsByClassName("contact-trigger");
for (let trigger of contactTriggers) {
    trigger.addEventListener("click", () => openModal());
}
const contactCloser = document.getElementById("close-contact-modal").addEventListener("click", closeModal);
// Close modal on "Esc" key press
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeModal();
    }
});
// Closing contact modal by clicking elsewhere
document.getElementById("contact-modal").addEventListener("click", function (event) {
    if (event.target === this) {
        closeModal();
    }
});

function openModal(modal) {
    var modal = document.getElementById("contact-modal");
    modal.classList.remove("hidden");
    setTimeout(() => {
        closeModal(modal);
    }, 300000); // 5 minutes in milliseconds
}

function closeModal(modal) {
    var modal = document.getElementById("contact-modal");
    modal.classList.add("hidden");
}
