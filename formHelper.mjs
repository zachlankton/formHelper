import { setObjVal } from "./objectFromPathString.mjs";

function getFormData(form) {
    const namedElements = Array.from(form.querySelectorAll("[name]"));
    const return_data = {};
    for (const elm of namedElements) {
        const path = elm.getAttribute("name");
        const { val, skip } = getValue(elm);
        if (skip) continue;
        setObjVal(return_data, path, val);
    }
    return return_data;
}

function getValue(elm) {
    if (elm.type === "radio" && elm.checked)
        return { val: elm.id || elm.value };
    if (elm.type === "radio" && !elm.checked) return { skip: true };
    if (elm.type === "checkbox") return { val: elm.checked };
    if (elm.value) return { val: elm.value };
    return { val: "" };
}

export {getFormData}
