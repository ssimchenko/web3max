import { SiteHeader } from "@/components/SiteHeader";
import { FaqList } from "@/components/faq/FaqList";
import { faq } from "@/lib/content";

export default function FaqPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-white">
      <section className="px-6 sm:px-10 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold">{faq.title}</h1>
          <p className="mt-4 text-lg text-ink-soft max-w-2xl">{faq.subtitle}</p>

          <FaqList />
        </div>
      </section>
      </main>
    </>
  );
}
