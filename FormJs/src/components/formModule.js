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

    const inputElements = {};

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
        input.style.borderColor = "#ccc";
        input.oninput = () => {
            input.value = input.value.replace(/</g, "").replace(/>/g, "");
          };
        wrapper.appendChild(labelEl);
        wrapper.appendChild(input);
        form.appendChild(wrapper);

        inputElements[name] = input;
    });

    const submit = document.createElement("button");
    submit.type = "submit";
    submit.textContent = "Submit Form";
    submit.style.marginTop = "1rem";
    form.appendChild(submit);

    container.appendChild(form);

    form.onsubmit = (event) => {
        event.preventDefault();

        const name = inputElements.name.value.trim();
        const email = inputElements.email.value.trim();
        const phone = inputElements.phone.value.trim();
        const phoneValid = /^[0-9]{10}$/.test(phone);

        if (!phoneValid) {
            inputElements.phone.style.borderColor = "#ef4444";
            return;
        } else {
            inputElements.phone.style.borderColor = "#10b981";
        }

        heading.textContent = "Submitted Details";
        form.style.display = "none";

        const resultContainer = document.createElement("div");
        resultContainer.style.backgroundColor = "#2f2f2f";
        resultContainer.style.padding = "2rem";
        resultContainer.style.borderRadius = "10px";
        resultContainer.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.2)";
        resultContainer.style.color = "#f8fafc";
        resultContainer.style.textAlign = "center";

        const nameP = document.createElement("p");
        nameP.textContent = `Name: ${name}`;

        const emailP = document.createElement("p");
        emailP.textContent = `Email: ${email}`;

        const phoneP = document.createElement("p");
        phoneP.textContent = `Phone: ${phone}`;

        const backButton = document.createElement("button");
        backButton.textContent = "Go Back to Form";
        backButton.style.padding = "0.8rem 1.5rem";
        backButton.style.backgroundColor = "#14b8a6";
        backButton.style.color = "white";
        backButton.style.border = "none";
        backButton.style.borderRadius = "8px";
        backButton.style.fontSize = "1.1rem";
        backButton.style.cursor = "pointer";
        backButton.style.marginTop = "1rem";
        backButton.onclick = () => location.reload();

        resultContainer.appendChild(nameP);
        resultContainer.appendChild(emailP);
        resultContainer.appendChild(phoneP);
        resultContainer.appendChild(backButton);

        container.appendChild(resultContainer);
    };
}
