import { useEffect, useState } from "react"
import VinaService from "../../services/vina/VinaService"
import { Table } from "react-bootstrap"

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
            <Table>
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Tip</th>
                        <th>Drzava</th>
                        <th>Regija</th>
                        <th>Jacina</th>
                        <th>Temperatura</th>
                        <th>Slatkoca</th>
                        <th>Arome</th>
                        <th>Tijelo</th>
                        <th>Alkohol</th>
                    </tr>
                </thead>
                <tbody>
                    {vina && vina.map((vina)=>(   
                    <tr>
                        <td>{vina.naziv}</td>
                        <td>{vina.tip}</td>                            
                        <td>{vina.drzava}</td>
                        <td>{vina.regija}</td>
                        <td>{vina.jacina}</td>
                        <td>{vina.temperatura}</td>
                        <td>{vina.slatkoca}</td>
                        <td>{vina.arome}</td>
                        <td>{vina.tijelo}</td>
                        <td>{vina.alkohol}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </>
    )
}