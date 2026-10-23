import { useEffect, useState } from "react";
import useTitle from "../hooks/useTitle";
import { authClient } from "../lib/auth-client";
import Spinner from "../components/Spinner";
import LessonCard from "../components/LessonCard";

const API = import.meta.env.VITE_API_URL;
const PAGE_SIZE = 6;

const categories = [
  "Personal Growth",
  "Career",
  "Relationships",
  "Mindset",
  "Mistakes Learned",
];
const tones = ["Motivational", "Sad", "Realization", "Gratitude"];

const PublicLessons = () => {
  useTitle("LifeLessons – Public Lessons");

  const { data: session } = authClient.useSession();
  const user = session?.user;
  const isPremium = user?.isPremium === true;

  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);

  const [searchText, setSearchText] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [tone, setTone] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    setLoading(true);

    const params = new URLSearchParams();
    params.set("page", page);
    params.set("limit", PAGE_SIZE);
    if (search) params.set("search", search);
    if (category) params.set("category", category);
    if (tone) params.set("tone", tone);
    if (sort) params.set("sort", sort);

    fetch(`${API}/api/lessons?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setLessons(Array.isArray(data.lessons) ? data.lessons : []);
        setPages(data.pages || 1);
        setLoading(false);
      })
      .catch(() => {
        setLessons([]);
        setLoading(false);
      });
  }, [search, category, tone, sort, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setSearch(searchText);
  };

  const clearFilters = () => {
    setSearchText("");
    setSearch("");
    setCategory("");
    setTone("");
    setSort("");
    setPage(1);
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-night focus:outline-none";

  const pageNumbers = Array.from({ length: pages }, (_, i) => i + 1);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-ink">Public Lessons</h1>
      <p className="mt-2 text-gray-600">
        Wisdom shared by people who have lived it.
      </p>

      <div className="mt-8 rounded-xl border border-indigo-100 bg-white p-5 shadow-sm">
        <form onSubmit={handleSearch} className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            placeholder="Search by title or keyword"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className={inputClass}
          />
          <button type="submit" className="btn">
            Search
          </button>
        </form>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            className={inputClass}
          >
            <option value="">All categories</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={tone}
            onChange={(e) => {
              setTone(e.target.value);
              setPage(1);
            }}
            className={inputClass}
          >
            <option value="">All emotional tones</option>
            {tones.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
            className={inputClass}
          >
            <option value="">Newest first</option>
            <option value="mostSaved">Most saved</option>
          </select>

          <button
            onClick={clearFilters}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-100"
          >
            Clear filters
          </button>
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : lessons.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-xl font-semibold text-ink">No lessons found</p>
          <p className="mt-2 text-gray-600">
            Try a different keyword, or clear some filters.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {lessons.map((lesson) => (
              <LessonCard
                key={lesson._id}
                lesson={lesson}
                canView={
                  lesson.accessLevel !== "Premium" ||
                  isPremium ||
                  lesson.creatorId === user?.id
                }
              />
            ))}
          </div>

          {pages > 1 && (
            <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm disabled:opacity-40"
              >
                Previous
              </button>

              {pageNumbers.map((number) => (
                <button
                  key={number}
                  onClick={() => setPage(number)}
                  className={`h-10 w-10 rounded-lg text-sm font-medium ${
                    number === page
                      ? "bg-night text-white"
                      : "border border-gray-300 hover:bg-indigo-50"
                  }`}
                >
                  {number}
                </button>
              ))}

              <button
                onClick={() => setPage(page + 1)}
                disabled={page === pages}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PublicLessons;