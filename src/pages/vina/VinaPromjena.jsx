import { Button, Col, Form, Row } from "react-bootstrap";
import { RouteNames } from "../../constants";
import { Link, useNavigate, useParams } from "react-router-dom";
import VinaService from "../../services/vina/VinaService";
import { useEffect, useState } from "react";


export default function VinaPromjena() {

    const navigate = useNavigate()
    const params = useParams()
    const [vino, setVino] = useState({})
    const [alkohol, setAlkohol] = useState(0)

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

    async function ucitajVino() {
        await VinaService.getById(params.id).then((odgovor) => {

            if (!odgovor.success) {
                alert('Nije implementiran servis')
                return
            }

            const s = odgovor.data
            setVino(s)
            setAlkohol(Number(s.alkohol))
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
            temperatura: podaci.get('temperatura'),
            slatkoca_id: Number(podaci.get('slatkoca_id')),
            arome: podaci.get('arome'),
            tijelo: podaci.get('tijelo'),
            alkohol: alkohol
        })
    }

    function getBoja(alkohol) {
        if (alkohol <= 11) return '#198754'
        if (alkohol < 13) return '#ffc107'
        if (alkohol <= 15) return '#dc3545'
        return '#6f42c1'
    }

    const postotak = ((alkohol - 8) / (25 - 8)) * 100
    const boja = getBoja(alkohol)

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
                    <Form.Control type="text" name="temperatura" required
                        defaultValue={vino.temperatura} />
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
                        Alkohol: <strong style={{ color: boja }}>
                            {alkohol} %
                        </strong></Form.Label>
                    <Form.Range
                        name="alkohol"
                        min="8"
                        max="25"
                        step="0.1"
                        value={alkohol}
                        onChange={(e) => setAlkohol(parseFloat(e.target.value))}
                        style={{
                            background: `linear-gradient(to right,
                            ${boja} 0%,
                            ${boja} ${postotak}%,
                            #dee2e6 ${postotak}%,
                            #dee2e6 100%
                            )`
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

