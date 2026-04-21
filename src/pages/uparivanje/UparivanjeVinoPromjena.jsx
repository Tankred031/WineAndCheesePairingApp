import { useEffect, useState } from "react";
import VinaService from "../../services/vina/VinaService";
import SireviService from "../../services/sirevi/SireviService";
import { Link, Route, useLocation, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import { uparivanjeVinaById } from "../../services/uparivanje/UparivanjeVinaPopis";
import UparivanjeCustomService from "../../services/uparivanje/UparivanjeCustomService";
import { Button, Form } from "react-bootstrap";
import { generirajUparivanjePDF } from "../../components/UparivanjePDFGenerator";


export default function UparivanjeVinoPromjena() {

    const [vino, setVino] = useState({});
    const [sirevi, setSirevi] = useState([]);
    const [odabraniSirevi, setOdabraniSirevi] = useState([]);
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
        console.log("SPREMI KLIK");

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

        // Navigiraj nazad na pregled ili uparivanje
        if (from === "vina") {
            navigate(RouteNames.VINA_PREGLED);
        } else {
            navigate(RouteNames.UPARIVANJE_VINO_PREGLED);
        }
    }

    return (
        <>
            <h3 className="naslov">Izmjena uparivanja vino-sirevi</h3>

            <Form onSubmit={spremi}>
                <h4>{vino.naziv}</h4>

                {/*Tražilica*/}
                <div className="d-flex justify-content-end mb-3 gap-3">

                    <Button
                        variant="light"
                        style={{ color: '#7B0323', fontWeight: 'bold', border: '1px solid #7B0323' }}
                        onClick={() => {
                            // Filtriramo sireve na isti način kao što se prikazuju u gridu
                            const sireviUGridu = sirevi.filter(s =>
                                s.naziv.toLowerCase().includes(filter.toLowerCase())
                            );

                            // Šaljemo: naziv vina, listu sireva i tip 'vino'
                            generirajUparivanjePDF(vino.naziv, sireviUGridu, 'vino');
                        }}
                    >
                        Generiraj PDF popisa
                    </Button>

                    <Form.Control
                        type="text"
                        placeholder="Pretraži sireve..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        style={{
                            maxWidth: "250px",
                            backgroundColor: "lightgrey",
                            border: "2px solid grey"
                        }}
                    />
                </div>

                {/*Grid*/}
                <p>Odabrano: {odabraniSirevi.length}</p>

                <div className="sirevi-grid">
                    {sirevi
                        .filter(s => s.naziv.toLowerCase().includes(filter.toLowerCase()))
                        .map(s => {
                            const selected = odabraniSirevi.includes(s.id);

                            return (
                                <div
                                    key={s.id}
                                    className={`sir-tile ${selected ? "selected" : ""}`}
                                    onClick={() => toggleSir(s.id)}
                                >
                                    {s.naziv}
                                </div>
                            );
                        })}
                </div>

                <hr />
                <div className="d-flex gap-2">
                    <Button
                        onClick={() => {
                            if (from === "vina") {
                                navigate(RouteNames.VINA_PREGLED);
                            } else {
                                navigate(RouteNames.UPARIVANJE_VINO_PREGLED)
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

