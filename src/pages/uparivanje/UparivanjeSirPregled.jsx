import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import VinaService from "../../services/vina/VinaService";
import SireviService from "../../services/sirevi/SireviService";
import UparivanjeCustomService from "../../services/uparivanje/UparivanjeCustomService";
import { uparivanjeSirevaById } from "../../services/uparivanje/UparivanjeSirevaPopis";

export default function UparivanjeSirPregled() {

    const [vina, setVina] = useState([]);
    const [sirevi, setSirevi] = useState([]);
    const [custom, setCustom] = useState([]);    
    const [pojam, setPojam] = useState('')

    const navigate = useNavigate();

    useEffect(() => {
        ucitaj()        

    }, [])

    const filtriraniSirevi = sirevi.filter(s => {
        const p = pojam.toLowerCase();

        const vinaText = getVina(s.id).toLowerCase();

        return (
            s.naziv?.toLowerCase().includes(p) ||
            vinaText.includes(p)
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

    function getVina(sirId) {

        const customIds = custom
            .filter(u => u.sirId === sirId)
            .map(u => u.vinoId);

        const statickiIds = uparivanjeSireviById[sirId] || [];

        const customZaSir = custom.filter(u => u.sirId === sirId);

        // ako postoji bilo kakav custom zapis za to vino → koristi ga
        // čak i ako je prazan (to znači "nema preporuke")
        const ids = customZaSir.length > 0
            ? customZaSir.map(u => u.vinoId)
            : statickiIds;

        const lista = vina
            .filter(v => ids.includes(v.id))
            .map(v => v.naziv);

        return lista.length ? lista.join(", ") : "-nema preporuke-";
    }

    // DOHVAT OBJEKATA SIREVA
    function getVinaObjekti(sirId) {

        const customZaSir = custom.filter(u => u.sirId === sirId)

        const ids = customZaSir.length > 0
            ? customZaSir.map(u => u.vinoId)
            : (uparivanjeSirevaById[sirId] || [])

        return vina.filter(v => ids.includes(v.id))
    }

    function obrisi(sirId) {
        if (!confirm("Sigurno obrisati?")) return;
        setSirevi(prev => prev.filter(s => s.id !== sirId));
    }

    let poruka;

    if (sirevi.length === 0) {
        poruka = "Nema učitanih vina - stoga nema ni uparivanja";
    } else {
        const brojUspjesnih = sirevi.filter(s =>
            getVina(s.id) !== "-nema preporuke-"
        ).length;

        const opis = brojUspjesnih === sirevi.length ? "svih" : "samo";

        poruka = (
            <>
                Učitano ukupno <strong>{sirevi.length}</strong> sireva - i uspješno upareno {opis} <strong>{brojUspjesnih}</strong>.
            </>
        );
    }

    return (
        <div className="mt-4">
            <div className="d-flex justify-content-end mb-3 mt-3">
                <input
                    type="text"
                    placeholder="Traži sir ili vino..."
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
                        <th>Sirevi</th>
                        <th>Preporučena vina</th>
                        <th className="text-center">Ocjena</th>
                        <th className="text-center">Akcija</th>
                    </tr>
                </thead>

                <tbody>
                    {filtriraniSirevi.map(sir => (
                        <tr key={sir.id}>
                            <td>{sir.naziv}</td>
                            <td>{getVina(sir.id)}</td>
                            

                                    return (
                                 
                                    
                                
                           
                            <td style={{ whiteSpace: "nowrap" }}>
                                <div className="d-flex justify-content-center gap-2">

                                    <Button
                                        variant="warning"
                                        size="sm"
                                        onClick={() => navigate(`/uparivanje/${vino.id}`)}
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