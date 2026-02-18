import crypto from 'crypto';

/**
 * Generate MD5 hash (uppercase hex) for Mondial Relay API security
 */
export function md5(input: string): string {
    return crypto.createHash('md5').update(input, 'utf8').digest('hex').toUpperCase();
}

/**
 * Generate security key for WSI4_PointRelais_Recherche
 * 
 * Hash order per official Mondial Relay documentation:
 * [Enseigne][Pays][NumPointRelais][CP][Latitude][Longitude][Taille][Poids][Action][DelaiEnvoi][RayonRecherche][NombreResultats][CLE PRIVEE]
 * 
 * NOTE: Ville, TypeActivite, NACE are EXCLUDED from the hash
 *       (they appear in the SOAP XML but NOT in the security hash)
 */
export function generateSearchSecurityKey(params: {
    enseigne: string;
    pays: string;
    numPointRelais: string;
    cp: string;
    latitude: string;
    longitude: string;
    taille: string;
    poids: string;
    action: string;
    delaiEnvoi: string;
    rayonRecherche: string;
    nombreResultats: string;
    privateKey: string;
}): string {
    const parts = [
        params.enseigne,
        params.pays,
        params.numPointRelais,
        params.cp,
        params.latitude,
        params.longitude,
        params.taille,
        params.poids,
        params.action,
        params.delaiEnvoi,
        params.rayonRecherche,
        params.nombreResultats,
        params.privateKey,
    ];

    const concatenated = parts.join('');
    const hash = md5(concatenated);

    console.log('[MondialRelay] Hash input:', JSON.stringify(concatenated));
    console.log('[MondialRelay] Hash output:', hash);

    return hash;
}

/**
 * Generate security key for WSI2_TracingColisDetaillé
 * Hash order: [Enseigne][Expedition][Langue][CLE PRIVEE]
 */
export function generateTrackingSecurityKey(params: {
    enseigne: string;
    expedition: string;
    langue: string;
    privateKey: string;
}): string {
    const concatenated = [
        params.enseigne,
        params.expedition,
        params.langue,
        params.privateKey,
    ].join('');

    return md5(concatenated);
}
