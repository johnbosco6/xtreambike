// Mondial Relay API1 Types (SOAP)

// ============================================
// Point Relais® Search Types
// ============================================

export interface PointRelaisSearchParams {
    Pays: string; // Country code (e.g., "FR")
    NumPointRelais?: string; // Specific Point Relais ID (6 digits)
    CP?: string; // Postal code
    Latitude?: string; // GPS latitude (11 chars: -?XX.XXXXXXX)
    Longitude?: string; // GPS longitude (11 chars: -?XX.XXXXXXX)
    Taille?: 'XS' | 'S' | 'M' | 'L' | 'XL' | '3XL';
    Poids?: number; // Weight in grams (min 15g)
    Action?: 'SMA' | 'APM' | 'REL' | 'MED' | '24R' | '24L' | 'XOH';
    DelaiEnvoi?: number; // Delay in days before shipping
    RayonRecherche?: number; // Search radius in km (0 = no limit, default 50km)
    NombreResultats: number; // Number of results (max 30)
}

export interface HorairesCreneau {
    string: string[]; // Array of 4 strings: [open1, close1, open2, close2]
}

export interface InformationDispo {
    Debut: string; // Start date of unavailability
    Fin: string; // End date of unavailability
}

export interface PointRelais {
    Num: string; // 6-digit Point Relais ID
    LgAdr1: string; // Name line 1
    LgAdr2: string; // Name line 2
    LgAdr3: string; // Address line 3
    LgAdr4: string; // Address line 4
    CP: string; // Postal code
    Ville: string; // City
    Pays: string; // Country code
    Latitude: string; // Latitude
    Longitude: string; // Longitude
    TypeActivite: string;
    Distance: number; // Distance in meters from search origin
    Localisation1: string; // Additional location info line 1
    Localisation2: string; // Additional location info line 2
    Horaires_Lundi: HorairesCreneau;
    Horaires_Mardi: HorairesCreneau;
    Horaires_Mercredi: HorairesCreneau;
    Horaires_Jeudi: HorairesCreneau;
    Horaires_Vendredi: HorairesCreneau;
    Horaires_Samedi: HorairesCreneau;
    Horaires_Dimanche: HorairesCreneau;
    Informations_Dispo: InformationDispo[];
    URL_Plan: string; // URL to location map
    URL_Photo: string; // URL to photo
}

export interface PointRelaisSearchResponse {
    STAT: string; // Status code ("0" = success)
    PointsRelais?: {
        PointRelais_Details: PointRelais[];
    };
}

// ============================================
// Postal Code Search Types
// ============================================

export interface PostalCodeSearchParams {
    Pays: string; // Country code (e.g., "FR")
    Ville: string; // City name (3-26 chars)
    CP?: string; // Postal code (optional)
    NbResult: number; // Max results (max 15)
}

export interface PostalCodeResult {
    CP: string; // Postal code
    Ville: string; // City name
    Pays: string; // Country code
}

export interface PostalCodeSearchResponse {
    STAT: string; // Status code
    Liste?: {
        Commune: PostalCodeResult[];
    };
}

// ============================================
// Tracking Types
// ============================================

export interface TrackingParams {
    Expedition: string; // 8-digit shipment number
    Langue: string; // Language code (e.g., "FR")
}

export interface TrackingEvent {
    Tracing_Libelle: string; // Event description
    Tracing_Date: string; // Event date
    Tracing_Heure: string; // Event time
    Tracing_Lieu: string; // Event location (city)
    Tracing_Relais?: string; // Point Relais ID (if applicable)
    Tracing_Pays?: string; // Country code (if applicable)
}

export interface TrackingResponse {
    STAT: string; // Status code
    Libelle01: string;
    Relais_Libelle?: string; // Point Relais name (if applicable)
    Relais_Num?: string; // Point Relais ID (if applicable)
    Libelle02: string;
    Tracing?: {
        ret_WSI2_TracingColisDetaille: TrackingEvent[];
    };
}

// ============================================
// Error Codes
// ============================================

export const MONDIAL_RELAY_ERROR_CODES: Record<string, string> = {
    '0': 'Opération effectuée avec succès',
    '1': 'Enseigne invalide',
    '2': 'Numéro d\'enseigne vide ou inexistant',
    '8': 'Mot de passe ou hachage invalide',
    '9': 'Ville non reconnu ou non unique',
    '16': 'Code pays invalide',
    '19': 'Code postal invalide',
    '24': 'Numéro d\'expédition ou de suivi invalide',
    '49': 'Action invalide',
    '67': 'Latitude invalide',
    '68': 'Longitude invalide',
    '70': 'Numéro de Point Relais invalide',
    '74': 'Langue invalide',
    '80': 'Code tracing : Colis enregistré',
    '81': 'Code tracing : Colis en traitement chez Mondial Relay',
    '82': 'Code tracing : Colis livré',
    '83': 'Code tracing : Anomalie',
    '94': 'Colis Inexistant',
    '97': 'Clé de sécurité invalide',
    '98': 'Erreur générique (Paramètres invalides)',
    '99': 'Erreur générique du service',
};

// ============================================
// Helper Types
// ============================================

export type DeliveryMode = '24R' | '24L' | 'HOM' | 'LCC' | 'XOH';

export interface FormattedPointRelais {
    id: string;
    name: string;
    address: string;
    postalCode: string;
    city: string;
    country: string;
    distance: number; // in meters
    latitude: string;
    longitude: string;
    openingHours: {
        monday: string[];
        tuesday: string[];
        wednesday: string[];
        thursday: string[];
        friday: string[];
        saturday: string[];
        sunday: string[];
    };
    photoUrl?: string;
    mapUrl?: string;
    unavailabilityPeriods?: Array<{
        start: string;
        end: string;
    }>;
}
