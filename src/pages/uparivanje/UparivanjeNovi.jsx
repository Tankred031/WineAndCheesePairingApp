import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import VinaService from "../../services/vina/VinaService";
import SireviService from "../../services/sirevi/SireviService";
import UparivanjeCustomService from "../../services/uparivanje/UparivanjeCustomService";

export default function UparivanjeNovi() {

    const [vina, setVina] = useState([]);
    const [sirevi, setSirevi] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        ucitajPodatke();
    }, []);

    async function ucitajPodatke() {
        const v = await VinaService.get();
        const s = await SireviService.get();

        setVina(v.data || []);
        setSirevi(s.data || []);
    }

    async function odradiSubmit(e) {
        e.preventDefault();

        const podaci = new FormData(e.target);

        // 1. ODABRANO VINO
        const vinoId = Number(podaci.get('vino'));

        if (!vinoId) {
            alert("Odaberi vino");
            return;
        }

        // 2. SIREVI
        const sireviIds = [
            podaci.get('sir1'),
            podaci.get('sir2'),
            podaci.get('sir3'),
            podaci.get('sir4'),
            podaci.get('sir5')
        ]
            .filter(id => id)
            .map(id => Number(id));

        if (sireviIds.length === 0) {
            alert("Odaberi barem jedan sir");
            return;
        }

        // 3. SPREMI
        const svi = (await UparivanjeCustomService.get()).data || [];

        const novi = sireviIds.map(sirId => ({
            id: Date.now() + "_" + sirId,
            vinoId,
            sirId
        }));

        await UparivanjeCustomService.postavi([...svi, ...novi]);

        navigate(RouteNames.UPARIVANJE_PREGLED);
    }

    return (
        <>
            <h3 className="naslov">Novo uparivanje</h3>

            <Form onSubmit={odradiSubmit}>

                {/* VINO */}
                <Form.Group className="mb-2">
                    <Form.Label>Vino</Form.Label>
                    <Form.Select name="vino" required>
                        <option value="">-- odaberi vino --</option>
                        {vina.map(v => (
                            <option key={v.id} value={v.id}>
                                {v.naziv}
                            </option>
                        ))}
                    </Form.Select>
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
                            Dodaj uparivanje
                        </Button>
                    </Col>
                </Row>

            </Form>
        </>
    )
}