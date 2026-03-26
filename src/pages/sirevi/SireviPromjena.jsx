import { Button, Col, Form, Row } from "react-bootstrap"
import { RouteNames } from "../../constants"
import { Link, useNavigate, useParams } from "react-router-dom"
import SireviService from "../../services/sirevi/SireviService"
import { use, useEffect, useState } from "react"

export default function SireviPromjena() {

    const navigate = useNavigate()
    const params = useParams()
    const [sirevi, setSirevi] = useState({})
    const [aktivan, setAktivan] = useState(false)
    

    async function ucitajSirevi() {
        await SireviService.getById(params.id).then((odgovor) => {

            const s = odgovor.data

            setSirevi(s)

            setAktivan(s.aktivan)

        })

    }



    useEffect(() => {
        ucitajSirevi
    }, [])

    async function promjeni(sirevi) {
        await SireviService.promjeni(params.id, sirevi).then(() => {
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
                Unos novog sira
            </h3>
            <Form onSubmit={odradiSubmit}>
                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control type="text" name="naziv" required />
                </Form.Group>

                <Form.Group controlId="tip">
                    <Form.Label>Tip</Form.Label>
                    <Form.Control type="text" name="zrenje" required />
                </Form.Group>

                <Form.Group controlId="vrsta">
                    <Form.Label>Vrsta</Form.Label>
                    <Form.Select name="vrsta" required>
                        <option value="kravlji">kravlji</option>
                        <option value="ovčji">ovčji</option>
                        <option value="kozji">kozji</option>
                        <option value="mješoviti">mješoviti</option>
                    </Form.Select>
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
                    <Form.Select name="masnoce" required>
                        <option value="visoke">visoke</option>
                        <option value="srednje">srednje</option>
                        <option value="niske">niske</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group controlId="tekstura">
                    <Form.Label>Tekstura</Form.Label>
                    <Form.Control type="text" name="tekstura" required />
                </Form.Group>

                <Form.Group controlId="okus">
                    <Form.Label>Okus</Form.Label>
                    <Form.Control type="text" name="okus" required />
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
                            Dodaj novi sir
                        </Button>
                    </Col>
                </Row>

            </Form>

        </>
    )
}

