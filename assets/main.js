// Helper function to update time and date fields
function updateTimeAndDate() {
    const now = new Date();
    document.getElementById("time-in").value = now.toLocaleTimeString();
    document.getElementById("date").value = now.toLocaleDateString();
  }
  
  // Event listener for DOMContentLoaded
  document.addEventListener("DOMContentLoaded", updateTimeAndDate);
  
  let isTimeUpdated = false;
  
  // Track focus events for specific fields
  const fieldsToTrack = ["client-name", "caller-number", "call-concern", "department"];
  fieldsToTrack.forEach(fieldId => {
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
  
    const message = document.getElementById("message");
    message.textContent = "Submitting...";
    message.style.display = "block";
    message.style.color = "green";
    message.style.backgroundColor = "beige";
  
    const formData = new FormData(this);
    const keyValuePairs = Array.from(formData.entries()).map(
      ([key, value]) => `${key}=${encodeURIComponent(value)}`
    );
    const formDataString = keyValuePairs.join("&");
  
    fetch(
      "https://script.google.com/macros/s/AKfycbyINoiIlqmT_bYdR_NHa6xfkKHXnMLGSJ2XxiJRs4leSJsVCLHFsRnfNMBlbLx7oIg6/exec",
      {
        method: "POST",
        body: formDataString,
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" },
      }
    )
      .then(response => response.json())
      .then(() => {
        message.textContent = "Data submitted successfully!";
        message.style.color = "white";
        message.style.backgroundColor = "green";
        document.getElementById("form").reset();
        
        // Reset Time In and Date after form submission
        updateTimeAndDate();
  
        // Refresh page after submission
        setTimeout(() => {
          location.reload(); // Refresh the page
        }, 2500); // Adjust the timeout based on your preference
      })
      .catch(error => {
        console.error(error);
        message.textContent = "An error occurred. Please try again.";
        message.style.color = "red";
      });
  });


  window.onload = function() {
    // Simulate loading time (you can adjust the timeout duration)
    setTimeout(function() {
        // Hide the loading screen
        document.getElementById("loading-screen").style.display = "none";
        
        // Show the main content
        document.getElementById("main-content").style.display = "block";
    }, 3000); // 3 seconds loading time (change as needed)
};


  // Toggle the navbar menu visibility
  function toggleNavbar() {
    const navbar = document.getElementById('navbar-hamburger');
    const isExpanded = navbar.classList.contains('hidden');
    if (isExpanded) {
      navbar.classList.remove('hidden');
      navbar.classList.add('block');
    } else {
      navbar.classList.remove('block');
      navbar.classList.add('hidden');
    }
  }