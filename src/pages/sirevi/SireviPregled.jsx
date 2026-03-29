import { useEffect, useState } from "react"
import SireviService from "../../services/sirevi/SireviService"
import { Button, Table } from "react-bootstrap"
import { useNavigate } from "react-router-dom"


export default function SireviPregled() {

    const navigate = useNavigate()
    const [sirevi, setSirevi] = useState([])

    useEffect(() => {
        ucitajSirevi()
    }, [])

    async function ucitajSirevi() {
        await SireviService.get().then((odgovor) => {
            setSirevi(odgovor.data)
        })
    }

    async function obrisi(id) {
        if(!confirm('Sigurno obrisati?')){
            return
        }
        await SireviService.obrisi(id)
        ucitajSirevi()
    }

    return (
        <>

            <div className="mt-4">
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
                        {sirevi && sirevi.map((sirevi) => (
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
                                <td>
                                    <div className="d-flex gap-2">
                                    <Button onClick={() => { navigate(`/sirevi/${sirevi.id}`) }} variant="warning" size="sm">
                                        Promjena
                                    </Button>
                                    &nbsp;
                                    <Button onClick={() => { obrisi(sirevi.id) }} variant="danger" size="sm">
                                        Obriši
                                    </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    )
}