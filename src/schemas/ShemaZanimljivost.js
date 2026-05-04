import { z } from 'zod'

export const ShemaZanimljivost = z.object({
  title: z.string()
    .trim()
    .min(3, "Naslov mora imati barem 3 znaka"),

  text: z.string()
    .trim()
    .min(5, "Tekst mora imati barem 5 znakova"),

  link: z.string()
    .url("Link mora biti validan URL")
    .or(z.literal(""))
    .optional(),

  img: z.string()
    .or(z.literal(""))
    .optional()
});