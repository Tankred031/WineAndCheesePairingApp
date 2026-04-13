import { useEffect, useState } from "react"
import SireviService from "../../services/sirevi/SireviService"
import { Button, Table } from "react-bootstrap"
import { useNavigate } from "react-router-dom"


export default function SireviPregled() {

    const navigate = useNavigate()
    const [sirevi, setSirevi] = useState([])
    const [pojam, setPojam] = useState('')

    const VRSTE = [
        { id: 1, naziv: "kravlji" },
        { id: 2, naziv: "ovčji" },
        { id: 3, naziv: "kozji" },
        { id: 4, naziv: "miješano" }
    ]

    const MASNOCE = [
        { id: 1, naziv: "niske" },
        { id: 2, naziv: "srednje" },
        { id: 3, naziv: "visoke" }
    ]

    const filtriraniSirevi = sirevi.filter(s =>
    s.naziv?.toLowerCase().includes(pojam.toLowerCase()) ||
    s.tip?.toLowerCase().includes(pojam.toLowerCase()) ||
    getVrstaNaziv(s.vrsta_id)?.toLowerCase().includes(pojam.toLowerCase()) ||
    s.regija?.toLowerCase().includes(pojam.toLowerCase()) ||
    s.intezitet?.toLowerCase().includes(pojam.toLowerCase()) ||
    s.zrenje?.toLowerCase().includes(pojam.toLowerCase()) ||
    getMasnocaNaziv(s.masnoca_id)?.toLowerCase().includes(pojam.toLowerCase()) ||
    s.okus?.toLowerCase().includes(pojam.toLowerCase())
);

    function getVrstaNaziv(id) {
        return VRSTE.find(v => v.id === id)?.naziv || ''
    }

    function getMasnocaNaziv(id) {
        return MASNOCE.find(m => m.id === id)?.naziv || ''
    }

    useEffect(() => {
        ucitajSirevi()
    }, [])

    async function ucitajSirevi() {
        await SireviService.get().then((odgovor) => {

            if (!odgovor.success) {
                alert('Nije implementiran servis')
                return
            }
            setSirevi(odgovor.data)
        })
    }

    async function obrisi(id) {
        if (!confirm('Sigurno obrisati?')) {
            return
        }
        await SireviService.obrisi(id)
        ucitajSirevi()
    }

    return (
        <>
            <div className="d-flex justify-content-end mb-3 mt-3">
                <input
                    type="text"
                    placeholder="Traži sir..."
                    className="form-control w-25"
                    style={{ backgroundColor: "lightgrey" }}
                    value={pojam}
                    onChange={(e) => setPojam(e.target.value)}
                />
            </div>
            <div className="mt-4">
                <Table bordered striped hover>
                    <thead>
                        <tr>
                            <th>Naziv</th>
                            <th>Tip</th>
                            <th>Vrsta</th>
                            <th>Zrenje</th>
                            <th>Regija</th>
                            <th>Intezitet</th>
                            <th>Masnoća</th>
                            <th>Okus</th>
                            <th style={{ textAlign: "center" }}>Akcija</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtriraniSirevi && filtriraniSirevi.map((sirevi) => (
                            <tr key={sirevi.id}>
                                <td>{sirevi.naziv}</td>
                                <td>{sirevi.tip}</td>
                                <td>{getVrstaNaziv(sirevi.vrsta_id)}</td>
                                <td>{sirevi.zrenje}</td>
                                <td>{sirevi.regija}</td>
                                <td>{sirevi.intezitet}</td>
                                <td>{getMasnocaNaziv(sirevi.masnoca_id)}</td>
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
            <p className="mt-2">
                {sirevi.length === 0
                    ? "Nema učitanih vina"
                    : <>Učitano ukupno <strong>{sirevi.length}</strong> sireva</>}
            </p>
        </>
    )
}