import { useEffect, useState } from "react"
import SireviService from "../../services/sirevi/SireviService"

export default function SireviPregled() {

    const [sirevi, setSirevi] = useState([])

    useEffect(() => {
        ucitajSirevi()
    }, [])

    async function ucitajSirevi() {
        await SireviService.get().then((odgovor) => {
            setSirevi(odgovor.data)
        })
    }

    return (
        <>
            <ul>
                {sirevi && sirevi.map((sirevi) => (
                    <li>{sirevi.naziv}</li>
                ))}
            </ul>
        </>
    )
}