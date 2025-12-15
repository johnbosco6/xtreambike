export interface ShippingRate {
    service: string
    price: number
    estimatedDays: number
}

// Placeholder for Mondial Relay API integration
export const getMondialRelayRates = async (weight: number, destination: string): Promise<ShippingRate[]> => {
    // TODO: Integrate with Mondial Relay API using credentials
    // Requires: EnseigneCode, PrivateKey
    // Documentation: https://www.mondialrelay.fr/solutions-pro/documentation-technique/

    // Mock response
    return [
        {
            service: "Mondial Relay Point Relais",
            price: 4.50,
            estimatedDays: 3
        }
    ]
}

// Placeholder for La Poste API integration
export const getLaPosteRates = async (weight: number, destination: string): Promise<ShippingRate[]> => {
    // TODO: Integrate with La Poste / Colissimo API
    // Requires: ContractNumber, Password
    // Documentation: https://developer.laposte.fr/products/colissimo/latest

    // Mock response
    return [
        {
            service: "Colissimo Domicile",
            price: 7.90,
            estimatedDays: 2
        }
    ]
}
