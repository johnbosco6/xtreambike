import crypto from "crypto"
import { XMLParser } from "fast-xml-parser"

const MONDIAL_RELAY_API_URL = "https://api.mondialrelay.com/Web_Services.asmx"

interface SearchPointsParams {
    ZipCode: string
    City?: string
    CountryCode?: string
}

export class MondialRelayService {
    private brandId: string
    private privateKey: string

    constructor() {
        this.brandId = process.env.MONDIAL_RELAY_BRAND || ""
        this.privateKey = process.env.MONDIAL_RELAY_PRIVATE_KEY || ""

        if (!this.brandId || !this.privateKey) {
            console.warn("Mondial Relay credentials are missing in environment variables.")
        }
    }

    private calculateSecurityKey(params: string[]): string {
        const concatenated = params.join("") + this.privateKey
        return crypto.createHash("md5").update(concatenated).digest("hex").toUpperCase()
    }

    async searchPoints({ ZipCode, CountryCode = "FR" }: SearchPointsParams) {
        // Parameters must be in the exact order specified by documentation for security key calculation
        // Enseigne, Pays, NumPointRelais, CP, Latitude, Longitude, Taille, Poids, Action, DelaiEnvoi, RayonRecherche, NombreResultats, Security

        // Default values for optional parameters
        const NumPointRelais = ""
        const Latitude = ""
        const Longitude = ""
        const Taille = ""
        const Poids = ""
        const Action = ""
        const DelaiEnvoi = ""
        const RayonRecherche = "" // Empty = default 50km
        const NombreResultats = "10"

        const paramsForHash = [
            this.brandId,
            CountryCode,
            NumPointRelais,
            ZipCode,
            Latitude,
            Longitude,
            Taille,
            Poids,
            Action,
            DelaiEnvoi,
            RayonRecherche,
            NombreResultats
        ]

        const securityKey = this.calculateSecurityKey(paramsForHash)

        const soapBody = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <WSI4_PointRelais_Recherche xmlns="http://www.mondialrelay.fr/webservice/">
      <Enseigne>${this.brandId}</Enseigne>
      <Pays>${CountryCode}</Pays>
      <NumPointRelais>${NumPointRelais}</NumPointRelais>
      <CP>${ZipCode}</CP>
      <Latitude>${Latitude}</Latitude>
      <Longitude>${Longitude}</Longitude>
      <Taille>${Taille}</Taille>
      <Poids>${Poids}</Poids>
      <Action>${Action}</Action>
      <DelaiEnvoi>${DelaiEnvoi}</DelaiEnvoi>
      <RayonRecherche>${RayonRecherche}</RayonRecherche>
      <NombreResultats>${NombreResultats}</NombreResultats>
      <Security>${securityKey}</Security>
    </WSI4_PointRelais_Recherche>
  </soap:Body>
</soap:Envelope>`

        try {
            const response = await fetch(MONDIAL_RELAY_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "text/xml; charset=utf-8",
                    "SOAPAction": "http://www.mondialrelay.fr/webservice/WSI4_PointRelais_Recherche",
                },
                body: soapBody,
            })

            const textResponse = await response.text()

            const parser = new XMLParser({
                ignoreAttributes: false,
                attributeNamePrefix: "",
            })

            const jsonObj = parser.parse(textResponse)

            // Navigate the SOAP response structure
            // Soap:Envelope -> Soap:Body -> WSI4_PointRelais_RechercheResponse -> WSI4_PointRelais_RechercheResult -> PointsRelais -> PointRelais_Details
            const result = jsonObj["soap:Envelope"]?.["soap:Body"]?.["WSI4_PointRelais_RechercheResponse"]?.["WSI4_PointRelais_RechercheResult"]

            if (!result) {
                throw new Error("Invalid response format from Mondial Relay")
            }

            const stat = result.STAT
            if (stat !== "0") {
                throw new Error(`Mondial Relay API Error: Code ${stat}`)
            }

            const points = result.PointsRelais?.PointRelais_Details

            // Handle case where single point is returned (object) vs multiple (array)
            const pointsArray = Array.isArray(points) ? points : (points ? [points] : [])

            return pointsArray.map((p: any) => ({
                id: p.Num,
                name: p.LgAdr1,
                address: [p.LgAdr3, p.LgAdr4].filter(Boolean).join(" "),
                city: p.Ville,
                zipCode: p.CP,
                country: p.Pays,
                latitude: p.Latitude,
                longitude: p.Longitude,
                hours: {
                    monday: p.Horaires_Lundi?.string,
                    tuesday: p.Horaires_Mardi?.string,
                    wednesday: p.Horaires_Mercredi?.string,
                    thursday: p.Horaires_Jeudi?.string,
                    friday: p.Horaires_Vendredi?.string,
                    saturday: p.Horaires_Samedi?.string,
                    sunday: p.Horaires_Dimanche?.string,
                }
            }))

        } catch (error) {
            console.error("Mondial Relay Service Error:", error)
            throw error
        }
    }
}

export const mondialRelayService = new MondialRelayService()
