import Link from "next/link";

export default function Header() {
    return(
        <header>
            <nav>
                <div className="flex flex-row items-center justify-between p-4 shadow-md">
                    <div className="flex flex-row items-center gap-4">
                        <div>
                            <Link href="/"><img src="/public" alt="Logo"/></Link>
                        </div>
                        <div className="">
                            <ul className="flex flex-row gap-2">
                                <li className="hover:text-[#8e24aa]">
                                    <Link href="/tutoriels">Tutoriels</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <ul className="flex flex-row gap-2">
                            <li className="hover:text-[#8e24aa] py-1">
                                <Link href="/login">Login</Link>
                            </li>
                            <li className="bg-[#8e24aa] text-white px-2 py-1 rounded">
                                <Link href="/register">Register</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}