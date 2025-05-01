export function formModule(container) {
    if (!container) return;

    container.className = "form-container";
    container.innerHTML = "";

    const heading = document.createElement("h2");
    heading.textContent = "Account Setup";
    heading.style.textAlign = "center";
    container.appendChild(heading);

    const form = document.createElement("form");
    form.setAttribute("method", "POST");

    const fields = [
        { type: "text", name: "name", placeholder: "Enter your Name", label: "Name" },
        { type: "email", name: "email", placeholder: "Enter your Email", label: "Email" },
        { type: "tel", name: "phone", placeholder: "Enter your Phone No.", label: "Phone Number", regex: /^[0-9]{10}$/ }
    ];

    fields.forEach(({ type, name, placeholder, label }) => {
        const wrapper = document.createElement("div");
        wrapper.style.display = "flex";
        wrapper.style.alignItems = "center";
        wrapper.style.marginBottom = "1rem";
        wrapper.style.gap = "1rem";

        const inputId = `input-${name}`;

        const labelEl = document.createElement("label");
        labelEl.setAttribute("for", inputId);
        labelEl.textContent = label;

        const input = document.createElement("input");
        input.type = type;
        input.name = name;
        input.id = inputId;
        input.placeholder = placeholder;
        input.required = true;
        input.style.flex = "1";
        input.oninput = () => {
            if (input.value) {
                input.value = input.value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            }
        };

        wrapper.appendChild(labelEl);
        wrapper.appendChild(input);
        form.appendChild(wrapper);
    });

    const submit = document.createElement("button");
    submit.type = "submit";
    submit.textContent = "Submit Form";
    submit.style.marginTop = "1rem";
    form.appendChild(submit);

    container.appendChild(form);

    form.onsubmit = (event) => {
        event.preventDefault();

        const phoneInput = form.querySelector('input[name="phone"]');
        const phoneValid = /^[0-9]{10}$/.test(phoneInput.value);

        if (!phoneValid) {
            phoneInput.style.borderColor = "#ef4444";
            return;
        } else {
            phoneInput.style.borderColor = "#10b981";
        }

        const formData = new FormData(form);
        const name = formData.get("name");
        const email = formData.get("email");
        const phone = formData.get("phone");

        heading.textContent = "Submitted Details";

        form.style.display = "none";

        const resultContainer = document.createElement("div");
        resultContainer.id = "result-container";
        resultContainer.style.backgroundColor = "#2f2f2f";
        resultContainer.style.padding = "2rem";
        resultContainer.style.borderRadius = "10px";
        resultContainer.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";
        resultContainer.style.color = "#f8fafc";
        resultContainer.style.textAlign = "center";
        resultContainer.innerHTML = `
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <button id="backButton" style="padding: 0.8rem 1.5rem; background-color: #14b8a6; color: white; border: none; border-radius: 8px; font-size: 1.1rem; cursor: pointer; transition: background-color 0.2s ease;">Go Back to Form</button>
        `;

        container.appendChild(resultContainer);

        const backButton = document.getElementById("backButton");

        backButton.onclick = () => {
            location.reload();
        };
    };
}
