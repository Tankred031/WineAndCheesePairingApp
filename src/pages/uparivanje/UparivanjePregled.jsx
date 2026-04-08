import { useEffect, useState } from "react";
import VinaService from "../../services/vina/VinaService";
import SireviService from "../../services/sirevi/SireviService";
import { uparivanjeVinaById } from "../../services/uparivanje/UparivanjeVinaPopis";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function UparivanjePregled() {
    const [vina, setVina] = useState([]);
    const [sirevi, setSirevi] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await ucitajVina();
            await ucitajSirevi();
        };
        fetchData();
    }, []);

    async function ucitajVina() {
        const response = await VinaService.get();
        if (response.success) setVina(response.data);
    }

    async function ucitajSirevi() {
        const response = await SireviService.get();
        if (response.success) setSirevi(response.data);
    }


    function dohvatiSireveZaVino(vinoId) {
        const idjevi = uparivanjeVinaById[vinoId] || []

        const lista = sirevi
            .filter(s => idjevi.includes(s.id))
            .map(s => s.naziv)

        return lista.length > 0 ? lista.join(", ") : "Nema preporuke"
    }

    const navigate = useNavigate()

    async function obrisi(id) {
        if (!confirm("Sigurno obrisati?")) {
            return
        }

        await VinaService.obrisi(id)
        ucitajVina()
    }

    return (
        <>
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
                                <td>{dohvatiSireveZaVino(vino.id)}</td>
                                <td>{vino.temperatura}</td>
                                <td>
                                    <div className="d-flex gap-2">
                                        <Button onClick={() => { navigate(`/uparivanje/${vino.id}`) }} variant="warning" size="sm">
                                            Promjena
                                        </Button>
                                        &nbsp;
                                        <Button onClick={() => { obrisi(vino.id) }} variant="danger" size="sm">
                                            Obriši
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    );
}