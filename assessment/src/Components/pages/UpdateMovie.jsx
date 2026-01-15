import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CreateMoviePage.css";

export default function EditMovie() {
  const location = useLocation();
  const navigate = useNavigate();
  const movieData = location.state?.movie;

  const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuYW1pa2FAZ21haWwuY29tIiwic3ViIjoiNjk2OGNlN2U4ZTU3Nzc3NTAxMzIzYmE1IiwiaWF0IjoxNzY4NDc2MzA3LCJleHAiOjE3NjkwODExMDd9.9hBsGFhHM_CuCCDxYtEjEYgzvF_LPuUTi5SSYiRZFdE";

  const [title, setTitle] = useState("");
  const [publishingYear, setPublishingYear] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* Redirect if user refreshes page */
  useEffect(() => {
    if (!movieData) {
      navigate("/");
      return;
    }

    setTitle(movieData.title || "");
    setPublishingYear(movieData.publishingYear || "");
    setImagePreview(movieData.image || null);
  }, [movieData, navigate]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files?.[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    if (!file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target.result);
    reader.readAsDataURL(file);
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!movieData?._id) {
    setError("Movie ID missing");
    return;
  }

  setLoading(true);
  setError("");

  try {
    const response = await fetch(
      `http://localhost:3000/api/v1/movies/${movieData._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title.trim(),
          publishingYear: Number(publishingYear),
        }),
      }
    );

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message?.[0] || "Update failed");
    }

    alert("Movie updated successfully!");
    navigate("/");
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};


  const handleCancel = () => {
    setTitle(movieData.title || "");
    setPublishingYear(movieData.publishingYear || "");
    setImagePreview(movieData.image || null);
    navigate("/");
  };

  return (
    <div className="container">
      <div className="content">
        <h1 className="title">Edit Movie</h1>

        <form onSubmit={handleSubmit} className="form">
          <div className="form-content">
            <div
              className={`drop-zone ${dragActive ? "drag-active" : ""} ${
                imagePreview ? "has-image" : ""
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => document.getElementById("fileInput").click()}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="image-preview"
                />
              ) : (
                <>
                  <div className="download-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12 3V16M12 16L16 12M12 16L8 12"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3 17V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V17"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <p className="drop-text">Drop an image here</p>
                </>
              )}

              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                hidden
              />
            </div>

            <div className="input-group">
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input-field"
                required
              />

              <input
                type="number"
                placeholder="Publishing year"
                value={publishingYear}
                onChange={(e) => setPublishingYear(e.target.value)}
                className="input-field input-year"
                required
              />

              <div className="button-group">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn btn-cancel"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-submit"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update"}
                </button>
              </div>

              {error && <p className="error-text">{error}</p>}
            </div>
          </div>
        </form>
      </div>

      <div className="wave-background"></div>
    </div>
  );
}
