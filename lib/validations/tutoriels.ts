import { z } from "zod"

export const tutorielSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  slug: z
    .string()
    .min(1, "Le slug est requis")
    .regex(/^[a-z0-9-]+$/, "Slug invalide (minuscules, chiffres, tirets uniquement)"),
  description: z.string().min(1, "La description est requise"),
  contenu: z.string().min(1, "Le contenu est requis"),
  category: z.string().min(1, "La catégorie est requise"),
  imageurl: z.string().url("URL d'image invalide"),
  published: z.boolean().optional().default(false),
})

export type TutorielInput = z.infer<typeof tutorielSchema>
