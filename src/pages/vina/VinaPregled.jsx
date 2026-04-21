import { useEffect, useState } from "react"
import VinaService from "../../services/vina/VinaService"
import { Button, Table } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { RouteNames } from "../../constants"
import useBreakpoint from "../../hooks/useBreakpoint"
import VinaPregledGrid from "./VinaPregledGrid"
import VinaPregledTablica from "./VinaPregledTablica"
import { generirajVinaPDF } from "../../components/VinaPDFGenerator"


export default function VinaPregled() {

    const navigate = useNavigate()
    const [vina, setVina] = useState([])
    const [pojam, setPojam] = useState('')
    const sirina = useBreakpoint()

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

            <div className="d-flex justify-content-between align-items-center mb-3 mt-3 w-100">

                <h4 className="section-title">Popis vina</h4>

                <div className="d-flex gap-2 w-50 justify-content-end">
                    <Button
                        variant="light"
                        style={{ color: 'crimson', fontWeight: 'bold', border: '1px solid lightgrey'}}                        
                        onClick={() => generirajVinaPDF(filtriranaVina, {
                            getTipNaziv, 
                            getSlatkocaNaziv, 
                            format1dec
                        })}
                    >
                        Generiraj PDF
                    </Button>

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
            </div>



                {/* tableti prema manje */}
                {['xs', 'sm', 'md'].includes(sirina) ? (
                    <VinaPregledGrid
                        vina={filtriranaVina}
                        navigate={navigate}
                        obrisi={obrisi}
                    />
                ) : (
                    <VinaPregledTablica
                        vina={filtriranaVina}
                        navigate={navigate}
                        obrisi={obrisi}
                    />
                )}

                <p className="mt-2">
                    {vina.length === 0
                        ? "Nema učitanih vina"
                        : <>Učitano ukupno <strong>{vina.length}</strong> vina</>}
                </p>


            </>
            )
}