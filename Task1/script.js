document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("myForm");

    const setInputValue = (input, value) => {
        if (input.type === "checkbox") {
            input.checked = value;
        } else if (input.type === "radio") {
            input.checked = (input.value === value);
        } else {
            input.value = value;
        }
    };

    const getInputValue = (input) => {
        if (input.type === "checkbox") return input.checked;
        if (input.type === "radio") return input.checked ? input.value : null;
        return input.value;
    };

    const loadFormData = () => {
        const formData = JSON.parse(localStorage.getItem("formData")) || {};

        for (const [key, value] of Object.entries(formData)) {
            const input = form.elements[key];
            if (!input) continue;
            setInputValue(input, value);
        }
    };

    const saveFormData = () => {
        const formData = {};

        Array.from(form.elements).forEach(input => {
            if (!input.name) return;
            const val = getInputValue(input);
            if (val !== null) {
                formData[input.name] = val;
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
