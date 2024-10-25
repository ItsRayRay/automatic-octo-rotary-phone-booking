import prisma from "@/app/libs/prismadb";



export default async function getListings() {
 try {
    const listings = await prisma.listing.findMany();
       orderBy: {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        createdAt: 'desc'
       }


    
    return listings;
 } catch (error) {
    throw new Error(error as string);
 }
}
