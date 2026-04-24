const STORAGE_KEY = "zanimljivosti_cards";

export function getCards() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

export function addCard(card) {
    if (!card.title || !card.text) return;

    const existing = getCards();

    const updated = [
        ...existing,
        {
            ...card,
            id: Date.now()
        }
    ];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}