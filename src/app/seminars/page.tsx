"use client";

import Button from "@/components/Button";
import { Seminar } from "@/types/Seminar";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAppContext } from "@/context/AppContext";

import SeminarCard from "@/components/SeminarCard";
import SeminarDetailsModal from "@/components/SeminarDetailsModal";
import InquiryModal from "@/components/InquiryModal";

export default function Seminars() {
    const [seminarModalVisible, setSeminarModalVisible] = useState<boolean>(false);
    const [inquiryModalVisible, setInquiryModalVisible] = useState<boolean>(false);
    const [seminars, setSeminars] = useState<Seminar[]>([]);
    const [selectedSeminar, setSelectedSeminar] = useState<Seminar | null>(null);
    const [loading, setLoading] = useState(false);

    const { getImageSourceURL } = useAppContext();

    useEffect(() => {
        const fetchSeminars = async () => {
          setLoading(true);
          const { data, error }: any = await supabase.from("seminars")
            .select('id, title, country, city, date, participants, category, event_type, flag, image_name, created_at')
            .order('created_at', { ascending: false })
            .limit(20);
    
          if (error) {
            alert(error.message);
            return;
          }
    
          if (data && !error) {
            setSeminars(data);
          }
          setLoading(false);
        }
        fetchSeminars();
    }, []);

    const handleSeminarSelection = (seminar: Seminar) => {
        setSelectedSeminar(seminar);
        setSeminarModalVisible(true);
    }

    const handleSingleInquirySelection = () => {
        setSeminarModalVisible(false);
        setInquiryModalVisible(true);
    }
    return (
        <main className="w-full max-w-[1500px] p-5">
            {selectedSeminar && seminarModalVisible && <SeminarDetailsModal setIsVisible={setSeminarModalVisible} selectedSeminar={selectedSeminar} handleSingleInquirySelection={handleSingleInquirySelection} />}
            {selectedSeminar && inquiryModalVisible && <InquiryModal setIsVisible={setInquiryModalVisible} selectedSeminars={[selectedSeminar]} />}

            <section className="flex items-center gap-5 p-5 bg-[#f9fafb]">
                <input type="text" placeholder="Search for Seminars" className="min-w-[150px] border-[1px] border-[#ccc] text-[14px] text-[#111] rounded-[4px] p-2" />
                <select name="country" id="" className="min-w-[170px] border-[1px] border-[#ccc] text-[14px] text-[#111] rounded-[4px] p-2.5">
                    <option value="">Select a country</option>
                    <option value="america">America</option>
                </select>
                <select name="category" id="" className="min-w-[170px] border-[1px] border-[#ccc] text-[14px] text-[#111] rounded-[4px] p-2.5">
                    <option value="">Select a category</option>
                    <option value="america">America</option>
                </select>
                <select name="month" id="month" className="min-w-[170px] border-[1px] border-[#ccc] text-[14px] text-[#111] rounded-[4px] p-2.5">
                    <option value="">Select a month</option>
                    <option value="america">America</option>
                </select>
                <Button type="secondary" href="#">Return List</Button>
            </section>

            <section className="grid grid-cols-4 gap-4 mt-8">
                {
                    seminars && (
                        seminars.map(seminar => {
                            return (
                                <SeminarCard key={seminar.id} seminar={!seminar.image_name ? {...seminar, image_name: getImageSourceURL()} : seminar} handleSeminarSelection={handleSeminarSelection} />
                            );
                        })
                    )
                }
            </section>
        </main>
    );
}