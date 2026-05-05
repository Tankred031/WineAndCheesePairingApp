import { Button, Col, Form, Row } from "react-bootstrap";
import { RouteNames } from "../../constants";
import { Link, useNavigate, useParams } from "react-router-dom";
import VinaService from "../../services/vina/VinaService";
import { useEffect, useState } from "react";
import useLoading from "../../hooks/useLoading";
import { ShemaVino } from "../../schemas/ShemaVino";

export default function VinaPromjena() {

    const navigate = useNavigate();
    const params = useParams();

    const [vino, setVino] = useState({});
    const [alkoholMin, setAlkoholMin] = useState(8);
    const [alkoholMax, setAlkoholMax] = useState(15);

    const { showLoading, hideLoading } = useLoading();
    
    const TIPOVI_VINA = [
        { id: 1, naziv: "crveno" },
        { id: 2, naziv: "bijelo" },
        { id: 3, naziv: "pjenušavo" },
        { id: 4, naziv: "desertno" },
        { id: 5, naziv: "rose" }
    ];

    const SLATKOCE = [
        { id: 1, naziv: "suho" },
        { id: 2, naziv: "polusuho" },
        { id: 3, naziv: "poluslatko" },
        { id: 4, naziv: "slatko" }
    ];

    const [errors, setErrors] = useState({});
    const round1 = (num) => Math.round(num * 10) / 10;

    useEffect(() => {
        ucitajVino();
    }, []);

    async function ucitajVino() {
        showLoading("Učitavam vina...");
        const odgovor = await VinaService.getById(params.id);

        if (!odgovor.success) {
            alert("Greška kod učitavanja");
            return;
        }

        const s = odgovor.data;
        setVino(s);
        setAlkoholMin(Number(s.alkohol_min));
        setAlkoholMax(Number(s.alkohol_max));
        hideLoading();
    }

    async function promjeni(vino) {
        showLoading("Spremam izmjene...");

        await VinaService.promjeni(params.id, vino);

        setTimeout(() => {
            hideLoading();
            navigate(RouteNames.VINA_PREGLED);
        }, 400);
    }

    async function odradiSubmit(e) {
        e.preventDefault();
        setErrors({});

        const podaci = new FormData(e.target);

        const objekt = {
            naziv: podaci.get('naziv'),
            tip_id: Number(podaci.get('tip_id')),
            regija: podaci.get('regija'),
            temperatura_min: Number(podaci.get('temperatura_min')),
            temperatura_max: Number(podaci.get('temperatura_max')),
            slatkoca_id: Number(podaci.get('slatkoca_id')),
            arome: podaci.get('arome'),
            tijelo: podaci.get('tijelo'),
            alkohol_min: alkoholMin,
            alkohol_max: alkoholMax
        };

        const rezultat = ShemaVino.safeParse(objekt);

        if (!rezultat.success) {
            const noveGreske = {};

            rezultat.error.issues.forEach(issue => {
                const kljuc = issue.path[0];
                if (!noveGreske[kljuc]) {
                    noveGreske[kljuc] = issue.message;
                }
            });

            setErrors(noveGreske);
            return;
        }

        // dodatna logika (nije u Zod)
        if (objekt.temperatura_min > objekt.temperatura_max) {
            setErrors({
                temperatura_min: "Min ne može biti veći od max!"
            })
            return;
        }

        promjeni(objekt);
    }

    function getBoja(alkohol) {
        if (alkohol <= 11) return '#198754';
        if (alkohol < 13) return '#ffc107';
        if (alkohol <= 15) return '#dc3545';
        return '#6f42c1';
    }

    const postotakMin = ((alkoholMin - 8) / (25 - 8)) * 100;
    const postotakMax = ((alkoholMax - 8) / (25 - 8)) * 100;

    const bojaMin = getBoja(alkoholMin);
    const bojaMax = getBoja(alkoholMax);

    return (
        <>
            <h3 className="naslov">Izmjena vina</h3>

            <Form onSubmit={odradiSubmit}>

                <Row>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Naziv</Form.Label>
                            <Form.Control
                                name="naziv"
                                defaultValue={vino.naziv}
                                isInvalid={!!errors.naziv}
                                onFocus={() => {
                                    const e = { ...errors };
                                    delete e.naziv;
                                    setErrors(e);
                                }}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.naziv}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>Tip</Form.Label>
                            <Form.Select
                                name="tip_id"
                                value={vino.tip_id || ""}
                                isInvalid={!!errors.tip_id}
                                onChange={(e) => setVino({ ...vino, tip_id: Number(e.target.value) })}
                            >
                                <option value="">--odaberite tip --</option>
                                {TIPOVI_VINA.map(t => (
                                    <option key={t.id} value={t.id}>{t.naziv}</option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.tip_id}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>Slatkoća</Form.Label>
                            <Form.Select
                                name="slatkoca_id"
                                value={vino.slatkoca_id || ""}
                                isInvalid={!!errors.slatkoca_id}
                                onChange={(e) => setVino({ ...vino, slatkoca_id: Number(e.target.value) })}
                            >
                                <option value="">--odaberite slatkoću --</option>
                                {SLATKOCE.map(s => (
                                    <option key={s.id} value={s.id}>{s.naziv}</option>
                                ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.slatkoca_id}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Regija</Form.Label>
                            <Form.Control
                                name="regija"
                                defaultValue={vino.regija}
                                isInvalid={!!errors.regija}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.regija}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>Temp Min</Form.Label>
                            <Form.Control
                                type="number"
                                name="temperatura_min"
                                min={8}
                                defaultValue={vino.temperatura_min}
                                isInvalid={!!errors.temperatura_min}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.temperatura_min}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col md={3}>
                        <Form.Group>
                            <Form.Label>Temp Max</Form.Label>
                            <Form.Control
                                type="number"
                                name="temperatura_max"
                                max={18}
                                defaultValue={vino.temperatura_max}
                                isInvalid={!!errors.temperatura_max}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.temperatura_max}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={8}>
                        <Form.Group>
                            <Form.Label>Arome</Form.Label>
                            <Form.Control
                                name="arome"
                                defaultValue={vino.arome}
                                isInvalid={!!errors.arome}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.arome}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col md={4}>
                        <Form.Group>
                            <Form.Label>Tijelo</Form.Label>
                            <Form.Control
                                name="tijelo"
                                defaultValue={vino.tijelo}
                                isInvalid={!!errors.tijelo}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.tijelo}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group>
                    <Form.Label>
                        Alkohol:
                        <strong style={{ color: bojaMin }}> {alkoholMin}</strong> -
                        <strong style={{ color: bojaMax }}> {alkoholMax}</strong> %
                    </Form.Label>

                    <Form.Range
                        min="8"
                        max="25"
                        step="0.1"
                        value={alkoholMin}
                        onChange={(e) => {
                            const v = round1(parseFloat(e.target.value));
                            if (v <= alkoholMax) setAlkoholMin(v);
                        }}
                    />

                    <Form.Range
                        min="8"
                        max="25"
                        step="0.1"
                        value={alkoholMax}
                        onChange={(e) => {
                            const v = round1(parseFloat(e.target.value));
                            if (v >= alkoholMin) setAlkoholMax(v);
                        }}
                    />
                </Form.Group>

                <div className="mt-3" />

                <Row>
                    <Col>
                        <Link to={RouteNames.VINA_PREGLED} className="btn btn-danger w-100">
                            Odustani
                        </Link>
                    </Col>
                    <Col>
                        <Button type="submit" className="w-100" variant="success">
                            Spremi promjene
                        </Button>
                    </Col>
                </Row>

            </Form>
        </>
    );
}