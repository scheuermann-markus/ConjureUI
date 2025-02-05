import Link from "next/link";
import NpmComand from "@/components/NpmComand";

export default function App()
{
    const cssHoverCard = "text-center content-center select-none bg-white h-[230px] rounded-[6px] bg-center bg-cover transition-transform duration-300 cursor-pointer hover:transform hover:-translate-y-1.5";

    return (
        <section className="h-[calc(100vh-70px)] flex gap-12 mx-32 items-center">
            <div className="text-gray-300 flex-1">
                <div className="mb-2 text-2xl font-semibold tracking-wide mb-3">Installation via npm</div>
                <NpmComand/>
            </div>

            <div className="flex-1">
                <div className="grid grid-cols-2 auto-rows-auto gap-x-6 gap-y-4 justify-end content-center">

                    <Link href="/ConfirmModal" className={cssHoverCard}>Confirm Modal</Link>
                    <Link href="/SimpleTextInput" className={cssHoverCard}>SimpleTextInput</Link>
                    <Link href="/ConjureToast" className={cssHoverCard}>ConjureToast</Link>
                    <Link href="/" className={cssHoverCard}/>

                </div>
            </div>
        </section>
    );
}
