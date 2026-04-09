import { useEffect, useState } from "react";
import VinaService from "../../services/vina/VinaService";
import SireviService from "../../services/sirevi/SireviService";
import UparivanjeCustomService from "../../services/uparivanje/UparivanjeCustomService";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export default function UparivanjePregled() {
    const [vina, setVina] = useState([]);
    const [sirevi, setSirevi] = useState([]);
    const [uparivanja, setUparivanja] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            await ucitajVina();
            await ucitajSirevi();
            await ucitajUparivanja();
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
    //console.log("----");
    //console.log("vinoId:", vinoId);
    console.log("uparivanja FULL:", JSON.stringify(uparivanja, null, 2));
    //console.log("uparivanja:", uparivanja);
    //console.log("sirevi:", sirevi);

    const idjevi = uparivanja
        .filter(u => {
            //console.log("usporedba vinoId:", u.vinoId, vinoId);
            return Number(u.vinoId) === Number(vinoId);
        })
        .map(u => {
            //console.log("sirId iz uparivanja:", u.sirId);
            return u.sirId;
        });

    //console.log("IDJEVI:", idjevi);

    const lista = sirevi
        .filter(s => {
            //console.log("provjera sira:", s.id, idjevi);
            return idjevi.includes(s.id);
        })
        .map(s => s.naziv);

    //console.log("REZULTAT:", lista);

    return lista.length > 0 ? lista.join(", ") : "Nema preporuke";
}

    async function ucitajUparivanja() {
        const response = await UparivanjeCustomService.get();
        //console.log("RAW response:", response);
        if (response.success) setUparivanja(response.data);
       //console.log("uparivanja data:", response.data);
    }


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
                        {vina.map((vino, index) => (
                            <tr key={vino.id + "_" + index}>
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