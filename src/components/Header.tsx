import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export default function Header()
{
    return (
        <section className="flex justify-between w-full px-32 py-4 text-whitesmoke select-none">

            <Link href="/" className="text-2xl">ConjureUI</Link>

            <div className="flex justify-center gap-5">
                <Link href="/ConfirmModal" className="cursor-pointer">Confirm Modal</Link>
                <Link href="/">item 2</Link>
                <Link href="/">item 3</Link>
                <Link href="/">item 4</Link>
            </div>

            <a
                href="https://github.com/scheuermann-markus/ConjureUI"
                target="_blank"
                className="text-right text-2xl"
                title="View on Github"
            >
                <FaGithub/>
            </a>


        </section>
    );
}