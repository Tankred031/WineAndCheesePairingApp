import { Button, Col, Form, Row } from "react-bootstrap";
import { RouteNames } from "../../constants";
import { Link, useNavigate, useParams } from "react-router-dom";
import VinaService from "../../services/vina/VinaService";
import { useEffect, useState } from "react";


export default function VinaPromjena() {

    const navigate = useNavigate()
    const params = useParams()
    const [vino, setVino] = useState({})
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

    function format1dec(broj) {
        return Number(broj).toLocaleString("hr-HR", {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1
        })
    }

    async function ucitajVino() {
        await VinaService.getById(params.id).then((odgovor) => {

            if (!odgovor.success) {
                alert('Nije implementiran servis')
                return
            }

            const s = odgovor.data
            setVino(s)

            setAlkoholMin(Number(s.alkohol_min))
            setAlkoholMax(Number(s.alkohol_max))
        })

    }


    useEffect(() => {
        ucitajVino()
    }, [])


    async function promjeni(vino) {
        await VinaService.promjeni(params.id, vino).then(() => {
            navigate(RouteNames.VINA_PREGLED)
        })
    }


    function odradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)
        promjeni({
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
        })
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
                Izmjena postojećeg vina
            </h3>
            <Form onSubmit={odradiSubmit}>
                <Form.Group controlId="naziv" className="form-group-custom">
                    <Form.Label className="form-label-custom">Naziv</Form.Label>
                    <Form.Control type="text" name="naziv" required
                        defaultValue={vino.naziv} />
                </Form.Group>

                <Row>
                    <Col md={6}>
                        <Form.Group controlId="tip" className="form-group-custom">
                            <Form.Label className="form-label-custom">Tip</Form.Label>
                            <Form.Select
                                name="tip_id"
                                required
                                value={vino.tip_id || ""}
                                onChange={(e) => setVino({ ...vino, tip_id: Number(e.target.value) })}
                            >
                                {TIPOVI_VINA.map((t) => (
                                    <option key={t.id} value={t.id}>
                                        {t.naziv}
                                    </option>

                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="slatkoca" className="form-group-custom">
                            <Form.Label className="form-label-custom">Slatkoća</Form.Label>
                            <Form.Select
                                name="slatkoca_id"
                                required
                                value={vino.slatkoca_id || ""}
                                onChange={(e) => setVino({ ...vino, slatkoca_id: Number(e.target.value) })}
                            >
                                {SLATKOCE.map((s) => (
                                    <option key={s.id} value={s.id}>
                                        {s.naziv}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group controlId="regija" className="form-group-custom">
                    <Form.Label className="form-label-custom">Regija</Form.Label>
                    <Form.Control type="text" name="regija" required
                        defaultValue={vino.regija} />
                </Form.Group>

                <Form.Group controlId="temperatura" className="form-group-custom">
                    <Form.Label className="form-label-custom">Temperatura</Form.Label>
                    <Row>
                        <Col>
                            <Form.Label className="form-label-custom">Min</Form.Label>
                            <Form.Control
                                type="number"
                                step="0.1"
                                name="temperatura_min"
                                defaultValue={vino.temperatura_min}
                            />
                        </Col>
                        <Col>
                            <Form.Label className="form-label-custom">Max</Form.Label>
                            <Form.Control
                                type="number"
                                step="0.1"
                                name="temperatura_max"
                                defaultValue={vino.temperatura_max}
                            />
                        </Col>
                    </Row>
                </Form.Group>

                <Form.Group controlId="arome" className="form-group-custom">
                    <Form.Label className="form-label-custom">Arome</Form.Label>
                    <Form.Control type="text" name="arome" required
                        defaultValue={vino.arome} />
                </Form.Group>

                <Form.Group controlId="tijelo" className="form-group-custom">
                    <Form.Label className="form-label-custom">Tijelo</Form.Label>
                    <Form.Control type="text" name="tijelo" required
                        defaultValue={vino.tijelo} />
                </Form.Group>

                <Form.Group controlId="alkohol" className="form-group-custom">
                    <Form.Label className="form-label-custom">
                        Alkohol:
                        <strong style={{ color: bojaMin }}> {format1dec(alkoholMin)} </strong>
                        -
                        <strong style={{ color: bojaMax }}> {format1dec(alkoholMax)} </strong> %
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

                <hr style={{ marginTop: '50px', border: '0' }} />

                <Row>
                    <Col>
                        <Link to={RouteNames.VINA_PREGLED} className="btn btn-danger w-100">
                            Odustani
                        </Link>
                    </Col>
                    <Col>
                        <Button type="submit" variant="success w-100">
                            Promjeni vino
                        </Button>
                    </Col>
                </Row>

            </Form >
        </>
    )
}

