import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import { createClient } from '@supabase/supabase-js';

const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function deleteRemoved() {
    const idsToDelete = [76, 77, 78, 79, 80, 81, 82, 83];

    for (const id of idsToDelete) {
        const { error } = await sb.from('products').delete().eq('legacy_id', id);
        if (error) {
            console.log(`⚠️ id ${id}: ${error.message}`);
        } else {
            console.log(`✅ Deleted legacy_id ${id} from Supabase`);
        }
    }
    console.log('\nDone!');
}

deleteRemoved();
