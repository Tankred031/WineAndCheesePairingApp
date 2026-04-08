import { useEffect, useState } from "react";
import VinaService from "../../services/vina/VinaService";
import SireviService from "../../services/sirevi/SireviService";
import UparivanjeCustomService from "../../services/uparivanje/UparivanjeCustomService";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";

export default function UparivanjeNovi() {

    const [vina, setVina] = useState([]);
    const [sirevi, setSirevi] = useState([]);

    const [vinoId, setVinoId] = useState("");
    const [sirId, setSirId] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        ucitaj();
    }, []);

    async function ucitaj() {
        const v = await VinaService.get();
        const s = await SireviService.get();

        setVina(v.data);
        setSirevi(s.data);
    }

    async function dodaj() {

        if (!vinoId || !sirId) {
            alert("Odaberi vino i sir");
            return;
        }

        await UparivanjeCustomService.dodaj({
            vinoId: Number(vinoId),
            sirId: Number(sirId)
        });

        navigate(RouteNames.UPARIVANJE_PREGLED);
    }

    return (
        <>
            <h2>Novo uparivanje</h2>

            <div className="mb-3">
                <label>Vino</label>
                <select 
                    className="form-control"
                    onChange={(e) => setVinoId(e.target.value)}
                >
                    <option value="">-- odaberi vino --</option>
                    {vina.map(v => (
                        <option key={v.id} value={v.id}>{v.naziv}</option>
                    ))}
                </select>
            </div>

            <div className="mb-3">
                <label>Sir</label>
                <select 
                    className="form-control"
                    onChange={(e) => setSirId(e.target.value)}
                >
                    <option value="">-- odaberi sir --</option>
                    {sirevi.map(s => (
                        <option key={s.id} value={s.id}>{s.naziv}</option>
                    ))}
                </select>
            </div>

            <Button onClick={dodaj} variant="success">
                Dodaj novo uparivanje
            </Button>
        </>
    );
}