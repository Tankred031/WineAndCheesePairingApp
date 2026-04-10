import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import VinaService from "../../services/vina/VinaService";
import SireviService from "../../services/sirevi/SireviService";
import UparivanjeCustomService from "../../services/uparivanje/UparivanjeCustomService";
import { uparivanjeVinaById } from "../../services/uparivanje/UparivanjeVinaPopis";

export default function UparivanjePregled() {

    const [vina, setVina] = useState([]);
    const [sirevi, setSirevi] = useState([]);
    const [custom, setCustom] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        ucitaj();
    }, []);

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

        const ids = customIds.length > 0 ? customIds : statickiIds;

        const lista = sirevi
            .filter(s => ids.includes(s.id))
            .map(s => s.naziv);

        return lista.length ? lista.join(", ") : "Nema preporuke";
    }

    async function obrisi(vinoId) {
        if (!confirm("Sigurno obrisati?")) return;

        const novi = custom.filter(u => u.vinoId !== vinoId);

        await UparivanjeCustomService.postavi(novi);

        setCustom(novi);
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
                    {vina.map(vino => (
                        <tr key={vino.id}>
                            <td>{vino.naziv}</td>
                            <td>{getSirevi(vino.id)}</td>
                            <td>{vino.temperatura}</td>
                            <td>
                                <div className="d-flex gap-2">

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

        </div>
    );
}