import { useState } from "react";
import FormField from "../FormFild/FormField";
import FileDropzone from "../FileDrop/FileDropzone";
import TipsBox from "../TipsBox/TipsBox";

const CATEGORIES = ["Hardware", "Software", "Network", "Payments", "Other"];
const emptyForm = { title: "", category: "", description: "" };

export default function SupportForm() {
  const [form, setForm] = useState(emptyForm);
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function validate() {
    const next = {};
    if (!form.title.trim()) next.title = "Enter a title.";
    if (!form.category) next.category = "Choose a category.";
    if (!form.description.trim()) next.description = "Describe the problem.";
    return next;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    // Replace with a real fetch("/api/tickets", ...) call
    console.log("Ticket submitted:", form, files);
    setSubmitted(true);
  }

  function handleClear() {
    setForm(emptyForm);
    setFiles([]);
    setErrors({});
    setSubmitted(false);
  }

  return (
    <form className="panel" onSubmit={handleSubmit} noValidate>
      <h1>Make a support request</h1>
      <p className="hint">
        Fields marked <span className="required">*</span> are required.
      </p>

      {submitted && (
        <p className="success" role="status">
          Ticket submitted. We'll reply by email.
        </p>
      )}

      <div className="row">
        <FormField id="title" label="Title" required error={errors.title}>
          <input
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            aria-invalid={!!errors.title}
          />
        </FormField>

        <FormField id="category" label="Category" required error={errors.category}>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            aria-invalid={!!errors.category}
          >
            <option value="" disabled>Select a category</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </FormField>
      </div>

      <FormField id="description" label="Description" required error={errors.description}>
        <textarea
          id="description"
          name="description"
          rows={6}
          value={form.description}
          onChange={handleChange}
          aria-invalid={!!errors.description}
        />
      </FormField>

      {/* <FormField label="Attachments (optional)">
        <FileDropzone files={files} onChange={setFiles} />
      </FormField> */}

      <TipsBox />

      <div className="actions">
        <button type="button" className="btn btn--danger" onClick={handleClear}>
          Clear
        </button>
        <button type="submit" className="btn btn--primary">
          Submit ticket
        </button>
      </div>
    </form>
  );
}