import { useEffect, useState } from "react"
import VinaService from "../../services/vina/VinaService"
import { Button, Table } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"


export default function VinaPregled() {

    const navigate = useNavigate()
    const [vina, setVina] = useState([])
    const [pojam, setPojam] = useState('')

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

    const filtriranaVina = vina.filter(v => {
        const pojamLower = pojam.toLowerCase();

        // pretvora unos u broj (zbog alkohola)
        const broj = parseFloat(pojam.replace(',', '.'));
        const jeBroj = !isNaN(broj);

        return (
            // pretraga teksta
            v.naziv?.toLowerCase().includes(pojamLower) ||
            getTipNaziv(v.tip_id)?.toLowerCase().includes(pojamLower) ||
            v.regija?.toLowerCase().includes(pojamLower) ||
            getSlatkocaNaziv(v.slatkoca_id)?.toLowerCase().includes(pojamLower) ||
            v.arome?.toLowerCase().includes(pojamLower) ||
            v.tijelo?.toLowerCase().includes(pojamLower) ||

            // pretraga broja - alkohol
            (jeBroj &&
                broj >= v.alkohol_min &&
                broj <= v.alkohol_max)
        );
    });

    function format1dec(broj) {
        return Number(broj).toLocaleString("hr-HR", {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1
        })
    }
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

            <div className="d-flex justify-content-end mb-3 mt-2">
                <input
                    type="text"
                    placeholder="Traži vino..."
                    className="form-control w-25"
                    style={{
                        backgroundColor: "lightgrey",
                        border: "2px solid grey"
                    }}
                    value={pojam}
                    onChange={(e) => setPojam(e.target.value)}
                />
            </div>

            <Table bordered striped hover className="align-middle">
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
                        <th style={{ textAlign: "center" }}>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {filtriranaVina && filtriranaVina.map((vina) => (
                        <tr key={vina.id}>
                            <td>{vina.naziv}</td>
                            <td>{getTipNaziv(vina.tip_id)}</td>
                            <td>{vina.regija}</td>
                            <td>
                                {format1dec(vina.temperatura_min)} - {format1dec(vina.temperatura_max)} °C
                            </td>
                            <td>{getSlatkocaNaziv(vina.slatkoca_id)}</td>
                            <td>{vina.arome}</td>
                            <td>{vina.tijelo}</td>
                            <td>
                                {format1dec(vina.alkohol_min)} - {format1dec(vina.alkohol_max)} %
                            </td>
                            <td>
                                <div className="d-flex gap-1">
                                    <Button onClick={() => { navigate(`/vina/${vina.id}`) }} variant="warning" size="sm">
                                        Promjena
                                    </Button>
                                    &nbsp;
                                    <Button onClick={() => { obrisi(vina.id) }} variant="danger" size="sm">
                                        Obriši
                                    </Button>
                                    &nbsp;
                                    <Button
                                        variant="info"
                                        size="sm"
                                        onClick={() => navigate(`/uparivanje/vino/${vina.id}`)}
                                    >
                                        Uparivanje
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <p className="mt-2">
                {vina.length === 0
                    ? "Nema učitanih vina"
                    : <>Učitano ukupno <strong>{vina.length}</strong> vina</>}
            </p>
        </>
    )
}