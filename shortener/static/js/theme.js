document.addEventListener("DOMContentLoaded", function () {

    const toggleBtn = document.getElementById("themeToggle");

    if (toggleBtn) {

        function applyTheme(theme) {
            document.documentElement.setAttribute("data-theme", theme);
            localStorage.setItem("theme", theme);
        }

        toggleBtn.addEventListener("click", function () {
            const currentTheme =
                document.documentElement.getAttribute("data-theme") || "dark";

            const newTheme = currentTheme === "dark" ? "light" : "dark";
            applyTheme(newTheme);
        });

        const savedTheme = localStorage.getItem("theme") || "dark";
        applyTheme(savedTheme);
    }

});

function copyURL() {
    const linkElement = document.getElementById("shortLink");
    const copyBtn = document.querySelector(".copy-btn");

    if (!linkElement) return;

    const link = linkElement.innerText;

    navigator.clipboard.writeText(link).then(function () {
        copyBtn.innerText = "Copied";

        setTimeout(function () {
            copyBtn.innerText = "Copy";
        }, 1500);
    });
}