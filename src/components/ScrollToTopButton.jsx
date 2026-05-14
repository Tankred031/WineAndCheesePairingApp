import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTopButton() {

    const [visible, setVisible] = useState(false);

    useEffect(() => {

        function handleScroll() {
            setVisible(window.scrollY > 300);
        }

        window.addEventListener("scroll", handleScroll);

        return () =>
            window.removeEventListener("scroll", handleScroll);

    }, []);

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }

    if (!visible) return null;
    return (
        <button
            onClick={scrollToTop}
            className="scroll-top-btn"
            aria-label="Povratak na vrh stranice"
        >
            <FaArrowUp style={{ color: "black" }} />
        </button>
    );
}