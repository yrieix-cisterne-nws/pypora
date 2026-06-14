import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { tutorielSchema } from "@/lib/validations/tutoriels"
import { getPayload } from "@/lib/auth"

async function requireAdmin() {
  const payload = await getPayload()
  return payload?.role === "admin" ? payload : null
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const numId = parseInt(id, 10)
    if (isNaN(numId)) {
      return NextResponse.json({ error: "ID invalide" }, { status: 400 })
    }

    const payload = await getPayload()
    const isAdmin = payload?.role === "admin"

    const tutoriel = await prisma.tutoriel.findUnique({
      where: {
        id: numId,
        ...(!isAdmin ? { published: true } : {}),
      },
      include: { categorie: true },
    })

    if (!tutoriel) {
      return NextResponse.json({ error: "Tutoriel introuvable" }, { status: 404 })
    }

    return NextResponse.json(tutoriel)
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await requireAdmin()
    if (!admin) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 403 })
    }

    const { id } = await params
    const numId = parseInt(id, 10)
    if (isNaN(numId)) {
      return NextResponse.json({ error: "ID invalide" }, { status: 400 })
    }

    const exists = await prisma.tutoriel.findUnique({ where: { id: numId } })
    if (!exists) {
      return NextResponse.json({ error: "Tutoriel introuvable" }, { status: 404 })
    }

    const body = await req.json()
    const result = tutorielSchema.partial().safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      )
    }

    const tutoriel = await prisma.tutoriel.update({
      where: { id: numId },
      data: result.data,
    })

    return NextResponse.json(tutoriel)
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await requireAdmin()
    if (!admin) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 403 })
    }

    const { id } = await params
    const numId = parseInt(id, 10)
    if (isNaN(numId)) {
      return NextResponse.json({ error: "ID invalide" }, { status: 400 })
    }

    const exists = await prisma.tutoriel.findUnique({ where: { id: numId } })
    if (!exists) {
      return NextResponse.json({ error: "Tutoriel introuvable" }, { status: 404 })
    }

    await prisma.progression.deleteMany({ where: { tutorial_id: numId } })
    await prisma.tutoriel.delete({ where: { id: numId } })

    return NextResponse.json({ message: "Tutoriel supprimé" })
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
