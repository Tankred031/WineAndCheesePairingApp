import { useEffect, useState } from "react"
import VinaService from "../../services/vina/VinaService"

export default function VinaPregled() {

    const [vina, setVina] = useState([])

    useEffect(() => {
        ucitajVina()
    }, [])

    async function ucitajVina() {
        await VinaService.get().then((odgovor) => {
            setVina(odgovor.data)
        })

    }

    return (
        <>
            <ul>
                {vina && vina.map((vina) => (
                    <li>{vina.naziv}</li>
                ))}
            </ul>
        </>
    )
}