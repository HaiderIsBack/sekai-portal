import Link from "next/link";
import React from "react";

type ButtonProps = {
    type: 'primary' | 'secondary' | 'danger';
    href?: string;
    className?: string;
    children: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ type, href, className = '', onClick, children }: ButtonProps) => {
    const baseClasses = "py-[10px] px-[20px] text-[14px] border-[1px] rounded-[6px] duration-200 hover:cursor-pointer";

    const variant = {
        "primary": "bg-[var(--primary)] text-white hover:bg-[var(--secondary)] border-[var(--primary)]",
        "secondary": "bg-white text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white border-[var(--primary)]",
        "danger": "bg-red-600 text-white hover:bg-red-700 border-red-600 hover:border-red-700"
    };

    if (href) {
        return (
            <Link className={`${baseClasses} ${variant[type]} ${className}`} href={href}>
                {children}
            </Link>
        );
    } else {
        return (
            <button className={`${baseClasses} ${variant[type]} ${className}`} onClick={onClick}>
                {children}
            </button>
        );
    }
}

export default Button;