import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { comparePassword } from "@/lib/bcrypt"
import { signToken } from "@/lib/jwt"
import { loginSchema } from "@/lib/validations/auth"
import { checkRateLimit } from "@/lib/rateLimit"

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
    if (!checkRateLimit(`login:${ip}`, 10, 60_000)) {
      return NextResponse.json(
        { error: "Trop de tentatives. Réessayez dans une minute." },
        { status: 429 }
      )
    }

    const body = await req.json()
    const result = loginSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0].message },
        { status: 400 }
      )
    }

    const { email, password } = result.data

    const user = await prisma.utilisateur.findUnique({ where: { email } })
    if (!user) {
      return NextResponse.json(
        { error: "Email ou mot de passe incorrect" },
        { status: 401 }
      )
    }

    const passwordMatch = await comparePassword(password, user.password)
    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Email ou mot de passe incorrect" },
        { status: 401 }
      )
    }

    const token = await signToken({ userId: user.id, username: user.username, email: user.email, role: user.role })

    const response = NextResponse.json(
      { message: "Connexion réussie", userId: user.id },
      { status: 200 }
    )
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 6,
      path: "/",
    })

    return response
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}
