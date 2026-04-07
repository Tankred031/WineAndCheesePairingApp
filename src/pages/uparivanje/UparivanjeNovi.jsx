import { useEffect, useState } from "react";
import VinaService from "../../services/vina/VinaService";
import SireviService from "../../services/sirevi/SireviService";

export default function Uparivanje() {
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

    return (
        <>
            <div>
                <h2>Vina</h2>
                <ul>
                    {vina.map(vino => (
                        <li key={vino.id}>{vino.naziv}</li>
                    ))}
                </ul>

                <h2>Sirevi</h2>
                <ul>
                    {sirevi.map(sir => (
                        <li key={sir.id}>{sir.naziv}</li>
                    ))}
                </ul>
            </div>

            Ovdje će uparivanje
        </>
    );
}