import { z } from 'zod'

export const ShemaSir = z.object({
  naziv: z.string()
    .trim()
    .min(2, "Naziv mora imati barem 2 znaka"),

  tip: z.z.coerce.number()
    .min(1, "Odaberite tip"),

  vrsta_id: z.coerce.number()
    .min(1, "Odaberite vrstu"),

  zrenje: z.string()
    .trim()
    .min(1, "Zrenje je obavezno"),

  regija: z.string()
    .trim()
    .min(2, "Regija je obavezna"),

  intenzitet: z.string()
    .trim()
    .min(1, "Intenzitet je obavezan"),

  masnoca_id: z.coerce.number()
    .min(1, "Odaberite masnoću"),

  okus: z.string()
    .trim()
    .min(2, "Opis okusa je obavezan")
});