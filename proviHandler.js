document.addEventListener('DOMContentLoaded', () => {
    const selectElement = document.getElementById("provincia-select");
    const gridItems = document.querySelectorAll(".grid-item");

    const updateGrid = (selectedProvince) => {
        gridItems.forEach((item) => {
            if (selectedProvince === "todas" || item.getAttribute("data-provincia") === selectedProvince) {
                item.style.display = "";
            } else {
                item.style.display = "none";
            }
        });
    };

    const params = new URLSearchParams(window.location.search);
    const selectedProvince = params.get("p") || "todas";
    selectElement.value = selectedProvince;

    updateGrid(selectedProvince);

    selectElement.addEventListener("change", function () {
        const newProvince = this.value;

        updateGrid(newProvince);

        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set("p", newProvince);
        window.history.replaceState({}, "", newUrl);
    });
});