import Image from 'next/image';
import Link from 'next/link';
import { WARD_NAME } from '@/lib/site';

export default function HomePage() {
  return (
    <div className="space-y-8">
      <Image
        src="/hero.svg"
        alt="A small meetinghouse with a steeple on a hillside at sunrise"
        width={1200}
        height={420}
        priority
        className="h-auto w-full rounded-lg border border-rule"
      />
      <section>
        <h1 className="font-serif text-4xl font-semibold">{WARD_NAME} sacrament meetings</h1>
        <p className="mt-3 max-w-prose text-lg text-muted">
          Plan each Sunday&rsquo;s program, review past meetings, and print a copy for the congregation.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/meetings/current"
            className="rounded bg-accent px-5 py-3 font-semibold text-white hover:opacity-90"
          >
            View this Sunday&rsquo;s program
          </Link>
          <Link
            href="/meetings"
            className="rounded border border-accent px-5 py-3 font-semibold text-accent hover:bg-accent-soft"
          >
            Browse all meetings
          </Link>
        </div>
      </section>
    </div>
  );
}
