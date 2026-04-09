import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { vina } from "../../services/vina/VinaPopis";
import { sirevi } from "../../services/sirevi/SireviPopis";
import { uparivanjeVinaById } from "../../services/uparivanje/UparivanjeVinaPopis";
import UparivanjeCustomService from "../../services/uparivanje/UparivanjeCustomService";

export default function UparivanjePregled() {
    const [uparivanja, setUparivanja] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        ucitajUparivanja();
    }, []);

    // Učitaj statička + custom uparivanja
    async function ucitajUparivanja() {
        // 1. Statička uparivanja
        const staticka = Object.entries(uparivanjeVinaById).flatMap(([vinoId, sireviIds]) =>
            sireviIds.map(sirId => ({ vinoId: Number(vinoId), sirId }))
        );

        // 2. Custom uparivanja iz frontend liste (simulacija baze)
        const customResponse = await UparivanjeCustomService.get();
        const custom = customResponse.data || [];

        // 3. Spoji oba izvora
        setUparivanja([...staticka, ...custom]);
    }

    // Dohvati sireve za pojedino vino
    function dohvatiSireveZaVino(vinoId) {
        const idjevi = uparivanja
            .filter(u => u.vinoId === vinoId)
            .map(u => u.sirId);

        const lista = sirevi
            .filter(s => idjevi.includes(s.id))
            .map(s => s.naziv);

        return lista.length > 0 ? lista.join(", ") : "Nema preporuke";
    }

   
    async function obrisiVino(id) {
        if (!confirm("Sigurno obrisati?")) return;

        await UparivanjeCustomService.postavi(
            (await UparivanjeCustomService.get()).data.filter(u => u.vinoId !== id)
        );

        ucitajUparivanja();
    }

    
    async function azurirajUparivanje(vinoId, noviSireviIds) {
        // 1. Dohvati trenutna custom uparivanja
        const customResponse = await UparivanjeCustomService.get();
        let custom = customResponse.data || [];

        // 2. Ukloni sve custom uparivanja za ovo vino
        custom = custom.filter(u => u.vinoId !== vinoId);

        // 3. Dodaj nove selektirane sireve
        const noviCustom = noviSireviIds.map(sirId => ({ vinoId, sirId }));
        custom = [...custom, ...noviCustom];

        // 4. Spremi u memoriju
        await UparivanjeCustomService.postavi(custom);

        // 5. Osvježi lokalni state
        ucitajUparivanja();
    }

    return (
        <div className="mt-4">
            <Table bordered striped hover>
                <thead>
                    <tr>
                        <th>Vino</th>
                        <th>Preporučeni sirevi</th>
                        <th>Temperatura</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {vina.map((vino, index) => (
                        <tr key={vino.id + "_" + index}>
                            <td>{vino.naziv}</td>
                            <td>{dohvatiSireveZaVino(vino.id)}</td>
                            <td>{vino.temperatura}</td>
                            <td>
                                <div className="d-flex gap-2">
                                    <Button
                                        onClick={() => navigate(`/uparivanje/${vino.id}`)}
                                        variant="warning"
                                        size="sm"
                                    >
                                        Promjena
                                    </Button>
                                    <Button
                                        onClick={() => obrisiVino(vino.id)}
                                        variant="danger"
                                        size="sm"
                                    >
                                        Obriši
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}