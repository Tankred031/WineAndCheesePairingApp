import { Offcanvas, ListGroup } from "react-bootstrap";
import {
    ZoomIn,
    ZoomOut,
    Contrast,
    Eye,
    Type,
    Underline,
    RotateCcw,
    Palette
} from "lucide-react";

const AccessibilityMenu = ({
    show,
    handleClose,
    increaseText,
    decreaseText,
    toggleGrayscale,
    toggleHighContrast,
    toggleNegativeContrast,
    toggleLightBackground,
    toggleUnderlineLinks,
    toggleReadableFont,
    resetAccessibility
}) => {
    return (
        <Offcanvas
            show={show}
            onHide={handleClose}
            placement="start"
            className="accessibility-offcanvas"
        >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                    Accessibility Tools
                </Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body className="p-0">
                <ListGroup variant="flush">

                    <ListGroup.Item
                        action
                        onClick={increaseText}
                        className="d-flex align-items-center gap-3"
                    >
                        <ZoomIn size={22} />
                        Increase Text
                    </ListGroup.Item>

                    <ListGroup.Item
                        action
                        onClick={decreaseText}
                        className="d-flex align-items-center gap-3"
                    >
                        <ZoomOut size={22} />
                        Decrease Text
                    </ListGroup.Item>

                    <ListGroup.Item
                        action
                        onClick={toggleGrayscale}
                        className="d-flex align-items-center gap-3"
                    >
                        <Palette size={22} />
                        Grayscale
                    </ListGroup.Item>

                    <ListGroup.Item
                        action
                        onClick={toggleHighContrast}
                        className="d-flex align-items-center gap-3"
                    >
                        <Contrast size={22} />
                        High Contrast
                    </ListGroup.Item>

                    <ListGroup.Item
                        action
                        onClick={toggleNegativeContrast}
                        className="d-flex align-items-center gap-3"
                    >
                        <Eye size={22} />
                        Negative Contrast
                    </ListGroup.Item>

                    <ListGroup.Item
                        action
                        onClick={toggleLightBackground}
                        className="d-flex align-items-center gap-3"
                    >
                        <Eye size={22} />
                        Light Background
                    </ListGroup.Item>

                    <ListGroup.Item
                        action
                        onClick={toggleUnderlineLinks}
                        className="d-flex align-items-center gap-3"
                    >
                        <Underline size={22} />
                        Links Underline
                    </ListGroup.Item>

                    <ListGroup.Item
                        action
                        onClick={toggleReadableFont}
                        className="d-flex align-items-center gap-3"
                    >
                        <Type size={22} />
                        Readable Font
                    </ListGroup.Item>

                    <ListGroup.Item
                        action
                        onClick={resetAccessibility}
                        className="d-flex align-items-center gap-3 text-danger"
                    >
                        <RotateCcw size={22} />
                        Reset
                    </ListGroup.Item>

                </ListGroup>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default AccessibilityMenu;