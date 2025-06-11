import { useState } from "react";
import '../css/mvp.css';
import formelrad from "../image/formelradelektronik.gif";
import InputField from "../formular/InputField";

export default function Formelrad() {
    const [values, setValues] = useState({
        u: 10,
        i: 2,
        r: "",
        p: "",
        message: ""
    });

    const [colors, setColors] = useState({
        u: "black",
        i: "black",
        r: "black",
        p: "black"
    });

    const handleClear = (event) => {
        event.preventDefault();
        console.log("handleClear");
        setValues({
            u: "",
            i: "",
            r: "",
            p: "",
            message: ""
        });
        setColors({
            u: "black",
            i: "black",
            r: "black",
            p: "black"
        });
    };

    function resetColors() {
        setColors({
            u: "black",
            i: "black",
            r: "black",
            p: "black"
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("handleSubmit");

        resetColors();

        const { u, i, r, p } = values;

        let count = 0;
        if (u === "") count++;
        if (i === "") count++;
        if (r === "") count++;
        if (p === "") count++;

        if (count !== 2) {
            setValues(values => ({ ...values, message: "Bitte genau 2 Felder leer lassen!" }));
            return;
        }

        let newValues = { ...values, message: "" };
        let newColors = { ...colors };

        // Rechne je nach leeren Feldern und markiere berechnete Felder rot
        if (u === "" && i === "") {
            newValues.u = (Math.sqrt(p * r)).toFixed(2);
            newValues.i = (Math.sqrt(p / r)).toFixed(2);
            newColors.u = "red";
            newColors.i = "red";
        } else if (u === "" && r === "") {
            newValues.u = (p / i).toFixed(2);
            newValues.r = (p / (i * i)).toFixed(2);
            newColors.u = "red";
            newColors.r = "red";
        } else if (u === "" && p === "") {
            newValues.u = (i * r).toFixed(2);
            newValues.p = (i * i * r).toFixed(2);
            newColors.u = "red";
            newColors.p = "red";
        } else if (i === "" && r === "") {
            newValues.i = (p / u).toFixed(2);
            newValues.r = ((u * u) / p).toFixed(2);
            newColors.i = "red";
            newColors.r = "red";
        } else if (i === "" && p === "") {
            newValues.i = (u / r).toFixed(2);
            newValues.p = ((u * u) / r).toFixed(2);
            newColors.i = "red";
            newColors.p = "red";
        } else if (r === "" && p === "") {
            newValues.r = (u / i).toFixed(2);
            newValues.p = (u * i).toFixed(2);
            newColors.r = "red";
            newColors.p = "red";
        }

        setValues(newValues);
        setColors(newColors);
    };

    return (
        <>
            <section>
                <header>
                    <h2>Formelrad</h2>
                    <img src={formelrad} width="200" alt="Formelrad" />
                </header>
                <form onSubmit={handleSubmit}>
                    <InputField
                        color={colors.u}
                        value={values.u}
                        label="Spannung"
                        handleChange={e => setValues({ ...values, u: e.target.value })}
                    />
                    <InputField
                        color={colors.i}
                        value={values.i}
                        label="Stromstärke"
                        handleChange={e => setValues({ ...values, i: e.target.value })}
                    />
                    <InputField
                        color={colors.r}
                        value={values.r}
                        label="Widerstand"
                        handleChange={e => setValues({ ...values, r: e.target.value })}
                    />
                    <InputField
                        color={colors.p}
                        value={values.p}
                        label="Leistung"
                        handleChange={e => setValues({ ...values, p: e.target.value })}
                    />
                    <button type="submit">Calculate</button>
                    <button style={{ marginLeft: 10 }} onClick={handleClear}>Clear</button>
                    <p style={{ color: "red" }}>{values.message}</p>
                </form>
            </section>
        </>
    );
}