import Button from "@/components/Button";
import SeminarCard from "@/components/SeminarCard";
import Image from "next/image";
import Link from "next/link";

const Pill = ({ children }: any) => {
  return (
    <span className="py-[10px] px-[20px] bg-[#f9f9f9] border-[1px] border-[#ddd] text-[16px] rounded-[30px]">{children}</span>
  );
}

export default function Home() {
  return (
    <main>
      <section className="max-w-[1500px] mx-auto w-full flex flex-col justify-center items-center gap-4 py-[60px] px-[20px]">
        <h2 className="text-[32px] font-bold mt-[26px]">🌏Let's move the world</h2>
        <p className="text-[18px]">Connect with new customers by speaking at and co-hosting overseas seminars</p>
        <div className="flex items-center gap-4 my-3">
          <Button type='primary' href='#'>Find a Seminar</Button>
          <Button type='secondary' href='#'>Consult</Button>
        </div>
        <div className="max-w-[100%] flex justify-center gap-4 flex-wrap">
          <Pill>Standing on the world stage</Pill>
          <Pill>Meet your ideal clients</Pill>
          <Pill>Strengthening influence</Pill>
          <Pill>Find investors and business partners</Pill>
          <Pill>Promoting Japan's No. 1 initiative</Pill>
        </div>
      </section>

      <section className="max-w-[1500px] mx-auto py-[40px] px-[20px]">
        <h2 className="text-2xl mt-[24px] mb-[20px] font-bold">How to use</h2>
        <div className="grid grid-cols-3 gap-[20px]">
          <div className="p-3 rounded-[8px] border-[1px] border-[#eee] shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
            <h3 className="text-[18px] font-bold text-[var(--primary)] hover:text-[var(--secondary)] duration-150 cursor-pointer">Step 1: Find a Seminar</h3>
            <p className="text-[16px] py-4">Choose from events around the world</p>
          </div>
          <div className="p-3 rounded-[8px] border-[1px] border-[#eee] shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
            <h3 className="text-[18px] font-bold text-[var(--primary)] hover:text-[var(--secondary)] duration-150 cursor-pointer">Step 2: Talk to a calling expert</h3>
            <p className="text-[16px] py-4">Apply by sharing your profile and thoughts</p>
          </div>
          <div className="p-3 rounded-[8px] border-[1px] border-[#eee] shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
            <h3 className="text-[18px] font-bold text-[var(--primary)] hover:text-[var(--secondary)] duration-150 cursor-pointer">Step 3: Go global</h3>
            <p className="text-[16px] py-4">Gain new customers and networks</p>
          </div>
        </div>
      </section>

      <section className="max-w-[1500px] mx-auto py-[40px] px-[20px]">
        <h2 className="text-2xl mt-[24px] mb-[20px] font-bold">Recent Seminars</h2>
        <div className="grid grid-cols-3 gap-[20px]">
          <SeminarCard />
          <SeminarCard />
          <SeminarCard />
        </div>
        <Link href={'#'} className="block mt-4 text-right text-[18px] text-[var(--primary)] font-bold hover:underline">See all Seminars →</Link>
      </section>

      <section className="max-w-[1500px] mx-auto py-[40px] px-[20px]">
        <h2 className="text-2xl mt-[24px] mb-[20px] font-bold">Participant Comments</h2>
        <div className="flex flex-col gap-3 bg-[#f9f9f9] p-[15px] rounded-[8px] mb-4">
          <span className="text-[#fbbf24]">★★★★★</span>
          <p className="text-[16px]">It was an opportunity to connect with overseas clients.</p>
        </div>
        <div className="flex flex-col gap-3 bg-[#f9f9f9] p-[15px] rounded-[8px]">
          <span className="text-[#fbbf24]">★★★★★</span>
          <p className="text-[16px]">It was an opportunity to connect with overseas clients.</p>
        </div>
      </section>

      <section className="max-w-[1500px] mx-auto py-[40px] px-[20px]">
        <h2 className="text-2xl mt-[24px] mb-[20px] font-bold">Case studies</h2>
        <div className="grid grid-cols-2 gap-[20px]">
          <div className="rounded-[8px] overflow-hidden border-[1px] border-[#eee] shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
            <Image src={"/images/hr_seminar.jpg"} alt="HR Seminar" className="w-full h-[160px] object-cover" width={910} height={670} />
            <div className="p-3 mt-2">
              <h3 className="text-[18px] font-bold text-[var(--primary)] hover:text-[var(--secondary)] duration-150 cursor-pointer">American human resources seminar</h3>
              <p className="text-[16px] py-4">Gain new customers and networks</p>
            </div>
          </div>
          <div className="rounded-[8px] overflow-hidden border-[1px] border-[#eee] shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
            <Image src={"/images/europe_speaking.jpg"} alt="Europe Speaking" className="w-full h-[160px] object-cover" width={910} height={670} />
            <div className="p-3 mt-2">
              <h3 className="text-[18px] font-bold text-[var(--primary)] hover:text-[var(--secondary)] duration-150 cursor-pointer">American human resources seminar</h3>
              <p className="text-[16px] py-4">Gain new customers and networks</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1500px] mx-auto py-[40px] px-[20px]">
        <h2 className="text-2xl mt-[24px] mb-[20px] font-bold">FAQ</h2>
        <div className="mb-4">
          <h3 className="text-[16px] font-bold mb-[5px]">Q. Can I participate even if I don't speak English?</h3>
          <p className="text-[16px]">A. Don't worry, we have interpretation support available.</p>
        </div>
        <div className="mb-4">
          <h3 className="text-[16px] font-bold mb-[5px]">Q. Can I participate even if I don't speak English?</h3>
          <p className="text-[16px]">A. Don't worry, we have interpretation support available.</p>
        </div>
        <div className="mb-4">
          <h3 className="text-[16px] font-bold mb-[5px]">Q. Can I participate even if I don't speak English?</h3>
          <p className="text-[16px]">A. Don't worry, we have interpretation support available.</p>
        </div>
      </section>
    </main>
  );
}
