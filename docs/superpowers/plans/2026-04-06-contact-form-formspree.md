# Contact Form Formspree Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire the existing contact form to Formspree so submissions are delivered to the owner's inbox.

**Architecture:** `handleSubmit` in `ContactPage.jsx` becomes async and POSTs JSON to `https://formspree.io/f/${VITE_FORMSPREE_ID}`. Two new state vars (`loading`, `submitError`) handle in-flight and error UI. No new files, no new dependencies.

**Tech Stack:** React 18, native `fetch`, Vite env vars (`import.meta.env`), Formspree free tier.

---

### Task 1: Create `.env.local` with Formspree ID

> This task requires a manual step (creating the Formspree account). Complete the manual steps first, then write the file.

**Files:**
- Create: `.env.local` (already covered by `*.local` in `.gitignore`)

- [ ] **Step 1: Create a Formspree form**

  1. Go to [formspree.io](https://formspree.io) and sign up for a free account.
  2. Click "New Form", give it a name (e.g. "Portfolio Contact").
  3. Copy the form ID from the endpoint URL — it looks like `xpwzgkla` in `https://formspree.io/f/xpwzgkla`.

- [ ] **Step 2: Create `.env.local`**

  Create the file at the repo root with this content (replace `xpwzgkla` with your actual ID):

  ```
  VITE_FORMSPREE_ID=xpwzgkla
  ```

- [ ] **Step 3: Verify `.env.local` is gitignored**

  Run:
  ```bash
  git status
  ```
  Expected: `.env.local` does NOT appear in the output (it is matched by `*.local` in `.gitignore`).

---

### Task 2: Add `loading` and `submitError` state

**Files:**
- Modify: `src/pages/ContactPage.jsx:51-56` (existing state block)

- [ ] **Step 1: Add two new state variables**

  In `ContactPage.jsx`, find the existing state declarations (around line 51–56):

  ```jsx
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [touched, setTouched] = useState({});
  const [focused, setFocused] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [hoverBtn, setHoverBtn] = useState(false);
  const [hoverGithub, setHoverGithub] = useState(false);
  ```

  Replace with:

  ```jsx
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [touched, setTouched] = useState({});
  const [focused, setFocused] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [hoverBtn, setHoverBtn] = useState(false);
  const [hoverGithub, setHoverGithub] = useState(false);
  ```

- [ ] **Step 2: Verify the dev server still starts**

  Run:
  ```bash
  npm run dev
  ```
  Expected: Vite starts without errors. Visit the contact section in the browser — form renders normally.

---

### Task 3: Rewrite `handleSubmit` to POST to Formspree

**Files:**
- Modify: `src/pages/ContactPage.jsx:73-76` (handleSubmit function)

- [ ] **Step 1: Replace `handleSubmit` with the async version**

  Find the current `handleSubmit` (around line 73):

  ```jsx
  const handleSubmit = () => {
    setTouched({ name: true, email: true, message: true });
    if (canSubmit) setSubmitted(true);
  };
  ```

  Replace with:

  ```jsx
  const handleSubmit = async () => {
    setTouched({ name: true, email: true, message: true });
    if (!canSubmit) return;
    setLoading(true);
    setSubmitError(null);
    try {
      const res = await fetch(
        `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (res.ok) {
        setSubmitted(true);
      } else {
        setSubmitError("Something went wrong. Please try again.");
      }
    } catch {
      setSubmitError("Couldn't send — please email me directly.");
    } finally {
      setLoading(false);
    }
  };
  ```

- [ ] **Step 2: Verify validation still works**

  In the browser, click "Send Message" without filling in the form.
  Expected: fields turn red with error messages — no network request is made (check the Network tab in DevTools).

---

### Task 4: Update the submit button for loading state

**Files:**
- Modify: `src/pages/ContactPage.jsx` — the `<button>` element (around line 470–498)

- [ ] **Step 1: Add `disabled` and loading label to the button**

  Find the submit `<button>` element. Replace its content and add a `disabled` prop:

  ```jsx
  <button
    className="btn-cool"
    onClick={handleSubmit}
    disabled={loading}
    onMouseEnter={() => !loading && setHoverBtn(true)}
    onMouseLeave={() => setHoverBtn(false)}
    style={{
      width: "100%",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      padding: "15px 32px",
      borderRadius: 12,
      border: "none",
      background: `linear-gradient(135deg, ${colors.sky}, ${colors.indigo})`,
      color: colors.bg,
      fontSize: 15,
      fontWeight: 600,
      fontFamily: fonts.body,
      letterSpacing: "0.02em",
      cursor: loading ? "not-allowed" : "pointer",
      opacity: loading ? 0.7 : 1,
      transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
      boxShadow: "none",
      transform: hoverBtn && !loading ? "translateY(-5px) scale(1.04)" : "translateY(0) scale(1)",
    }}
  >
    {loading ? "Sending…" : "Send Message"}
    {!loading && <SendIcon />}
  </button>
  ```

- [ ] **Step 2: Verify visually**

  In the browser, fill in valid form data and click "Send Message". The button should dim and show "Sending…" while the request is in flight (you can throttle the network in DevTools → Network → Slow 3G to see it clearly).

---

### Task 5: Display the error message below the button

**Files:**
- Modify: `src/pages/ContactPage.jsx` — area just after the `</button>` closing tag

- [ ] **Step 1: Add the error display node**

  Immediately after the closing `</button>` tag (inside the same wrapper `<div>`), add:

  ```jsx
  {submitError && (
    <div style={{
      marginTop: 12,
      color: "#f87171",
      fontSize: 13,
      textAlign: "center",
      lineHeight: 1.5,
    }}>
      {submitError}
    </div>
  )}
  ```

- [ ] **Step 2: Manually verify the error path**

  To test the error state without a real network failure, temporarily change the fetch URL to an invalid endpoint:
  ```
  https://formspree.io/f/INVALID_ID_TEST
  ```
  Fill in valid form data and submit. Expected: button returns to "Send Message", red error text appears below it, and the form data is preserved.

  Revert the URL back to `import.meta.env.VITE_FORMSPREE_ID` after verifying.

---

### Task 6: End-to-end test and commit

**Files:**
- No changes — verification only, then commit all modified files.

- [ ] **Step 1: Full happy-path test**

  Fill in valid name, email, and a message longer than 10 characters. Click "Send Message".
  Expected:
  - Button dims to "Sending…"
  - After a moment, the success screen ("Message Sent!") appears
  - An email arrives in the inbox linked to your Formspree account

- [ ] **Step 2: Commit**

  ```bash
  git add src/pages/ContactPage.jsx
  git commit -m "feat: wire contact form to Formspree for real email delivery"
  ```
