
import { Noto_Color_Emoji } from "next/font/google";
import { FormEventHandler, useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import * as XLSX from "xlsx";
import Button from "./Button";
import Image from "next/image";

const notoColorEmoji = Noto_Color_Emoji({
  subsets: [],
  weight: ["400"],
});

type LoginPanelProps = {
    setIsVisible: (adminModalVisible: boolean) => void;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const LoginPanel = ({ setIsVisible, setIsAuthenticated }: LoginPanelProps) => {

    const handleLoginFormSubmition: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());

        if (!data.username.toString().trim() || !data.password.toString().trim()) {
            alert("Fields are empty!");
            return;
        }

        if (data.username === process.env.NEXT_PUBLIC_ADMIN_USER && data.password === process.env.NEXT_PUBLIC_ADMIN_PASS) {
            alert("Authentication Successfull!");
            setIsAuthenticated(true);
        } else {
            alert("Failed: Invalid username or password");
        }
    }
    return (
    <>
        <div className="bg-gray-950/50 fixed top-0 left-0 w-full h-full z-20" onClick={() => setIsVisible(false)} />
        <div className="fixed top-1/2 left-1/2 -translate-1/2 w-[90%] max-w-[400px] bg-white rounded-[10px] p-5 pt-0 z-30">
            <div className="sticky top-0 bg-white flex justify-between items-center border-b-[1px] border-[#ddd] pt-[20px] pb-[12px] mb-[12px]">
                <h2 className="text-2xl font-bold flex items-center gap-2"><Image src={"/images/lock.png"} alt="Lock Icon" width={18} height={18} /> 管理者ログイン</h2>
                <span className="text-[38px] hover:text-red-500 hover:cursor-pointer" onClick={() => setIsVisible(false)}>&times;</span>
            </div>

            <form onSubmit={handleLoginFormSubmition}>
                <div className="w-full flex flex-col items-start mb-[15px]">
                    <label htmlFor="username" className="text-[16px] text-[#333] font-bold mb-[5px]">ユーザー名</label>
                    <input type="text" name="username" id="username" className="w-full p-2.5 border-[1px] border-[#ddd] focus:outline-[1px] focus:outline-[var(--primary)] text-[14px] rounded-[4px]" required />
                </div>
                <div className="w-full flex flex-col items-start mb-[15px]">
                    <label htmlFor="password" className="text-[16px] text-[#333] font-bold mb-[5px]">パスワード</label>
                    <input type="password" name="password" id="password" className="w-full p-2.5 border-[1px] border-[#ddd] focus:outline-[1px] focus:outline-[var(--primary)] text-[14px] rounded-[4px]" required />
                </div>
                <button type="submit" className="w-full py-[10px] px-[20px] text-[14px] border-[1px] border-[var(--primary)] rounded-[6px] duration-200 hover:cursor-pointer bg-[var(--primary)] text-white hover:bg-[var(--secondary)]">ログイン</button>
            </form>
        </div>
    </>
    );
}

type AdminModalProps = {
    setIsVisible: (adminModalVisible: boolean) => void;
}

const AdminModal = ({ setIsVisible }: AdminModalProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [dataSummaryCount, setDataSummaryCount] = useState<number | null>(null);
    const [fileInput, setFileInput] = useState<FileList | null>(null);

    const statusRef = useRef<HTMLSpanElement | null>(null);

    useEffect(() => {
        const fetchTotalSeminarCount = async () => {
            const { count, error } = await supabase.from('seminars').select('*', { count: 'exact', head: true });

            if (error) {
                alert(error.message);
                return;
            }

            if (count && count >= 0) {
                setDataSummaryCount(count);
            }
        }
        fetchTotalSeminarCount();
    }, []);

    const uploadExcel = () => {
        if (!statusRef.current) return;

        if (!fileInput || fileInput.length === 0) {
            statusRef.current.textContent = '⚠️ ファイルが選択されていません。';
            statusRef.current.style.color = 'orange';
            return;
        }

        const file = fileInput[0];
            statusRef.current.textContent = '📄 ファイルを読み込み中...';
            statusRef.current.style.color = 'blue';

            const reader = new FileReader();
            reader.onload = async (event) => {
                try {
                if (!event.target || !(event.target.result instanceof ArrayBuffer)) {
                    if (statusRef.current) {
                        statusRef.current.textContent = '❌ ファイルの読み込みに失敗しました。';
                        statusRef.current.style.color = 'red';
                    }
                    return;
                }
                const data = new Uint8Array(event.target.result);
                const workbook = XLSX.read(data, { type: 'array', cellDates: true });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = XLSX.utils.sheet_to_json(worksheet, { raw: false });

                if (json.length === 0) {
                    if (statusRef.current) {
                        statusRef.current.textContent = '❌ ファイルにデータがありません。';
                        statusRef.current.style.color = 'red';
                    }
                    return;
                }

                interface Row {
                    date?: number | string;
                    participants?: number | string;
                    [key: string]: unknown; // allow other keys
                }

                // Process data with consistent Japanese date formatting
                const processedData = json.map(row => {
                    if (typeof row !== "object" || row === null) return {};
                    const processedRow: Row = { ...row };
                    
                    // Handle the date column and format as Japanese
                    if ((row as Row).date) {
                        const rawDate = (row as Row).date;
                        const dateValue = parseInt(rawDate !== undefined ? String(rawDate) : "");
                        
                        if (!isNaN(dateValue) && typeof dateValue === 'number') {
                            // Convert Excel serial date to JavaScript Date
                            const excelDate = new Date((dateValue - 25569) * 86400 * 1000);
                            const month = excelDate.getMonth() + 1;
                            const day = excelDate.getDate();
                            // Format as Japanese date
                            (processedRow as Row).date = `2025年${month}月${day}日`;
                        } else if (typeof rawDate === 'string') {
                            // Try to parse and reformat as Japanese
                            const parsedDate = new Date(rawDate);
                            if (!isNaN(parsedDate.getTime())) {
                                const month = parsedDate.getMonth() + 1;
                                const day = parsedDate.getDate();
                                (processedRow as Row).date = `2025年${month}月${day}日`;
                            }
                        }
                    }
                    
                    if (
                        (row as Row).participants !== undefined &&
                        (row as Row).participants !== null &&
                        (typeof (row as Row).participants === "string" || typeof (row as Row).participants === "number") &&
                        !isNaN(Number((row as Row).participants))
                    ) {
                        (processedRow as Row).participants = parseInt(String((row as Row).participants));
                    }
                    
                    return processedRow;
                });

                if (statusRef.current) {
                    statusRef.current.textContent = `⏳ ${processedData.length}件のデータをSupabaseにアップロード中...`;
                }
                
                const { error } = await supabase.from('seminars').upsert(processedData);
                if (error) throw error;

                if (statusRef.current) {
                    statusRef.current.textContent = `✅ ${processedData.length}件のセミナーデータを正常にアップロードしました！`;
                    statusRef.current.style.color = 'green';
                }
                
            } catch (error) {
                if (error instanceof Error) {
                    console.error('Upload failed:', error);
                    if (statusRef.current) {
                        statusRef.current.textContent = `❌ アップロードに失敗しました: ${error.message}`;
                        statusRef.current.style.color = 'red';
                    }
                }
            }
        };
        reader.readAsArrayBuffer(file);
    }

    const downloadSampleExcel = () => {
        const sampleData = [
            { 
                title: "Sample Tech Conference", 
                country: "USA", 
                city: "San Francisco", 
                date: "2025-10-20", 
                participants: 500,
                category: "Technology",
                event_type: "offline",
                flag: "🇺🇸",
                seminar_details: "This is a sample description for the tech conference.",
                image_name: "/images/sekai-sample-img.jpg"
            }
        ];
        const ws = XLSX.utils.json_to_sheet(sampleData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Seminars");
        XLSX.writeFile(wb, "Sample_Seminars.xlsx");
    }

    const exportCurrentData = async () => {
        try {
            const { data, error } = await supabase.from('seminars').select('*');
            if (error) throw error;
            if (data.length === 0) {
                alert("エクスポートするデータがありません。");
                return;
            }
            const ws = XLSX.utils.json_to_sheet(data);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "CurrentSeminars");
            XLSX.writeFile(wb, "Exported_Seminars.xlsx");
        } catch (error: unknown) {
            if (error instanceof Error) {
                alert(`データのエクスポートに失敗しました: ${error.message}`);
            }
        }
    }

    const refreshData = () => {
        alert("ページをリロードして最新のデータを表示します。");
        window.location.reload();
    }

    const deleteAllData = async () => {
        const confirmation = prompt("本気ですか？すべてのセミナーデータを削除するには、 'DELETE ALL' と入力してください。");
        if (confirmation === "DELETE ALL") {
            try {
                const { error } = await supabase.from('seminars').delete().neq('id', -1);
                if (error) throw error;
                alert("すべてのセミナーデータが正常に削除されました。");
                setDataSummaryCount(0);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    alert(`データの削除に失敗しました: ${error.message}`);
                }
            }
        } else {
            alert("操作はキャンセルされました。");
        }
    }

    if (!isAuthenticated) return <LoginPanel setIsVisible={setIsVisible} setIsAuthenticated={setIsAuthenticated} />

    return (
    <>
        <div className="bg-gray-950/90 fixed top-0 left-0 w-full h-full z-20" onClick={() => setIsVisible(false)} />
        <div className="fixed top-1/2 left-1/2 -translate-1/2 w-[90%] max-w-[800px] max-h-[80vh] overflow-y-auto bg-white rounded-[10px] p-8 pt-0 z-30">
            <div className="sticky top-0 bg-white flex justify-between items-center border-b-[1px] border-[#ddd] pt-[20px] pb-[18px] mb-[18px] z-40">
                <h2 className="text-2xl font-bold flex items-center gap-2"><Image src={"/images/under-construction.png"} alt="Lock Icon" width={24} height={24} /> 管理者パネル</h2>
                <Button type="secondary" onClick={() => setIsVisible(false)}>
                    ✕ 閉じる
                </Button>
            </div>

           <div className="w-full flex flex-col items-start mt-4 mb-[15px] relative">
                <label htmlFor="file-upload" className="text-[16px] text-[#333] font-bold mb-[5px] flex items-center gap-2"><Image src={"/images/folder.png"} alt="Folder Icon" width={16} height={16} /><strong>セミナーデータ Excel アップロード</strong></label>
                <input type="file" accept=".xlsx, .xls" name="file_upload" id="file-upload" className="w-full p-2.5 pl-[26px] border-[1px] border-[#ddd] focus:outline-[1px] focus:outline-[var(--primary)] text-[14px] rounded-[4px] hover:cursor-pointer" onChange={(e) => setFileInput(e.target.files)} />
                <Button type="primary" onClick={uploadExcel} className="mt-4">アップロード</Button>
                <span className="absolute top-[39px] left-[10px] py-[1px] px-[6px] bg-[#f0f0f0] border-[1px] border-[#333] rounded-sm text-[14px] pointer-events-none">Choose File</span>
            </div>

            <span className="my-4 text-[16px]" ref={statusRef}></span>

            <details className="bg-[#f9fafb] my-5 p-[15px] rounded-[8px]">
            <summary><Image src={"/images/clipboard.png"} alt="Clipboard Icon" width={18} height={18} className="-translate-y-[2px] inline-block" /> Excel フォーマット仕様（クリックして表示）</summary>
            </details>

            <div className="flex flex-wrap gap-5 my-4">
                <Button type="secondary" className="w-full sm:w-fit" onClick={downloadSampleExcel}>
                    <Image src={"/images/download.png"} alt="Download Icon" width={12} height={12} className="inline-block mr-2" /> サンプルExcelダウンロード
                </Button>
                <Button type="secondary" className="w-full sm:w-fit" onClick={exportCurrentData}>
                    <Image src={"/images/upload.png"} alt="Upload Icon" width={12} height={12} className="inline-block mr-2" /> 現在のデータをエクスポート
                </Button>
                <Button type="secondary" className="w-full sm:w-fit" onClick={refreshData}>
                    <Image src={"/images/loading-arrow.png"} alt="Loading Arrow Icon" width={12} height={12} className="inline-block mr-2" /> データ更新
                </Button>
                <Button type="danger" className="w-full sm:w-fit" onClick={deleteAllData}>
                    <Image src={"/images/bin.png"} alt="Bin Icon" width={12} height={12} className="inline-block mr-2" /> 全データクリア
                </Button>
            </div>

            <div className="bg-[#f0f9ff] p-[15px] rounded-[8px] my-5">
                <h4 className="my-4 font-bold text-[16px]"><Image src={"/images/growth.png"} alt="Growth Icon" width={14} height={14} className="inline-block mr-2" /> 現在のデータ状況</h4>
                <p className="mb-4">{dataSummaryCount ? `現在、${dataSummaryCount}件のセミナーが登録されています。` : '読み込み中...'}</p>
            </div>
        </div>
    </>
    );
}

export default AdminModal;
