import Button from "@/components/Button";

const Pill = ({ children }: any) => {
  return (
    <span className="py-[10px] px-[20px] bg-[#f9f9f9] border-[1px] border-[#ddd] text-[16px] rounded-[30px]">{children}</span>
  );
}

export default function Home() {
  return (
    <main>
      <section className="w-full h-[80vh] flex flex-col justify-center items-center gap-4">
        <h2 className="text-[32px] font-bold">🌏Let's move the world</h2>
        <p className="text-[18px]">Connect with new customers by speaking at and co-hosting overseas seminars</p>
        <div className="flex items-center gap-4 my-3">
          <Button type='primary' href='#'>Find a Seminar</Button>
          <Button type='secondary' href='#'>Consult</Button>
        </div>
        <div className="max-w-[80%] flex justify-center gap-4 flex-wrap">
          <Pill>Standing on the world stage</Pill>
          <Pill>Meet your ideal clients</Pill>
          <Pill>Strengthening influence</Pill>
          <Pill>Find investors and business partners</Pill>
          <Pill>Promoting Japan's No. 1 initiative</Pill>
        </div>
      </section>
    </main>
  );
}
