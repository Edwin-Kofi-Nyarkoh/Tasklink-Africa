import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, password } = await request.json()

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ message: "Password must be at least 6 characters" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
      include: { accounts: true },
    })

    if (existingUser) {
      // Check if user has OAuth account
      const hasOAuthAccount = existingUser.accounts.some((account :{provider: string}) => account.provider === "google")

      if (hasOAuthAccount) {
        return NextResponse.json(
          {
            message: "An account with this email already exists. Please sign in with Google.",
            error: "OAUTH_ACCOUNT_EXISTS",
          },
          { status: 409 },
        )
      } else {
        return NextResponse.json({ message: "User already exists with this email" }, { status: 409 })
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        role: "CUSTOMER",
      },
    })

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json(
      {
        message: "User created successfully",
        user: userWithoutPassword,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
