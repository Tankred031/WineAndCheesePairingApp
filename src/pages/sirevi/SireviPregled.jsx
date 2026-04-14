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

    const TIPOVI = [
        { id: 1, naziv: "svježi" },
        { id: 2, naziv: "polutvrdi" },
        { id: 3, naziv: "tvrdi" },
        { id: 4, naziv: "plavi" },
        { id: 5, naziv: "ekstra tvrdi" }
    ]

    const ZRENJA = [
        { id: 1, naziv: "mladi" },
        { id: 2, naziv: "srednje zreli" },
        { id: 3, naziv: "dugo zreli" }
    ]

    const INTEZITETI = [
        { id: 1, naziv: "blagi" },
        { id: 2, naziv: "srednji" },
        { id: 3, naziv: "jaki" }
    ]



    function getVrstaNaziv(id) {
        return VRSTE.find(v => v.id === id)?.naziv || ''
    }

    function getMasnocaNaziv(id) {
        return MASNOCE.find(m => m.id === id)?.naziv || ''
    }

    function getTipNaziv(id) {
        return TIPOVI.find(t => t.id === id)?.naziv || ''
    }

    function getZrenjeNaziv(id) {
        return ZRENJA.find(z => z.id === id)?.naziv || ''
    }

    function getIntezitetNaziv(id) {
        return INTEZITETI.find(i => i.id === id)?.naziv || ''
    }

    useEffect(() => {
        ucitajSirevi()
    }, [])

    const filtriraniSirevi = sirevi.filter(s => {
        const p = pojam.toLowerCase()

        return (
            s.naziv?.toLowerCase().includes(p) ||
            getTipNaziv(s.tip_id)?.toLowerCase().includes(p) ||
            getVrstaNaziv(s.vrsta_id)?.toLowerCase().includes(p) ||
            getZrenjeNaziv(s.zrenje_id)?.toLowerCase().includes(p) ||
            s.regija?.toLowerCase().includes(p) ||
            getIntezitetNaziv(s.intezitet_id)?.toLowerCase().includes(p) ||
            getMasnocaNaziv(s.masnoca_id)?.toLowerCase().includes(p) ||
            s.okus?.toLowerCase().includes(p)
        )
    })

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
                    style={{
                        backgroundColor: "lightgrey",
                        border: "2px solid grey"
                    }}
                    value={pojam}
                    onChange={(e) => setPojam(e.target.value)}
                />
            </div>
            <div className="mt-4">
                <Table bordered striped hover className="align-middle">
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
                                <td>{getTipNaziv(sirevi.tip_id)}</td>
                                <td>{getVrstaNaziv(sirevi.vrsta_id)}</td>
                                <td>{getZrenjeNaziv(sirevi.zrenje_id)}</td>
                                <td>{sirevi.regija}</td>
                                <td>{getIntezitetNaziv(sirevi.intezitet_id)}</td>
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
                                        &nbsp;
                                        <Button
                                            variant="info"
                                            size="sm"
                                            onClick={() => navigate(`/uparivanje/sir/${sir.id}`)}
                                        >
                                            Uparivanje
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

