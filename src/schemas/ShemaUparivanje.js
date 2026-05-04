import { z } from 'zod'

// vino -> sirevi
export const ShemaUparivanje = z.object({
    vinoId: z.coerce.number()
        .min(1, "Vino je obavezno"),

    sirevi: z.array(z.coerce.number())
        .min(1, "Odaberite barem jedan sir")
        .max(15, "Previše sireva odabrano"),

    score: z.enum(["A", "B", "C"]).optional()
});


// sir -> vina
export const ShemaUparivanjeSir = z.object({
    sirId: z.coerce.number()
        .min(1, "Sir je obavezan"),

    vina: z.array(z.coerce.number())
        .min(1, "Odaberite barem jedno vino")
        .max(15, "Previše vina odabrano")
});