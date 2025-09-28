"use client";

import { Seminar } from "@/types/Seminar";
import { Noto_Color_Emoji } from "next/font/google";
import Image from "next/image";
import Button from "./Button";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const notoColorEmoji = Noto_Color_Emoji({
  subsets: [],
  weight: ["400"],
});

type SeminarDetailsModalProps = {
    setIsVisible: (seminarModalVisible: boolean) => void;
    selectedSeminar: Seminar;
    handleSingleInquirySelection: () => void;
}

const SeminarDetailsModal = ({ setIsVisible, selectedSeminar, handleSingleInquirySelection }: SeminarDetailsModalProps) => {
    const [seminarContent, setSeminarContent] = useState('');
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchSeminarContent = async () => {
            if (!selectedSeminar) return;

            setLoading(true);
            const { data, error } = await supabase
                .from('seminars')
                .select('seminar_details')
                .eq('id', selectedSeminar.id)
                .single();

            if (error) {
                alert('Error occured');
                return;
            }

            if (data && !error) {
                setSeminarContent(data.seminar_details);
            }
            setLoading(false);
        }
        fetchSeminarContent();
    }, []);

    if (loading) {
        return (
            <>
                <div className={`bg-gray-950/30 fixed top-0 left-0 w-full h-full z-20 ${selectedSeminar ? 'block' : 'hidden'}`} onClick={() => setIsVisible(false)} />
                <div className="fixed top-1/2 left-1/2 -translate-1/2 w-full max-w-[700px] h-[80vh] max-h-[600px] overflow-y-auto bg-white rounded-[10px] p-5 pt-0 z-30">
                    <div className="sticky top-0 bg-white flex justify-between items-center border-b-[1px] border-[#ddd] pt-[20px] pb-[18px] mb-[12px]">
                        <h2 className="text-2xl font-bold">セミナー詳細</h2>
                        <span className="text-[38px] hover:text-red-500 hover:cursor-pointer" onClick={() => setIsVisible(false)}>&times;</span>
                    </div>

                    <h3 className="py-[100px] text-center">詳細を読み込み中...</h3>
                </div>
            </>
        )
    }

    return (
    <>
        <div className={`bg-gray-950/30 fixed top-0 left-0 w-full h-full z-20 ${selectedSeminar ? 'block' : 'hidden'}`} onClick={() => setIsVisible(false)} />
        <div className="fixed top-1/2 left-1/2 -translate-1/2 w-full max-w-[700px] h-[80vh] max-h-[600px] overflow-y-auto bg-white rounded-[10px] p-5 pt-0 z-30">
            <div className="sticky top-0 bg-white flex justify-between items-center border-b-[1px] border-[#ddd] pt-[20px] pb-[18px] mb-[12px]">
                <h2 className="text-2xl font-bold">セミナー詳細</h2>
                <span className="text-[38px] hover:text-red-500 hover:cursor-pointer" onClick={() => setIsVisible(false)}>&times;</span>
            </div>

            <Image src={selectedSeminar?.image_name ?? "/images/hr_seminar.jpg"} alt={selectedSeminar?.title ?? ''} width={910} height={670} className="w-full h-[270px] object-cover rounded-[10px]" />

            <div className="p-3 my-2">
                <h3 className="text-[24px] font-bold text-[#111] cursor-pointer detail-link my-4">{selectedSeminar?.title}</h3>
                <ul className="mt-8 mb-[44px]">
                    <li className="my-4">
                        <p className="text-[16px]"><span className={notoColorEmoji.className}>{selectedSeminar?.flag}</span> <strong>開催地:</strong> {selectedSeminar?.country}, {selectedSeminar?.city}</p>
                    </li>
                    <li className="my-4">
                        <p className="text-[16px]"><span className={notoColorEmoji.className}>📅</span> <strong>開催日:</strong> {selectedSeminar?.date}</p>
                    </li>
                    <li className="my-4">
                        <p className="text-[16px]"><span className={notoColorEmoji.className}>👥</span> <strong>参加予定:</strong> {selectedSeminar?.participants}</p>
                    </li>
                </ul>
                <article className="mt-4 pt-4 mb-8 border-t-[1px] border-[#ddd] text-[16px] font-bold">
                    <h3 className="my-[22px]">セミナー概要</h3>
                    <p className="text-[16px] font-normal">{seminarContent}</p>
                </article>
                <Button type='primary' onClick={handleSingleInquirySelection}>このセミナーについて相談する</Button>
            </div>
        </div>
    </>
    );
}

export default SeminarDetailsModal;