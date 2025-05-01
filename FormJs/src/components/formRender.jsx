import { useEffect, useRef } from "react";
import { formModule } from "./formModule";
import "./formStyles.css";

const FormContainer = () => {
    const formRef = useRef(null);

    useEffect(() => {
        if (formRef.current) {
            formModule(formRef.current);
        }
    }, []);

    return <div ref={formRef} id="form-cont"></div>;
};

export default FormContainer;