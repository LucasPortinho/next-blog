import Link from "next/link";

export function Footer() {
    return (
        <footer className="pb-16 text-center">
            <p>
                Copyright &copy; {new Date().getFullYear()} - {' '}
                <Link href='/'>The Blog</Link>
            </p>
        </footer>
    )
}