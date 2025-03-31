import Image from "next/image";
import Logo from "./Logo";
import { getSocialPages } from "@/sanity/sanity-utils";
import { SocialPage } from "@/types/SocialPage";
import Link from "next/link";
import { IconComponent } from "./ImageComponent";

export default async function Footer() {
    const socialPages = await getSocialPages();
    return (
        <div className="w-full">
            <div className="border-y border-gray-300 flex items-center justify-center h-full md:h-20">
                <div className="flex items-center">
                    <ul className="flex flex-col md:flex md:flex-row items-center justify-center md:gap-x-[17vw] text-black">
                        {
                            socialPages.map((socialPage: SocialPage) => {
                                return (
                                    <a href={socialPage.url} className="flex items-center py-3 md:py-0 gap-4 hover:opacity-80" key={socialPage._id}>
                                    <IconComponent image={socialPage.icon} width={250} height={250}/>
                                    <div className="">{socialPage.title}</div>
                                    </a>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
            <div className="flex justify-between items-center w-full h-25 m-1">
                <Logo/>
            </div>
        </div>
    )
}