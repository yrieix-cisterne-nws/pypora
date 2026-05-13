import Link from "next/link";

export default function Header() {
    return(
        <header>
            <nav>
                <div className="flex flex-row">
                    <div>
                        <Link href="/"><img src="/public" alt="Logo"/></Link>
                    </div>
                    <div className="flex flex-row">
                        <ul>
                            <li>
                                <Link href="/tutoriels">Tutoriels</Link>
                            </li>
                            <li>
                                <Link href="/categories">Catégories</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li>
                                <Link href="/login">Login</Link>
                            </li>
                            <li>
                                <Link href="/signup">Register</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}