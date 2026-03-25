import { useEffect, useState } from "react"
import VinaService from "../../services/vina/VinaService"
import { Table } from "react-bootstrap"
import { Link } from "react-router-dom"
import { RouteNames } from "../../constants"
import { NumericFormat } from "react-number-format"

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
            <Link to={RouteNames.VINA_NOVI} className="btn btn-success w-100 mb-3 mt-3">
                Dodavanje novog vina
            </Link>
            <Table>
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Tip</th>
                        <th>Regija</th>
                        <th>Jačina</th>
                        <th>Temperatura</th>
                        <th>Slatkoća</th>
                        <th>Arome</th>
                        <th>Tijelo</th>
                        <th>Alkohol</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {vina && vina.map((vina) => (
                        <tr key={vina.id}>
                            <td>{vina.naziv}</td>
                            <td>{vina.tip}</td>
                            <td>{vina.regija}</td>
                            <td>{vina.jacina}</td>
                            <td>{vina.temperatura}</td>
                            <td>{vina.slatkoca}</td>
                            <td>{vina.arome}</td>
                            <td>{vina.tijelo}</td>
                            <td>{vina.alkohol}</td>                            
                            <td></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}