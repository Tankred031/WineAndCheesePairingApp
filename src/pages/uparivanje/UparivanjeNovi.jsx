import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import { Button, Col, Form, Row } from "react-bootstrap";
import VinaService from "../../services/vina/VinaService";
import { useEffect, useState } from "react";
import SireviService from "../../services/sirevi/SireviService";
import UparivanjeCustomService from "../../services/uparivanje/UparivanjeCustomService";


export default function UparivanjeNovi() {

    const navigate = useNavigate();
    const [sirevi, setSirevi] = useState([]);

    useEffect(() => {
        ucitajSireve();
    }, []);

    async function ucitajSireve() {
        const s = await SireviService.get();
        setSirevi(s.data);
    }

    async function odradiSubmit(e) {
        e.preventDefault();

        const podaci = new FormData(e.target);

        // 1. KREIRAJ NOVO VINO
        const novoVino = {
            vino: podaci.get('naziv'),
            temperatura: Number(podaci.get('temperatura'))
        };

        await VinaService.dodaj(novoVino);

        const svaVina = (await VinaService.get()).data || [];
        const zadnje = svaVina[svaVina.length - 1];

        if (!zadnje) {
            alert("Greška kod dodavanja vina");
            return;
        }

        const vinoId = zadnje.id;

        // 2. UZMI ODABRANE SIREVE
        const sireviIds = [
            podaci.get('sir1'),
            podaci.get('sir2'),
            podaci.get('sir3'),
            podaci.get('sir4'),
            podaci.get('sir5')
        ]
            .filter(id => id) // makni prazne
            .map(id => Number(id));

        // 3. SPREMI UPARIVANJE
        const svi = (await UparivanjeCustomService.get()).data || [];

        const novi = sireviIds.map(sirId => ({
            id: `${Date.now()}_${sirId}`,
            vinoId,
            sirId
        }));

        await UparivanjeCustomService.postavi([...svi, ...novi]);

        navigate(RouteNames.UPARIVANJE_PREGLED);
    }

    return (
        <>
            <h3 className="naslov">Novo vino + uparivanje</h3>

            <Form onSubmit={odradiSubmit}>

                {/* VINO */}
                <Form.Group className="mb-2">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control name="naziv" required />
                </Form.Group>

                <Form.Group className="mb-2">
                    <Form.Label>Temperatura</Form.Label>
                    <Form.Control type="number" name="temperatura" />
                </Form.Group>

                {/* SIREVI */}
                {[1, 2, 3, 4, 5].map(i => (
                    <Form.Group key={i} className="mb-2">
                        <Form.Label>Sir {i}</Form.Label>
                        <Form.Select name={`sir${i}`}>
                            <option value="">-- opcionalno --</option>
                            {sirevi.map(s => (
                                <option key={s.id} value={s.id}>
                                    {s.naziv}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>
                ))}

                <hr style={{ marginTop: '50px', border: '0' }} />

                <Row>
                    <Col>
                        <Link to={RouteNames.UPARIVANJE_PREGLED} className="btn btn-danger w-100">
                            Odustani
                        </Link>
                    </Col>
                    <Col>
                        <Button type="submit" variant="success w-100">
                            Dodaj novo uparivanje
                        </Button>
                    </Col>
                </Row>

            </Form>
        </>
    )
}