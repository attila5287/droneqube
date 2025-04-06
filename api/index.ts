// File: /api/page.ts
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { readFileSync } from 'fs'
import { join } from 'path'

export default function handler(req: VercelRequest, res: VercelResponse) {
  const filePath = join(process.cwd(), 'public', 'lights.html')
  const html = readFileSync(filePath, 'utf-8')

  res.setHeader('Content-Type', 'text/html')
  res.status(200).send(html)
}
