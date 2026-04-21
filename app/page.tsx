"use client"
import { signIn, useSession } from "next-auth/react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      fetch("/api/user/sync", { method: "POST" })
      router.push("/dashboard")
    }
  }, [session])

  return (
    <main style={{ background: "#0f1117", minHeight: "100vh", fontFamily: "Inter, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@800;900&family=Inter:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .nav-link { font-size: 13px; color: #6b7a99; text-decoration: none; }
        .nav-link:hover { color: #fff; }
        .btn-ghost:hover { background: #1e2236; }
        .btn-solid:hover { opacity: 0.9; }
        .cta-main:hover { opacity: 0.9; }
        .cta-sec:hover { background: #1e2236; }
        .sparkle { user-select: none; }
      `}</style>

      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 36px", borderBottom: "1px solid #1e2236"
      }}>
        <div style={{
          fontFamily: "Syne, sans-serif", fontSize: "20px",
          fontWeight: 900, color: "#fff", letterSpacing: "-0.5px"
        }}>
          Dev<span style={{ color: "#a3ff47" }}>Match</span>
        </div>
        <div style={{ display: "flex", gap: "28px" }}>
          {["Product", "Browse", "Hackathons", "Community"].map(l => (
            <a key={l} href="#" className="nav-link">{l}</a>
          ))}
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button className="btn-ghost" onClick={() => signIn("github")} style={{
            fontSize: "13px", color: "#fff", background: "transparent",
            border: "1px solid #2a3050", padding: "7px 16px",
            borderRadius: "8px", cursor: "pointer"
          }}>
            Login
          </button>
          <button className="btn-solid" onClick={() => signIn("github")} style={{
            fontSize: "13px", color: "#0f1117", background: "#a3ff47",
            border: "none", padding: "7px 16px",
            borderRadius: "8px", fontWeight: 600, cursor: "pointer"
          }}>
            Sign up
          </button>
        </div>
      </nav>

      <div style={{ padding: "52px 36px 48px", position: "relative", overflow: "hidden" }}>
        <svg style={{ position: "absolute", right: "36px", top: "60px", opacity: 0.4 }}
          width="180" height="200" viewBox="0 0 180 200" fill="none">
          <path d="M160 10 C160 10 180 60 140 80 C100 100 60 90 40 130 C20 170 60 190 80 190"
            stroke="#2a3a5c" strokeWidth="2" strokeDasharray="6 5" fill="none" />
          <circle cx="160" cy="10" r="5" fill="#a3ff47" />
          <circle cx="80" cy="190" r="5" fill="#ff8c42" />
        </svg>

        {[
          { top: "72px", right: "120px", color: "#a3ff47" },
          { top: "160px", right: "220px", color: "#ff8c42" },
          { top: "240px", right: "72px", color: "#00d4ff" },
        ].map((s, i) => (
          <span key={i} className="sparkle" style={{
            position: "absolute", fontSize: "20px",
            fontWeight: 900, top: s.top, right: s.right, color: s.color
          }}>✦</span>
        ))}

        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "6px", flexWrap: "wrap" }}>
          <span style={{ fontFamily: "Syne, sans-serif", fontSize: "66px", fontWeight: 900, color: "#fff", letterSpacing: "-2px" }}>find</span>
          <span style={{ fontFamily: "Syne, sans-serif", fontSize: "66px", fontWeight: 900, color: "#fff", letterSpacing: "-2px" }}>your</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "6px", flexWrap: "wrap" }}>
          <div style={{
            background: "linear-gradient(135deg,#7f5af0,#2cb67d)",
            borderRadius: "20px", padding: "10px 16px",
            display: "flex", alignItems: "center", gap: "6px"
          }}>
            <span style={{ fontSize: "13px", fontWeight: 700, color: "#fff" }}>94% match</span>
          </div>
          <span style={{ fontFamily: "Syne, sans-serif", fontSize: "66px", fontWeight: 900, color: "#a3ff47", letterSpacing: "-2px" }}>teammate</span>
          <div style={{
            background: "#1e2744", border: "1.5px solid #2a3a5c",
            borderRadius: "40px", padding: "8px", display: "flex", alignItems: "center"
          }}>
            <div style={{ width: "44px", height: "24px", background: "#a3ff47", borderRadius: "12px", position: "relative" }}>
              <div style={{ width: "20px", height: "20px", background: "#0f1117", borderRadius: "50%", position: "absolute", right: "2px", top: "2px" }} />
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
          <span style={{ fontFamily: "Syne, sans-serif", fontSize: "66px", fontWeight: 900, color: "#fff", letterSpacing: "-2px" }}>now.</span>
          <div style={{
            background: "#1a2236", border: "1.5px solid #2a3a5c",
            borderRadius: "16px", padding: "8px 14px"
          }}>
            <div style={{ fontFamily: "Syne, sans-serif", fontSize: "22px", fontWeight: 900, color: "#a3ff47" }}>247</div>
            <div style={{ fontSize: "11px", color: "#6b7a99" }}>devs online</div>
          </div>
        </div>

        <p style={{ fontSize: "15px", color: "#6b7a99", marginTop: "24px", maxWidth: "420px", lineHeight: 1.6 }}>
          DevMatch connects developers based on GitHub activity, skills, and goals — so you always find the right person to build with.
        </p>

        <div style={{ display: "flex", gap: "12px", marginTop: "28px" }}>
          <button className="cta-main" onClick={() => signIn("github")} style={{
            background: "#a3ff47", color: "#0f1117", fontSize: "14px",
            fontWeight: 700, padding: "12px 24px", borderRadius: "10px",
            border: "none", cursor: "pointer"
          }}>
            Find my match →
          </button>
          <button className="cta-sec" style={{
            background: "transparent", color: "#fff", fontSize: "14px",
            padding: "12px 24px", borderRadius: "10px",
            border: "1px solid #2a3050", cursor: "pointer"
          }}>
            See how it works
          </button>
        </div>
      </div>
    </main>
  )
}