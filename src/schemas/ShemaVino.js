import { z } from 'zod'

export const ShemaVino = z.object({
  naziv: z.string()
    .trim()
    .min(2, "Naziv mora imati barem 2 znaka")
    .max(100, "Naziv je predug"),

  tip_id: z.coerce.number()
    .min(1, "Odaberite tip vina"),

  regija: z.string()
    .trim()
    .min(2, "Regija je obavezna"),

  temperatura_min: z.coerce.number()
    .min(0, "Minimalna temperatura mora biti ≥ 0"),

  temperatura_max: z.coerce.number()
    .min(0, "Maksimalna temperatura mora biti ≥ 0"),

  slatkoca_id: z.coerce.number()
    .min(1, "Odaberite slatkoću"),

  arome: z.string()
    .optional(),

  tijelo: z.string()
    .optional(),

  alkohol_min: z.coerce.number()
  .min(8, "Minimalni alkohol je 8%")
  .max(25, "Max alkohol je 25%"),

alkohol_max: z.coerce.number()
  .min(8)
  .max(25),
});