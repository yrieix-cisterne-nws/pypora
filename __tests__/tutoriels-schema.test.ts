import { describe, it, expect } from "vitest"
import { tutorielSchema } from "@/lib/validations/tutoriels"

const valid = {
  title: "Introduction à Python",
  slug: "intro-python",
  description: "Un tutoriel pour débuter avec Python.",
  contenu: "## Chapitre 1\nContenu du tutoriel...",
  category: "python",
  imageurl: "https://example.com/python.png",
}

describe("tutorielSchema", () => {
  it("accepte un tutoriel valide", () => {
    const result = tutorielSchema.safeParse(valid)
    expect(result.success).toBe(true)
  })

  it("publie à false par défaut si omis", () => {
    const result = tutorielSchema.safeParse(valid)
    expect(result.success && result.data.published).toBe(false)
  })

  it("accepte published: true explicitement", () => {
    const result = tutorielSchema.safeParse({ ...valid, published: true })
    expect(result.success && result.data.published).toBe(true)
  })

  it("rejette un titre vide", () => {
    const result = tutorielSchema.safeParse({ ...valid, title: "" })
    expect(result.success).toBe(false)
    expect(result.error?.issues[0].message).toBe("Le titre est requis")
  })

  it("rejette un slug avec des majuscules", () => {
    const result = tutorielSchema.safeParse({ ...valid, slug: "Intro-Python" })
    expect(result.success).toBe(false)
    expect(result.error?.issues[0].message).toMatch(/Slug invalide/)
  })

  it("rejette un slug avec des espaces", () => {
    const result = tutorielSchema.safeParse({ ...valid, slug: "intro python" })
    expect(result.success).toBe(false)
  })

  it("rejette une imageurl invalide", () => {
    const result = tutorielSchema.safeParse({ ...valid, imageurl: "pas-une-url" })
    expect(result.success).toBe(false)
    expect(result.error?.issues[0].message).toBe("URL d'image invalide")
  })

  it("rejette si contenu absent", () => {
    const { contenu: _, ...rest } = valid
    const result = tutorielSchema.safeParse(rest)
    expect(result.success).toBe(false)
  })

  it("rejette si category absente", () => {
    const { category: _, ...rest } = valid
    const result = tutorielSchema.safeParse(rest)
    expect(result.success).toBe(false)
  })
})
