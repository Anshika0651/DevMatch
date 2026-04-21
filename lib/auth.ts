import GithubProvider from "next-auth/providers/github"

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    })
  ],
  callbacks: {
    async session({ session, token }: any) {
      session.accessToken = token.accessToken
      session.user.username = token.username
      return session
    },
    async jwt({ token, account, profile }: any) {
      if (account) {
        token.accessToken = account.access_token
        token.username = (profile as any).login
      }
      return token
    }
  }
}