"use client";

import { useState, useEffect } from "react";
import { Seminar } from "@/types/Seminar";
import { useAppContext } from "@/context/AppContext";
import SeminarCard from "./SeminarCard";
import { supabase } from "@/lib/supabaseClient";

const FeaturedSeminarCards = ({ handleSeminarSelection }: { handleSeminarSelection: (seminar: Seminar) => void }) => {
  const [seminars, setSeminars] = useState<Seminar[]>([]);
  const [loading, setLoading] = useState(false);

  const { getImageSourceURL } = useAppContext();

  useEffect(() => {
    const fetchSeminars = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("seminars")
        .select('id, title, country, city, date, participants, category, event_type, flag, image_name, created_at')
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) {
        alert(error.message);
        return;
      }

      if (data) {
        setSeminars(data);
      }
      setLoading(false);
    }
    fetchSeminars();
  }, []);

  if (loading) {
    return (<div className="w-full h-96 flex justify-center items-center">セミナーデータがありません</div>)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
      {
        seminars && (
          seminars.map(seminar => (
          <SeminarCard key={seminar.id} seminar={!seminar.image_name ? {...seminar, image_name: getImageSourceURL()} : seminar} handleSeminarSelection={handleSeminarSelection} />
          ))
        )
      }
    </div>
  );
}

export default FeaturedSeminarCards;