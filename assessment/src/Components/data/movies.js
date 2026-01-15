import imagemovie from "../../assets/Images/imagemovie.png";

export const INITIAL_MOVIES = [
  {
    id: 1,
    title: "Movie 1",
    year: "2021",
    image: imagemovie,
  },
  {
    id: 2,
    title: "Movie 2",
    year: "2021",
    image: imagemovie,
  },
  {
    id: 3,
    title: "Movie 3",
    year: "2021",
    image: imagemovie,
  },
  {
    id: 4,
    title: "Movie 4",
    year: "2021",
    image: imagemovie,
  },
  {
    id: 5,
    title: "Movie 5",
    year: "2021",
    image: imagemovie,
  },
  {
    id: 6,
    title: "Movie 6",
    year: "2021",
    image: imagemovie,
  },
  {
    id: 7,
    title: "Movie 7",
    year: "2021",
    image: imagemovie,
  },
  {
    id: 8,
    title: "Movie 8",
    year: "2021",
    image: imagemovie,
  },
];

/*
 * Factory function to create a new movie object
 */
export const createMovie = ({ title, year, image }) => ({
  id: Date.now(),
  title,
  year,
  image: image || imagemovie,
});
