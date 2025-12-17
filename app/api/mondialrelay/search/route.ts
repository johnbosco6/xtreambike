import { NextResponse } from "next/server"
import { mondialRelayService } from "@/lib/mondial-relay"

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { zipCode, countryCode } = body

        if (!zipCode) {
            return NextResponse.json(
                { error: "Zip code is required" },
                { status: 400 }
            )
        }

        const points = await mondialRelayService.searchPoints({
            ZipCode: zipCode,
            CountryCode: countryCode || "FR"
        })

        return NextResponse.json({ points })
    } catch (error: any) {
        console.error("API Route Error:", error)
        return NextResponse.json(
            { error: error.message || "Failed to fetch relay points" },
            { status: 500 }
        )
    }
}
