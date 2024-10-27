"use client";

import { SafeUser } from "@/app/types";

import useCountries from "@/app/hooks/useCountries";

import Image from "next/image";
import Heading from "@/app/components/Heading";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
    title: string;
    imageSrc: string | null;
    locationValue: string;
    id: string;
    currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
    title,
    imageSrc,
    locationValue,
    id,
    currentUser,
}) => {
    const { getByValue } = useCountries();
    const location = getByValue(locationValue);

    return (
        <div>
            <Heading
                title={title}
                subtitle={location ? `${location.region}, ${location.label}` : 'Unknown location'}
            />
            <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
                <Image
                    src={imageSrc || '/images/placeholder.jpg'}
                    fill
                    className="object-cover w-full h-full"
                    alt="Listing"
                />
                <div className="absolute top-5 right-5">
                    <HeartButton 
                        listingId={id}
                        currentUser={currentUser}
                    />
                </div>
            </div>
        </div>
    );
}

export default ListingHead;
