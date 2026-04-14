"use client"
import { useSession, signOut } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [lookingFor, setLookingFor] = useState("")

  useEffect(() => {
    if (status === "unauthenticated") router.push("/")
  }, [status])

  useEffect(() => {
    if (session) {
      fetch("/api/user/me")
        .then(r => r.json())
        .then(data => {
          setUser(data)
          setLookingFor(data.lookingFor || "")
        })
    }
  }, [session])

  const updateLookingFor = async (value: string) => {
    setLookingFor(value)
    await fetch("/api/user/me", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lookingFor: value })
    })
  }

  if (status === "loading" || !user) {
    return (
      <main style={{ background: "#0f1117", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#a3ff47", fontFamily: "Inter, sans-serif" }}>Loading...</p>
      </main>
    )
  }

  return (
    <main style={{ background: "#0f1117", minHeight: "100vh", fontFamily: "Inter, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@800;900&family=Inter:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .lf-btn:hover { border-color: #a3ff47 !important; color: #fff !important; }
      `}</style>

      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 36px", borderBottom: "1px solid #1e2236"
      }}>
        <div style={{ fontFamily: "Syne, sans-serif", fontSize: "20px", fontWeight: 900, color: "#fff" }}>
          Dev<span style={{ color: "#a3ff47" }}>Match</span>
        </div>
        <div style={{ display: "flex", gap: "24px" }}>
          {["Dashboard", "Browse", "Hackathons"].map(l => (
            <span key={l} style={{ fontSize: "13px", color: l === "Dashboard" ? "#fff" : "#6b7a99", cursor: "pointer" }}>{l}</span>
          ))}
        </div>
        <button onClick={() => signOut({ callbackUrl: "/" })} style={{
          background: "transparent", border: "1px solid #2a3050", color: "#6b7a99",
          padding: "7px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "13px"
        }}>
          Logout
        </button>
      </nav>

      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", minHeight: "calc(100vh - 57px)" }}>
        <aside style={{ background: "#0d1120", borderRight: "1px solid #1e2236", padding: "24px 20px", display: "flex", flexDirection: "column", gap: "20px" }}>
          
          <div style={{ background: "#111827", border: "1px solid #1e2d47", borderRadius: "16px", padding: "20px", position: "relative", overflow: "hidden" }}>
            <span style={{ position: "absolute", right: "12px", top: "8px", fontSize: "28px", color: "#1e2d47", fontWeight: 700 }}>{"{ }"}</span>
            <div style={{
              width: "56px", height: "56px", borderRadius: "50%", marginBottom: "12px",
              overflow: "hidden", border: "2px solid #1e2d47"
            }}>
              <img src={user.avatar} alt="avatar" style={{ width: "100%", height: "100%" }} />
            </div>
            <p style={{ fontSize: "16px", fontWeight: 700, color: "#fff", marginBottom: "2px" }}>{user.name || user.username}</p>
            <p style={{ fontSize: "12px", color: "#5a6a8a", marginBottom: "12px" }}>@{user.username} {user.location ? `· ${user.location}` : ""}</p>
            {user.bio && <p style={{ fontSize: "12px", color: "#5a6a8a", marginBottom: "12px", lineHeight: 1.5 }}>{user.bio}</p>}
            <div style={{ display: "flex", gap: "12px" }}>
              <div style={{ background: "#0d1120", borderRadius: "8px", padding: "8px 12px", flex: 1 }}>
                <div style={{ fontSize: "18px", fontWeight: 700, color: "#a3ff47" }}>{user.publicRepos}</div>
                <div style={{ fontSize: "10px", color: "#5a6a8a" }}>Repos</div>
              </div>
              <div style={{ background: "#0d1120", borderRadius: "8px", padding: "8px 12px", flex: 1 }}>
                <div style={{ fontSize: "18px", fontWeight: 700, color: "#a3ff47" }}>{user.followers}</div>
                <div style={{ fontSize: "10px", color: "#5a6a8a" }}>Followers</div>
              </div>
            </div>
          </div>

          <div>
            <p style={{ fontSize: "11px", color: "#5a6a8a", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>Top languages</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {user.topLanguages?.map((lang: string, i: number) => {
                const colors = [
                  { bg: "#0d2b1a", color: "#a3ff47", border: "#1a4a2a" },
                  { bg: "#0a2028", color: "#00d4ff", border: "#0f3a4a" },
                  { bg: "#1a1035", color: "#b4a0ff", border: "#2d1f6e" },
                  { bg: "#2a1500", color: "#ff8c42", border: "#4a2800" },
                  { bg: "#1a0a28", color: "#ff6eb4", border: "#3a1a4a" },
                ]
                const c = colors[i % colors.length]
                return (
                  <span key={lang} style={{
                    fontSize: "11px", padding: "4px 10px", borderRadius: "20px",
                    fontWeight: 600, background: c.bg, color: c.color, border: `1px solid ${c.border}`
                  }}>{lang}</span>
                )
              })}
            </div>
          </div>

          <div style={{ background: "#111827", border: "1px solid #1e2d47", borderRadius: "12px", padding: "14px" }}>
            <p style={{ fontSize: "12px", color: "#5a6a8a", marginBottom: "10px" }}>Looking for</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {[
                { value: "hackathon", label: "Hackathon teammate" },
                { value: "side-project", label: "Side project collab" },
                { value: "open-source", label: "Open source contrib" },
              ].map(opt => (
                <button key={opt.value} className="lf-btn" onClick={() => updateLookingFor(opt.value)} style={{
                  fontSize: "12px", padding: "8px 12px", borderRadius: "8px", cursor: "pointer",
                  textAlign: "left", transition: "all 0.2s",
                  background: lookingFor === opt.value ? "#0d2b1a" : "transparent",
                  color: lookingFor === opt.value ? "#a3ff47" : "#5a6a8a",
                  border: lookingFor === opt.value ? "1px solid #1a4a2a" : "1px solid #1e2d47",
                }}>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div style={{ padding: "32px" }}>
          <p style={{ fontSize: "11px", color: "#5a6a8a", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "6px" }}>
            Welcome back
          </p>
          <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: "40px", fontWeight: 900, color: "#fff", marginBottom: "4px" }}>
            Hey, <span style={{ color: "#a3ff47" }}>{user.name?.split(" ")[0] || user.username}</span> 👋
          </h1>
          <p style={{ fontSize: "14px", color: "#5a6a8a", marginBottom: "32px" }}>
            Your profile is live. Start finding teammates.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "24px" }}>
            {[
              { label: "Profile views", value: "—" },
              { label: "Matches found", value: "—" },
              { label: "Connections", value: "—" },
            ].map(stat => (
              <div key={stat.label} style={{
                background: "#0d1120", border: "1px solid #1e2d47",
                borderRadius: "12px", padding: "16px"
              }}>
                <div style={{ fontSize: "24px", fontWeight: 700, color: "#a3ff47", marginBottom: "4px" }}>{stat.value}</div>
                <div style={{ fontSize: "12px", color: "#5a6a8a" }}>{stat.label}</div>
              </div>
            ))}
          </div>

          <div style={{
            background: "#0d1120", border: "1px solid #a3ff47",
            borderRadius: "14px", padding: "20px 24px",
            display: "flex", alignItems: "center", justifyContent: "space-between"
          }}>
            <div>
              <p style={{ fontSize: "14px", fontWeight: 700, color: "#fff", marginBottom: "4px" }}>
                Ready to find your teammate?
              </p>
              <p style={{ fontSize: "12px", color: "#5a6a8a" }}>Browse devs matched to your stack and goals</p>
            </div>
            <button style={{
              background: "#a3ff47", color: "#0f1117", fontSize: "13px",
              fontWeight: 700, padding: "10px 20px", borderRadius: "8px",
              border: "none", cursor: "pointer", whiteSpace: "nowrap"
            }}>
              Browse matches →
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}