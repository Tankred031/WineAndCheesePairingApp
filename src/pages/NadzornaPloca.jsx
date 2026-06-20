import { useEffect, useState } from "react";
import { Container, Table, Card, Row, Col, Button, ButtonGroup } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import OperaterServiceLocalStorage from "../services/operateri/OperaterServiceLocalStorage";

export default function NadzornaPloca() {

    const [prijave, setPrijave] = useState({})

    const { logout } = useAuth();

    const promijeniIzvor = async (noviIzvor) => {

    let izvor = 'memorija';

    if (noviIzvor === 'localStorage') {
        const servis =
            await OperaterServiceLocalStorage.get();

        if (servis.data.length > 0) {
            izvor = noviIzvor;
        }
    }
    
    localStorage.setItem('dataSource', izvor);

    //logout();

    window.location.reload();
};
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

            <Card className="shadow-sm mt-4 mb-5">
                <Card.Body className="text-center">
                    <h4 className="section-title mb-4">
                        Izvor podataka
                    </h4>

                    <ButtonGroup>
                        <Button
                            onClick={() =>
                                promijeniIzvor('memorija')}
                            className='btn btn-info'

                        >
                            Memorija
                        </Button>

                        <Button
                            onClick={() =>
                                promijeniIzvor('localStorage')}
                            className='btn btn-primary'
                        >
                            LocalStorage
                        </Button>                      

                    </ButtonGroup>
                </Card.Body>
            </Card>
        </Container >
    )
}