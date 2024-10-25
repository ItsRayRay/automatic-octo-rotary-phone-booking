"use client";

import { Reservation } from "@prisma/client";

import { SafeListing, SafeUser } from "@/app/types";

import { useMemo } from "react";

import { categories } from "@/app/components/navbar/Categories";
import Container from "@/app/components/Container";

import ListingHead from "../../components/Listings/ListingHead";



interface ListingClientProps {
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
  reservations?: Reservation[];
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  currentUser,
  reservations,
}) => {

  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">

          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />

        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
