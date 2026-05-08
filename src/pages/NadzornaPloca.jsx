import { useEffect, useState } from "react";
import { Container, Table, Card } from "react-bootstrap";

export default function NadzornaPloca() {

    const [prijave, setPrijave] = useState({})

    useEffect(() => {

        const podaci = JSON.parse(
            localStorage.getItem("brojPrijava")
        ) || {}

        setPrijave(podaci)

    }, [])



    return (

        <Container className="mt-4">


            <Card className="shadow-sm mt-4">

                <Card.Body>

                    <h4 className="section-title mb-4">
                        Statistika prijava
                    </h4>

                    <Table striped bordered hover>

                        <thead>
                            <tr>
                                <th className="text-center">Korisnik</th>
                                <th className="text-center">Broj prijava</th>
                            </tr>
                        </thead>

                        <tbody>

                            {Object.keys(prijave).length === 0 ? (

                                <tr>
                                    <td colSpan="2">
                                        Nema podataka
                                    </td>
                                </tr>

                            ) : (

                                Object.entries(prijave).map(
                                    ([email, broj]) => (

                                        <tr key={email}>
                                            <td>{email}</td>
                                            <td className="text-center">{broj}</td>
                                        </tr>

                                    )
                                )

                            )}

                        </tbody>

                    </Table>

                </Card.Body>

            </Card>

        </Container>
    )
}