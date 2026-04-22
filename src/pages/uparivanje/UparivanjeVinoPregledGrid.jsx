import { Card, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function UparivanjeVinoPregledGrid({
    vina,
    getBojaVina,
    getSirevi,
    getOcjena,
    getSireviObjekti,
    navigate,
    obrisi
}) {

    return (
        <div className="d-flex flex-column gap-3">
            {vina.map(vino => {

                const ocjena = getOcjena(vino, getSireviObjekti(vino.id));

                return (
                    <Card key={vino.id}>
                        <Card.Body>

                            <h5 className="fw-bold text-primary mb-2">
                                {vino.naziv}
                            </h5>

                            <hr />

                            <div className="mb-2">
                                <strong>Boja:</strong>
                                <span
                                    className="color-dot ms-2"
                                    style={{ backgroundColor: getBojaVina(vino.id) }}
                                />
                            </div>

                            <div className="mb-2">
                                <strong>Sirevi:</strong> {getSirevi(vino.id)}
                            </div>

                            <div className="mb-2">
                                <strong>Ocjena:</strong>{" "}
                                <span className="badge bg-primary">
                                    {getOcjena(vino, getSireviObjekti(vino.id))}
                                </span>
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
                                            onClick={() => navigate(`/uparivanje/vino/${vino.id}`)}
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
                                            onClick={() => obrisi(vino.id)}
                                        />
                                    </span>
                                </OverlayTrigger>

                            </div>
                        </Card.Body>
                    </Card>
                );
            })}
        </div>
    );
}