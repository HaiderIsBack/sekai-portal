"use client";

import Button from "@/components/Button";
import { Seminar } from "@/types/Seminar";
import { useState, useEffect, useRef, useMemo } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAppContext } from "@/context/AppContext";

import SeminarCard from "@/components/SeminarCard";
import SeminarDetailsModal from "@/components/SeminarDetailsModal";
import InquiryModal from "@/components/InquiryModal";
import AdminModal from "@/components/AdminModal";

export default function Seminars() {
    const [seminarModalVisible, setSeminarModalVisible] = useState<boolean>(false);
    const [inquiryModalVisible, setInquiryModalVisible] = useState<boolean>(false);
    const [seminars, setSeminars] = useState<Seminar[]>([]);
    const [selectedSeminar, setSelectedSeminar] = useState<Seminar | null>(null);
    const [selectedSeminarIds, setSelectedSeminarIds] = useState<number[]>([]);
    const [noMoreSeminars, setNoMoreSeminars] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);

    // Filters states
    const [searchText, setSearchText] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');

    const loadedCountRef = useRef(0);

    const { showAdminPanel, setShowAdminPanel } = useAppContext();

    const LIMIT = 20;

    const fetchSeminars = async (offset: number = 0) => {
        if (noMoreSeminars) return;

        setLoading(true);
        let query = supabase
            .from("seminars")
            .select('id, title, country, city, date, participants, category, event_type, flag, image_name, created_at');

        if (searchText) {
            query = query.ilike('title', `%${searchText}%`);  // Case-insensitive LIKE
        }

        if (selectedCountry) {
            query = query.eq('country', selectedCountry);
        }

        if (selectedCategory) {
            query = query.eq('category', selectedCategory);
        }

        const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ];

        if (selectedMonth) {
            const monthName = monthNames[parseInt(selectedMonth) - 1];
            query = query.ilike('date', `%${monthName}%`);
        }

        const { data, error } = await query
            .order('created_at', { ascending: false })
            .range(offset, offset + LIMIT);


        if (error) {
            alert(error.message);
            setLoading(false);
            return;
        }

        if (data) {
            if (data.length < 1) {
                setNoMoreSeminars(true);
            }

            loadedCountRef.current = offset + data.length;
            if (offset === 0) {
                setSeminars(data);
            } else {
                setSeminars(prev => [...prev, ...data]);
            }
        }
        setLoading(false);
    }

    useEffect(() => {
        setNoMoreSeminars(false);
        loadedCountRef.current = 0;
        fetchSeminars(0);
    }, [searchText, selectedCountry, selectedCategory, selectedMonth]);

    useEffect(() => {
        function throttle<T extends (...args: ((e: Event) => void)[]) => void>(func: T, limit: number): (...args: Parameters<T>) => void {
            let inThrottle = false;
            return (...args: Parameters<T>) => {
                if (!inThrottle) {
                    func(...args);
                    inThrottle = true;
                    setTimeout(() => {
                        inThrottle = false;
                    }, limit);
                }
            };
        }

        const handleScroll = throttle(() => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !loading && !noMoreSeminars) {
                fetchSeminars(loadedCountRef.current);
            }
        }, 200);

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [noMoreSeminars, loading]);

    const handleSeminarSelection = (seminar: Seminar) => {
        setSelectedSeminar(seminar);
        setSeminarModalVisible(true);
    }

    const handleSingleInquirySelection = () => {
        setSeminarModalVisible(false);
        setInquiryModalVisible(true);
    }

    const clearFilters = () => {
        loadedCountRef.current = 0;
        setSearchText('');
        setSelectedCountry('');
        setSelectedCategory('');
        setSelectedMonth('');
        fetchSeminars(0);
    }

    const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        loadedCountRef.current = 0;
        setSeminars([]);
        setSearchText(e.target.value);
    }

    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        loadedCountRef.current = 0;
        setSeminars([]);
        setSelectedCountry(e.target.value);
    }

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        loadedCountRef.current = 0;
        setSeminars([]);
        setSelectedCategory(e.target.value);
    }

    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        loadedCountRef.current = 0;
        setSeminars([]);
        setSelectedMonth(e.target.value);
    }

    const handleRemoveId = (id: number) => {
        if (selectedSeminar && selectedSeminar.id === id) {
            setSelectedSeminar(null);
            setSelectedSeminarIds(prev => prev.filter(s => s !== id))
            return;
        }
        setSelectedSeminarIds(prev => prev.filter(s => s !== id))
    }

    const handleMultiSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const id = parseInt(e.target.value);       // seminar ID from checkbox
        const isChecked = e.target.checked;

        setSelectedSeminarIds(prev => {
            if (isChecked) {
                return prev.includes(id) ? prev : [...prev, id];
            } else {
                return prev.filter(item => item !== id);
            }
        });
    } 

    const seminarCards = useMemo(() => {
        if (seminars.length < 1) {
            return (
                <div className="py-[50px] text-center">
                    <h3 className="text-gray-500">検索条件に一致するセミナーが見つかりませんでした。</h3>
                </div>
            );
        }

        return <SeminarCardsList seminars={seminars} selectedSeminarsIds={selectedSeminarIds} handleMultiSelect={handleMultiSelect} handleSeminarSelection={handleSeminarSelection} />
    }, [seminars]);

    return (
        <main className="w-full max-w-[1500px] mx-auto p-5">
            { selectedSeminarIds.length > 0 && <Button type="primary" className="fixed bottom-[20px] right-[20px] rounded-full z-10 py-[14px] px-[24px] leading-[1.6] text-[16px] shadow-[0_4px_10px_rgba(0,0,0,0.2)]" onClick={() => setInquiryModalVisible(true)}>一括で共催を相談する</Button> }

            {selectedSeminar && seminarModalVisible && <SeminarDetailsModal setIsVisible={setSeminarModalVisible} selectedSeminar={selectedSeminar} handleSingleInquirySelection={handleSingleInquirySelection} />}

            {inquiryModalVisible && <InquiryModal setIsVisible={setInquiryModalVisible} selectedSeminarIds={selectedSeminar ? [selectedSeminar.id] : (selectedSeminarIds.length > 0 ? selectedSeminarIds : [])} setSelectedSeminar={setSelectedSeminar} handleRemoveId={handleRemoveId} />}

            {showAdminPanel && <AdminModal setIsVisible={setShowAdminPanel} />}

            <section className="flex items-center flex-wrap gap-5 p-5 bg-[#f9fafb]">
                <input type="text" placeholder="セミナーを検索..." className="min-w-[195px] border-[1px] border-[#ccc] text-[14px] text-[#111] rounded-[4px] p-2 w-full md:w-auto" value={searchText} onChange={handleSearchTextChange} />
                <select name="country" id="filter-country" className="min-w-[195px] border-[1px] border-[#ccc] text-[14px] text-[#111] rounded-[4px] p-2.5 w-full md:w-auto" value={selectedCountry} onChange={handleCountryChange}>
                    <option value="">国を選択</option>
                    <option value="USA">USA</option>
                    <option value="アメリカ">アメリカ</option>
                </select>
                <select name="category" id="filter-category" className="min-w-[195px] border-[1px] border-[#ccc] text-[14px] text-[#111] rounded-[4px] p-2.5 w-full md:w-auto" value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="">カテゴリを選択</option>
                    <option value="Technology">Technology</option>
                    <option value="キャリアとビジネス">キャリアとビジネス</option>
                </select>
                <select name="month" id="filter-month" className="min-w-[195px] border-[1px] border-[#ccc] text-[14px] text-[#111] rounded-[4px] p-2.5 w-full md:w-auto" value={selectedMonth} onChange={handleMonthChange}>
                    <option value="">月を選択</option>
                    <option value="1">1月</option><option value="2">2月</option><option value="3">3月</option>
                    <option value="4">4月</option><option value="5">5月</option><option value="6">6月</option>
                    <option value="7">7月</option><option value="8">8月</option><option value="9">9月</option>
                    <option value="10">10月</option><option value="11">11月</option><option value="12">12月</option>
                </select>
                <Button type="secondary" onClick={clearFilters} className="w-full md:w-auto">一覧に戻る</Button>
            </section>
            
            {seminarCards}
            <div className="py-[50px] text-center">
                {loading && <h3>データを読み込み中...</h3>}
            </div>
        </main>
    );
}

type SeminarCardsListProps = {
    seminars: Seminar[];
    selectedSeminarsIds: number[];
    handleMultiSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSeminarSelection: (seminar: Seminar) => void;
}

const SeminarCardsList = ({ seminars, selectedSeminarsIds, handleMultiSelect, handleSeminarSelection }: SeminarCardsListProps) => {
    const { getImageSourceURL } = useAppContext();
    return (
        <section className="seminars-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
            {
                seminars && (
                    seminars.map((seminar, i) => {
                        return (
                            <div className="relative group" key={i + "-" + seminar.id}>
                                <input type="checkbox" value={seminar.id} className="scale-150 duration-300 group-hover:-translate-y-1 absolute top-[20px] left-[20px] z-10 hover:cursor-pointer" id={"id-" + seminar.id} onChange={handleMultiSelect} defaultChecked={selectedSeminarsIds.includes(seminar.id)} />
                                <SeminarCard seminar={!seminar.image_name ? {...seminar, image_name: getImageSourceURL()} : seminar} handleSeminarSelection={handleSeminarSelection} />
                            </div>
                        );
                    })
                )
            }
        </section>
    );
}