import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { Film } from "../api/films";
import { getFilms } from "../api/films";

// SERVER SIDE
export const loader: LoaderFunction = async () => {
  return getFilms();
};

// CLIENT SIDE
export default function FilmsIndex() {
  const films = useLoaderData<Film[]>();

  return (
    <div className="p-16 font-sans">
      <h1 className="text-5xl font-bold text-center">Studio Ghibli Films</h1>
      <form className="py-5">
        <label className="font-bold">
          Search{" "}
          <input
            type="text"
            name="title"
            placeholder="Type a title..."
            className="border-2 rounded py-2 px-3"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
        >
          Search
        </button>
      </form>
      <div className="grid grid-cols-4 gap-4">
        {films.map((film) => (
          <div
            className="hover:shadow-2xl hover:scale-105 hover:font-bold"
            key={film.id}
          >
            <div>{film.title}</div>
            <img src={film.image} alt={film.title} />
          </div>
        ))}
      </div>
    </div>
  );
}

export const meta: MetaFunction = () => {
  return [{ title: "Films | Studio Ghibli" }];
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: "styles" }];
};
