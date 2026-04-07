// Module to handle opening and closing the various modals in the app. 

/**
 * Open the specified modal by removing the "hidden" class and setting "open".
 * @param {string} modalId - ID of the modal to open.
 */
export function openModal(modalId: string) {
  const modal: HTMLDialogElement = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('hidden');
    modal.open = true;
  } else {
    console.error(`Modal with ID '${modalId}' not found.`);
  }

  setTimeout(() => {
    closeModal(modalId);
  }, 300000); // 5 minutes in milliseconds
}

/**
 * Closes the specified modal by adding the "hidden" class and removing "open".
 * @param {string} modalId - ID of the modal to close.
 */
export function closeModal(modalId: string) {
  const modal: HTMLDialogElement = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('hidden');
    modal.open = false;
  } else {
    console.error(`Modal with ID '${modalId}' not found.`);
  }
}

/**
 * Attach modal logic to triggers and close buttons.
 * @param {string} triggerSelector - Selector for trigger elements.
 * @param {string} modalId - ID of the modal to toggle.
 * @param {string} closeBtnSelector - Selector for the close button inside the modal.
 */
export function attachModalLogic(triggerSelector: string, modalId: string, closeBtnSelector: string) {
  const triggers = document.querySelectorAll(triggerSelector);
  const closeButton = document.querySelector(closeBtnSelector);

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => openModal(modalId));
  });

  // Close modal on "Esc" key press
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modalId) {
      closeModal(modalId);
    }
  });


  if (closeButton) {
    closeButton.addEventListener('click', () => closeModal(modalId));
  } else {
    console.error(`Close button for modal '${modalId}' not found.`);
  }
}