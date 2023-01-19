import { CalendarGraph } from "@web/components/ui/CalendarGraph";
import { Header } from "@web/components/ui/Header";
import { SEO } from "@web/components/utils/SEO";

export default function Home() {
  return (
    <SEO title="Habits" description="Habits | Track your habits easily">
      <main className="grid place-items-center min-h-screen">
        <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
          <Header />
          <CalendarGraph />
        </div>
      </main>
    </SEO>
  );
}
