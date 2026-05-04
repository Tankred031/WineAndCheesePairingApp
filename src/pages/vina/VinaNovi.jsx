import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import { Button, Col, Form, Row } from "react-bootstrap";
import VinaService from "../../services/vina/VinaService";
import { useState } from "react";
import { ShemaVino } from "../../schemas/ShemaVino";


export default function VinaNovi() {

    const navigate = useNavigate()
    const [alkoholMin, setAlkoholMin] = useState(8)
    const [alkoholMax, setAlkoholMax] = useState(15)

    const TIPOVI_VINA = [
        { id: 1, naziv: "crveno" },
        { id: 2, naziv: "bijelo" },
        { id: 3, naziv: "pjenušavo" },
        { id: 4, naziv: "desertno" },
        { id: 5, naziv: "rose" }
    ]

    const SLATKOCE = [
        { id: 1, naziv: "suho" },
        { id: 2, naziv: "polusuho" },
        { id: 3, naziv: "poluslatko" },
        { id: 4, naziv: "slatko" }
    ]

    const [errors, setErrors] = useState({});

    async function dodaj(vino) {
        await VinaService.dodaj(vino).then(() => {
            navigate(RouteNames.VINA_PREGLED)
        })
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
            alkohol_max: alkoholMax,
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

        // dodatna logika
        if (objekt.temperatura_min > objekt.temperatura_max) {
            setErrors({
                temperatura_min: "Min ne može biti veći od max!"
            });
            return;
        }

        dodaj(objekt);
    }

    function getBoja(alkohol) {
        if (alkohol <= 11) return '#198754'
        if (alkohol < 13) return '#ffc107'
        if (alkohol <= 15) return '#dc3545'
        return '#6f42c1'
    }

    const postotakMin = ((alkoholMin - 8) / (25 - 8)) * 100
    const postotakMax = ((alkoholMax - 8) / (25 - 8)) * 100

    const bojaMin = getBoja(alkoholMin)
    const bojaMax = getBoja(alkoholMax)

    return (
        <>
            <h3 className="naslov">
                Unos novog vina
            </h3>
            <Form onSubmit={odradiSubmit}>

                <Row>
                    <Col md={6}>
                        <Form.Group className="form-group-custom">
                            <Form.Label>Naziv</Form.Label>
                            <Form.Control
                                name="naziv"
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
                        <Form.Group className="form-group-custom">
                            <Form.Label>Tip</Form.Label>
                            <Form.Select name="tip_id"
                                isInvalid={!!errors.tip_id}
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
                        <Form.Group className="form-group-custom">
                            <Form.Label>Slatkoća</Form.Label>
                            <Form.Select name="slatkoca_id"
                                isInvalid={!!errors.slatkoca_id}
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
                                isInvalid={!!errors.tijelo}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.tijelo}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group controlId="alkohol" className="form-group-custom">
                    <Form.Label className="form-label-custom">
                        Alkohol: <strong style={{ color: bojaMin }}>
                            {alkoholMin}
                        </strong> - <strong style={{ color: bojaMax }}>
                            {alkoholMax}
                        </strong> %
                    </Form.Label>

                    {/* MIN */}
                    <Form.Range
                        min="8"
                        max="25"
                        step="0.1"
                        value={alkoholMin}
                        onChange={(e) => {
                            const value = parseFloat(e.target.value)
                            if (value <= alkoholMax) setAlkoholMin(value)
                        }}
                        style={{
                            background: `linear-gradient(to right,
                        ${bojaMin} 0%,
                        ${bojaMin} ${postotakMin}%,
                        #dee2e6 ${postotakMin}%,
                        #dee2e6 100%)`
                        }}
                    />

                    {/* MAX */}
                    <Form.Range
                        min="8"
                        max="25"
                        step="0.1"
                        value={alkoholMax}
                        onChange={(e) => {
                            const value = parseFloat(e.target.value)
                            if (value >= alkoholMin) setAlkoholMax(value)
                        }}
                        style={{
                            background: `linear-gradient(to right,
                        ${bojaMax} 0%,
                        ${bojaMax} ${postotakMax}%,
                        #dee2e6 ${postotakMax}%,
                        #dee2e6 100%)`
                        }}
                    />

                    <div className="d-flex justify-content-between px-1">
                        <small>8</small>
                        <small>11</small>
                        <small>14</small>
                        <small>17</small>
                        <small>20</small>
                        <small>23</small>
                        <small>25</small>
                    </div>
                </Form.Group>

                <div className="mt-3" />

                <Row>
                    <Col>
                        <Link to={RouteNames.VINA_PREGLED} className="btn btn-danger w-100">
                            Odustani
                        </Link>
                    </Col>
                    <Col>
                        <Button type="submit" variant="success w-100">
                            Dodaj novo vino
                        </Button>
                    </Col>
                </Row>

            </Form>
        </>
    )
}

