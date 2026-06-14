import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyToken } from "@/lib/jwt"
import { tutorielSchema } from "@/lib/validations/tutoriels"
import { cookies } from "next/headers"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get("category")

    const tutoriels = await prisma.tutoriel.findMany({
      where: {
        published: true,
        ...(category ? { categorie: { slug: category } } : {}),
      },
      include: { categorie: true },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(tutoriels)
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const token = (await cookies()).get("token")?.value
    const payload = token ? await verifyToken(token) : null

    if (!payload || payload.role !== "admin") {
      return NextResponse.json({ error: "Non autorisé" }, { status: 403 })
    }

    const body = await req.json()
    const result = tutorielSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      )
    }

    const tutoriel = await prisma.tutoriel.create({
      data: result.data,
    })

    return NextResponse.json(tutoriel, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}