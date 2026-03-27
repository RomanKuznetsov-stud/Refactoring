document.addEventListener("DOMContentLoaded", () => {
    const jsonInput = document.getElementById("jsonInput");
    const showButton = document.getElementById("showButton");
    const statusDiv = document.getElementById("status");
    const thumbnailsDiv = document.getElementById("thumbnails");
    const fullImage = document.getElementById("fullImage");

    showButton.addEventListener("click", () => {
        const input = jsonInput.value.trim();

        try {
            let fileArray;

            if (input.startsWith("[") && input.endsWith("]")) {
                fileArray = JSON.parse(input);
            } else {

                fileArray = input.split(",").map(file => file.trim());
            }

            if (!Array.isArray(fileArray)) {
                throw new Error("Input is not a valid JSON array.");
            }

            statusDiv.textContent = "OK";
            statusDiv.className = "ok";

            thumbnailsDiv.innerHTML = "";
            fullImage.src = "";

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
        } catch (error) {
            statusDiv.textContent = "Невірний формат JSON";
            statusDiv.className = "error";
            thumbnailsDiv.innerHTML = "";
            fullImage.src = "";
        }
    });
});
