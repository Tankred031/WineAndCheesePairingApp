import { useEffect, useState, useRef } from "react";
import VinaService from "../../services/vina/VinaService";
import SireviService from "../../services/sirevi/SireviService";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { RouteNames } from "../../constants";
import { uparivanjeSiraById } from "../../services/uparivanje/UparivanjeSiraPopis";
import UparivanjeCustomService from "../../services/uparivanje/UparivanjeCustomService";
import { Button, Form } from "react-bootstrap";
import { generirajUparivanjePDF } from "../../components/UparivanjePDFGenerator";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { ShemaUparivanje } from "../../schemas/ShemaUparivanje";

export default function UparivanjeSirPromjena() {

    const [sir, setSir] = useState({});
    const [vina, setVina] = useState([]);
    const [odabranaVina, setOdabranaVina] = useState([]);
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

        const sirId = Number(params.id);

        const s = await SireviService.getById(sirId);
        const v = await VinaService.get();

        setSir(s.data);
        setVina(v.data || []);

        const statickaIds = uparivanjeSiraById[sirId] || [];

        const customResponse = await UparivanjeCustomService.get();
        const custom = customResponse.data || [];

        const customIds = custom
            .filter(u => u.sirId === sirId)
            .map(u => u.vinoId);

        const finalIds =
            customIds.length > 0 ? customIds : statickaIds;

        setOdabranaVina(finalIds);
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

    const payload = {
        sirId,
        vina: odabranaVina
    };

    // ZOD VALIDACIJA
    const rezultat = ShemaUparivanje.safeParse(payload);

    if (!rezultat.success) {
        alert(rezultat.error.issues[0].message);
        return;
    }

    // postojeća logika
    const svi = (await UparivanjeCustomService.get()).data || [];
    const ostali = svi.filter(u => u.sirId !== sirId);

    const novi =
        odabranaVina.length > 0
            ? odabranaVina.map(vinoId => ({
                id: `${Date.now()}_${vinoId}_${Math.random()}`,
                sirId,
                vinoId
            }))
            : [{
                id: `${Date.now()}_empty`,
                sirId,
                vinoId: null,
                empty: true
            }];

    await UparivanjeCustomService.postavi([...ostali, ...novi]);

    if (from === "sirevi") navigate(RouteNames.SIREVI_PREGLED);
    else navigate(RouteNames.UPARIVANJE_SIR_PREGLED);
}

    // SCREENSHOT PDF (WYSIWYG)
    async function printScreenPDF() {
        const element = printRef.current;
        if (!element) return;

        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true
        });

        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("l", "mm", "a4");

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`uparivanje-sir-${sir.naziv}.pdf`);
    }

    return (
        <>
            <h3 className="naslov">Izmjena uparivanja sir-vina</h3>

            <Form onSubmit={spremi}>

                {/* ZONA ZA PRINT */}
                <div ref={printRef}>

                    <h4>{sir.naziv}</h4>

                    {/*Tražilica + PDF*/}
                    <div className="d-flex justify-content-end mb-3 gap-2">

                        {/* SCREENSHOT PDF */}
                        <Button
                            variant="primary"
                            style={{
                                fontWeight: "bold",
                                border: "1px solid black"                                
                            }}
                            onClick={printScreenPDF}
                        >
                            Screenshot PDF
                        </Button>

                        {/* STANDARD PDF */}
                        <Button
                            variant="light"
                            style={{
                                color: '#7B0323',
                                fontWeight: 'bold',
                                border: '1px solid #7B0323'
                            }}
                            onClick={() => {
                                const filtriranaVina = vina.filter(v =>
                                    v.naziv.toLowerCase().includes(filter.toLowerCase())
                                );

                                generirajUparivanjePDF(sir.naziv, filtriranaVina, 'sir');
                            }}
                        >
                            Generiraj PDF
                        </Button>

                        <Form.Control
                            type="text"
                            placeholder="Pretraži vina..."
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            style={{
                                maxWidth: "250px",
                                backgroundColor: "lightgrey",
                                border: "2px solid grey"
                            }}
                        />
                    </div>

                    <p>Odabrano: {odabranaVina.length}</p>

                    <div className="sirevi-grid">
                        {vina
                            .filter(v =>
                                v.naziv.toLowerCase().includes(filter.toLowerCase())
                            )
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

                </div>

                <hr />

                <div className="d-flex gap-2">

                    <Button
                        onClick={() => {
                            if (from === "sirevi") {
                                navigate(RouteNames.SIREVI_PREGLED);
                            } else {
                                navigate(RouteNames.UPARIVANJE_SIR_PREGLED);
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