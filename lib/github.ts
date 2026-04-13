export async function fetchGitHubProfile(username: string, accessToken: string) {
  const headers = { Authorization: `Bearer ${accessToken}` }

  const [profile, repos] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`, { headers }).then(r => r.json()),
    fetch(`https://api.github.com/users/${username}/repos?per_page=50&sort=updated`, { headers }).then(r => r.json())
  ])

  const langCount: Record<string, number> = {}
  for (const repo of repos) {
    if (repo.language) {
      langCount[repo.language] = (langCount[repo.language] || 0) + 1
    }
  }

  const topLanguages = Object.entries(langCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([lang]) => lang)

  return {
    githubId: String(profile.id),
    username: profile.login,
    name: profile.name,
    avatar: profile.avatar_url,
    bio: profile.bio,
    location: profile.location,
    topLanguages,
    followers: profile.followers,
    publicRepos: profile.public_repos,
    githubUrl: profile.html_url,
  }
}