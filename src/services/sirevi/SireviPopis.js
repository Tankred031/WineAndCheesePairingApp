//možemo ovako, ali nek bude konzistentno s vinima
/*
export const VRSTE = [
    { id: 1, naziv: "kravlji" },
    { id: 2, naziv: "ovčji" },
    { id: 3, naziv: "kozji" },
    { id: 4, naziv: "miješano" }
]

export const MASNOCE = [
    { id: 1, naziv: "niske" },
    { id: 2, naziv: "srednje" },
    { id: 3, naziv: "visoke" }
]
*/


export const sirevi = [
    {
        id: 1,
        naziv: 'Cheddar',
        tip: 'tvrdi',
        vrsta_id: 1,
        zrenje: 'srednje do dugo',
        regija: 'Somerset',
        intezitet: 'srednji do jak',
        masnoca_id: 3,
        okus: 'orašast, pun, blago pikantan'
    },
    {
        id: 2,
        naziv: 'Brie',
        tip: 'mekani',
        vrsta_id: 1,
        zrenje: 'kratko',
        regija: 'Île-de-France',
        intezitet: 'blag',
        masnoca_id: 3,
        okus: 'maslac, blago gljivasto'
    },
    {
        id: 3,
        naziv: 'Camembert',
        tip: 'mekani',
        vrsta_id: 1,
        zrenje: 'kratko',
        regija: 'Normandija',
        intezitet: 'srednji',
        masnoca_id: 3,
        okus: 'zemljano, gljivasto'
    },
    {
        id: 4,
        naziv: 'Gouda',
        tip: 'polutvrdi',
        vrsta_id: 1,
        zrenje: 'srednje',
        regija: 'Gouda',
        intezitet: 'srednji',
        masnoca_id: 2,
        okus: 'karamel, orašasto'
    },
    {
        id: 5,
        naziv: 'Edam',
        tip: 'polutvrdi',
        vrsta_id: 1,
        zrenje: 'srednje',
        regija: 'Edam',
        intezitet: 'blag',
        masnoca_id: 2,
        okus: 'blago orašasto'
    },
    {
        id: 6,
        naziv: 'Parmezan',
        tip: 'tvrdi',
        vrsta_id: 1,
        zrenje: 'dugo',
        regija: 'Parma',
        intezitet: 'jak',
        masnoca_id: 3,
        okus: 'slano, orašasto, umami'
    },
    {
        id: 7,
        naziv: 'Grana Padano',
        tip: 'tvrdi',
        vrsta_id: 1,
        zrenje: 'dugo',
        regija: 'Padana nizina',
        intezitet: 'srednji',
        masnoca_id: 2,
        okus: 'orašasto, blago slano'
    },
    {
        id: 8,
        naziv: 'Roquefort',
        tip: 'plavi',
        vrsta_id: 2,
        zrenje: 'srednje',
        regija: 'Roquefort',
        intezitet: 'jak',
        masnoca_id: 3,
        okus: 'slano, pikantno'
    },
    {
        id: 9,
        naziv: 'Gorgonzola',
        tip: 'plavi',
        vrsta_id: 1,
        zrenje: 'srednje',
        regija: 'Lombardija',
        intezitet: 'jak',
        masnoca_id: 3,
        okus: 'pikantno, slatko'
    },
    {
        id: 10,
        naziv: 'Stilton',
        tip: 'plavi',
        vrsta_id: 1,
        zrenje: 'srednje',
        regija: 'Nottinghamshire',
        intezitet: 'jak',
        masnoca_id: 3,
        okus: 'bogato, pikantno'
    },
    {
        id: 11,
        naziv: 'Feta',
        tip: 'mekani',
        vrsta_id: 2,
        zrenje: 'kratko',
        regija: 'Makedonija',
        intezitet: 'srednji',
        masnoca_id: 2,
        okus: 'slano, kiselo'
    },
    {
        id: 12,
        naziv: 'Mozzarella',
        tip: 'svježi',
        vrsta_id: 1,
        zrenje: 'svježi',
        regija: 'Campania',
        intezitet: 'blag',
        masnoca_id: 2,
        okus: 'mliječno, blago'
    },
    {
        id: 13,
        naziv: 'Ricotta',
        tip: 'svježi',
        vrsta_id: 1,
        zrenje: 'svježi',
        regija: 'Toscana',
        intezitet: 'blag',
        masnoca_id: 1,
        okus: 'blago slatko'
    },
    {
        id: 14,
        naziv: 'Mascarpone',
        tip: 'svježi',
        vrsta_id: 1,
        zrenje: 'svježi',
        regija: 'Lombardija',
        intezitet: 'blag',
        masnoca_id: 3,
        okus: 'slatko, bogato'
    },
    {
        id: 15,
        naziv: 'Emmental',
        tip: 'tvrdi',
        vrsta_id: 1,
        zrenje: 'srednje',
        regija: 'Emmental',
        intezitet: 'srednji',
        masnoca_id: 2,
        okus: 'orašasto'
    },
    {
        id: 16,
        naziv: 'Gruyere',
        tip: 'tvrdi',
        vrsta_id: 1,
        zrenje: 'dugo',
        regija: 'Gruyères',
        intezitet: 'jak',
        masnoca_id: 3,
        okus: 'orašasto, slatko'
    },
    {
        id: 17,
        naziv: 'Comte',
        tip: 'tvrdi',
        vrsta_id: 1,
        zrenje: 'dugo',
        regija: 'Jura',
        intezitet: 'srednje-jak',
        masnoca_id: 3,
        okus: 'orašasto, voćno'
    },
    {
        id: 18,
        naziv: 'Reblochon',
        tip: 'mekani',
        vrsta_id: 1,
        zrenje: 'kratko',
        regija: 'Savoja',
        intezitet: 'srednji',
        masnoca_id: 3,
        okus: 'maslac, orašasto'
    },
    {
        id: 19,
        naziv: 'Taleggio',
        tip: 'mekani',
        vrsta_id: 1,
        zrenje: 'srednje',
        regija: 'Lombardija',
        intezitet: 'srednje-jak',
        masnoca_id: 3,
        okus: 'jak, aromatičan'
    },
    {
        id: 20,
        naziv: 'Pecorino',
        tip: 'tvrdi',
        vrsta_id: 2,
        zrenje: 'dugo',
        regija: 'Sardinija',
        intezitet: 'jak',
        masnoca_id: 3,
        okus: 'slan, pikantan'
    },
    {
        id: 21,
        naziv: 'Manchego',
        tip: 'tvrdi',
        vrsta_id: 2,
        zrenje: 'srednje',
        regija: 'La Mancha',
        intezitet: 'srednji',
        masnoca_id: 3,
        okus: 'orašasto, blago slano'
    },
    {
        id: 22,
        naziv: 'Halloumi',
        tip: 'polutvrdi',
        vrsta_id: 4,
        zrenje: 'kratko',
        regija: 'Nicosia',
        intezitet: 'srednji',
        masnoca_id: 2,
        okus: 'slano'
    },
    {
        id: 23,
        naziv: 'Paški sir',
        tip: 'tvrdi',
        vrsta_id: 2,
        zrenje: 'dugo',
        regija: 'Pag',
        intezitet: 'jak',
        masnoca_id: 3,
        okus: 'slan, aromatičan'
    },
    {
        id: 24,
        naziv: 'Trappista',
        tip: 'polutvrdi',
        vrsta_id: 1,
        zrenje: 'srednje',
        regija: 'Alföld',
        intezitet: 'blag',
        masnoca_id: 2,
        okus: 'blago, mliječno'
    },
    {
        id: 25,
        naziv: 'Kashkaval',
        tip: 'polutvrdi',
        vrsta_id: 2,
        zrenje: 'srednje',
        regija: 'Balkan',
        intezitet: 'srednji',
        masnoca_id: 3,
        okus: 'blago pikantan'
    },
    {
        id: 26,
        naziv: 'Tilsit',
        tip: 'polutvrdi',
        vrsta_id: 1,
        zrenje: 'srednje',
        regija: 'Schleswig-Holstein',
        intezitet: 'srednji',
        masnoca_id: 2,
        okus: 'blago pikantan'
    },
    {
        id: 27,
        naziv: 'Lički škripavac',
        tip: 'svježi',
        vrsta_id: 1,
        zrenje: 'svježi',
        regija: 'Lika',
        intezitet: 'blag',
        masnoca_id: 2,
        okus: 'mliječno, blago slano'
    },
    {
        id: 28,
        naziv: 'Prgica',
        tip: 'svježi',
        vrsta_id: 1,
        zrenje: 'kratko',
        regija: 'Međimurje',
        intezitet: 'jak',
        masnoca_id: 1,
        okus: 'pikantno, paprika'
    },
    {
        id: 29,
        naziv: 'Krčki sir',
        tip: 'tvrdi',
        vrsta_id: 2,
        zrenje: 'srednje',
        regija: 'Krk',
        intezitet: 'srednje-jak',
        masnoca_id: 3,
        okus: 'aromatično, biljno'
    },
    {
        id: 30,
        naziv: 'Dubrovački sir',
        tip: 'tvrdi',
        vrsta_id: 4,
        zrenje: 'srednje',
        regija: 'Dubrovnik',
        intezitet: 'srednje-jak',
        masnoca_id: 3,
        okus: 'bogato, aromatično'
    },
    {
        id: 31,
        naziv: 'Sir iz mišine',
        tip: 'tvrdi',
        vrsta_id: 2,
        zrenje: 'dugo',
        regija: 'Dalmacija',
        intezitet: 'jak',
        masnoca_id: 3,
        okus: 'intenzivno, pikantno'
    },
    {
        id: 32,
        naziv: 'Wensleydale',
        tip: 'polutvrdi',
        vrsta_id: 1,
        zrenje: 'kratko do srednje',
        regija: 'Yorkshire',
        intezitet: 'blag',
        masnoca_id: 2,
        okus: 'svježe, blago kiselo'
    },
    {
        id: 33,
        naziv: 'Dimsi',
        tip: 'polutvrdi',
        vrsta_id: 1,
        zrenje: 'srednje',
        regija: 'Hrvatska',
        intezitet: 'srednji',
        masnoca_id: 3,
        okus: 'dimljeno, blago pikantno'
    },
    {
        id: 34,
        naziv: 'Caprilo',
        tip: 'mekani',
        vrsta_id: 3,
        zrenje: 'kratko',
        regija: 'Hrvatska',
        intezitet: 'srednji',
        masnoca_id: 2,
        okus: 'svježe, blago kiselo'
    },
    {
        id: 35,
        naziv: 'Chèvre',
        tip: 'mekani',
        vrsta_id: 3,
        zrenje: 'kratko',
        regija: 'Loire',
        intezitet: 'blagi',
        masnoca_id: 2,
        okus: 'svježe, blago kiselo'
    },
    {
        id: 36,
        naziv: 'Bûcheron',
        tip: 'polumekani',
        vrsta_id: 3,
        zrenje: 'srednje',
        regija: 'Loire',
        intezitet: 'srednji',
        masnoca_id: 2,
        okus: 'kremasto, blago orašasto'
    },
    {
        id: 37,
        naziv: 'Garrotxa',
        tip: 'polutvrdi',
        vrsta_id: 3,
        zrenje: 'srednje',
        regija: 'Katalonija',
        intezitet: 'srednji',
        masnoca_id: 2,
        okus: 'zemljano, orašasto'
    },
    {
        id: 38,
        naziv: 'Caprino',
        tip: 'mekani',
        vrsta_id: 3,
        zrenje: 'kratko',
        regija: 'Pijemont',
        intezitet: 'blagi',
        masnoca_id: 2,
        okus: 'svježe, blago kiselo'
    },
    {
        id: 39,
        naziv: 'Asiago',
        tip: 'polutvrdi',
        vrsta_id: 1,
        zrenje: 'srednje',
        regija: 'Veneto',
        intezitet: 'srednji',
        masnoca_id: 2,
        okus: 'orašasto, blago slatko'
    },
    {
        id: 40,
        naziv: 'Provolone',
        tip: 'polutvrdi',
        vrsta_id: 1,
        zrenje: 'srednje do dugo',
        regija: 'Južna Italija',
        intezitet: 'srednje-jak',
        masnoca_id: 3,
        okus: 'pikantno, dimljeno'
    },
    {
        id: 41,
        naziv: 'Scamorza',
        tip: 'polumekani',
        vrsta_id: 1,
        zrenje: 'kratko',
        regija: 'Italija',
        intezitet: 'blag',
        masnoca_id: 2,
        okus: 'mliječno, blago dimljeno'
    },
    {
        id: 42,
        naziv: 'Saint-Nectaire',
        tip: 'mekani',
        vrsta_id: 1,
        zrenje: 'srednje',
        regija: 'Auvergne',
        intezitet: 'srednji',
        masnoca_id: 3,
        okus: 'orašasto, zemljano'
    },
    {
        id: 43,
        naziv: 'Langres',
        tip: 'mekani',
        vrsta_id: 1,
        zrenje: 'kratko',
        regija: 'Champagne',
        intezitet: 'jak',
        masnoca_id: 3,
        okus: 'intenzivno, kremasto'
    },
    {
        id: 44,
        naziv: 'Valençay',
        tip: 'mekani',
        vrsta_id: 3,
        zrenje: 'kratko',
        regija: 'Loire',
        intezitet: 'srednji',
        masnoca_id: 2,
        okus: 'svježe, blago orašasto'
    },
    {
        id: 45,
        naziv: 'Idiazabal',
        tip: 'tvrdi',
        vrsta_id: 2,
        zrenje: 'srednje',
        regija: 'Baskija',
        intezitet: 'jak',
        masnoca_id: 3,
        okus: 'dimljeno, orašasto'
    }
]