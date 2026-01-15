import movieCss from '../Components/movies.css';
import movieImage from '../assets/Images/imagemovie.png';
import editIcon from '../assets/Images/Edit--Streamline-Carbon (1).svg';
import { useNavigate } from 'react-router-dom';

export default function MovieCard({ movie }) {
  const navigate = useNavigate();

  const handleUpdate = () => {
    navigate("/updatemovie", { state: { movie } }); // pass movie data via state
  };

  return (
    <div className="movie-card">
      <img src={movie?.poster} alt={movie.title} className="movie-image" />
      <div className='infoContainer'>
        <div className="movie-info">
          <h3>{movie?.title}</h3>
          <p>{movie?.publishingYear}</p>
        </div>
        <div>
          <button className="updateBtn" onClick={handleUpdate}>
            <img src={editIcon} alt="Edit" style={{ height: "22px", width: "22px" }} />
          </button>
        </div>
      </div>
    </div>
  );
}
