'use client';

import clsx from "clsx";
import Link from "next/link";

type Props = {
   route: any;
}
export default function DesktopItem({route}:Props) {

    const handleClick = () => {
        if(route?.onClick){
            return route?.onClick();
        }
    }


    return(<div>
    desktop
    </div>)
}