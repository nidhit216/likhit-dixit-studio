"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

type Errors = Partial<Record<"name" | "email" | "type" | "message", boolean>>;

const emailOk = (v: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    brand: "",
    type: "",
    budget: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const set = (k: keyof typeof form) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next: Errors = {
      name: form.name.trim().length < 2,
      email: !emailOk(form.email),
      type: form.type === "",
      message: form.message.trim().length < 4,
    };
    setErrors(next);
    if (Object.values(next).some(Boolean)) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("bad response");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="form-success show">
        <div className="grotesk">Thanks — that&apos;s in.</div>
        <p>
          Likhit reads every inquiry personally and replies within two business days.
          <br />
          Talk soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="field">
        <label htmlFor="f-name">Your name</label>
        <input id="f-name" type="text" autoComplete="name" value={form.name} onChange={set("name")} className={errors.name ? "err" : ""} />
        {errors.name && <div className="msg show">Please add your name.</div>}
      </div>

      <div className="field two">
        <div>
          <label htmlFor="f-email">Email</label>
          <input id="f-email" type="email" autoComplete="email" value={form.email} onChange={set("email")} className={errors.email ? "err" : ""} />
          {errors.email && <div className="msg show">Add a valid email.</div>}
        </div>
        <div>
          <label htmlFor="f-brand">Brand / company</label>
          <input id="f-brand" type="text" value={form.brand} onChange={set("brand")} />
        </div>
      </div>

      <div className="field two">
        <div>
          <label htmlFor="f-type">What are we making?</label>
          <select id="f-type" value={form.type} onChange={set("type")} className={errors.type ? "err" : ""}>
            <option value="">Select…</option>
            <option>Product / still life</option>
            <option>Food / tabletop</option>
            <option>Jewellery</option>
            <option>Campaign / editorial</option>
            <option>E-commerce catalogue</option>
            <option>Something else</option>
          </select>
          {errors.type && <div className="msg show">Let me know what we're making.</div>}
        </div>
        <div>
          <label htmlFor="f-budget">Ballpark budget</label>
          <select id="f-budget" value={form.budget} onChange={set("budget")}>
            <option value="">Select…</option>
            <option>Under ₹50k</option>
            <option>₹50k – ₹1.5L</option>
            <option>₹1.5L – ₹4L</option>
            <option>₹4L +</option>
            <option>Not sure yet</option>
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="f-msg">About the project</label>
        <textarea
          id="f-msg"
          placeholder="What are we shooting, roughly how many images, and any timeline?"
          value={form.message}
          onChange={set("message")}
          className={errors.message ? "err" : ""}
        />
        {errors.message && <div className="msg show">A sentence or two helps.</div>}
      </div>

      {status === "error" && (
        <div className="msg show" style={{ marginBottom: "14px" }}>
          Something went wrong sending that. Please email hello@likhitdixit.com directly.
        </div>
      )}

      <button className="submit" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send inquiry"}
      </button>
    </form>
  );
}
