document.addEventListener("DOMContentLoaded", () => {
    const jsonInput = document.getElementById("jsonInput");
    const showButton = document.getElementById("showButton");
    const statusDiv = document.getElementById("status");
    const thumbnailsDiv = document.getElementById("thumbnails");
    const fullImage = document.getElementById("fullImage");

    const parseInput = (input) => {
        if (input.startsWith("[") && input.endsWith("]")) {
            return JSON.parse(input);
        }
        return input.split(",").map(file => file.trim());
    };

    const updateStatus = (message, className) => {
        statusDiv.textContent = message;
        statusDiv.className = className;
    };

    const clearUI = () => {
        thumbnailsDiv.innerHTML = "";
        fullImage.src = "";
    };

    const renderImages = (fileArray) => {
        fileArray.forEach((file) => {
            const imgPreview = document.createElement("div");
            imgPreview.className = "image-preview";

            const img = document.createElement("img");
            img.src = file.trim();
            img.alt = file;

            img.addEventListener("click", () => {
                fullImage.src = file.trim();
            });

            imgPreview.appendChild(img);
            thumbnailsDiv.appendChild(imgPreview);
        });
    };

    showButton.addEventListener("click", () => {
        const input = jsonInput.value.trim();

        try {
            const fileArray = parseInput(input);

            if (!Array.isArray(fileArray)) {
                throw new Error("Input is not a valid JSON array.");
            }

            updateStatus("OK", "ok");
            clearUI();
            renderImages(fileArray);

        } catch (error) {
            updateStatus("Невірний формат JSON", "error");
            clearUI();
        }
    });
});
