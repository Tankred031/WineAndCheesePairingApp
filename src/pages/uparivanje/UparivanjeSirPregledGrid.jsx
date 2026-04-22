import { Card, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function UparivanjeSirPregledGrid({
    sirevi,
    getVina,
    navigate,
    obrisi
}) {

    return (
        <div className="d-flex flex-column gap-3">
            {sirevi.map(sir => (
                <Card key={sir.id}>
                    <Card.Body>

                        <h5 className="fw-bold text-primary mb-2">
                            {sir.naziv}
                        </h5>

                        <hr />

                        <div className="mb-2">
                            <strong>Vina:</strong> {getVina(sir.id)}
                        </div>

                        <hr />

                        <div className="d-flex gap-4 justify-content-around">

                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip>Promjena</Tooltip>}
                            >
                                <span>
                                    <FaEdit
                                        className="icon-btn text-warning"
                                        size={20}
                                        onClick={() => navigate(`/uparivanje/sir/${sir.id}`)}
                                    />
                                </span>
                            </OverlayTrigger>

                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip>Obriši</Tooltip>}
                            >
                                <span>
                                    <FaTrash
                                        className="icon-btn text-danger"
                                        size={20}
                                        onClick={() => obrisi(sir.id)}
                                    />
                                </span>
                            </OverlayTrigger>
                         
                        </div>

                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}