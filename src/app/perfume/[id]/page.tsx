"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface IPerfume{
    id : string,
    title : string,
    price : string,
    Image : string,
    description: string
}
export default function PerfumeData({params}:{params:{id:string}}){
    const [perfume , setPerfume] = useState<IPerfume | null>(null)

    // useEffect(()=>{
    //     async function FetchingPerfume(){
    //         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/perfume/${params.id}`)
    //         const data:IPerfume = await res.json()
    //         setPerfume(data)
    //     }
    //     FetchingPerfume()
    // },[params.id])
    useEffect(() => {
        async function FetchingPerfume() {
             const res = await fetch(`/api/perfume/${params.id}`)
            // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/perfume/${params.id}`);
            const data: IPerfume = await res.json();
            setPerfume(data);
        }
        FetchingPerfume();
    }, [params.id]);
    
    return(
        <div>
             {perfume ? (
                <div className="flex flex-col items-center md:flex-row gap-x-24">
                    <Image className="lg:ml-52" src={perfume.Image} alt="" height={300} width={300}/>
                    <div className=" space-y-3">
                    <p className="text-2xl font-bold">{perfume.title}</p>
                    <p className="text-red-500">{perfume.price}</p>
                    <p className="w-60 md:w-80 font-thin">{perfume.description}</p>
                    <span className="my-4"><button className="bg-red-500 text-white text-[14px] px-4 py-2 mt-8 rounded">Add to Cart</button></span>
                    </div>
                 </div>
             ) : (
                 <p>Loading...</p> // Handle loading state
             )}
        </div>
    )
}


