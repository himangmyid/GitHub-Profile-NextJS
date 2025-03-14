  "use client";

  import { useEffect, useState } from "react";
  import RepoCard from "./RepoCard";
  import { fetchRepos } from "@/utils/github";
  import { Button } from "@/components/ui/Button";
  interface Repo {
    id: number;
    name: string;
    html_url: string;
    description: string;
    stargazers_count: number;
    forks_count: number;
    language: string;
    created_at: string;
    updated_at: string; 
    size: number; 
  }

  export default function RepoList() {
    const [repos, setRepos] = useState<Repo[]>([]);
    const [showAll, setShowAll] = useState(false);
    const [filter, setFilter] = useState<string>("latest"); // Default filter: terbaru

    useEffect(() => {
      async function loadRepos() {
        const data: Repo[] = await fetchRepos("himangmyid");
        const repos: Repo[] = data.map(repo => ({
          id: repo.id,
          name: repo.name,
          html_url: repo.html_url,
          description: repo.description,
          stargazers_count: repo.stargazers_count,
          language: repo.language,
          forks_count: repo.forks_count,
          created_at: repo.created_at,
          updated_at: repo.updated_at,
          size: repo.size,
        }));
        setRepos(repos);
      }
      loadRepos();
    }, []);

    // Sorting berdasarkan filter
    const sortedRepos = [...repos].sort((a, b) => {
      if (filter === "latest") return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      if (filter === "popular") return b.stargazers_count - a.stargazers_count;
      if (filter === "forks") return b.forks_count - a.forks_count;
      return 0;
    });

    const visibleRepos = showAll ? sortedRepos : sortedRepos.slice(0, 6);

    return (
      <div className="container mx-auto p-6">
        <h2 className="text-center text-3xl font-bold mb-4">GitHub Repo</h2>

      {/* Dropdown Filter */}
  <div className="mb-3 flex justify-end">
    <label className="mr-2 text-center font-medium">Urutkan:</label>
    <select
      className="border p-1 rounded-full"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
    >
      <option value="latest">📅 Terbaru</option>
      <option value="popular">⭐ Populer</option>
      <option value="forks">🍴 Banyak Forks</option>
    </select>
  </div>


        {/* List Repo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleRepos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>

        {/* Tombol Show More */}
        {repos.length > 6 && (
          <div className="flex justify-center mt-4">
            <Button onClick={() => setShowAll(!showAll)} className="px-6 py-2 text-white bg-blue-500 rounded-lg">
              {showAll ? "Tampilkan Lebih Sedikit" : "Tampilkan Lebih Banyak"}
            </Button>
          </div>
        )}
      </div>
    );
  }
