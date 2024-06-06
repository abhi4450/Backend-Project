const commonHeaders = {
  Authorization: localStorage.getItem("token"),
};

const logoutButton = document.querySelector("#logoutButton");
logoutButton.addEventListener("click", (event) => {
  localStorage.removeItem("token");
  window.location.href = "http://localhost:3000/api/user/login";
});

window.addEventListener("DOMContentLoaded", async () => {
  try {
    // Fetch user data to get the username
    const userData = await fetchUserData();
    if (userData.success) {
      const username = userData.data.username;
      // Display the username in the navbar
      const usernameElement = document.getElementById("username");
      if (usernameElement) {
        usernameElement.textContent = username;
      }
    } else {
      console.error("Failed to fetch user data:", userData.error);
    }
  } catch (error) {
    console.error("Unexpected error:", error);
  }
});

async function fetchUserData() {
  try {
    const response = await axios.get("http://localhost:3000/api/user/data", {
      headers: commonHeaders,
    });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.response.data.message };
  }
}

document
  .getElementById("taskForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const message = document.getElementById("message").value;

    try {
      const response = await axios.post(
        "/api/user/task",
        { message },
        {
          headers: commonHeaders,
        }
      );
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  });
