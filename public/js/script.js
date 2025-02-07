document.addEventListener("DOMContentLoaded", () => {
    const themeToggleBtn = document.getElementById("theme-toggle");
    const shortenBtn = document.getElementById("shorten-btn");
    const copyBtn = document.getElementById("copy-btn");
    const longUrlInput = document.getElementById("long-url");
    const shortUrlInput = document.getElementById("shortened-url");
    const body = document.body;
    const resetBtn = document.getElementById("reset-btn");

    // Toggle Theme
    themeToggleBtn.addEventListener("click", () => {
        body.classList.toggle("light-theme");
        body.classList.toggle("dark-theme");

        const icon = themeToggleBtn.querySelector("i");
        icon.classList.toggle("fa-moon");
        icon.classList.toggle("fa-sun");
    });

    // Simulate URL Shortening
    shortenBtn.addEventListener("click", () => {
        const longUrl = longUrlInput.value.trim();
        if (longUrl === "") {
            alert("Please enter a valid URL");
            return;
        }
    });

    // Redirect to the home page without any id on clicking reset button
    if (resetBtn) {
        resetBtn.addEventListener("click", function () {
            window.location.href = "/"; 
        });
    }

    // Copy to Clipboard
   if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(shortUrlInput.value);
            copyBtn.innerHTML = `<i class="fas fa-check"></i> Copied!`;
    
            setTimeout(() => {
                copyBtn.innerHTML = `<i class="fas fa-copy"></i> Copy`;
            }, 1500);
        } 
        catch (err) {
            console.error("Failed to copy:", err);
        }
    }); 
   }   
});
