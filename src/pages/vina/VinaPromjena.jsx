import { Button, Col, Form, Row } from "react-bootstrap";
import { RouteNames } from "../../constants";
import { Link, useNavigate, useParams } from "react-router-dom";
import VinaService from "../../services/vina/VinaService";
import { useEffect, useState } from "react";


export default function VinaPromjena() {

    const navigate = useNavigate()
    const params = useParams()
    const [vino, setVino] = useState({})

    async function ucitajVino() {
        await VinaService.getById(params.id).then((odgovor) => {

            if (!odgovor.success) {
                alert('Nije implementiran servis')
                return
            }

            const s = odgovor.data
            setVino(s)
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
            tip: podaci.get('tip'),
            regija: podaci.get('regija'),
            temperatura: podaci.get('temperatura'),
            slatkoca: podaci.get('slatkoca'),
            arome: podaci.get('arome'),
            tijelo: podaci.get('tijelo'),
            alkohol: parseFloat(podaci.get('alkohol'))
        })
    }

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
                            <Form.Select name="tip" required>
                                <option value="crveno">crveno</option>
                                <option value="bijelo">bijelo</option>
                                <option value="pjenušavo">pjenušavo</option>
                                <option value="desertno">desertno</option>
                                <option value="rose">rose</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="slatkoca" className="form-group-custom">
                            <Form.Label className="form-label-custom">Slatkoća</Form.Label>
                            <Form.Select name="slatkoca" required>
                                <option value="suho">suho</option>
                                <option value="polusuho">polusuho</option>
                                <option value="poluslatko">poluslatko</option>
                                <option value="slatko">slatko</option>
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
                    <Form.Label className="form-label-custom">Alkohol</Form.Label>
                    <Form.Control 
                        type="number" 
                        name="alkohol"
                        step="0.1"
                        min="8"
                        max="25"
                        required
                        defaultValue={vino.alkohol} />
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

            </Form>
        </>
    )
}

