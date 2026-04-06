# Contact Form — Formspree Integration Design

**Date:** 2026-04-06
**File affected:** `src/pages/ContactPage.jsx`

## Problem

`handleSubmit` sets `submitted = true` but never sends data anywhere. The "Message Sent!" screen appears even though no email is delivered.

## Solution

Wire the existing form to Formspree via a `fetch` POST. No new dependencies. No new files (except `.env.local`).

## Architecture

Single-function change inside `ContactPage.jsx`:

- `handleSubmit` becomes `async`
- On valid form: POST `{ name, email, message }` as JSON to `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID}`
- On success (HTTP 200): call `setSubmitted(true)` — existing success UI is unchanged
- On failure: set `submitError` with a user-facing message; keep form data intact so the user doesn't lose their input

## New State

| State | Type | Purpose |
|---|---|---|
| `loading` | `boolean` | Disables button and swaps label to "Sending…" during the request |
| `submitError` | `string \| null` | Inline error shown below the submit button on failure |

## Environment Variable

- Key: `VITE_FORMSPREE_ID`
- Set in: `.env.local` (already gitignored by Vite's default `.gitignore`)
- Read as: `import.meta.env.VITE_FORMSPREE_ID`

## Formspree Setup (manual, done once)

1. Create a free account at formspree.io
2. Create a new form — copy the form ID (e.g. `xpwzgkla`)
3. Add `VITE_FORMSPREE_ID=xpwzgkla` to `.env.local`

## Error Handling

| Scenario | Behaviour |
|---|---|
| Network failure | `submitError` = "Couldn't send — please email me directly." |
| Formspree error (non-ok response) | `submitError` = "Something went wrong. Please try again." |
| Validation fails (client-side) | Existing behaviour — fields turn red, no fetch is made |

## What Does NOT Change

- All existing validation logic (`getFieldState`, `canSubmit`, etc.)
- The success UI (`submitted === true` screen)
- The "Send Another Message" reset flow
- All styling and animation
