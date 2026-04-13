import { getServerSession } from "next-auth"
import { connectDB } from "@/lib/mongodb"
import User from "@/models/User"
import { fetchGitHubProfile } from "@/lib/github"
import { NextResponse } from "next/server"

export async function POST() {
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  await connectDB()

  const data = await fetchGitHubProfile(
    (session.user as any).username,
    (session as any).accessToken
  )

  await User.findOneAndUpdate(
    { githubId: data.githubId },
    { ...data, lastActive: new Date() },
    { upsert: true, new: true }
  )

  return NextResponse.json({ success: true })
}