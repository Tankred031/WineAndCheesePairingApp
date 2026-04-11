import { useEffect, useState } from "react"
import VinaService from "../../services/vina/VinaService"
import { Button, Table } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"


export default function VinaPregled() {

    const navigate = useNavigate()
    const [vina, setVina] = useState([])

    const TIPOVI_VINA = [
        { id: 1, naziv: "crveno" },
        { id: 2, naziv: "bijelo" },
        { id: 3, naziv: "pjenušavo" },
        { id: 4, naziv: "desertno" },
        { id: 5, naziv: "rose" }
    ]

    const SLATKOCE = [
        { id: 1, naziv: "suho" },
        { id: 2, naziv: "polusuho" },
        { id: 3, naziv: "poluslatko" },
        { id: 4, naziv: "slatko" }
    ]

    function getSlatkocaNaziv(id) {
        return SLATKOCE.find(s => s.id === id)?.naziv || ''
    }

    function getTipNaziv(id) {
        return TIPOVI_VINA.find(t => t.id === id)?.naziv || ''
    }


    useEffect(() => {
        ucitajVina()
    }, [])

    async function ucitajVina() {
        await VinaService.get().then((odgovor) => {

            if (!odgovor.success) {
                alert('Nije implementiran servis')
                return
            }
            setVina(odgovor.data)


        })

    }

    async function obrisi(id) {
        if (!confirm('Sigurno obrisati?')) {
            return
        }
        await VinaService.obrisi(id)
        ucitajVina()
    }


    return (
        <>
            <Link to={RouteNames.VINA_NOVI} className="btn btn-success w-100 mb-3 mt-3">
                Dodavanje novog vina
            </Link>
            <Table bordered striped hover>
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Tip</th>
                        <th>Regija</th>
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
                            <td>{getTipNaziv(vina.tip_id)}</td>
                            <td>{vina.regija}</td>
                            <td>{vina.temperatura}</td>
                            <td>{getSlatkocaNaziv(vina.slatkoca_id)}</td>
                            <td>{vina.arome}</td>
                            <td>{vina.tijelo}</td>
                            <td>{vina.alkohol}</td>
                            <td>
                                <div className="d-flex gap-2">
                                    <Button onClick={() => { navigate(`/vina/${vina.id}`) }} variant="warning" size="sm">
                                        Promjena
                                    </Button>
                                    &nbsp;
                                    <Button onClick={() => { obrisi(vina.id) }} variant="danger" size="sm">
                                        Obriši
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}