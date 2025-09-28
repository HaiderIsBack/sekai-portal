"use client";

import { SeminarInfo } from "@/types/Seminar";
import { Noto_Color_Emoji } from "next/font/google";
import { FormEventHandler, useEffect, useState } from "react";

import emailjs from "emailjs-com";

import { supabase } from "@/lib/supabaseClient";

const notoColorEmoji = Noto_Color_Emoji({
  subsets: [],
  weight: ["400"],
});

type InquiryModalProps = {
    setIsVisible: (inquiryModalVisible: boolean) => void;
    selectedSeminarIds?: number[];
    isGeneralUse?: boolean;
    setIsGeneralUse?: (isGeneralUse: boolean) => void;
    handleRemoveId: (id: number) => void;
}

const InquiryModal = ({ setIsVisible, selectedSeminarIds, handleRemoveId, isGeneralUse, setIsGeneralUse }: InquiryModalProps) => {
    const [selectedSeminars, setSelectedSeminars] = useState<SeminarInfo[]>([]);

    useEffect(() => {
        if (!selectedSeminarIds || selectedSeminarIds.length < 1 || isGeneralUse) return;
        
        if (selectedSeminarIds && selectedSeminarIds.length < 1) {
            setIsVisible(false);
        }
    }, [selectedSeminarIds]);
    
    useEffect(() => {
        if (!selectedSeminarIds || selectedSeminarIds.length < 1 || isGeneralUse) return;

        const fetchSeminars = async () => {
            const { data, error } = await supabase.from("seminars")
            .select('id, title, country, date, flag')
            .in('id', selectedSeminarIds ?? [])
    
            if (error) {
                alert(error.message);
                return;
            }
    
            if (data) {
                setSelectedSeminars(data);
            }
        }
        fetchSeminars();
    }, [selectedSeminarIds]);

    const handleFormSubmition: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());

        const seminarListText = selectedSeminars.length > 0
        ? selectedSeminars.reduce(
            (text, s) =>
            text + `• ${s.title} (${s.flag} ${s.country}・${s.date})\n`,
            ''
            ).trim()
        : '一般的なご相談';

        const adminEmailParams = {
            from_name: data.name,
            from_email: data.email,
            company: data.company,
            position: data.position || 'N/A',
            social: data.social || 'N/A',
            message: data.message,
            interview_date_1: data.interview_date_1 || 'N/A',
            interview_date_2: data.interview_date_2 || 'N/A',
            interview_date_3: data.interview_date_3 || 'N/A',
            seminars: seminarListText,
            reply_to: data.email
        };

        const userEmailParams = {
            to_name: data.name,
            to_email: data.email,
            company: data.company,
            seminars: seminarListText,
            reply_to: data.email
        };

        (function(){
            emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_USER_ID ?? '');
        })();

        emailjs.send('default_service', process.env.NEXT_PUBLIC_EMAILJS_ADMIN_TEMPLATE_ID ?? '', adminEmailParams)
        .then(() => {
            // 2. Send auto-reply email to the user using the correct ID
            const userTemplateId = process.env.NEXT_PUBLIC_EMAILJS_USER_TEMPLATE_ID ?? ''; // The correct ID from your screenshot
            return emailjs.send('default_service', userTemplateId, userEmailParams);
        })
        .then(() => {
            console.log('User auto-reply sent successfully!');
            alert("Both emails have been sent successfully");
            // showSuccessMessage(); // Show success only after both emails are handled
        })
        .catch((error) => {
            console.error('Email sending failed:', error);
            alert("Email not sent error occured");
        });
    }

    return (
    <>
        <div className="bg-gray-950/30 fixed top-0 left-0 w-full h-full z-20" onClick={() => {
            setIsVisible(false); 
            setSelectedSeminars([]);
            if (setIsGeneralUse)
            setIsGeneralUse(false);
        }} />
        <div className="fixed top-1/2 left-1/2 -translate-1/2 w-full max-w-[940px] h-[80vh] max-h-[600px] overflow-y-auto bg-white rounded-[10px] p-5 pt-0 z-30">
            <div className="sticky top-0 bg-white flex justify-between items-center border-b-[1px] border-[#ddd] pt-[20px] pb-[12px] mb-[12px]">
                <h2 className="text-2xl font-bold">登壇・共催のご相談</h2>
                <span className="text-[38px] hover:text-red-500 hover:cursor-pointer" onClick={() => {setIsVisible(false); setSelectedSeminars([]); if(setIsGeneralUse) {setIsGeneralUse(false)}}}>&times;</span>
            </div>

            <div className="p-3 my-2">
                {
                    isGeneralUse && (selectedSeminarIds?.length ?? 0) < 1 ? (
                    <div className="flex justify-between items-center flex-nowrap text-[16px] py-4 px-[15px] bg-[#f9fafb] border-[1px] border-[#e5e7eb] rounded-[8px] my-2.5">
                        <div className="flex flex-col gap-4 text-[16px]">
                            <h3 className="font-bold">一般的なご相談</h3>
                            <p>特定のセミナーを選択せず、一般的なご相談を承ります。</p>
                        </div>
                    </div>) :
                    selectedSeminars && (
                        selectedSeminars.map(selectedSeminar => (
                            <div key={selectedSeminar.id} className="flex justify-between items-center flex-nowrap text-[16px] py-4 px-[15px] bg-[#f9fafb] border-[1px] border-[#e5e7eb] rounded-[8px] my-2.5">
                                <p>
                                    <span className={notoColorEmoji.className}>📌</span> <strong className="ml-1">{selectedSeminar.title}</strong> (<span className={notoColorEmoji.className}>{selectedSeminar.flag}</span> ${selectedSeminar.country}・${selectedSeminar.date})
                                </p>
                                <span className="text-[26px] hover:text-red-500 hover:cursor-pointer" onClick={() => {handleRemoveId(selectedSeminar.id); selectedSeminarIds = selectedSeminarIds?.filter(i => i !== selectedSeminar.id); selectedSeminarIds && selectedSeminarIds?.length === 0 ? setIsVisible(false) : null; console.log(selectedSeminarIds)}}>&times;</span>
                            </div>
                        ))
                    )
                }
                <form onSubmit={handleFormSubmition}>
                    <div className="w-full flex flex-col items-start mb-[15px]">
                        <label htmlFor="name" className="text-[16px] text-[#333] font-bold mb-[5px]">お名前 (必須)</label>
                        <input type="text" name="name" id="name" className="w-full p-2.5 border-[1px] border-[#ddd] focus:outline-[1px] focus:outline-[var(--primary)] text-[14px] rounded-[4px]" required />
                    </div>
                    <div className="w-full flex flex-col items-start mb-[15px]">
                        <label htmlFor="email" className="text-[16px] text-[#333] font-bold mb-[5px]">メールアドレス (必須)</label>
                        <input type="email" name="email" id="email" className="w-full p-2.5 border-[1px] border-[#ddd] focus:outline-[1px] focus:outline-[var(--primary)] text-[14px] rounded-[4px]" required />
                    </div>
                    <div className="w-full flex flex-col items-start mb-[15px]">
                        <label htmlFor="position" className="text-[16px] text-[#333] font-bold mb-[5px]">役職</label>
                        <input type="text" name="position" id="position" className="w-full p-2.5 border-[1px] border-[#ddd] focus:outline-[1px] focus:outline-[var(--primary)] text-[14px] rounded-[4px]" />
                    </div>
                    <div className="w-full flex flex-col items-start mb-[15px]">
                        <label htmlFor="company-name" className="text-[16px] text-[#333] font-bold mb-[5px]">会社名 (必須)</label>
                        <input type="text" name="company" id="company-name" className="w-full p-2.5 border-[1px] border-[#ddd] focus:outline-[1px] focus:outline-[var(--primary)] text-[14px] rounded-[4px]" required />
                    </div>
                    <div className="w-full flex flex-col items-start mb-[15px]">
                        <label htmlFor="socials" className="text-[16px] text-[#333] font-bold mb-[5px]">SNSプロフィールリンク (必須)</label>
                        <input type="text" name="social" id="socials" className="w-full p-2.5 border-[1px] border-[#ddd] focus:outline-[1px] focus:outline-[var(--primary)] text-[14px] rounded-[4px]" placeholder="https://" required />
                    </div>
                    <div className="w-full flex flex-col items-start mb-[15px]">
                        <label htmlFor="message" className="text-[16px] text-[#333] font-bold mb-[5px]">メッセージ・自己紹介</label>
                        <textarea name="message" id="message" className="w-full p-2.5 border-[1px] border-[#ddd] focus:outline-[1px] focus:outline-[var(--primary)] text-[14px] rounded-[4px] h-32 resize-y" placeholder="登壇希望の理由や、あなたの専門分野について教えてください" required />
                    </div>
                    <div className="w-full flex flex-col items-start mb-[15px]">
                        <label htmlFor="interview-date-1" className="text-[16px] text-[#333] font-bold mb-[5px]">希望面談日時 1</label>
                        <input type="datetime-local" name="interview_date_1" id="interview-date-1" className="w-full p-2.5 border-[1px] border-[#ddd] focus:outline-[1px] focus:outline-[var(--primary)] text-[14px] rounded-[4px]" />
                    </div>
                    <div className="w-full flex flex-col items-start mb-[15px]">
                        <label htmlFor="interview-date-2" className="text-[16px] text-[#333] font-bold mb-[5px]">希望面談日時 2</label>
                        <input type="datetime-local" name="interview_date_2" id="interview-date-2" className="w-full p-2.5 border-[1px] border-[#ddd] focus:outline-[1px] focus:outline-[var(--primary)] text-[14px] rounded-[4px]" />
                    </div>
                    <div className="w-full flex flex-col items-start mb-[15px]">
                        <label htmlFor="interview-date-3" className="text-[16px] text-[#333] font-bold mb-[5px]">希望面談日時 3</label>
                        <input type="datetime-local" name="interview_date_3" id="interview-date-3" className="w-full p-2.5 border-[1px] border-[#ddd] focus:outline-[1px] focus:outline-[var(--primary)] text-[14px] rounded-[4px]" />
                    </div>

                    <button type="submit" className="w-full py-[10px] px-[20px] text-[14px] border-[1px] border-[var(--primary)] rounded-[6px] duration-200 hover:cursor-pointer bg-[var(--primary)] text-white hover:bg-[var(--secondary)]">送信する</button>
                </form>
            </div>
        </div>
    </>
    );
}

export default InquiryModal;