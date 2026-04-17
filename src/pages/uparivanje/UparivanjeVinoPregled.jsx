import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import VinaService from "../../services/vina/VinaService";
import SireviService from "../../services/sirevi/SireviService";
import UparivanjeCustomService from "../../services/uparivanje/UparivanjeCustomService";
import { uparivanjeVinaById } from "../../services/uparivanje/UparivanjeVinaPopis";

export default function UparivanjeVinoPregled() {

    const [vina, setVina] = useState([]);
    const [sirevi, setSirevi] = useState([]);
    const [custom, setCustom] = useState([]);
    const [pojam, setPojam] = useState('')

    const navigate = useNavigate();

    useEffect(() => {
        ucitaj()

    }, [])

    const filtriranaVina = vina.filter(v => {
        const p = pojam.toLowerCase();

        const sireviText = getSirevi(v.id).toLowerCase();

        return (
            v.naziv?.toLowerCase().includes(p) ||
            sireviText.includes(p)
        );
    });
    async function ucitaj() {
        const v = await VinaService.get();
        const s = await SireviService.get();
        const c = await UparivanjeCustomService.get();

        setVina(v.data || []);
        setSirevi(s.data || []);
        setCustom(c.data || []);
    }

    function getSirevi(vinoId) {

        const customIds = custom
            .filter(u => u.vinoId === vinoId)
            .map(u => u.sirId);

        const statickiIds = uparivanjeVinaById[vinoId] || [];

        const customZaVino = custom.filter(u => u.vinoId === vinoId);

        // ako postoji bilo kakav custom zapis za to vino → koristi ga
        // čak i ako je prazan (to znači "nema preporuke")
        const ids = customZaVino.length > 0
            ? customZaVino.map(u => u.sirId)
            : statickiIds;

        const lista = sirevi
            .filter(s => ids.includes(s.id))
            .map(s => s.naziv);

        return lista.length ? lista.join(", ") : "-nema preporuke-";
    }

    // DOHVAT OBJEKATA SIREVA
    function getSireviObjekti(vinoId) {

        const customZaVino = custom.filter(u => u.vinoId === vinoId)

        const ids = customZaVino.length > 0
            ? customZaVino.map(u => u.sirId)
            : (uparivanjeVinaById[vinoId] || [])

        return sirevi.filter(s => ids.includes(s.id))
    }


    function getScore(vino, sirevi) {

        let score = 0

        sirevi.forEach(sir => {

            // TANINI vs MASNOĆA (crna vina)
            if (vino.tip_id === 1 && sir.tip_id === 3) score += 2   // tvrdi
            if (vino.tip_id === 1 && sir.tip_id === 1) score -= 1   // svježi

            // BIJELA vs SVJEŽI
            if (vino.tip_id === 2 && sir.intezitet_id === 1) score += 2
            if (vino.tip_id === 2 && sir.intezitet_id === 3) score -= 1

            // SLATKO vs PLAVI
            if (vino.slatkoca_id === 4 && sir.tip_id === 4) score += 3
            if (vino.slatkoca_id === 1 && sir.tip_id === 4) score -= 2

            // BODY MATCH
            if (vino.tijelo_id === 3 && sir.intezitet_id === 3) score += 2
            if (vino.tijelo_id === 1 && sir.intezitet_id === 3) score -= 2

            // ALKOHOL vs JAČINA
            const alkohol = (vino.alkohol_min + vino.alkohol_max) / 2
            if (alkohol > 14 && sir.intezitet_id === 3) score += 1
            if (alkohol < 10 && sir.intezitet_id === 3) score -= 1

            // PJENUŠAVO vs KREMASTO
            if (vino.tip_id === 3 && sir.tip_id === 1) score += 1

            // FORTIFIED vs OSTALO
            if (vino.tip_id === 4 && sir.tip_id !== 4) score -= 1

        })

        return score
    }


    //  OCJENA A/B/C
    function getOcjena(vino, sirevi) {

        const score = getScore(vino, sirevi)

        //if (varijanta === 0) {
        if (score >= 6) return "A"
        if (score >= 2) return "B"
        return "C"
        //}
    }


    function obrisi(vinoId) {
        if (!confirm("Sigurno obrisati?")) return;
        setVina(prev => prev.filter(v => v.id !== vinoId));
    }

    let poruka;

    if (vina.length === 0) {
        poruka = "Nema učitanih vina - stoga nema ni uparivanja";
    } else {
        const brojUspjesnih = vina.filter(v =>
            getSirevi(v.id) !== "-nema preporuke-"
        ).length;

        const opis = brojUspjesnih === vina.length ? "svih" : "samo";

        poruka = (
            <>
                Učitano ukupno <strong>{vina.length}</strong> vina - i uspješno upareno {opis} <strong>{brojUspjesnih}</strong>.
            </>
        );
    }

    return (
        <div className="mt-4">
            <div className="d-flex justify-content-end mb-3 mt-3">
                <input
                    type="text"
                    placeholder="Traži vino ili sir..."
                    className="form-control w-25"
                    style={{
                        backgroundColor: "lightgrey",
                        border: "2px solid grey"
                    }}
                    value={pojam}
                    onChange={(e) => setPojam(e.target.value)}
                />
            </div>

            <Table className="align-middle" bordered striped hover>
                <thead>
                    <tr>
                        <th style={{ width: "25%" }}>Vino</th>
                        <th style={{ width: "45%" }}>Preporučeni sirevi</th>
                        <th style={{ width: "10%" }}>Ocjena</th>
                        <th style={{ width: "15%", textAlign: "center" }}>Akcija</th>
                    </tr>
                </thead>

                <tbody>
                    {filtriranaVina.map(vino => (
                        <tr key={vino.id}>
                            <td>{vino.naziv}</td>
                            <td>{getSirevi(vino.id)}</td>
                            <td className="text-center">
                                {(() => {
                                    const ocjena = getOcjena(vino, getSireviObjekti(vino.id))
                                    //const [slovo, emoji] = ocjena.split(" ")

                                    return (
                                        <span
                                            className="badge bg-primary px-3 py-2"
                                            style={{
                                                fontSize: "1.4rem",
                                                borderRadius: "6px",
                                                fontStyle: "normal",
                                                minWidth: "60px",
                                                display: "inline-block",
                                                textAlign: "center",
                                                color:
                                                    ocjena === "A" ? "lime" :
                                                        ocjena === "B" ? "darkorange" :
                                                            "darkblue",
                                            }}
                                        >
                                            {ocjena}

                                            {/* {slovo}{" "}
                                            <span style={{ fontSize: "1.4rem", fontStyle: "normal" }}>
                                                {emoji}
                                            </span> */}
                                        </span>
                                    )
                                })()}
                            </td>
                            <td style={{ whiteSpace: "nowrap" }}>
                                <div className="d-flex justify-content-center gap-2">

                                    <Button
                                        variant="warning"
                                        size="sm"
                                        onClick={() => navigate(`/uparivanje/vino/${vino.id}`, {
                                            state: { from: "uparivanje" }
                                        })}
                                    >
                                        Promjena
                                    </Button>

                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => obrisi(vino.id)}
                                    >
                                        Obriši
                                    </Button>

                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </Table>
            <p className="mt-2 mb-0 text-muted">
                {poruka}
            </p>
        </div>
    );
}