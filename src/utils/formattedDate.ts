

const FormattedDate = (date: string) => {
    let month = '1';

    if (date) {
        try {
            const dateStr = date.toString();
            let fd = date;
            
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
            console.log('Date parsing error for:', date, e);
        }
    }
}


export default FormattedDate;