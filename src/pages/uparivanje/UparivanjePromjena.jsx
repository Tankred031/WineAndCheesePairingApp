import { useEffect, useState } from "react";
import VinaService from "../../services/vina/VinaService";
import SireviService from "../../services/sirevi/SireviService";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import { uparivanjeVinaById } from "../../services/uparivanje/UparivanjeVinaPopis";
import UparivanjeCustomService from "../../services/uparivanje/UparivanjeCustomService";
import { Button, Form } from "react-bootstrap";

export default function UparivanjePromjena() {
    const [vino, setVino] = useState({});
    const [sirevi, setSirevi] = useState([]);
    const [odabraniSirevi, setOdabraniSirevi] = useState([]);

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        ucitaj();
    }, []);

    
    async function ucitaj() {

        //default
        const vinoId = Number(params.id);

        //učitaj vino i sireve
        const v = await VinaService.getById(vinoId);
        const s = await SireviService.get()

        setVino(v.data);
        setSirevi(s.data || []);

        const statickaIds = uparivanjeVinaById[vinoId] || [];

        //custom
        const customResponse = await UparivanjeCustomService.get();
        const custom = customResponse.data || [];

        const customIds = custom
            .filter(u => u.vinoId === vinoId)
            .map(u => u.sirId);

        // Kombiniraj statička + custom uparivanja
        const finalIds = customIds.length > 0
            ? customIds
            : statickaIds;

        setOdabraniSirevi(finalIds)
    }


    function toggleSir(id) {
        if (odabraniSirevi.includes(id)) {
            setOdabraniSirevi(odabraniSirevi.filter(s => s !== id));
        } else {
            setOdabraniSirevi([...odabraniSirevi, id]);
        }
    }

    async function spremi(e) {
        e.preventDefault();

        const vinoId = Number(params.id);

        // Dohvati trenutna custom uparivanja
        const svi = (await UparivanjeCustomService.get()).data || [];

        // Zadrži custom uparivanja za ostala vina
        const ostali = svi.filter(u => u.vinoId !== vinoId);

        // Kreiraj nova custom uparivanja za ovo vino
        const novi = odabraniSirevi.length > 0
            ? odabraniSirevi.map(sirId => ({
                id: `${Date.now()}_${sirId}`,
                vinoId,
                sirId
            }))
            : [{
                id: `${Date.now()}_empty`,
                vinoId,
                sirId: null,
                empty: true
            }];

        // Spremi sve zajedno u memoriju
        await UparivanjeCustomService.postavi([...ostali, ...novi]);

        // Log za provjeru
        const test = await UparivanjeCustomService.get();
        console.log("NAKON SPREMANJA:", test);

        // Navigiraj nazad na pregled
        navigate(RouteNames.UPARIVANJE_PREGLED);
    }

    return (
        <>
            <h3 className="naslov">Izmjena uparivanja vino-sirevi</h3>

            <Form onSubmit={spremi}>
                <h4>{vino.naziv}</h4>

                {sirevi.map(s => (
                    <div key={s.id}>
                        <input
                            type="checkbox"
                            checked={odabraniSirevi.includes(s.id)}
                            onChange={() => toggleSir(s.id)}
                        />
                        <label className="ms-2">{s.naziv}</label>
                    </div>
                ))}

                <hr />
                <div className="d-flex gap-2">
                    <Button type="submit" variant="success" size="sm" className="flex-fill">
                        Spremi
                    </Button>

                    <Button
                        as={Link}
                        to={RouteNames.UPARIVANJE_PREGLED}
                        variant="danger"
                        size="sm"
                        className="flex-fill"
                    >
                        Odustani
                    </Button>
                </div>
            </Form>
        </>
    );
}

