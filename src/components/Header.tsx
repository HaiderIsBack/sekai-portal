
const links = [
    { name: "Home", href: "/" },
    { name: "Browse", href: "/seminars" },
];

const Header = () => {
    return (
        <header className="py-[20px] px-[40px] border-b border-b-[#eee] flex items-center justify-between">
            <h1 className="font-[Helvetica, Ariel] text-[20px] font-bold">Sekai Portal</h1>
            <menu>
                {links.map((link) => {
                    return (<a key={link.href} href={link.href} className="ml-[20px] text-[16px] hover:text-[var(--primary)]">{link.name}</a>);
                })}
            </menu>
        </header>
    );
}

export default Header;