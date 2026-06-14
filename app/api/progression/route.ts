import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getPayload } from "@/lib/auth"

export async function GET() {
  try {
    const payload = await getPayload()
    if (!payload) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const progressions = await prisma.progression.findMany({
      where: { user_id: payload.userId },
      include: { tutoriel: true },
      orderBy: { startedAt: "desc" },
    })

    return NextResponse.json(progressions)
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const payload = await getPayload()
    if (!payload) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const { tutorialId, completed } = await req.json()

    if (!tutorialId || typeof tutorialId !== "number") {
      return NextResponse.json({ error: "tutorialId manquant ou invalide" }, { status: 400 })
    }

    if (typeof completed !== "boolean") {
      return NextResponse.json({ error: "completed doit être un booléen" }, { status: 400 })
    }

    const existing = await prisma.progression.findFirst({
      where: { user_id: payload.userId, tutorial_id: tutorialId },
    })

    const progression = existing
      ? await prisma.progression.update({
          where: { id: existing.id },
          data: { completed },
        })
      : await prisma.progression.create({
          data: {
            user_id: payload.userId,
            tutorial_id: tutorialId,
            startedAt: new Date(),
            completed,
          },
        })

    return NextResponse.json(progression)
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
