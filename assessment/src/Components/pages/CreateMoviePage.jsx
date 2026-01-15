import { useState } from "react";
import "./CreateMoviePage.css";
import uploadIcon from '../../assets/Images/file_download_black_24dp 1.svg'

export default function CreateMovie() {
  const [title, setTitle] = useState("");
  const [publishingYear, setPublishingYear] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuYW1pa2FAZ21haWwuY29tIiwic3ViIjoiNjk2OGNlN2U4ZTU3Nzc3NTAxMzIzYmE1IiwiaWF0IjoxNzY4NDc2MzA3LCJleHAiOjE3NjkwODExMDd9.9hBsGFhHM_CuCCDxYtEjEYgzvF_LPuUTi5SSYiRZFdE";

  /* ---------------- DRAG & DROP ---------------- */

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

  /* ---------------- SUBMIT API ---------------- */

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  try {
    const response = await fetch(
      "http://localhost:3000/api/v1/movies",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title.trim(),
          publishingYear: Number(publishingYear), // ✅ correct key
          poster: imagePreview,                   // ✅ correct key
          // userId: "696876020b7a806dc0be5d12",       // ✅ required by schema
        }),
      }
    );

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || "Failed to create movie");
    }

    alert("Movie created successfully!");
    handleCancel();
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};


  const handleCancel = () => {
    setTitle("");
    setPublishingYear("");
    setImagePreview(null);
    setError(null);
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="container">
      <div className="content">
        <h1 className="title">Create a new movie</h1>

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
                <img src={imagePreview} alt="Preview" className="image-preview" />
              ) : (
                <>
                  <div className="download-icon"><img src={uploadIcon} alt="uploadIcon" height={'20px'} width={'20px'}/></div>
                  <p className="drop-text">Drop an image here</p>
                </>
              )}
              <input
                type="file"
                id="fileInput"
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

              {error && <p className="error-text">{error}</p>}

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
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
