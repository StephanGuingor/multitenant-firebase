// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import admin from 'firebase-admin';
import { app } from 'firebase-admin';
import { ZodError, z } from 'zod';
import { Tenant } from 'firebase-admin/lib/auth/tenant';
var serviceAccount = require("../../../key.json");

const reqSchema = z.object({
    displayName: z.string(),
});


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Tenant | any>
) {
    
    try {

        if (!admin?.app?.length || admin?.apps?.length === 0) {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
            })
        }

    if (req.method !== 'POST' && req.method !== 'GET') {
        res.status(400).json({ error: 'Only POST requests allowed' });
        return;
    }

    const auth = admin.auth()
    const tenantManager = auth.tenantManager();

    if (req.method === 'GET')  {
        const tenants = await tenantManager.listTenants();
        res.status(200).json(tenants)
        return;
    }

    const parsed = reqSchema.safeParse(req.body);
    if (!parsed.success) {
        res.status(400).json({ error: parsed.error });
        return;
    }

    const tenant = await tenantManager.createTenant({
        displayName: parsed.data.displayName,
        emailSignInConfig: {
            enabled: true,
            passwordRequired: true,
        },
    })
        
  res.status(200).json(tenant)
} catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
}
}
