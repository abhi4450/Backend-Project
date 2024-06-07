document
  .getElementById("assignForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const userName = document.getElementById("userName").value;

    try {
      const response = await axios.post("/api/user/assign", { name: userName });
      document.getElementById(
        "result"
      ).innerText = `User assigned to: ${response.data.assignedTo}`;
    } catch (error) {
      console.error("Error assigning user:", error);
      document.getElementById("result").innerText = "Error assigning user";
    }
  });

document
  .getElementById("toggleForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const astrologerId = document.getElementById("astrologerId").value;
    const isTop = document.getElementById("isTop").checked;

    try {
      const response = await axios.post("/api/astrologer/toggle-top", {
        astrologerId,
        isTop,
      });
      document.getElementById("toggleResult").innerText = response.data.message;
    } catch (error) {
      console.error("Error toggling top astrologer:", error);
      document.getElementById("toggleResult").innerText =
        "Error toggling top astrologer";
    }
  });
