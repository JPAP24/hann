// Helper function to update time and date fields
function updateTimeAndDate() {
  const now = new Date();
  document.getElementById("time-in").value = now.toLocaleTimeString();
  document.getElementById("date").value = now.toLocaleDateString();
}

// Function to calculate escalation time
function calculateEscalationTime(timeIn, timeOut) {
  const timeInDate = new Date(`1970-01-01T${timeIn}`);
  const timeOutDate = new Date(`1970-01-01T${timeOut}`);

  // Calculate the difference in milliseconds and convert to minutes
  const differenceInMs = timeOutDate - timeInDate;
  return Math.floor(differenceInMs / 60000); // Convert milliseconds to minutes
}

// Event listener for DOMContentLoaded
document.addEventListener("DOMContentLoaded", updateTimeAndDate);

let isTimeUpdated = false;

// Track focus events for specific fields
const fieldsToTrack = ["client-name", "caller-number", "call-concern", "department"];
fieldsToTrack.forEach((fieldId) => {
  document.getElementById(fieldId).addEventListener("focus", function () {
    if (!isTimeUpdated) {
      updateTimeAndDate();
      isTimeUpdated = true;
    }
  });
});

// Reset button logic
document.getElementById("reset-button").addEventListener("click", function () {
  isTimeUpdated = false;
  updateTimeAndDate();
});

// Submit form logic
document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();
  const now = new Date();
  document.getElementById("time-out").value = now.toLocaleTimeString();

  // Get Time In and Time Out values
  const timeIn = document.getElementById("time-in").value;
  const timeOut = document.getElementById("time-out").value;

  // Calculate escalation time
  const escalationTime = calculateEscalationTime(timeIn, timeOut);

// Add escalation time to the message in minutes and seconds
const minutes = Math.floor(escalationTime / 60); // Calculate minutes
const seconds = escalationTime % 60; // Calculate remaining seconds

const message = document.getElementById("message");
message.textContent = `Submitting... Escalation Time: ${minutes} minute(s) and ${seconds} second(s)`;
message.style.display = "block";
message.style.color = "green";
message.style.backgroundColor = "beige";

  // Prepare form data
  const formData = new FormData(this);
  formData.append("Escalation Time", `${escalationTime} minute(s)`);

  const keyValuePairs = Array.from(formData.entries()).map(
    ([key, value]) => `${key}=${encodeURIComponent(value)}`
  );
  const formDataString = keyValuePairs.join("&");

  // Submit the form data
  fetch(
    "https://script.google.com/macros/s/AKfycbxXGpoLOw7BA_647KIG6eemVRFU0DaxzrtiJjFnVB8oJ3S-OJub5qDhXej6-3qSxpNiyQ/exec",
    {
      method: "POST",
      body: formDataString,
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" },
    }
  )
    .then((response) => response.json())
    .then(() => {
      message.textContent = "Data submitted successfully!";
      message.style.color = "white";
      message.style.backgroundColor = "green";
      document.getElementById("form").reset();
      setTimeout(() => (message.style.display = "none"), 2600);
    })
    .catch((error) => {
      console.error(error);
      message.textContent = "An error occurred. Please try again.";
      message.style.color = "red";
    });
});


