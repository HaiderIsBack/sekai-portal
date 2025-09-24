import Link from "next/link";

const PrimaryBtn = ({ href, children }: any) => {
    return (
        <Link href={href} className="py-[10px] px-[20px] bg-[var(--primary)] text-white text-[14px] border-[1px] border-[var(--primary)] rounded-[6px] duration-200 hover:bg-[var(--secondary)]">
            {children}
        </Link>
    );
}

const SecondaryBtn = ({ href, children }: any) => {
    return (
        <Link href={href} className="py-[10px] px-[20px] bg-white text-[var(--primary)] text-[14px] border-[1px] border-[var(--primary)] rounded-[6px] duration-200 hover:bg-[var(--primary)] hover:text-white">
            {children}
        </Link>
    );
}

const Button = ({ type, href, children }: any) => {
    return type === 'primary' ? <PrimaryBtn href={href} 
    >{children}</PrimaryBtn> : <SecondaryBtn href={href} 
    >{children}</SecondaryBtn>;
}

export default Button;