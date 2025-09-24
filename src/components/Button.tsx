import Link from "next/link";
import React from "react";

type ButtonProps = {
    type: 'primary' | 'secondary';
    href: string;
    className?: string;
    children: React.ReactNode;
}

const Button = ({ type, href, className = '', children }: ButtonProps) => {
    const baseClasses = "py-[10px] px-[20px] text-[14px] border-[1px] border-[var(--primary)] rounded-[6px] duration-200";

    const variant = {
        "primary": "bg-[var(--primary)] text-white hover:bg-[var(--secondary)]",
        "secondary": "bg-white text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white",
    };

    return (
        <Link className={`${baseClasses} ${variant[type]} ${className}`} href={href}>
            {children}
        </Link>
    );
}

export default Button;