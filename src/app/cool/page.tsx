import type { CSSProperties } from "react";
import Image from "next/image";
import { Fraunces, Space_Grotesk } from "next/font/google";

const displayFont = Fraunces({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-display",
});

const bodyFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

const themeVars = {
  "--sand": "#f7f1e8",
  "--ink": "#1f1a17",
  "--clay": "#c97950",
  "--sage": "#6c8b79",
  "--sky": "#e7f0fb",
  "--gold": "#d4a241",
} as CSSProperties;

export default function Kewl() {
  return (
    <main
      className={`${bodyFont.variable} ${displayFont.variable} min-h-screen bg-[var(--sand)] text-[var(--ink)]`}
      style={themeVars}
    >
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-40 right-[-10%] h-80 w-80 rounded-full bg-[color:var(--sky)] opacity-70 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-[-15%] h-72 w-72 rounded-full bg-[color:var(--gold)] opacity-30 blur-3xl" />
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-14 md:px-10 md:py-20">
          <header className="flex flex-wrap items-center justify-between gap-4 text-sm uppercase tracking-[0.2em] text-[color:var(--sage)]">
            <span>Something cool</span>
          </header>

          <section className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--clay)]">
                From Bengaluru to Atlanta
              </p>
              <div className="space-y-4">
                <h1 className="font-[var(--font-display)] text-4xl font-semibold leading-tight md:text-6xl">
                  Hey, I am Dharmik Patel.
                </h1>
                <p className="text-base leading-relaxed text-[color:var(--ink)]/80 md:text-lg">
                  I recently moved from India to Atlanta. I worked at Uber in
                  Bengaluru, the Silicon Valley of India, on Uber Eats. If your
                  order showed up a little faster, I probably nudged it along.
                  I am happiest when I am meeting new people and building
                  community. Also I love Karaoke. 
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {[
                  "People person",
                  "New to Atlanta",
                  "Georgia Tech spirit",
                  "Acoustic guitar beginner",
                  "Craft beer fan",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[color:var(--ink)]/15 bg-white/70 px-3 py-1 text-sm font-medium text-[color:var(--ink)] shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-[color:var(--ink)]/10 bg-white/80 p-5 shadow-sm">
                  <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--sage)]">
                    Social spark
                  </p>
                  <p className="mt-2 text-base font-medium">
                    I love being the person who turns a room into a
                    conversation.
                  </p>
                </div>
                <div className="rounded-2xl border border-[color:var(--ink)]/10 bg-white/80 p-5 shadow-sm">
                  <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--sage)]">
                    Family moment
                  </p>
                  <p className="mt-2 text-base font-medium">
                    My niece Rysa joined the crew, and I am the proud uncle.
                  </p>
                </div>
                <div className="rounded-2xl border border-[color:var(--ink)]/10 bg-white/80 p-5 shadow-sm">
                  <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--sage)]">
                    New hobby
                  </p>
                  <p className="mt-2 text-base font-medium">
                    I just picked up an acoustic guitar and I am learning my
                    first songs.
                  </p>
                </div>
                <div className="rounded-2xl border border-[color:var(--ink)]/10 bg-white/80 p-5 shadow-sm">
                  <p className="text-sm uppercase tracking-[0.2em] text-[color:var(--sage)]">
                    Weekend quest
                  </p>
                  <p className="mt-2 text-base font-medium">
                    Always down to try a new craft beer and find a favorite.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="relative col-span-2 flex items-center justify-center rounded-3xl bg-white/70 p-4 shadow-lg ring-1 ring-black/10">
                <Image
                  src="/cool/uber_tshirt.jpg"
                  alt="Dharmik wearing an Uber t-shirt"
                  width={1200}
                  height={800}
                  className="h-56 w-full object-contain sm:h-64"
                  priority
                />
                <div className="absolute bottom-4 left-4 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--clay)]">
                  Uber days
                </div>
              </div>

              <div className="relative flex items-center justify-center rounded-3xl bg-white/70 p-4 shadow-lg ring-1 ring-black/10">
                <Image
                  src="/cool/rysa.jpg"
                  alt="Dharmik holding his niece Rysa"
                  width={800}
                  height={1000}
                  className="h-56 w-full object-contain"
                />
                <div className="absolute bottom-4 left-4 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--sage)]">
                  Hello, Rysa
                </div>
              </div>

              <div className="relative flex items-center justify-center rounded-3xl bg-white/70 p-4 shadow-lg ring-1 ring-black/10">
                <Image
                  src="/cool/gt_mascot.jpg"
                  alt="Dharmik with the Georgia Tech mascot"
                  width={800}
                  height={1000}
                  className="h-56 w-full object-contain"
                />
                <div className="absolute bottom-4 left-4 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--sage)]">
                  Georgia Tech
                </div>
              </div>

              <div className="relative col-span-2 flex items-center justify-center rounded-3xl bg-white/70 p-4 shadow-lg ring-1 ring-black/10">
                <Image
                  src="/cool/me_with_pappy_van_winkle.PNG"
                  alt="Dharmik holding a special whiskey bottle"
                  width={1200}
                  height={800}
                  className="h-56 w-full object-contain sm:h-64"
                />
                <div className="absolute bottom-4 left-4 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--clay)]">
                  My recent whiskey collection
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-3">
            {[
              {
                title: "People first",
                copy: "I am at my best when I am connecting people, hosting catch-ups, and helping others feel at home.",
              },
              {
                title: "What I build",
                copy: "At Uber Eats, I helped the app do its little dance so your fries showed up hot and on time.",
              },
              {
                title: "What I am into",
                copy: "Family, community, acoustic guitar practice, and trying new craft beers.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-[color:var(--ink)]/10 bg-white/80 p-6 shadow-sm"
              >
                <h3 className="font-[var(--font-display)] text-xl font-semibold">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--ink)]/70">
                  {card.copy}
                </p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </main>
  );
}
