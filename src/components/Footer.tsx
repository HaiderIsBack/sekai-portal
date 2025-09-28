"use client";

import { useAppContext } from "@/context/AppContext";

const Footer = () => {
    const { setShowAdminPanel } = useAppContext();
    return (
        <footer className="bg-[#f9fafb] p-[30px] border-t-[1px] border-[#eee] relative">
            <p className="text-center text-[16px] my-4">登録イベント数日本一。世界ポータルは日本から世界中に向けた知見を結ぶ日本最大級のハブです。</p>
            <span id="admin-panel" className="text-gray-400 hover:text-black absolute bottom-[20px] right-[20px] hover:cursor-pointer" onClick={() => setShowAdminPanel(true)}>.</span>
        </footer>
    );
}

export default Footer;