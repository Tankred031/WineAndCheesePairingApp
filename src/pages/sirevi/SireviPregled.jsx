import { useEffect, useState } from "react"
import SireviService from "../../services/sirevi/SireviService"
import { Table } from "react-bootstrap"
import { Link } from "react-router-dom"
import { RouteNames } from "../../constants"

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
            <Link to={RouteNames.SIREVI_NOVI} className="btn btn-success w-100 mb-3 mt-3">
                Dodavanje novog sira
            </Link>
            <Table>
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Tip</th>
                        <th>Vrsta</th>
                        <th>Zrenje</th>                        
                        <th>Regija</th>
                        <th>Intezitet</th>
                        <th>Masnoće</th>
                        <th>Tekstura</th>
                        <th>Okus</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {sirevi && sirevi.map((sirevi)=>(
                    <tr key={sirevi.id}>
                        <td>{sirevi.naziv}</td>
                        <td>{sirevi.tip}</td>
                        <td>{sirevi.vrsta}</td>
                        <td>{sirevi.zrenje}</td>                        
                        <td>{sirevi.regija}</td>
                        <td>{sirevi.intezitet}</td>
                        <td>{sirevi.masnoce}</td>
                        <td>{sirevi.tekstura}</td>
                        <td>{sirevi.okus}</td>
                        <td></td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </>
    )
}