import Link from "next/link";

export default function App()
{
    const cssHoverCard = "text-center content-center select-none bg-white h-[230px] rounded-[6px] bg-center bg-cover transition-transform duration-300 cursor-pointer hover:transform hover:-translate-y-1.5";

    return (
        <section className="h-screen flex gap-12 mx-32 items-center">
            <div className="text-whitesmoke flex-1">
                <span>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</span>
            </div>

            <div className="flex-1">
                <div className="grid grid-cols-2 auto-rows-auto gap-x-6 gap-y-4 justify-end content-center">

                    <Link href="/ConfirmModal" className={cssHoverCard}>Confirm Modal</Link>
                    <Link href="/" className={cssHoverCard}/>
                    <Link href="/" className={cssHoverCard}/>
                    <Link href="/" className={cssHoverCard}/>

                </div>
            </div>
        </section>
    );
}
