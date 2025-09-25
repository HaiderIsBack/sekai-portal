"use client";

import { Seminar } from "@/types/Seminar";
import { Noto_Color_Emoji } from "next/font/google";
import { FormEventHandler } from "react";

const notoColorEmoji = Noto_Color_Emoji({
  subsets: [],
  weight: ["400"],
});

type InquiryModalProps = {
    setIsVisible: (inquiryModalVisible: boolean) => void;
    selectedSeminar: Seminar;
}

const InquiryModal = ({ setIsVisible, selectedSeminar }: InquiryModalProps) => {

    const handleFormSubmition: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());

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
            // seminars: seminarListText,
            reply_to: data.email
        };
    }

    return (
    <>
        <div className="bg-gray-950/30 fixed top-0 left-0 w-full h-full z-20" onClick={() => setIsVisible(false)} />
        <div className="fixed top-1/2 left-1/2 -translate-1/2 w-full max-w-[940px] h-11/12 max-h-4/5 overflow-y-auto bg-white rounded-[10px] p-5 pt-0 z-30">
            <div className="sticky top-0 bg-white flex justify-between items-center border-b-[1px] border-[#ddd] pt-[20px] pb-[12px] mb-[12px]">
                <h2 className="text-2xl font-bold">Inquiries about speaking and co-hosting</h2>
                <span className="text-[38px] hover:text-red-500 hover:cursor-pointer" onClick={() => setIsVisible(false)}>&times;</span>
            </div>

            <div className="p-3 my-2">
                <div className="flex justify-between items-center flex-nowrap text-[16px] py-4 px-[15px] bg-[#f9fafb] border-[1px] border-[#e5e7eb] rounded-[8px] my-2.5">
                    <p>
                        <span className={notoColorEmoji.className}>📌</span> <strong className="ml-1">{selectedSeminar.title}</strong> (<span className={notoColorEmoji.className}>{selectedSeminar.flag}</span> ${selectedSeminar.country}・${selectedSeminar.date})
                    </p>
                    <span className="text-[26px] hover:text-red-500 hover:cursor-pointer" onClick={() => setIsVisible(false)}>&times;</span>
                </div>
                <form onSubmit={handleFormSubmition}>
                    <div className="w-full flex flex-col items-start mb-[15px]">
                        <label htmlFor="name" className="text-[16px] text-[#333] font-bold mb-[5px]">Name (required)</label>
                        <input type="text" name="your_name" id="name" className="w-full p-2.5 border-[1px] border-[#ddd] focus:outline-[1px] focus:outline-[var(--primary)] text-[14px] rounded-[4px]" required />
                    </div>
                    <div className="w-full flex flex-col items-start mb-[15px]">
                        <label htmlFor="email" className="text-[16px] text-[#333] font-bold mb-[5px]">Email Address (required)</label>
                        <input type="email" name="email" id="email" className="w-full p-2.5 border-[1px] border-[#ddd] focus:outline-[1px] focus:outline-[var(--primary)] text-[14px] rounded-[4px]" required />
                    </div>
                    <div className="w-full flex flex-col items-start mb-[15px]">
                        <label htmlFor="position" className="text-[16px] text-[#333] font-bold mb-[5px]">Position</label>
                        <input type="text" name="position" id="position" className="w-full p-2.5 border-[1px] border-[#ddd] focus:outline-[1px] focus:outline-[var(--primary)] text-[14px] rounded-[4px]" />
                    </div>
                    <div className="w-full flex flex-col items-start mb-[15px]">
                        <label htmlFor="company-name" className="text-[16px] text-[#333] font-bold mb-[5px]">Company Name (required)</label>
                        <input type="text" name="company_name" id="company-name" className="w-full p-2.5 border-[1px] border-[#ddd] focus:outline-[1px] focus:outline-[var(--primary)] text-[14px] rounded-[4px]" required />
                    </div>
                    <div className="w-full flex flex-col items-start mb-[15px]">
                        <label htmlFor="socials" className="text-[16px] text-[#333] font-bold mb-[5px]">Social Media Profile Links (required)</label>
                        <input type="text" name="socials" id="socials" className="w-full p-2.5 border-[1px] border-[#ddd] focus:outline-[1px] focus:outline-[var(--primary)] text-[14px] rounded-[4px]" placeholder="https://" required />
                    </div>
                    <div className="w-full flex flex-col items-start mb-[15px]">
                        <label htmlFor="message" className="text-[16px] text-[#333] font-bold mb-[5px]">Message / Introduction</label>
                        <textarea name="message" id="message" className="w-full p-2.5 border-[1px] border-[#ddd] focus:outline-[1px] focus:outline-[var(--primary)] text-[14px] rounded-[4px] h-32 resize-y" placeholder="Tell us why do you want to speak" required />
                    </div>
                    <div className="w-full flex flex-col items-start mb-[15px]">
                        <label htmlFor="interview-date-1" className="text-[16px] text-[#333] font-bold mb-[5px]">Desired interview date and time 1</label>
                        <input type="datetime-local" name="interview_date_1" id="interview-date-1" className="w-full p-2.5 border-[1px] border-[#ddd] focus:outline-[1px] focus:outline-[var(--primary)] text-[14px] rounded-[4px]" />
                    </div>
                    <div className="w-full flex flex-col items-start mb-[15px]">
                        <label htmlFor="interview-date-2" className="text-[16px] text-[#333] font-bold mb-[5px]">Desired interview date and time 2</label>
                        <input type="datetime-local" name="interview_date_2" id="interview-date-2" className="w-full p-2.5 border-[1px] border-[#ddd] focus:outline-[1px] focus:outline-[var(--primary)] text-[14px] rounded-[4px]" />
                    </div>
                    <div className="w-full flex flex-col items-start mb-[15px]">
                        <label htmlFor="interview-date-3" className="text-[16px] text-[#333] font-bold mb-[5px]">Desired interview date and time 3</label>
                        <input type="datetime-local" name="interview_date_3" id="interview-date-3" className="w-full p-2.5 border-[1px] border-[#ddd] focus:outline-[1px] focus:outline-[var(--primary)] text-[14px] rounded-[4px]" />
                    </div>

                    <button type="submit" className="w-full py-[10px] px-[20px] text-[14px] border-[1px] border-[var(--primary)] rounded-[6px] duration-200 hover:cursor-pointer bg-[var(--primary)] text-white hover:bg-[var(--secondary)]">Send</button>
                </form>
            </div>
        </div>
    </>
    );
}

export default InquiryModal;