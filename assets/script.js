document.addEventListener("click", (event) => {
  if (event.target.tagName === "INPUT") {
    var paragraph = document.querySelector(".hideError");
    if (paragraph) {
      paragraph.classList.add("d-none");
    }
  }
});

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

// Disable submit button by default
if (document.getElementById("submitBtn")) {
  document.getElementById("submitBtn").disabled = true;

  // Enable submit button only when passwords match
  document
    .getElementById("confirmPassword")
    .addEventListener("input", function () {
      var password = document.getElementById("password").value;
      var confirmPassword = this.value;

      document.getElementById("submitBtn").disabled =
        password !== confirmPassword;
    });
}
