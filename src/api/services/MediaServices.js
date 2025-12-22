import api from "..";
import { createResource } from "solid-js";

export async function getMovies(slice) {
  try {
    const result = await api.get("/discover/movie");
    const returnValue = slice ? result.results.slice(0, 5) : result.results;
    return returnValue.map(item => ({
      title: item.title,
      poster_path: item.poster_path,
      overview: item.overview,
      backdrop_path: item.backdrop_path,
      id: item.id,
    }));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getAllMovies() {
  try {
    const result = await api.get("/discover/movie");
    return result.results.map(item => ({
      title: item.title,
      poster_path: item.poster_path,
      overview: item.overview,
      backdrop_path: item.backdrop_path,
      id: item.id,
    }));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getTV(slice) {
  try {
    const result = await api.get("/discover/tv");
    const returnValue = slice ? result.results.slice(0, 5) : result.results;
    return returnValue.map(item => ({
      title: item.name,
      poster_path: item.poster_path,
      overview: item.overview,
      backdrop_path: item.backdrop_path,
      id: item.id,
    }));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export function tmdbData() {
  const rows = [];
  rows.push({ title: "MOVIES", items: createResource(() => getMovies(true))[0] });
  rows.push({ title: "SERIES", items: createResource(() => getTV(true))[0] });
  return { rows };
}

export function moviesData() {
  const [movies] = createResource(() => getAllMovies(true));
  return { movies };
}
