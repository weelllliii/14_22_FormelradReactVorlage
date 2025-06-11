import {useState} from "react";
import '../css/mvp.css';
import formelrad from "../image/formelradelektronik.gif";
import InputField from "../formular/InputField";

export default function Formelrad() {
    const [values, setValues] = useState({
        u: 10,
        i: 2,
        r: "",
        p: ""
    })

    const [colors, setColors] = useState({
        u: "black",
        i: "black",
        r: "black",
        p: "black",
        message: "red"
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("handleSubmit")
        if (values.u === "" && values.i === "") {
            /*calculate u and i */
            setValues(values => ({...values, u: Math.sqrt(values.p * values.r)}));
            setValues(values => ({...values, i: Math.sqrt(values.p / values.r)}));
            setColors( colors=> ({...colors, u:"red", i:"red"}));
        } else if (values.u === "" && values.r === "") {
            /*calculate u and r */
            setValues(values => ({...values, u: values.p / values.i}));
            setValues(values => ({...values, r: values.p / values.i / values.i}));
            setColors( colors=> ({...colors, u:"red", r:"red"}));
        } else if (values.u === "" && values.p === "") {
            /*calculate u and p */
            setValues(values => ({...values, u: values.i * values.r}));
            setValues(values => ({...values, p: values.i * values.i * values.r}));
            setColors( colors=> ({...colors, u:"red", p:"red"}));
        } else if (values.i === "" && values.r === "") {
            /*calculate i and r */
            setValues(values => ({...values, i: values.p / values.u}));
            setValues(values => ({...values, r: values.u * values.u / values.p}));
            setColors( colors=> ({...colors, i:"red", r:"red"}));
        } else if (values.i === "" && values.p === "") {
            /*calculate i and p */
            setValues(values => ({...values, i: values.u / values.r}));
            setValues(values => ({...values, p: values.u * values.u / values.r}));
            setColors( colors=> ({...colors, i:"red", p:"red"}));
        } else {
            /*calculate r and p */
            setValues(values => ({...values, r: values.u / values.i}));
            setValues(values => ({...values, p: values.u * values.i}));
            setColors( colors=> ({...colors, r:"red", p:"red"}));
        }
    }

    return (
        <>
            <section>
                <header>
                    <h2>Formelrad</h2>
                    <img src={formelrad} width="200" alt="Formelrad"/>
                </header>
                <form onSubmit={handleSubmit}>
                    <InputField color={colors.u} value={values.u} label="Spannung" handleChange={e => {setValues(values => ({...values, u: e.target.value}))}} />
                    <InputField color={colors.i} value={values.i} label="Stromstärke" handleChange={e => {setValues(values => ({...values, i: e.target.value}))}} />
                    <InputField color={colors.r} value={values.r} label="Widerstand" handleChange={e => {setValues(values => ({...values, r: e.target.value}))}} />
                    <InputField color={colors.p} value={values.p} label="Leistung" handleChange={e => {setValues(values => ({...values, p: e.target.value}))}} />
                    <button type="submit">Calculate</button>
                </form>
            </section>
        </>
    )
}