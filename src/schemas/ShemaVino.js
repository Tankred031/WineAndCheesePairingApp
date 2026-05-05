import { z } from 'zod'

export const ShemaVino = z.object({
  naziv: z.string({
  required_error: "Naziv je obavezan"
})
    .trim()
    .min(1, "Naziv je obavezan")
    .max(26, "Naziv je predug")
    .regex(/^[^\d]+$/, "Naziv ne može sadržavati brojeve"),

  tip_id: z.coerce.number()
    .min(1, "Odaberite tip vina"),

  regija: z.string()
    .trim()
    .min(2, "Regija je obavezna"),

  temperatura_min: z.coerce.number()
    .min(8, "Minimalna temperatura je 8°C"),

  temperatura_max: z.coerce.number()
    .max(18, "Maksimalna temperatura je 18°C"),

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