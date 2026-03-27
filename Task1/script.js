document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("myForm");
    const loadFormData = () => {
        const formData = JSON.parse(localStorage.getItem("formData")) || {};

        for (const [key, value] of Object.entries(formData)) {
            const input = form.elements[key];

            if (!input) continue;

            switch (input.type) {
                case "checkbox":
                    input.checked = value;
                    break;
                case "radio":
                    if (input.value === value) {
                        input.checked = true;
                    }
                    break;
                case "select-one":
                    input.value = value;
                    break;
                default:
                    input.value = value;
            }
        }
    };

    const saveFormData = () => {
        const formData = {};

        Array.from(form.elements).forEach(input => {
            if (!input.name) return;

            switch (input.type) {
                case "checkbox":
                    formData[input.name] = input.checked;
                    break;
                case "radio":
                    if (input.checked) {
                        formData[input.name] = input.value;
                    }
                    break;
                default:
                    formData[input.name] = input.value;
            }
        });

        localStorage.setItem("formData", JSON.stringify(formData));
    };

    form.addEventListener("input", saveFormData);
    form.addEventListener("change", saveFormData);

    form.addEventListener("reset", () => {
        localStorage.removeItem("formData");
    });

    loadFormData();
});
