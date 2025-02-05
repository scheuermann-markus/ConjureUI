import Link from "next/link";
import { FaGithub, FaNpm } from "react-icons/fa";

export default function Header()
{
    return (
        <section className="flex justify-between w-full px-32 py-4 text-gray-300 select-none">

            <Link href="/" className="text-2xl hover:text-gray-100">ConjureUI</Link>

            <div className="flex justify-center gap-5">
                <Link href="/" className="cursor-pointer hover:text-gray-100">Get Started</Link>
                <Link href="/" className="cursor-pointer hover:text-gray-100">Documentation</Link>
            </div>

            <div className="flex items-center gap-4">
                <a
                    href="https://github.com/scheuermann-markus/ConjureUI"
                    target="_blank"
                    className="text-right text-2xl hover:text-gray-100"
                    title="View on Github"
                >
                    <FaGithub/>
                </a>

                <a
                    href="https://www.npmjs.com/package/conjure-ui"
                    target="_blank"
                    className="text-right text-4xl hover:text-gray-100"
                    title="View on npm"
                >
                    <FaNpm/>
                </a>
            </div>
        </section>
    );
}