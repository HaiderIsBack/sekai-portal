import { Noto_Color_Emoji } from "next/font/google";
import Button from "./Button";
import { Seminar } from "@/types/Seminar";
import Image from "next/image";
import FormattedDate from "@/utils/formattedDate";

const notoColorEmoji = Noto_Color_Emoji({
  subsets: [],
  weight: ["400"],
});

type SeminarCardProps = {
    seminar: Seminar;
    handleSeminarSelection: (seminar: Seminar) => void;
}

const SeminarCard = ({ seminar, handleSeminarSelection }: SeminarCardProps) => {
    const eventTypeIcon = seminar.event_type === 'online' ? 
        (<Image src={"/images/laptop.png"} alt="Laptop Icon" width={14} height={14} />) : 
        (<Image src={"/images/pin-2.png"} alt="Pin 2 Icon" width={18} height={18} className="-mt-[4px] -mr-[2px]" />);
    
    return (
        <div className="rounded-[8px] overflow-hidden border-[1px] border-[#eee] duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] group-hover:-translate-y-1">
            <div className="w-full h-[160px] relative">
                <img src={seminar.image_name ?? "/images/sekai-sample-img.jpg"} alt={seminar.title} loading="lazy" onError={(e) => { (e.target as HTMLImageElement).src = "/images/sekai-sample-img.jpg"; }} className="w-full h-full object-cover" />
            </div>
            <div className="p-3 my-2">
                <h3 className="text-[18px] leading-[1.3] font-bold text-[var(--primary)] hover:text-[var(--secondary)] duration-150 cursor-pointer detail-link" onClick={() => handleSeminarSelection(seminar)}>{seminar.title}</h3>
                <ul className="mt-2.5 mb-[44px]">
                    <li className="my-2">
                        <p className="text-[16px] text-[#555]"><span className={notoColorEmoji.className}>{seminar.flag}</span> {seminar.country}, {seminar.city}</p>
                    </li>
                    <li className="my-2">
                        <p className="text-[16px] text-[#555] flex gap-2 items-center"><Image src={"/images/calendar.png"} alt="Calendar Icon" width={18} height={18} /> {FormattedDate(seminar.date)}</p>
                    </li>
                    <li className="my-2">
                        <p className="text-[16px] text-[#555] flex gap-2 items-center"><Image src={"/images/group.png"} alt="People Icon" width={18} height={18} /> {seminar.participants}名参加予定</p>
                    </li>
                    <li className="my-2">
                        <span className={`${seminar.event_type === 'online' ? 'bg-[#dbeafe]' : 'bg-[#dcfce7]'} ${seminar.event_type === 'online' ? 'text-[#1e40af]' : 'text-[#166534]'} text-[12px] leading-[1.6] py-1 px-2 rounded-full inline-flex items-center gap-2`}>{eventTypeIcon} {seminar.event_type === 'online' ? 'オンライン': '現地'}</span>
                    </li>
                </ul>
                <Button type='primary' href='' onClick={() => handleSeminarSelection(seminar)}>詳細を見る</Button>
            </div>
        </div>
    );
}

export default SeminarCard;
