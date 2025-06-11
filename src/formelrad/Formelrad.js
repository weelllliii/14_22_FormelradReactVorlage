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
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("handleSubmit");

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

        let result = { ...values, message: "" };

        if (u === "" && i === "") {
            result.u = Math.sqrt(p * r);
            result.i = Math.sqrt(p / r);
        } else if (u === "" && r === "") {
            result.u = p / i;
            result.r = p / (i * i);
        } else if (u === "" && p === "") {
            result.u = i * r;
            result.p = i * i * r;
        } else if (i === "" && r === "") {
            result.i = p / u;
            result.r = (u * u) / p;
        } else if (i === "" && p === "") {
            result.i = u / r;
            result.p = (u * u) / r;
        } else if (r === "" && p === "") {
            result.r = u / i;
            result.p = u * i;
        }

        setValues(result);
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
                        color="black"
                        value={values.u}
                        label="Spannung"
                        handleChange={e => setValues({ ...values, u: e.target.value })}
                    />
                    <InputField
                        color="black"
                        value={values.i}
                        label="Stromstärke"
                        handleChange={e => setValues({ ...values, i: e.target.value })}
                    />
                    <InputField
                        color="black"
                        value={values.r}
                        label="Widerstand"
                        handleChange={e => setValues({ ...values, r: e.target.value })}
                    />
                    <InputField
                        color="black"
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