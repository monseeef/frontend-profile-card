// Get all the elements we need to work with
const form = document.getElementById("contactForm");

// Input fields
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("message");

// Error message spans
const nameError = document.getElementById("error-name");
const emailError = document.getElementById("error-email");
const subjectError = document.getElementById("error-subject");
const messageError = document.getElementById("error-message");

// Success message
const successMessage = document.querySelector('[data-testid="test-contact-success"]');

// Simple email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Helper function to show error and add styling
 * @param {HTMLElement} input - The input field element
 * @param {HTMLElement} errorElement - The corresponding error span
 * @param {string} message - The error message text
 */
function setError(input, errorElement, message) {
  errorElement.textContent = message;

  if (message) {
    input.classList.add("invalid");
    input.setAttribute("aria-invalid", "true");
  } else {
    input.classList.remove("invalid");
    input.removeAttribute("aria-invalid");
  }
}

/**
 * Main function to check if a field is valid
 * @param {HTMLElement} input - The input element to check
 * @param {HTMLElement} errorElement - The span to display errors
 * @param {string} type - 'text', 'email', or 'message'
 * @returns {boolean} - True if valid, false otherwise
 */
function validateInput(input, errorElement, type) {
  const value = input.value.trim();
  let isValid = true;

  // 1. Check for Required fields (All of them)
  if (value === "") {
    setError(input, errorElement, "This field is required.");
    isValid = false;
    return isValid;
  }

  // 2. Specific checks for Email
  if (type === "email") {
    if (!emailRegex.test(value)) {
      setError(input, errorElement, "Please enter a valid email (name@example.com).");
      isValid = false;
    } else {
      setError(input, errorElement, "");
    }
  }

  // 3. Specific checks for Message
  if (type === "message") {
    if (value.length < 10) {
      setError(input, errorElement, `Message must be at least 10 characters (currently ${value.length}).`);
      isValid = false;
    } else {
      setError(input, errorElement, ""); // Clear error if valid
    }
  }

  // 4. Check and clear errors for simple text fields (Name, Subject)
  if (type === "text" && isValid) {
    setError(input, errorElement, "");
  }

  return isValid;
}

// --- Event Listeners for Live Validation (optional but good practice) ---

nameInput.addEventListener("blur", () => validateInput(nameInput, nameError, "text"));
emailInput.addEventListener("blur", () => validateInput(emailInput, emailError, "email"));
subjectInput.addEventListener("blur", () => validateInput(subjectInput, subjectError, "text"));
messageInput.addEventListener("blur", () => validateInput(messageInput, messageError, "message"));

// --- Form Submission Handler ---

form.addEventListener("submit", (event) => {
  event.preventDefault(); // Stop the form from submitting normally
  successMessage.hidden = true; // Hide success message on a new attempt

  // Run validation on all fields
  const isNameValid = validateInput(nameInput, nameError, "text");
  const isEmailValid = validateInput(emailInput, emailError, "email");
  const isSubjectValid = validateInput(subjectInput, subjectError, "text");
  const isMessageValid = validateInput(messageInput, messageError, "message");

  // Check if ALL fields are valid
  if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
    // Success!
    console.log("Form is valid! Ready to send data.");

    // Show the success message and reset the form
    successMessage.hidden = false;
    form.reset();
  } else {
    // Validation failed. Errors are displayed by the validateInput calls.
    console.log("Validation failed. Please fix errors.");

    // Focus on the first invalid field for accessibility
    const firstInvalid = document.querySelector(".invalid");
    if (firstInvalid) {
      firstInvalid.focus();
    }
  }
});
