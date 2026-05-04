import { z } from 'zod'

export const ShemaUparivanje = z.object({
  vinoId: z.coerce.number(),
  sirId: z.coerce.number(),
  score: z.enum(["A", "B", "C"]).optional()
});