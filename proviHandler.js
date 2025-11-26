document.addEventListener('DOMContentLoaded', () => {
    const selectElement = document.getElementById("provincia-select");
    const gridItems = document.querySelectorAll(".grid-item");
    const sortButton = document.getElementById('sort-button'); 
    const toptierDiv = document.getElementById('toptier-clickable');

    const updateGrid = (selectedProvince) => {
        gridItems.forEach((item) => {
            if (selectedProvince === "todas" || item.getAttribute("data-provincia") === selectedProvince) {
                item.style.display = "";
            } else {
                item.style.display = "none";
            }
        });

        if (sortButton) {
            if (selectedProvince !== 'todas') {
                sortButton.style.display = 'none'; 
            } else {
                sortButton.style.display = 'inline-block'; 
            }
        }
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

    if (toptierDiv) {
        toptierDiv.addEventListener('click', () => {
            const targetProvince = toptierDiv.getAttribute('data-target-provincia');
            
            if (targetProvince && targetProvince !== 'todas') {
                selectElement.value = targetProvince; 
                const event = new Event('change');
                selectElement.dispatchEvent(event);
                const newUrl = new URL(window.location.href);
                newUrl.searchParams.set("p", targetProvince);
                window.history.replaceState({}, "", newUrl);
            }
        });
    }
});