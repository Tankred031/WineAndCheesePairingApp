import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import { Button, Col, Form, Row } from "react-bootstrap";
import VinaService from "../../services/vina/VinaService";


export default function VinaNovi() {

    const navigate = useNavigate()

    async function dodaj(vino) {
        await VinaService.dodaj(vino).then(() => {
            navigate(RouteNames.VINA_PREGLED)
        })
    }

    function odradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)

        // --- KONTROLA 1: Naziv (Postojanje) ---
        if (!podaci.get('naziv') || podaci.get('naziv').trim().length === 0) {
            alert("Naziv je obavezan i ne smije sadržavati samo razmake!")
            return // Prekid
        }

        // --- KONTROLA 2: Naziv (Minimalna duljina) ---
        if (podaci.get('naziv').trim().length < 3) {
            alert("Naziv smjera mora imati najmanje 3 znaka!")
            return // Prekid
        }



        dodaj({
            naziv: podaci.get('naziv'),
            tip: podaci.get('tip'),
            regija: podaci.get('regija'),
            temperatura: podaci.get('temperatura'),
            slatkoca: podaci.get('slatkoca'),
            arome: podaci.get('arome'),
            tijelo: podaci.get('tijelo'),
            alkohol: podaci.get('alkohol')
        })
    }

    return (
        <>
            <h3 className="naslov">
                Unos novog vina
            </h3>
            <Form onSubmit={odradiSubmit}>
                <Form.Group controlId="naziv" className="form-group-custom">
                    <Form.Label className="form-label-custom">Naziv</Form.Label>
                    <Form.Control type="text" name="naziv" required />
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
                    <Form.Control type="text" name="regija" required />
                </Form.Group>

                <Form.Group controlId="temperatura" className="form-group-custom">
                    <Form.Label className="form-label-custom">Temperatura</Form.Label>
                    <Form.Control type="text" name="temperatura" required/>
                </Form.Group>



                <Form.Group controlId="arome" className="form-group-custom">
                    <Form.Label className="form-label-custom">Arome</Form.Label>
                    <Form.Control type="text" name="arome" required />
                </Form.Group>

                <Form.Group controlId="tijelo" className="form-group-custom">
                    <Form.Label className="form-label-custom">Tijelo</Form.Label>
                    <Form.Control type="text" name="tijelo" required />
                </Form.Group>

                <Form.Group controlId="alkohol" className="form-group-custom">
                    <Form.Label className="form-label-custom">Alkohol</Form.Label>
                    <Form.Control type="text" name="alkohol" required />
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
                            Dodaj novo vino
                        </Button>
                    </Col>
                </Row>

            </Form>
        </>
    )
}

