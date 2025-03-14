"use client";

import { FaGithub, FaTwitter, FaLink } from "react-icons/fa";
import Image from "next/image";

interface GithubProfile {
  avatar_url?: string;
  name?: string;
  login?: string;
  bio?: string;
  location?: string;
  company?: string;
  html_url: string;
  blog?: string;
  twitter_username?: string;
  public_repos: number;
  followers: number;
  following: number;
}

const GithubProfile = ({ profile }: { profile?: GithubProfile }) => {
  if (!profile) {
    return <p className="text-center text-gray-500">Loading profile...</p>;
  }

  return (
    <div className="bg-gradient-to-br from-white to-gray-100 shadow-lg rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-200 hover:shadow-2xl xl:mt-20 transition duration-300">
      {profile.avatar_url ? (
        <Image
          src={profile.avatar_url}
          alt={profile.name || "Unknown"}
          width={150}
          height={150}
          className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 mx-auto rounded-full shadow-xl border-4 border-white hover:scale-105 transition-transform duration-300"
        />
      ) : (
        <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 mx-auto rounded-full bg-gray-300 flex items-center justify-center text-gray-500">
          No Image
        </div>
      )}

      <h2 className="text-xl sm:text-2xl font-bold mt-4 text-blue-600 text-center">{profile.name || "Unknown"}</h2>
      <p className="text-gray-600 font-medium text-center">@{profile.login || "No username"}</p>
      <p className="text-gray-700 mt-3 italic text-center">{profile.bio || "No bio available."}</p>

      <div className="mt-4 sm:mt-6 flex  sm:flex-row justify-center gap-2 sm:gap-4 text-gray-700 font-medium text-center">
        {profile.location && (
          <p className="flex items-center gap-1 sm:gap-2">
            <span className="text-lg sm:text-xl">📍</span> {profile.location}
          </p>
        )}
        {profile.company && (
          <p className="flex items-center gap-1 sm:gap-2">
            <span className="text-lg sm:text-xl">🏢</span> {profile.company}
          </p>
        )}
      </div>

      <div className="mt-4 sm:mt-6 flex justify-center space-x-4 sm:space-x-6">
        <a 
          href={profile.html_url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-gray-800 hover:text-black hover:scale-110 transition-all"
        >
          <FaGithub className="w-6 sm:w-7 h-6 sm:h-7" />
        </a>
        {profile.blog && (
          <a 
            href={profile.blog} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-500 hover:text-blue-600 hover:scale-110 transition-all"
          >
            <FaLink className="w-6 sm:w-7 h-6 sm:h-7" />
          </a>
        )}
        {profile.twitter_username && (
          <a
            href={`https://twitter.com/${profile.twitter_username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-500 hover:scale-110 transition-all"
          >
            <FaTwitter className="w-6 sm:w-7 h-6 sm:h-7" />
          </a>
        )}
      </div>

      <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-2 sm:gap-4 text-center">
        <div className="bg-white p-2 sm:p-3 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <p className="text-lg sm:text-xl font-bold text-blue-600">{profile.public_repos}</p>
          <p className="text-xs sm:text-sm font-medium text-gray-600">Repositories</p>
        </div>
        <div className="bg-white p-2 sm:p-3 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <p className="text-lg sm:text-xl font-bold text-green-600">{profile.followers}</p>
          <p className="text-xs sm:text-sm font-medium text-gray-600">Followers</p>
        </div>
        <div className="bg-white p-2 sm:p-3 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <p className="text-lg sm:text-xl font-bold text-purple-600">{profile.following}</p>
          <p className="text-xs sm:text-sm font-medium text-gray-600">Following</p>
        </div>
      </div>
    </div>
  );
};

export default GithubProfile;
