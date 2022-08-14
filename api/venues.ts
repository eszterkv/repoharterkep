import Airtable from 'airtable'
import type { VercelRequest, VercelResponse } from '@vercel/node'

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base(process.env.AIRTABLE_BASE || '')

export default function handler(_: VercelRequest, response: VercelResponse) {
  const results = []

  base('repohar').select().eachPage(function page(records, fetchNextPage) {
    records.forEach(function(record) {
      results.push(record.fields)
    });
    fetchNextPage()
  }, function done(err) {
    if (err) { console.error(err); return }

    response.status(200).send(results as any)
  })
}
