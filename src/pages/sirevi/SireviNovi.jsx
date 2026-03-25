import { Button, Col, Form, Row } from "react-bootstrap"
import { RouteNames } from "../../constants"
import SireviService from "../../services/sirevi/SireviService"
import { Link, useNavigate } from "react-router-dom"

export default function SireviNovi() {
    
    const navigate = useNavigate() 

    async function dodaj(sir) {
        await SireviService.dodaj(sir).then(() => {
            navigate(RouteNames.SIREVI)
        })        
    }

    function odradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)
        dodaj({
            naziv: podaci.get('naziv'),
            tip: podaci.get('tip'),
            zrenje: podaci.get('zrenje'),            
            regija: podaci.get('regija'),
            intezitet: podaci.get('intezitet'),
            masnoce: podaci.get('masnoce'),
            tekstura: podaci.get('tekstura'),
            okus: podaci.get('okus')
        })
        
    }

    return (
        <>
            <h3>
                Unos novog sira
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

                <Form.Group controlId="zrenje">
                    <Form.Label>Zrenje</Form.Label>
                    <Form.Control type="text" name="zrenje" required />
                </Form.Group>

                <Form.Group controlId="regija">
                    <Form.Label>Regija</Form.Label>
                    <Form.Control type="text" name="regija" required />
                </Form.Group>

                <Form.Group controlId="intezitet">
                    <Form.Label>Intezitet</Form.Label>
                    <Form.Control type="text" name="intezitet" required />
                </Form.Group>

                <Form.Group controlId="masnoce">
                    <Form.Label>Masnoce</Form.Label>
                    <Form.Control type="text" name="masnoce" required />
                </Form.Group>

                <Form.Group controlId="tekstura">
                    <Form.Label>Tekstura</Form.Label>
                    <Form.Control type="text" name="tekstura" required />
                </Form.Group>

                <Form.Group controlId="okus">
                    <Form.Label>Okus</Form.Label>
                    <Form.Control type="text" name="okus" required />
                </Form.Group>

<hr style={{marginTop: '50px', border: '0'}} />

                <Row>
                    <Col>
                        <Link to={RouteNames.SIREVI} className="btn btn-danger w-100">
                        Odustani
                        </Link>
                    </Col>
                    <Col>
                        <Button type="submit" variant="success w-100">
                            Dodaj novi sir
                        </Button>
                    </Col>
                </Row>

            </Form>
        
        </>
    )
}

