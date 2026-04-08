import { useEffect, useState } from "react";
import VinaService from "../../services/vina/VinaService";
import SireviService from "../../services/sirevi/SireviService";
import { uparivanjeVinaById } from "../../services/uparivanje/UparivanjeVinaPopis";

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

    return (
        <>
            <h2>Uparivanja (vino → sir)</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Vino</th>
                        <th>Preporučeni sirevi</th>
                    </tr>
                </thead>
                <tbody>
                    {vina.map(vino => (
                        <tr key={vino.id}>
                            <td>{vino.naziv}</td>
                            <td>{dohvatiSireveZaVino(vino.id)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </>
    );
}