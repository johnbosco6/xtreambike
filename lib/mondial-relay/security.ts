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
 * Generate security key for WSI2_CreationEtiquette
 * 
 * Hash order per official Mondial Relay documentation:
 * All input parameters in XML order + Private Key
 */
export function generateCreationSecurityKey(params: {
    enseigne: string;
    modeCol: string;
    modeLiv: string;
    nDossier: string;
    nClient: string;
    expe_Langage: string;
    expe_Ad1: string;
    expe_Ad2: string;
    expe_Ad3: string;
    expe_Ad4: string;
    expe_Ville: string;
    expe_CP: string;
    expe_Pays: string;
    expe_Tel1: string;
    expe_Tel2: string;
    expe_Mail: string;
    dest_Langage: string;
    dest_Ad1: string;
    dest_Ad2: string;
    dest_Ad3: string;
    dest_Ad4: string;
    dest_Ville: string;
    dest_CP: string;
    dest_Pays: string;
    dest_Tel1: string;
    dest_Tel2: string;
    dest_Mail: string;
    poids: string;
    longueur: string;
    taille: string;
    nbColis: string;
    crt_Valeur: string;
    crt_Devise: string;
    exp_Valeur: string;
    exp_Devise: string;
    col_Rel_Pays: string;
    col_Rel: string;
    liv_Rel_Pays: string;
    liv_Rel: string;
    tAvisage: string;
    tReprise: string;
    montage: string;
    tRDV: string;
    assurance: string;
    instructions: string;
    privateKey: string;
}): string {
    const parts = [
        params.enseigne,
        params.modeCol,
        params.modeLiv,
        params.nDossier,
        params.nClient,
        params.expe_Langage,
        params.expe_Ad1,
        params.expe_Ad2,
        params.expe_Ad3,
        params.expe_Ad4,
        params.expe_Ville,
        params.expe_CP,
        params.expe_Pays,
        params.expe_Tel1,
        params.expe_Tel2,
        params.expe_Mail,
        params.dest_Langage,
        params.dest_Ad1,
        params.dest_Ad2,
        params.dest_Ad3,
        params.dest_Ad4,
        params.dest_Ville,
        params.dest_CP,
        params.dest_Pays,
        params.dest_Tel1,
        params.dest_Tel2,
        params.dest_Mail,
        params.poids,
        params.longueur,
        params.taille,
        params.nbColis,
        params.crt_Valeur,
        params.crt_Devise,
        params.exp_Valeur,
        params.exp_Devise,
        params.col_Rel_Pays,
        params.col_Rel,
        params.liv_Rel_Pays,
        params.liv_Rel,
        params.tAvisage,
        params.tReprise,
        params.montage,
        params.tRDV,
        params.assurance,
        params.instructions,
        params.privateKey,
    ];

    const concatenated = parts.join('');
    return md5(concatenated);
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
