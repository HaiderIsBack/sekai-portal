import Image from "next/image";
import { Noto_Color_Emoji } from "next/font/google";
import Button from "./Button";

const notoColorEmoji = Noto_Color_Emoji({
  subsets: [],
  weight: ["400"],
});

const SeminarCard = () => {
    return (
        <div className="rounded-[8px] overflow-hidden border-[1px] border-[#eee] duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:-translate-y-1">
            <Image src={"/images/hr_seminar.jpg"} alt="HR Seminar" className="w-full h-[160px] object-cover" width={910} height={670} />
            <div className="p-3 my-2">
                <h3 className="text-[18px] font-bold text-[var(--primary)] hover:text-[var(--secondary)] duration-150 cursor-pointer detail-link">The hard part of JavaScript:</h3>
                <ul className="mb-[44px]">
                    <li className="my-2">
                        <p className="text-[16px]"><span className={notoColorEmoji.className}>🇺🇸</span> USA, Bronx</p>
                    </li>
                    <li className="my-2">
                        <p className="text-[16px]"><span className={notoColorEmoji.className}>📅</span> USA, Bronx</p>
                    </li>
                    <li className="my-2">
                        <p className="text-[16px]"><span className={notoColorEmoji.className}>👥</span> USA, Bronx</p>
                    </li>
                    <li className="my-2">
                        <span className="bg-[#dbeafe] text-[#1e40ef] text-[12px] leading-[1.6] py-1 px-2 rounded-full">online</span>
                    </li>
                </ul>
                <Button type='primary' href='#'>Learn More</Button>
            </div>
        </div>
    );
}

export default SeminarCard;