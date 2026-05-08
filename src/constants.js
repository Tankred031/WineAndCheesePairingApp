export const IME_APLIKACIJE = 'Wine & Cheese Pairing App'

export const RouteNames = {
    HOME: '/',
    VINA_PREGLED: '/vina',
    SIREVI_PREGLED: '/sirevi',

    UPARIVANJE_VINO_PREGLED: '/uparivanje/vino',
    UPARIVANJE_VINO_PROMJENA: '/uparivanje/vino/:id',
    UPARIVANJE_SIR_PREGLED: '/uparivanje/sir',
    UPARIVANJE_SIR_PROMJENA: '/uparivanje/sir/:id',

    VINA_NOVI: '/vina/novi',
    SIREVI_NOVI: '/sirevi/novi',
    VINA_PROMJENA: '/vina/:id',
    SIREVI_PROMJENA: '/sirevi/:id',

    ZANIMLJIVOSTI: '/zanimljivosti/clanci',
    ZANIMLJIVOSTI_STATISTIKA: '/zanimljivosti/statistika',
    ZANIMLJIVOSTI_PREPORUKE: '/zanimljivosti/preporuke',
    ZANIMLJIVOSTI_NOVI: '/zanimljivosti/novi',
    ZANIMLJIVOSTI_PROMJENA: '/zanimljivosti/:id',

    OPERATERI: '/operateri',
    OPERATERI_NOVI: '/operateri/novi',
    OPERATERI_PROMJENA: '/operateri/:sifra',
    OPERATERI_PROMJENA_LOZINKE: '/operateri/:sifra/lozinka',

    GENERIRANJE_PODATAKA: '/generiraj-podatke',
    APLIKACIJE_POLAZNIKA: 'aplikacije-polazinika',

    LOGIN: '/login',
    REGISTRACIJA: '/registracija',

    NADZORNA_PLOCA: '/nadzorna-ploca',    

}

// memorija, localStorage, firebase
export const DATA_SOURCE = 'memorija';


export const PrefixStorage = {
    VINA: 'vina',
    SIREVI: 'sirevi',
    UPARIVANJA: 'uparivanja',
    CLANCI: 'clanci',
    OPERATERI: 'operateri'
}
