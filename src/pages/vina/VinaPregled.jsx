import { useEffect, useState } from "react"
import VinaService from "../../services/vina/VinaService"
import { Button, Table } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"


export default function VinaPregled() {

    const navigate = useNavigate()
    const [vina, setVina] = useState([])

    useEffect(() => {
        ucitajVina()
    }, [])

    async function ucitajVina() {
        await VinaService.get().then((odgovor) => {
            setVina(odgovor.data)
        })

    }

    async function obrisi(id) {
        if(!confirm('Sigurno obrisati?')){
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
                            <td>
                                <Button onClick={()=>{navigate(`/vina/${vina.id}`)}} variant="warning">
                                    Promjena
                                </Button>
                                &nbsp;
                                <Button onClick={()=>{obrisi(vina.id)}} variant="danger">
                                    Obriši
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}