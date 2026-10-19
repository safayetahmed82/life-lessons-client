import useTitle from "../hooks/useTitle";

const Home = () => {
  useTitle("LifeLessons – Home");

  return <h1 className="p-10 text-4xl font-semibold">Home page</h1>;
};

export default Home;