"use client";

import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Noto_Color_Emoji } from "next/font/google";

import { Seminar } from "../types/Seminar";
import SeminarDetailsModal from "@/components/SeminarDetailsModal";

import FeaturedSeminarCards from "@/components/FeaturedSeminarCards";
import InquiryModal from "@/components/InquiryModal";

const notoColorEmoji = Noto_Color_Emoji({
  subsets: [],
  weight: ["400"],
});

const Pill = ({ children }: any) => {
  return (
    <span className="py-[10px] sm:py-[10px] px-4 sm:px-[20px] bg-[#f9f9f9] border-[1px] border-[#ddd] text-[12px] sm:text-[16px] rounded-[30px]">{children}</span>
  );
}

export default function Home() {
  const [seminarModalVisible, setSeminarModalVisible] = useState<boolean>(false);
  const [inquiryModalVisible, setInquiryModalVisible] = useState<boolean>(false);
  const [selectedSeminar, setSelectedSeminar] = useState<Seminar | null>(null);

  const handleSeminarSelection = (seminar: Seminar) => {
    setSelectedSeminar(seminar);
    setSeminarModalVisible(true);
  }

  const handleSingleInquirySelection = () => {
    setSeminarModalVisible(false);
    setInquiryModalVisible(true);
  }
  return (
    <main>
      {selectedSeminar && seminarModalVisible && <SeminarDetailsModal setIsVisible={setSeminarModalVisible} selectedSeminar={selectedSeminar} handleSingleInquirySelection={handleSingleInquirySelection} />}
      {selectedSeminar && inquiryModalVisible && <InquiryModal setIsVisible={setInquiryModalVisible} selectedSeminars={[selectedSeminar]} />}

      <section className="max-w-[1500px] mx-auto w-full flex flex-col justify-center items-center gap-4 py-[60px] px-[20px]">
        <h2 className="text-[20px] md:text-[32px] sm:text-[24px] font-bold mt-[26px]"><span className={notoColorEmoji.className}>🌏</span>世界を動かそう</h2>
        <p className="text-[16px] sm:text-[18px] text-center">海外セミナーで登壇・共催し、新しい顧客とつながろう</p>
        <div className="w-full sm:w-fit flex items-center flex-col sm:flex-row gap-4 my-3">
          <Button type='primary' href='#' className="w-full flex-1 sm:flex-auto sm:w-fit text-center sm:text-left">セミナーを探す</Button>
          <Button type='secondary' href='#' className="w-full flex-1 sm:flex-auto sm:w-fit text-center sm:text-left">相談する</Button>
        </div>
        <div className="max-w-[100%] flex justify-center gap-2 sm:gap-4 flex-wrap">
          <Pill>世界の舞台に立つ</Pill>
          <Pill>理想のクライアントと出会う</Pill>
          <Pill>影響力を強化する</Pill>
          <Pill>投資家、ビジネスパートナーを見つける</Pill>
          <Pill>日本いちの取り組み発信する</Pill>
        </div>
      </section>

      <section className="max-w-[1500px] mx-auto py-[40px] px-[20px]">
        <h2 className="text-2xl mt-[24px] mb-[20px] font-bold">使い方</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
          <div className="p-3 rounded-[8px] border-[1px] border-[#eee] shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
            <h3 className="text-[18px] font-bold text-[var(--primary)] hover:text-[var(--secondary)] duration-150 cursor-pointer">ステップ 1: セミナーを探す</h3>
            <p className="text-[16px] py-4">世界中のイベントから自分に合ったものを選択</p>
          </div>
          <div className="p-3 rounded-[8px] border-[1px] border-[#eee] shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
            <h3 className="text-[18px] font-bold text-[var(--primary)] hover:text-[var(--secondary)] duration-150 cursor-pointer">ステップ 2: 発信エキスパートに相談する</h3>
            <p className="text-[16px] py-4">プロフィールと想いを共有して申し込み</p>
          </div>
          <div className="p-3 rounded-[8px] border-[1px] border-[#eee] shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
            <h3 className="text-[18px] font-bold text-[var(--primary)] hover:text-[var(--secondary)] duration-150 cursor-pointer">ステップ 3: 世界に広がる</h3>
            <p className="text-[16px] py-4">新しい顧客やネットワークを獲得</p>
          </div>
        </div>
      </section>

      <section className="max-w-[1500px] mx-auto py-[40px] px-[20px]">
        <h2 className="text-2xl mt-[24px] mb-[20px] font-bold">直近のセミナー</h2>
        <FeaturedSeminarCards handleSeminarSelection={handleSeminarSelection} />
        <Link href={'/seminars'} className="block mt-4 text-right text-[18px] text-[var(--primary)] font-bold hover:underline">すべてのセミナーを見る →</Link>
      </section>

      <section className="max-w-[1500px] mx-auto py-[40px] px-[20px]">
        <h2 className="text-2xl mt-[24px] mb-[20px] font-bold">参加者の声</h2>
        <div className="flex flex-col gap-3 bg-[#f9f9f9] p-[15px] rounded-[8px] mb-4">
          <span className="text-[#fbbf24]">★★★★★</span>
          <p className="text-[16px]">海外クライアントにつながるきっかけになりました</p>
        </div>
        <div className="flex flex-col gap-3 bg-[#f9f9f9] p-[15px] rounded-[8px]">
          <span className="text-[#fbbf24]">★★★★★</span>
          <p className="text-[16px]">初めての海外登壇で大きな自信になりました</p>
        </div>
      </section>

      <section className="max-w-[1500px] mx-auto py-[40px] px-[20px]">
        <h2 className="text-2xl mt-[24px] mb-[20px] font-bold">事例</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
          <div className="rounded-[8px] overflow-hidden border-[1px] border-[#eee] shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
            <Image src={"/images/hr_seminar.jpg"} alt="米国人事セミナー" className="w-full h-[160px] object-cover" width={910} height={670} />
            <div className="p-3 mt-2">
              <h3 className="text-[18px] font-bold text-[var(--primary)] hover:text-[var(--secondary)] duration-150 cursor-pointer">米国の人事系セミナー</h3>
              <p className="text-[16px] py-4">セッション後に契約を獲得</p>
            </div>
          </div>
          <div className="rounded-[8px] overflow-hidden border-[1px] border-[#eee] shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
            <Image src={"/images/europe_speaking.jpg"} alt="Europe Speaking" className="w-full h-[160px] object-cover" width={910} height={670} />
            <div className="p-3 mt-2">
              <h3 className="text-[18px] font-bold text-[var(--primary)] hover:text-[var(--secondary)] duration-150 cursor-pointer">ヨーロッパで登壇</h3>
              <p className="text-[16px] py-4">複数のパートナー企業と提携</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1500px] mx-auto py-[40px] px-[20px]">
        <h2 className="text-2xl mt-[24px] mb-[20px] font-bold">よくある質問</h2>
        <div className="mb-4">
          <h3 className="text-[16px] font-bold mb-[5px]">Q. 英語が話せなくても参加できますか？</h3>
          <p className="text-[16px]">A. 通訳サポートがありますのでご安心ください。</p>
        </div>
        <div className="mb-4">
          <h3 className="text-[16px] font-bold mb-[5px]">Q. 初めてでも登壇できますか？</h3>
          <p className="text-[16px]">A. はい、準備から現地サポートまでご案内します。</p>
        </div>
        <div className="mb-4">
          <h3 className="text-[16px] font-bold mb-[5px]">Q. 渡航や宿泊のサポートはありますか？</h3>
          <p className="text-[16px]">A. 専任スタッフがホテル・移動・現地案内をサポートします。</p>
        </div>
      </section>
    </main>
  );
}
