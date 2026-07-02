(function() {
    const savedTheme = localStorage.getItem("appTheme") || "light";
    if (savedTheme === "dark") {
        document.documentElement.classList.add("dark-theme");
    } else {
        document.documentElement.classList.remove("dark-theme");
    }

    const savedFontSize = localStorage.getItem("appFontSize") || "medium";
    document.documentElement.setAttribute("data-font-size", savedFontSize);
})();
