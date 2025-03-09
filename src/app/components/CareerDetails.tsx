'use client'
import Link from "next/link"
import { HoverEffect } from "@/components/ui/card-hover-effect";


function Details() {

    const careerDetails = [
        {
            title: 'Understanding Music Theory',
            description:
                'Dive deep into the fundamentals of music theory and enhance your musical skills.',
            slug: 'understanding-music-theory',
            isFeatured: true,
        },
        {
            title: 'The Art of Songwriting',
            description:
                'Learn the craft of songwriting from experienced musicians and songwriters.',
            slug: 'the-art-of-songwriting',
            isFeatured: true,
        },
        {
            title: 'Mastering Your Instrument',
            description:
                'Advanced techniques to master your musical instrument of choice.',
            slug: 'mastering-your-instrument',
            isFeatured: true,
        }
    ];

    return (
        <div className="p-12 bg-black-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-center">
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">Enhance Your Musical Journey</p>
                </div>

                <div className="mt-10">

                    <HoverEffect
                        items={careerDetails.map(careerDetail => ({
                            title: careerDetail.title,
                            description: careerDetail.description,
                            link: `/${careerDetail.slug}`, 
                        }))}
                    />
                </div>

                
            </div>
        </div>
    )
}

export default Details