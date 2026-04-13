"use client"
import { signIn, signOut, useSession } from "next-auth/react"
import { useEffect } from "react"

export default function Home() {
  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      fetch("/api/user/sync", { method: "POST" })
    }
  }, [session])

  return (
    <main style={{ padding: "2rem" }}>
      <h1>DevMatch</h1>
      {session ? (
        <div>
          <p>Welcome, {session.user?.name}!</p>
          <p>@{(session.user as any).username}</p>
          <button onClick={() => signOut()}>Logout</button>
        </div>
      ) : (
        <button onClick={() => signIn("github")}>
          Login with GitHub
        </button>
      )}
    </main>
  )
}