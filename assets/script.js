// document.addEventListener("click", function (event) {
//   // Check if the clicked element is a button
//   if (event.target.tagName === "BUTTON") {
//     const buttonId = event.target.id;

//     switch (buttonId) {
//       //   case "btn-login":
//       //     window.location.href = "/login";
//       //     break;
//       case "btn-logout":
//         window.location.href = "/logout";
//         break;
//     }
//   }
// });
document.addEventListener("click", (event) => {
  if (event.target.tagName === "INPUT") {
    var paragraph = document.querySelector(".hideError");
    if (paragraph) {
      paragraph.classList.add("d-none");
    }
  }
});

// document.addEventListener("DOMContentLoaded", function () {
//   var searchbar = document.querySelector(".searchbar");
//   if (searchbar) {
//     searchbar.addEventListener("mouseenter", function () {
//       var paragraph = document.querySelector(".hideError");
//       if (paragraph) {
//         paragraph.classList.add("d-none");
//       }
//     });
//     searchbar.addEventListener("mouseleave", function () {
//       var paragraph = document.querySelector(".hideError");
//       if (paragraph) {
//         paragraph.classList.remove("d-none");
//       }
//     });
//   }
// });

// Get the search input and search link
var searchInput = document.getElementById("searchInput");
var searchLink = document.getElementById("searchLink");

// Attach a click event listener to the search link
if (searchLink) {
  searchLink.addEventListener("click", function () {
    // Get the value from the search input
    var searchValue = searchInput.value;
    // Encode the search value and update the link's href attribute
    searchLink.href =
      "/admin/dashboard/?search=" + encodeURIComponent(searchValue);
  });
}

//registration form validation
document
  .getElementById("registrationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    console.log(password);
    console.log(confirmPassword);

    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
    } else {
      // Passwords match, you can proceed with form submission or other actions
      alert("Form submitted successfully!");
      // Uncomment the following line to submit the form programmatically
      // this.submit();
    }
  });
