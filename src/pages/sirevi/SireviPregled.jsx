import { useEffect, useState } from "react"
import SireviService from "../../services/sirevi/SireviService"
import { useNavigate } from "react-router-dom"
import useBreakpoint from "../../hooks/useBreakpoint"
import SireviPregledGrid from "./SireviPregledGrid"
import SireviPregledTablica from "./SireviPregledTablica"

export default function SireviPregled() {

    const navigate = useNavigate()
    const sirina = useBreakpoint()

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

    async function ucitajSirevi() {
        const odgovor = await SireviService.get()

        if (!odgovor.success) {
            alert('Nije implementiran servis')
            return
        }

        setSirevi(odgovor.data)
    }

    async function obrisi(id) {
        if (!confirm('Sigurno obrisati?')) return
        await SireviService.obrisi(id)
        ucitajSirevi()
    }

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

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-3 mt-3 w-100">

                <h4 className="mb-0">Popis sireva</h4>

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

            {/* 🔥 RWD */}
            {['xs', 'sm', 'md'].includes(sirina) ? (
                <SireviPregledGrid
                    sirevi={filtriraniSirevi}
                    navigate={navigate}
                    obrisi={obrisi}
                />
            ) : (
                <SireviPregledTablica
                    sirevi={filtriraniSirevi}
                    navigate={navigate}
                    obrisi={obrisi}
                />
            )}

            <p className="mt-2">
                {sirevi.length === 0
                    ? "Nema učitanih sireva"
                    : <>Učitano ukupno <strong>{sirevi.length}</strong> sireva</>}
            </p>
        </>
    )
}