import { useState, useRef } from "react";
import './FileDropzone.css';

const ALLOWED_TYPES = ["image/png", "image/jpeg", "application/pdf"];
const MAX_SIZE = 50 * 1024 * 1024; // 50 MB

export default function FileDropzone({ files, onChange }) {
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");
  const fileInput = useRef(null);

  function addFiles(fileList) {
    const valid = [];
    const problems = [];
    Array.from(fileList).forEach((file) => {
      if (!ALLOWED_TYPES.includes(file.type))
        problems.push(`${file.name} is not a PNG, JPG or PDF.`);
      else if (file.size > MAX_SIZE)
        problems.push(`${file.name} is over 50 MB.`);
      else valid.push(file);
    });
    setError(problems.join(" "));
    onChange([...files, ...valid]);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  }

  function removeFile(index) {
    onChange(files.filter((_, i) => i !== index));
  }

  return (
    <>
      <div
        className={`dropzone ${dragging ? "dropzone--active" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        Drag files here or{" "}
        <button
          type="button"
          className="link"
          onClick={() => fileInput.current.click()}
        >
          browse
        </button>
        <input
          ref={fileInput}
          type="file"
          multiple
          accept=".png,.jpg,.jpeg,.pdf"
          hidden
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>
      <p className="hint">PNG, JPG or PDF, up to 50 MB each</p>
      {error && <p className="error">{error}</p>}

      {files.length > 0 && (
        <ul className="file-list">
          {files.map((file, i) => (
            <li key={`${file.name}-${i}`}>
              {file.name}
              <button
                type="button"
                className="link"
                onClick={() => removeFile(i)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
