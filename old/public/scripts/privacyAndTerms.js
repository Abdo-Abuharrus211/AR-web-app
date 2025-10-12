let currentModal = null;
// Opening modals
const privacyModalTrigger = document.getElementsByClassName("policy-trigger");
for (let trigger of privacyModalTrigger) {
    currentModal = "privacy-policy-modal";
    trigger.addEventListener("click", () => openModal("privacy-policy-modal"));
}
const termsModalTrigger = document.getElementsByClassName("terms-trigger");
for (let trigger of termsModalTrigger) {
    currentModal = "terms-modal";
    trigger.addEventListener("click", () => openModal("terms-modal"));
}


const privacyModalCloser = document.getElementById("close-privacy-modal").addEventListener("click", function() {
    closeModal("privacy-policy-modal");
});
const termsModalCloser = document.getElementById("close-terms-modal").addEventListener("click", function() {
    closeModal("terms-modal");
});

// Close modal on "Esc" key press
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && currentModal) {
        closeModal(currentModal);
    }
});

// Assuming currentModal is correctly set when opening a modal
document.addEventListener("click", function (event) {
    if (currentModal && event.target === document.getElementById(currentModal)) {
        closeModal(currentModal);
    }
});

function openModal(modalName) {
    var modal = document.getElementById(modalName);
    modal.classList.remove("hidden");
    currentModal = modalName;
}

function closeModal(modalName) {
    var modal = document.getElementById(modalName);
    modal.classList.add("hidden");
    currentModal = null;
}