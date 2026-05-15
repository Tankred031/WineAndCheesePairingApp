import { useEffect, useState, useRef } from "react";
import VinaService from "../../services/vina/VinaService";
import SireviService from "../../services/sirevi/SireviService";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import { uparivanjeVinaById } from "../../services/uparivanje/UparivanjeVinaPopis";
import UparivanjeCustomService from "../../services/uparivanje/UparivanjeCustomService";
import { Button, Form } from "react-bootstrap";
import { generirajUparivanjePDF } from "../../components/UparivanjePDFGenerator";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function UparivanjeVinoPromjena() {
    const [vino, setVino] = useState({});
    const [sirevi, setSirevi] = useState([]);
    const [odabraniSirevi, setOdabraniSirevi] = useState([]);
    const [filter, setFilter] = useState("");

    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from;

    const printRef = useRef(null);

    useEffect(() => {
        ucitaj();
    }, []);

    async function ucitaj() {

        const vinoId = params.id;
        const v = await VinaService.getById(vinoId);
        const s = await SireviService.get();

        setVino(v.data);
        setSirevi(s.data || []);

        const statickaIds =
            uparivanjeVinaById[vinoId] || [];

        const customResponse =
            await UparivanjeCustomService.get();

        const custom =
            customResponse.data || [];

        const customIds = custom
            .filter(u => u.vinoId === vinoId)
            .map(u => u.sirId);

        const finalIds =
            customIds.length > 0
                ? customIds
                : statickaIds;

        setOdabraniSirevi(finalIds);
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

        const vinoId = params.id;
        const svi = (await UparivanjeCustomService.get()).data || [];
        const ostali = svi.filter(u => u.vinoId !== vinoId);

        const novi =
            odabraniSirevi.length > 0
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

        await UparivanjeCustomService.postavi([
            ...ostali,
            ...novi
        ]);

        if (from === "vina") {
            navigate(RouteNames.VINA_PREGLED);
        } else {
            navigate(RouteNames.UPARIVANJE_VINO_PREGLED);
        }
    }
    
    // SCREENSHOT PDF (WYSIWYG)
    async function printScreenPDF() {
        const element = printRef.current;
        if (!element) return;

        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            // Traži sve elemente s klasom 'no-screenshot' i preskače ih pri slikanju
            ignoreElements: (el) => el.classList.contains("no-screenshot")
        });

        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("l", "mm", "a4");

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`uparivanje-${vino.naziv}.pdf`);
    }

    return (
        <>
            <h3 className="naslov">Izmjena uparivanja vino-sirevi</h3>

            <Form onSubmit={spremi}>

                {/* PRINT ZONA */}
                <div ref={printRef}>

                    <h4>{vino.naziv}</h4>

                    <div className="d-flex justify-content-end mb-3 gap-2">

                        {/* SCREENSHOT PDF */}
                        <Button
                            variant="primary"
                            className="no-screenshot"
                            style={{
                                fontWeight: "bold",
                                border: "1px solid black"
                            }}
                            onClick={printScreenPDF}
                        >
                            Screenshot PDF
                        </Button>

                        {/* 📄 STANDARD PDF */}
                        <Button
                            variant="light"
                            className="no-screenshot"
                            style={{
                                color: "#7B0323",
                                fontWeight: "bold",
                                border: "1px solid #7B0323"
                            }}
                            onClick={() => {
                                const sireviUGridu = sirevi.filter(s =>
                                    s.naziv.toLowerCase().includes(filter.toLowerCase())
                                );

                                generirajUparivanjePDF(vino.naziv, sireviUGridu, "vino");
                            }}
                        >
                            Generiraj PDF
                        </Button>

                        <Form.Control
                            type="text"
                            placeholder="Pretraži sireve..."
                            className="no-screenshot"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            style={{
                                maxWidth: "250px",
                                backgroundColor: "lightgrey",
                                border: "2px solid grey"
                            }}
                        />
                    </div>

                    <p>Odabrano: {odabraniSirevi.length}</p>

                    <div className="sirevi-grid">
                        {sirevi
                            .filter(s =>
                                s.naziv.toLowerCase().includes(filter.toLowerCase())
                            )
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

                </div>

                <hr />

                <div className="d-flex gap-2">

                    <Button
                        type="button"
                        onClick={() => {
                            if (from === "vina") {
                                navigate(RouteNames.VINA_PREGLED);
                            } else {
                                navigate(RouteNames.UPARIVANJE_VINO_PREGLED);
                            }
                        }}
                        variant="danger"
                        className="flex-fill"
                    >
                        Odustani
                    </Button>

                    <Button type="submit" variant="success" className="flex-fill">
                        Spremi
                    </Button>

                </div>
            </Form>
        </>
    );
}