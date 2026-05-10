import { z } from 'zod'

export const ShemaSir = z.object({

  naziv: z.string({
    required_error: 'Naziv je obavezan'
  })
    .trim()
    .min(1, 'Naziv je obavezan')
    .max(26, 'Naziv je predug')
    .regex(
      /^[^\d]+$/,
      'Naziv ne može sadržavati brojeve'
    ),

  tip_id: z.string()
    .min(1, 'Odaberite tip'),

  vrsta_id: z.string()
    .min(1, 'Odaberite vrstu'),

  zrenje_id: z.string()
    .trim()
    .min(1, 'Zrenje je obavezno'),

  regija: z.string()
    .trim()
    .min(2, 'Regija je obavezna'),

  intenzitet_id: z.string()
    .trim()
    .min(1, 'Intenzitet je obavezan'),

  masnoca_id: z.string()
    .min(1, 'Odaberite masnoću'),

  okus: z.string()
    .optional(),
});