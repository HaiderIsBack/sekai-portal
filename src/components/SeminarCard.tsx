import Image from "next/image";
import { Noto_Color_Emoji } from "next/font/google";
import Button from "./Button";
import { Seminar } from "@/types/Seminar";
import { useMemo } from "react";

const notoColorEmoji = Noto_Color_Emoji({
  subsets: [],
  weight: ["400"],
});

type SeminarCardProps = {
    seminar: Seminar;
    handleSeminarSelection: (seminar: Seminar) => void;
}

const SeminarCard = ({ seminar, handleSeminarSelection }: SeminarCardProps) => {
    const eventTypeIcon = seminar.event_type === 'online' ? '💻' : '📍';
    let formattedDate: string | undefined = seminar.date;
    let month = '1';

    formattedDate = useMemo(() => {
        if (seminar.date) {
            try {
                const dateStr = seminar.date.toString();
                let fd = seminar.date;
                
                // Month mapping for English to Japanese
                const monthMap = {
                    'January': { num: '1', jp: '1月' },
                    'February': { num: '2', jp: '2月' },
                    'March': { num: '3', jp: '3月' },
                    'April': { num: '4', jp: '4月' },
                    'May': { num: '5', jp: '5月' },
                    'June': { num: '6', jp: '6月' },
                    'July': { num: '7', jp: '7月' },
                    'August': { num: '8', jp: '8月' },
                    'September': { num: '9', jp: '9月' },
                    'October': { num: '10', jp: '10月' },
                    'November': { num: '11', jp: '11月' },
                    'December': { num: '12', jp: '12月' }
                };
                
                // Convert mixed English-Japanese dates to pure Japanese
                for (const [englishMonth, monthInfo] of Object.entries(monthMap)) {
                    if (dateStr.includes(englishMonth)) {
                        month = monthInfo.num;
                        
                        // Extract day number
                        const dayMatch = dateStr.match(new RegExp(englishMonth + '(\\d+)'));
                        if (dayMatch) {
                            const day = dayMatch[1];
                            fd = `2025年${monthInfo.jp}${day}日`;
                        } else {
                            fd = `2025年${monthInfo.jp}`;
                        }
                        break;
                    }
                }
                
                // Handle already Japanese format
                const japaneseMonthMatch = dateStr.match(/(\d+)月/);
                if (japaneseMonthMatch) {
                    month = japaneseMonthMatch[1];
                    // Date is already in Japanese format, keep it
                    if (!dateStr.includes('年')) {
                        fd = `2025年${dateStr}`;
                    }
                }
                
                // Handle standard date format (YYYY-MM-DD)
                if (dateStr.includes('-') && dateStr.match(/\d{4}-\d{2}-\d{2}/)) {
                    const dateObj = new Date(dateStr);
                    if (!isNaN(dateObj.getTime())) {
                        month = (dateObj.getMonth() + 1).toString();
                        const day = dateObj.getDate();
                        fd = `2025年${month}月${day}日`;
                    }
                }
                return fd;
            } catch (e) {
                console.log('Date parsing error for:', seminar.date, e);
            }
        }
    }, []);
    return (
        <div className="rounded-[8px] overflow-hidden border-[1px] border-[#eee] duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] group-hover:-translate-y-1">
            <div className="w-full h-[160px] relative">
                <Image src={seminar.image_name ?? ""} alt={seminar.title} className="object-cover" fill />
            </div>
            <div className="p-3 my-2">
                <h3 className="text-[18px] font-bold text-[var(--primary)] hover:text-[var(--secondary)] duration-150 cursor-pointer detail-link">{seminar.title}</h3>
                <ul className="mt-4 mb-[44px]">
                    <li className="my-2">
                        <p className="text-[16px]"><span className={notoColorEmoji.className}>{seminar.flag}</span> {seminar.country}, {seminar.city}</p>
                    </li>
                    <li className="my-2">
                        <p className="text-[16px]"><span className={notoColorEmoji.className}>📅</span> {formattedDate}</p>
                    </li>
                    <li className="my-2">
                        <p className="text-[16px]"><span className={notoColorEmoji.className}>👥</span> {seminar.participants}名参加予定</p>
                    </li>
                    <li className="my-2">
                        <span className={`${seminar.event_type === 'online' ? 'bg-[#dbeafe]' : 'bg-[#dcfce7]'} ${seminar.event_type === 'online' ? 'text-[#1e40af]' : 'text-[#166534]'} text-[12px] leading-[1.6] py-1 px-2 rounded-full`}><span className={notoColorEmoji.className}>{eventTypeIcon}</span> {seminar.event_type === 'online' ? 'オンライン': '現地'}</span>
                    </li>
                </ul>
                <Button type='primary' href='' onClick={() => handleSeminarSelection(seminar)}>詳細を見る</Button>
            </div>
        </div>
    );
}

export default SeminarCard;