let currentModal: string = "";

// The Privacy Policy Modal
const privacyModalTrigger = document.getElementsByClassName("policy-trigger");
for (let trigger of privacyModalTrigger) {
    currentModal = "privacy-policy-modal";
    trigger.addEventListener("click", () => openModal("privacy-policy-modal"));
}

document.getElementById("close-privacy-modal")?.addEventListener("click", () => {
    closeModal("privacy-policy-modal");
});

// The Terms of Service Modal
const termsModalTrigger = document.getElementsByClassName("terms-trigger");
for (let trigger of termsModalTrigger) {
    currentModal = "terms-modal";
    trigger.addEventListener("click", () => openModal("terms-modal"));
}

document.getElementById("close-terms-modal")?.addEventListener("click", () => {
    closeModal("terms-modal");
});

// Close modal on "Esc" key press
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && currentModal) {
        closeModal(currentModal);
    }
});


// Assuming currentModal is correctly set when opening a modal
document.addEventListener("click", (event) => {
    if (currentModal && event.target === document.getElementById(currentModal)) {
        closeModal(currentModal);
    }
});

function openModal(modalName: string) {
    const modal = document.getElementById(modalName);
    if (modal) {
        modal.classList.remove("hidden");
        currentModal = modalName;
    }
}

function closeModal(modalName: string) {
    const modal = document.getElementById(modalName);
    if (modal) {
        modal.classList.add("hidden");
        currentModal = "";
    }
}