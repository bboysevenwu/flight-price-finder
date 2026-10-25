import { Link } from "react-router";
import { Radar, BellRing, CircleSlash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { usePageMeta } from "@/hooks/use-page-meta";

const features = [
  {
    icon: Radar,
    title: "盯緊熱門航線 (Always-on route watching)",
    body: "持續監控台北出發的熱門航線（東京、首爾），自動抓最低票價。",
  },
  {
    icon: BellRing,
    title: "達標自動通知 (Target-price email alerts)",
    body: "低於你設定的目標價，就寄 email 提醒你，附上立即訂購連結。",
  },
  {
    icon: CircleSlash,
    title: "隨時取消 (Cancel anytime)",
    body: "月訂閱制，不想用隨時停，沒有綁約。",
  },
];

export default function Index() {
  usePageMeta({
    title: "Flight Price Notifier — 機票降價通知",
    description:
      "設定航線與目標價，機票降價就通知你。Set a route and a target price — we email you when the fare drops.",
    ogDescription: "Set a route and a target price — we email you when the fare drops.",
    twitterCard: "summary_large_image",
  });
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 border-b bg-background/70 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Logo />
          <Button asChild>
            <Link to="/auth">Sign in / 登入</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-glow" />
          <div className="relative mx-auto max-w-4xl px-4 py-28 text-center sm:py-36">
            <Reveal>
              <p className="mb-6 inline-block rounded-full border px-4 py-1 text-xs text-muted-foreground">
                台北出發 · 東京 · 首爾
              </p>
              <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
                <span className="text-gradient">Flight Price Notifier</span>
              </h1>
              <p className="mt-6 text-xl font-medium sm:text-2xl">
                設定航線與目標價，機票降價就通知你
              </p>
              <p className="mt-3 text-muted-foreground">
                Set a route and a target price — we email you when the fare drops.
              </p>
              <div className="mt-10 flex justify-center gap-3">
                <Button asChild size="lg" className="bg-gradient-primary shadow-glow">
                  <Link to="/signup">免費開始 Get started</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-28">
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 120}>
                <div className="h-full rounded-2xl border bg-card p-6 transition-colors hover:border-primary/50">
                  <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl bg-accent">
                    <f.icon className="h-5 w-5 text-primary-glow" />
                  </div>
                  <h3 className="font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        © 2026 Flight Price Notifier
      </footer>
    </div>
  );
}
