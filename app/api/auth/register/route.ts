import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { hashPassword } from "@/lib/bcrypt"
import { registerSchema } from "@/lib/validations/auth"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const result = registerSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: result.error.errors[0].message },
        { status: 400 }
      )
    }
    const { username, email, password } = result.data
    
    const existingUser = await prisma.utilisateur.findUnique({
      where: { email },
    })
    if (existingUser) {
      return NextResponse.json(
        { error: "Cet email est déjà utilisé" },
        { status: 409 }
      )
    }
    const hashedPassword = await hashPassword(password)

    const user = await prisma.utilisateur.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role: "user",
      },
    })
    return NextResponse.json(
      { message: "Compte créé avec succès", userId: user.id },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}