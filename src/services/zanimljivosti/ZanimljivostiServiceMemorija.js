let cards = [];

export function getCards() {
    return cards;
}

export function addCard(card) {
    if (!card.title || !card.text) return;

    cards = [...cards, {
        ...card,
        id: Date.now()
    }];
}