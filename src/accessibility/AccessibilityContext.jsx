import { createContext, useContext, useEffect, useState } from "react";

const AccessibilityContext = createContext();

export const AccessibilityProvider = ({ children }) => {

    const [fontScale, setFontScale] = useState(
        Number(localStorage.getItem("fontScale")) || 1
    );

    const [grayscale, setGrayscale] = useState(
        localStorage.getItem("grayscale") === "true"
    );

    const [highContrast, setHighContrast] = useState(
        localStorage.getItem("highContrast") === "true"
    );

    const [negativeContrast, setNegativeContrast] = useState(
        localStorage.getItem("negativeContrast") === "true"
    );

    const [lightBackground, setLightBackground] = useState(
        localStorage.getItem("lightBackground") === "true"
    );

    const [underlineLinks, setUnderlineLinks] = useState(
        localStorage.getItem("underlineLinks") === "true"
    );

    const [readableFont, setReadableFont] = useState(
        localStorage.getItem("readableFont") === "true"
    );

    // FONT SIZE
    useEffect(() => {
        document.documentElement.style.fontSize = `${fontScale}rem`;
        localStorage.setItem("fontScale", fontScale);
    }, [fontScale]);

    // GRAYSCALE
    useEffect(() => {
        document.body.classList.toggle("grayscale", grayscale);
        localStorage.setItem("grayscale", grayscale);
    }, [grayscale]);

    // HIGH CONTRAST
    useEffect(() => {
        document.body.classList.toggle("high-contrast", highContrast);
        localStorage.setItem("highContrast", highContrast);
    }, [highContrast]);

    // NEGATIVE CONTRAST
    useEffect(() => {
        document.body.classList.toggle("negative-contrast", negativeContrast);
        localStorage.setItem("negativeContrast", negativeContrast);
    }, [negativeContrast]);

    // LIGHT BACKGROUND
    useEffect(() => {
        document.body.classList.toggle("light-background", lightBackground);
        localStorage.setItem("lightBackground", lightBackground);
    }, [lightBackground]);

    // UNDERLINE LINKS
    useEffect(() => {
        document.body.classList.toggle("underline-links", underlineLinks);
        localStorage.setItem("underlineLinks", underlineLinks);
    }, [underlineLinks]);

    // READABLE FONT
    useEffect(() => {
        document.body.classList.toggle("readable-font", readableFont);
        localStorage.setItem("readableFont", readableFont);
    }, [readableFont]);

    // ACTIONS

    const increaseText = () => {
        setFontScale((prev) => Math.min(prev + 0.1, 1.5));
    };

    const decreaseText = () => {
        setFontScale((prev) => Math.max(prev - 0.1, 0.8));
    };

    const toggleGrayscale = () => {
        setGrayscale((prev) => !prev);
    };

    const toggleHighContrast = () => {
        setHighContrast((prev) => !prev);
    };

    const toggleNegativeContrast = () => {
        setNegativeContrast((prev) => !prev);
    };

    const toggleLightBackground = () => {
        setLightBackground((prev) => !prev);
    };

    const toggleUnderlineLinks = () => {
        setUnderlineLinks((prev) => !prev);
    };

    const toggleReadableFont = () => {
        setReadableFont((prev) => !prev);
    };

    const resetAccessibility = () => {

        setFontScale(1);

        setGrayscale(false);
        setHighContrast(false);
        setNegativeContrast(false);
        setLightBackground(false);
        setUnderlineLinks(false);
        setReadableFont(false);

        localStorage.removeItem("fontScale");
        localStorage.removeItem("grayscale");
        localStorage.removeItem("highContrast");
        localStorage.removeItem("negativeContrast");
        localStorage.removeItem("lightBackground");
        localStorage.removeItem("underlineLinks");
        localStorage.removeItem("readableFont");

        document.body.classList.remove(
            "grayscale",
            "high-contrast",
            "negative-contrast",
            "light-background",
            "underline-links",
            "readable-font"
        );

        document.documentElement.style.fontSize = "1rem";
    };

    return (
        <AccessibilityContext.Provider
            value={{
                increaseText,
                decreaseText,
                toggleGrayscale,
                toggleHighContrast,
                toggleNegativeContrast,
                toggleLightBackground,
                toggleUnderlineLinks,
                toggleReadableFont,
                resetAccessibility,

                grayscale,
                highContrast,
                negativeContrast,
                lightBackground,
                underlineLinks,
                readableFont,
                fontScale
            }}
        >
            {children}
        </AccessibilityContext.Provider>
    );
};

export const useAccessibility = () => useContext(AccessibilityContext);