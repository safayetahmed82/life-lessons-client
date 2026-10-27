import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useTitle from "../hooks/useTitle";
import { authClient } from "../lib/auth-client";
import Spinner from "../components/Spinner";
import HeroSlider from "../components/HeroSlider";
import LessonCard from "../components/LessonCard";

const API = import.meta.env.VITE_API_URL;

const benefits = [
  {
    title: "Remember what matters",
    text: "Lessons fade quickly. Writing them down turns a passing realization into something you can return to.",
  },
  {
    title: "Grow through reflection",
    text: "Looking back at your own mistakes and wins shows patterns you cannot see while you are living them.",
  },
  {
    title: "Learn from others",
    text: "Every person has learned something the hard way. Their stories can save you years of trial and error.",
  },
  {
    title: "Share your wisdom",
    text: "Something you learned the hard way might be exactly what a stranger needs to read today.",
  },
];

const Home = () => {
  useTitle("LifeLessons – Home");

  const { data: session } = authClient.useSession();
  const user = session?.user;
  const isPremium = user?.isPremium === true;

  const [featured, setFeatured] = useState([]);
  const [contributors, setContributors] = useState([]);
  const [period, setPeriod] = useState("week");
  const [mostSaved, setMostSaved] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API}/api/home/featured`).then((r) => r.json()),
      fetch(`${API}/api/home/top-contributors`).then((r) => r.json()),
      fetch(`${API}/api/home/most-saved`).then((r) => r.json()),
    ])
      .then(([featuredData, contributorData, savedData]) => {
        setFeatured(Array.isArray(featuredData) ? featuredData : []);
        setContributors(
          Array.isArray(contributorData.contributors) ? contributorData.contributors : []
        );
        setPeriod(contributorData.period || "week");
        setMostSaved(Array.isArray(savedData) ? savedData : []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const canView = (lesson) =>
    lesson.accessLevel !== "Premium" ||
    isPremium ||
    lesson.creatorId === user?.id;

  return (
    <div>
      <HeroSlider />

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-3xl font-semibold text-ink">Featured Life Lessons</h2>
        <p className="mt-2 text-gray-600">Hand-picked lessons worth reading first.</p>

        {loading ? (
          <Spinner />
        ) : featured.length === 0 ? (
          <p className="mt-8 rounded-xl border border-indigo-100 bg-white p-8 text-center text-gray-600">
            Featured lessons will appear here soon.
          </p>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((lesson) => (
              <LessonCard key={lesson._id} lesson={lesson} canView={canView(lesson)} />
            ))}
          </div>
        )}
      </section>

      <section className="bg-indigo-50 px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-semibold text-ink">Why Learning From Life Matters</h2>
          <p className="mt-2 text-gray-600">
            Wisdom only helps when it is kept and shared.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-xl border border-indigo-100 bg-white p-6"
              >
                <p className="font-serif text-4xl text-gold">0{i + 1}</p>
                <h3 className="mt-2 text-lg font-semibold text-ink">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {benefit.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-3xl font-semibold text-ink">
          {period === "week" ? "Top Contributors of the Week" : "Top Contributors"}
        </h2>
        <p className="mt-2 text-gray-600">The people sharing the most wisdom.</p>

        {loading ? (
          <Spinner />
        ) : contributors.length === 0 ? (
          <p className="mt-8 rounded-xl border border-indigo-100 bg-white p-8 text-center text-gray-600">
            No contributors yet. Be the first to share a lesson.
          </p>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {contributors.map((person) => (
              <Link
                key={person._id}
                to={`/author/${person._id}`}
                className="flex flex-col items-center rounded-xl border border-indigo-100 bg-white p-5 text-center transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <img
                  src={person.photo}
                  alt={person.name}
                  className="h-20 w-20 rounded-full border-2 border-gold object-cover"
                />
                <p className="mt-3 font-semibold text-ink">{person.name}</p>
                <p className="text-sm text-gray-600">{person.count} lessons</p>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="bg-indigo-50 px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-semibold text-ink">Most Saved Lessons</h2>
          <p className="mt-2 text-gray-600">The lessons people keep coming back to.</p>

          {loading ? (
            <Spinner />
          ) : mostSaved.length === 0 ? (
            <p className="mt-8 rounded-xl border border-indigo-100 bg-white p-8 text-center text-gray-600">
              No lessons have been shared yet.
            </p>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {mostSaved.map((lesson) => (
                <LessonCard key={lesson._id} lesson={lesson} canView={canView(lesson)} />
              ))}
            </div>
          )}

          <div className="mt-10 text-center">
            <Link to="/public-lessons" className="btn px-7 py-3">
              Explore All Lessons
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;