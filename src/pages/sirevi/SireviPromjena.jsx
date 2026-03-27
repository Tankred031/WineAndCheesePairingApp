import { Button, Col, Form, Row } from "react-bootstrap";
import { RouteNames } from "../../constants";
import { Link, useNavigate, useParams } from "react-router-dom";
import SireviService from "../../services/sirevi/SireviService";
import { useEffect, useState } from "react";


export default function SireviPromjena() {

    const navigate = useNavigate()
    const params = useParams()
    const [sir, setSir] = useState({})
    

    async function ucitajSir() {
        await SireviService.getById(params.id).then((odgovor)=>{
            const s = odgovor.data
            setSir(s)
        })

    }


    useEffect(() => {
        ucitajSir()
    }, [])


    async function promjeni(sir) {
        await SireviService.promjeni(params.id,sir).then(() => {
            navigate(RouteNames.SIREVI_PREGLED)
        })
    }


    function odradiSubmit(e) {
        e.preventDefault()
        const podaci = new FormData(e.target)
        promjeni({
            naziv: podaci.get('naziv'),
            tip: podaci.get('tip'),
            vrsta: podaci.get('vrsta'),
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
                Izmjena postojećeg sira
            </h3>
            <Form onSubmit={odradiSubmit}>
                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control type="text" name="naziv" required
                    defaultValue={sir.naziv} />
                </Form.Group>

                <Form.Group controlId="tip">
                    <Form.Label>Tip</Form.Label>
                    <Form.Control type="text" name="tip" required
                    defaultValue={sir.tip} />
                </Form.Group>

                <Form.Group controlId="vrsta">
                    <Form.Label>Vrsta</Form.Label>
                    <Form.Select name="vrsta" defaultValue={sir.vrsta} required>
                        <option value="kravlji">kravlji</option>
                        <option value="ovčji">ovčji</option>
                        <option value="kozji">kozji</option>
                        <option value="mješoviti">mješoviti</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group controlId="zrenje">
                    <Form.Label>Zrenje</Form.Label>
                    <Form.Control type="text" name="zrenje" required
                    defaultValue={sir.zrenje} />
                </Form.Group>

                <Form.Group controlId="regija">
                    <Form.Label>Regija</Form.Label>
                    <Form.Control type="text" name="regija" required
                    defaultValue={sir.regija} />
                </Form.Group>

                <Form.Group controlId="intezitet">
                    <Form.Label>Intezitet</Form.Label>
                    <Form.Control type="text" name="intezitet" required
                    defaultValue={sir.intezitet} />
                </Form.Group>

                <Form.Group controlId="masnoce">
                    <Form.Label>Masnoce</Form.Label>
                    <Form.Select name="masnoce" defaultValue={sir.masnoce} required>
                        <option value="visoke">visoke</option>
                        <option value="srednje">srednje</option>
                        <option value="niske">niske</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group controlId="tekstura">
                    <Form.Label>Tekstura</Form.Label>
                    <Form.Control type="text" name="tekstura" required
                    defaultValue={sir.tekstura} />
                </Form.Group>

                <Form.Group controlId="okus">
                    <Form.Label>Okus</Form.Label>
                    <Form.Control type="text" name="okus" required
                    defaultValue={sir.okus} />
                </Form.Group>

                <hr style={{ marginTop: '50px', border: '0' }} />

                <Row>
                    <Col>
                        <Link to={RouteNames.SIREVI_PREGLED} className="btn btn-danger w-100">
                            Odustani
                        </Link>
                    </Col>
                    <Col>
                        <Button type="submit" variant="success w-100">
                            Promjeni sir
                        </Button>
                    </Col>
                </Row>

            </Form>

        </>
    )
}

