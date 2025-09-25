import Image from "next/image";
import { Noto_Color_Emoji } from "next/font/google";
import Button from "./Button";
import { Seminar } from "@/types/Seminar";
import { useContext, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";

const notoColorEmoji = Noto_Color_Emoji({
  subsets: [],
  weight: ["400"],
});

type SeminarCardProps = {
    seminar: Seminar;
    handleSeminarSelection: (seminar: Seminar) => void;
}

const SeminarCard = ({ seminar, handleSeminarSelection }: SeminarCardProps) => {
    const { getImageSourceURL } = useAppContext();

    let imageSrc = getImageSourceURL();

    seminar.image_name = imageSrc;

    return (
        <div className="rounded-[8px] overflow-hidden border-[1px] border-[#eee] duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:-translate-y-1">
            <Image src={imageSrc} alt={seminar.title} className="w-full h-[160px] object-cover" width={910} height={670} />
            <div className="p-3 my-2">
                <h3 className="text-[18px] font-bold text-[var(--primary)] hover:text-[var(--secondary)] duration-150 cursor-pointer detail-link">{seminar.title}</h3>
                <ul className="mt-4 mb-[44px]">
                    <li className="my-2">
                        <p className="text-[16px]"><span className={notoColorEmoji.className}>{seminar.flag}</span> {seminar.country}, {seminar.city}</p>
                    </li>
                    <li className="my-2">
                        <p className="text-[16px]"><span className={notoColorEmoji.className}>📅</span> {seminar.date}</p>
                    </li>
                    <li className="my-2">
                        <p className="text-[16px]"><span className={notoColorEmoji.className}>👥</span> {seminar.participants}</p>
                    </li>
                    <li className="my-2">
                        <span className={`${seminar.event_type === 'online' ? 'bg-[#dbeafe]' : 'bg-[#dcfce7]'} ${seminar.event_type === 'online' ? 'text-[#1e40af]' : 'text-[#166534]'} text-[12px] leading-[1.6] py-1 px-2 rounded-full`}>{seminar.event_type === 'online' ? 'online': 'local'}</span>
                    </li>
                </ul>
                <Button type='primary' href='' onClick={() => handleSeminarSelection(seminar)}>Learn More</Button>
            </div>
        </div>
    );
}

export default SeminarCard;