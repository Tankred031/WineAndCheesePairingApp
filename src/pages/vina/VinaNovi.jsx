import { Link, useNavigate } from "react-router-dom";
import { RouteNames } from "../../constants";
import { Button, Col, Form, Row } from "react-bootstrap";
import VinaService from "../../services/vina/VinaService";


export default function VinaNovi() {

    const navigate = useNavigate()

    async function dodaj(vino) {
        await VinaService.dodaj(vino).then(() => {
            navigate(RouteNames.VINA)
        })        
    }

    function odradiSubmit(e){
        e.preventDefault()
        const podaci = new FormData(e.target)
        dodaj({
            naziv: podaci.get('naziv'),
            tip: podaci.get('tip'),
            regija: podaci.get('regija'),
            jacina: podaci.get('srednje'),
            temperatura: parseInt(podaci.get('temperatura')),
            slatkoca: podaci.get('slatkoca'),
            arome: podaci.get ('arome'),
            tijelo: podaci.get ('tijelo'),
            alkohol: parseInt(podaci.get('alkohol'))
        })
    }

    return (
        <>
            <h3>
                Unos novog vina
            </h3>
            <Form onSubmit={odradiSubmit}>
                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control type="text" name="naziv" required />
                </Form.Group>

                <Form.Group controlId="tip">
                    <Form.Label>Tip</Form.Label>
                    <Form.Control type="text" name="tip" required />
                </Form.Group>

                <Form.Group controlId="regija">
                    <Form.Label>Regija</Form.Label>
                    <Form.Control type="text" name="regija" required />
                </Form.Group>

                <Form.Group controlId="jacina">
                    <Form.Label>Jačina</Form.Label>
                    <Form.Control type="text" name="jacina" required />
                </Form.Group>

                <Form.Group controlId="temperatura">
                    <Form.Label>Temperatura</Form.Label>
                    <Form.Control type="number" name="temperatura" required step={1} />
                </Form.Group>

                <Form.Group controlId="slatkoca">
                    <Form.Label>Slatkoća</Form.Label>
                    <Form.Control type="text" name="slatkoca" required />
                </Form.Group>

                <Form.Group controlId="arome">
                    <Form.Label>Arome</Form.Label>
                    <Form.Control type="text" name="arome" required />
                </Form.Group>

                <Form.Group controlId="tijelo">
                    <Form.Label>Tijelo</Form.Label>
                    <Form.Control type="text" name="tijelo" required />
                </Form.Group>

                <Form.Group controlId="alkohol">
                    <Form.Label>Alkohol</Form.Label>
                    <Form.Control type="number" name="alkohol" required step={1} />
                </Form.Group>

<hr style={{marginTop: '50px', border: '0'}} />

                <Row>
                    <Col>
                        <Link to={RouteNames.VINA} className="btn btn-danger w-100">
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

