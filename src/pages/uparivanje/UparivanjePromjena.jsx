import { useEffect, useState } from "react";
import VinaService from "../../services/vina/VinaService";
import SireviService from "../../services/sirevi/SireviService";
import { useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import { uparivanjeVinaById } from "../../services/uparivanje/UparivanjeVinaPopis";
import UparivanjeCustomService from "../../services/uparivanje/UparivanjeCustomService";
import { Button, Form } from "react-bootstrap";

export default function UparivanjePromjena() {

    const [vino, setVino] = useState({})
    const [sirevi, setSirevi] = useState([])
    const [odabraniSirevi, setOdabraniSirevi] = useState([])

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        ucitaj()
    }, [])

    async function ucitaj() {
        const v = await VinaService.getById(params.id)
        const s = await SireviService.get()

        setVino(v.data)
        setSirevi(s.data)

        const idjevi = uparivanjeVinaById[Number(params.id)] || []
        setOdabraniSirevi(idjevi)

        console.log("params:", params.id)
        console.log("vino:", v.data)
        console.log("sirevi:", s.data)
    }

    function toggleSir(id) {
        if (odabraniSirevi.includes(id)) {
            setOdabraniSirevi(odabraniSirevi.filter(s => s !== id))
        } else {
            setOdabraniSirevi([...odabraniSirevi, id])
        }
    }

    async function spremi(e) {
        e.preventDefault()

        const svi = (await UparivanjeCustomService.get()).data
        const ostali = svi.filter(u => u.vinoId != params.id)

        const novi = odabraniSirevi.map(sirId => ({
            id: Date.now() + sirId,
            vinoId: Number(params.id),
            sirId
        }))

        console.log("NOVI ZA SPREMIT:", novi)

        await UparivanjeCustomService.postavi([...ostali, ...novi])

        const test = await UparivanjeCustomService.get()
        console.log("NAKON SPREMANJA:", test)

        navigate(RouteNames.UPARIVANJE_PREGLED)
    }


    return (
        <>
            <h3 className="naslov">Izmjena uparivanja na vino-sirevi</h3>

            <Form onSubmit={spremi}>
                <h4>{vino.naziv}</h4>

                {sirevi.map(s => (
                    <div key={s.id}>
                        <input
                            type="checkbox"
                            checked={odabraniSirevi.includes(s.id)}
                            onChange={() => toggleSir(s.id)}
                        />
                        <label className="ms-2">{s.naziv}</label>
                    </div>
                ))}

                <hr />

                <Button type="submit">Spremi</Button>
            </Form>
        </>
    )
}