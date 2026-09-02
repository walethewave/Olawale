# Getting Started

Follow these steps to set up the project locally on your machine.

**Requirements**

Ensure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en) (recommended version: v20)
- [pnpm](https://pnpm.io/) (recommended to install via Corepack)

**Setting up the Repository**

```bash
npx create-next-app -e https://github.com/techwithanirudh/shadcn-portfolio
cd shadcn-portfolio
```

**Configuring the Project**

1. (Optional) If you want to use the contact form functionality:

   ```bash
   cp .env.example .env
   ```

   **Email (Resend) — required for the form to send mail**

   - Create a free account at [resend.com](https://resend.com/) and verify a sending domain (or use their shared test domain while developing).
   - Create an API key under **API Keys** and set it as `RESEND_API_KEY` in `.env`.
   - Set `EMAIL_FROM` to an address on your verified domain (e.g. `contact@yourdomain.com`) and `EMAIL_TO` to the inbox that should receive submissions.

   **Turnstile (Cloudflare) — optional bot protection**

   The contact form works fine without Turnstile: if `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` are left unset, the widget is skipped on the client and the server action skips verification, so submissions go straight to Resend. To turn it on:

   - Go to the [Cloudflare Turnstile dashboard](https://dash.cloudflare.com/?to=/:account/turnstile) and add a new site (a "Managed" challenge is a good default).
   - Add your local (`localhost`) and production domains as allowed hostnames.
   - Copy the **Site Key** into `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and the **Secret Key** into `TURNSTILE_SECRET_KEY` in `.env`.
   - Restart `pnpm dev` after changing `.env` — Next.js only reads env vars at startup.

   If you do not wish to use the contact form at all, you can comment out the contact form code in the `contact.tsx` file located in the `@/components/sections/contact` directory.

2. Update the configuration files for each section. The paths to these files, relative to the project root, are as follows:

- `@/app/config`
- `@/components/sections/header/config`
- `@/components/sections/hero/config`
- `@/components/sections/experience/config`
- `@/components/sections/projects/config`
- `@/components/sections/skills/config`
- `@/components/sections/testimonials/config`
- `@/components/sections/contact/config`
- `@/components/sections/footer/config`

After updating the template with your data, you can run the app.

**Solution Architecture decks**

Each project (`content/projects/*.mdx`) and client engagement (`content/client-work/*.mdx`) can carry a downloadable PPTX. Drop the file here:

- Projects: `public/architecture/projects/<slug>/deck.pptx`
- Client work: `public/architecture/client-work/<slug>/deck.pptx`

then set `architectureDeck: /architecture/projects/<slug>/deck.pptx` (or the `client-work` equivalent) in that entry's frontmatter. A "Solution Architecture Deck" button appears on the project/client-work page automatically once the field is set — leave it unset and no button renders. The written architecture narrative itself is just a normal `## Solution Architecture` section in the MDX body, alongside the rest of the write-up.

**Client Work section**

`content/client-work/*.mdx` powers `/client-work`, a separate section from `/projects` for confidential engagements. Every entry automatically shows an NDA disclaimer and never renders a GitHub/live-site link (there's no field for one). Frontmatter fields: `title`, `description`, `industry` (optional, e.g. "Healthcare"), `role` (optional, e.g. "Solo AI Engineer"), `tags`, `date`, `thumbnail` (falls back to `/images/client-work/<slug>/cover.jpg`), `architectureDeck`.

**Running the Project**

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.
