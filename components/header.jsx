import Link from "next/link";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import MobileMenu from "@/components/MobileMenu";

export default async function Header() {
    const token = (await cookies()).get("token")?.value;
    const payload = token ? await verifyToken(token) : null;

    return (
        <header className="relative">
            <nav>
                <div className="flex flex-row items-center justify-between p-4 shadow-md">
                    <div className="flex flex-row items-center gap-4">
                        <Link href="/" className="flex flex-row items-center gap-2 text-lg font-bold text-violet-700 tracking-tight">
                            <img
                                src="/logo_projet.jpg"
                                alt="Logo Pypora"
                                width={32}
                                height={32}
                            />
                        </Link>
                        <ul className="hidden md:flex flex-row gap-2">
                            <li className="hover:text-[#8e24aa]">
                                <Link href="/tutoriels">Tutoriels</Link>
                            </li>
                            <li className="hover:text-[#8e24aa]">
                                <Link href="/communication">Communication</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Auth — desktop uniquement */}
                    <div className="hidden md:block">
                        {payload ? (
                            <Link href="/dashboard" className="flex flex-row items-center gap-2 hover:text-[#8e24aa] transition-colors">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="text-sm font-medium">{payload.username ?? payload.email}</span>
                            </Link>
                        ) : (
                            <ul className="flex flex-row gap-2">
                                <li className="hover:text-[#8e24aa] py-1">
                                    <Link href="/login">Login</Link>
                                </li>
                                <li className="bg-[#8e24aa] text-white px-2 py-1 rounded">
                                    <Link href="/register">Register</Link>
                                </li>
                            </ul>
                        )}
                    </div>

                    {/* Menu burger — mobile uniquement */}
                    <MobileMenu
                        isLoggedIn={!!payload}
                        username={payload?.username}
                        email={payload?.email}
                    />
                </div>
            </nav>
        </header>
    );
}
