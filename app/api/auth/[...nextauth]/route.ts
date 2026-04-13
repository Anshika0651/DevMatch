import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    })
  ],
  callbacks: {
    async session({ session, token }) {
      (session as any).accessToken = token.accessToken
      ;(session.user as any).username = token.username
      return session
    },
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token
        token.username = (profile as any).login
      }
      return token
    }
  }
})

export { handler as GET, handler as POST }