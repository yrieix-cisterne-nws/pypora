import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getPayload } from "@/lib/auth"

export async function GET() {
  try {
    const payload = await getPayload()
    if (!payload) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const user = await prisma.utilisateur.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "Utilisateur introuvable" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const payload = await getPayload()
    if (!payload) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const body = await req.json()
    const username = typeof body.username === "string" ? body.username.trim() : null
    if (!username || username.length < 2) {
      return NextResponse.json({ error: "Username invalide (min 2 caractères)" }, { status: 400 })
    }

    const updated = await prisma.utilisateur.update({
      where: { id: payload.userId },
      data: { username },
      select: { username: true },
    })

    return NextResponse.json(updated)
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function DELETE() {
  try {
    const payload = await getPayload()
    if (!payload) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    await prisma.progression.deleteMany({ where: { user_id: payload.userId } })
    await prisma.utilisateur.delete({ where: { id: payload.userId } })

    const response = NextResponse.json({ message: "Compte supprimé" })
    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    })

    return response
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
