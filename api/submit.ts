import Airtable from 'airtable'
import type { VercelRequest, VercelResponse } from '@vercel/node'

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE || '')

export default function handler(request: VercelRequest, response: VercelResponse) {
  base('submissions').create([
    {
      "fields": request.body
    }
  ], function done(err: any) {
    if (err) {
      console.error(err)
      response.status(400).send('Valamiért ez nem sikerült, kérlek, próbáld később.')
    } else {
      response.status(201).send('OK')
    }
  })
}
