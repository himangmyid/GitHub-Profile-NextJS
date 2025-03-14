import { fetchRepos } from "@/utils/github";
import { fetchRepoLanguages } from "@/utils/languages";

export default async function RepoDetail({
  params,
}: {
  params: { id: string };
}) {
  try {
    const { id } = await params; // Menunggu resolusi Promise params
    const repos = await fetchRepos("himangmyid");
    const repo = repos.find((r) => r.id.toString() === id);

    if (!repo) {
      throw new Error("Repositori tidak ditemukan");
    }

    const languages = await fetchRepoLanguages("himangmyid", repo.name);
    const primaryLanguage = Object.keys(languages)[0] || "unknown";

    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold">{repo.name}</h1>
        <p className="text-gray-600">{repo.description}</p>
        <p>⭐ Stars: {repo.stargazers_count} | 🍴 Forks: {repo.forks_count}</p>
        <p>📌 Language: {primaryLanguage}</p>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500"
        >
          View on GitHub
        </a>
      </div>
    );
  } catch (error) {
    console.error("Gagal mengambil detail repositori:", error);
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-red-600">Error</h1>
        <p>Gagal memuat detail repositori. Silakan coba lagi nanti.</p>
      </div>
    );
  }
}
