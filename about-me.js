const form = document.getElementById("contactForm");

const name = document.getElementById("name");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");

form.addEventListener("submit", (e) => {
  let valid = true;
  if (name.value === "" || name.value === null) {
    messages.push("name is required");
  }
  if (message.length < 0) {
    e.preventDefault();
  }
});
