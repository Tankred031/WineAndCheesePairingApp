import { useEffect, useState } from "react";
import VinaService from "../../services/vina/VinaService";
import SireviService from "../../services/sirevi/SireviService";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import { uparivanjeSiraById } from "../../services/uparivanje/UparivanjeSiraPopis";
import UparivanjeCustomService from "../../services/uparivanje/UparivanjeCustomService";
import { Button, Form } from "react-bootstrap";

export default function UparivanjeSirPromjena() {

    const [sir, setSir] = useState({});
    const [vina, setVina] = useState([]);
    const [odabranaVina, setOdabranaVina] = useState([]);
    const [filter, setFilter] = useState("");

    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from;

    useEffect(() => {
        ucitaj();
    }, []);


    async function ucitaj() {

        //default
        const sirId = Number(params.id);

        //učitaj vino i sireve
        const s = await SireviService.getById(sirId);
        const v = await VinaService.get()

        setSir(s.data);
        setVina(v.data || []);

        const statickaIds = uparivanjeSiraById[sirId] || [];

        //custom
        const customResponse = await UparivanjeCustomService.get();
        const custom = customResponse.data || [];

        const customIds = custom
            .filter(u => u.sirId === sirId)
            .map(u => u.vinoId);

        // Kombiniraj statička + custom uparivanja
        const finalIds = customIds.length > 0
            ? customIds
            : statickaIds;

        setOdabranaVina(finalIds)
    }


    function toggleVino(id) {
        if (odabranaVina.includes(id)) {
            setOdabranaVina(odabranaVina.filter(v => v !== id));
        } else {
            setOdabranaVina([...odabranaVina, id]);
        }
    }

    async function spremi(e) {
        e.preventDefault();

        const sirId = Number(params.id);

        // Dohvati trenutna custom uparivanja
        const svi = (await UparivanjeCustomService.get()).data || [];

        // Zadrži custom uparivanja za ostala vina
        const ostali = svi.filter(u => u.sirId !== sirId);

        // Kreiraj nova custom uparivanja za ovo vino
        const novi = odabranaVina.length > 0
            ? odabranaVina.map(vinoId => ({
                id: `${Date.now()}_${vinoId}`,
                sirId,
                vinoId
            }))
            : [{
                id: `${Date.now()}_empty`,
                sirId,
                vinoId: null,
                empty: true
            }];

        // Spremi sve zajedno u memoriju
        await UparivanjeCustomService.postavi([...ostali, ...novi]);

        // Log za provjeru
        const test = await UparivanjeCustomService.get();
        console.log("NAKON SPREMANJA:", test);

        // Navigiraj nazad na pregled
        if (from === "sirevi") {
            navigate(RouteNames.SIREVI_PREGLED);
        } else {
            navigate(RouteNames.UPARIVANJE_SIR_PREGLED);
        }
    }

    return (
        <>
            <h3 className="naslov">Izmjena uparivanja sir-vina</h3>

            <Form onSubmit={spremi}>
                <h4>{sir.naziv}</h4>

                {/*Tražilica*/}
                <div className="d-flex justify-content-end mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Pretraži vina..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        style={{ maxWidth: "250px" }}
                    />
                </div>

                {/*Grid*/}
                <p>Odabrano: {odabranaVina.length}</p>

                <div className="sirevi-grid">
                    {vina
                        .filter(v => v.naziv.toLowerCase().includes(filter.toLowerCase()))
                        .map(v => {
                            const selected = odabranaVina.includes(v.id);

                            return (
                                <div
                                    key={v.id}
                                    className={`sir-tile ${selected ? "selected" : ""}`}
                                    onClick={() => toggleVino(v.id)}
                                >
                                    {v.naziv}
                                </div>
                            );
                        })}
                </div>

                <hr />
                <div className="d-flex gap-2">
                    <Button                        
                        onClick={() => {
                            if (from === "sirevi") {
                                navigate(RouteNames.SIREVI_PREGLED);
                            } else {
                                navigate(RouteNames.UPARIVANJE_SIR_PREGLED)
                            }
                        }}
                        variant="danger"
                        size="sm"
                        className="flex-fill"
                    >
                        Odustani
                    </Button>


                    <Button type="submit" variant="success" size="sm" className="flex-fill">
                        Spremi
                    </Button>

                </div>
            </Form >
        </>
    );
}

