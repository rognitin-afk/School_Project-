/**
 * Extract features for one district from public/new.geojson (matches properties.DISTRICT).
 * Usage: node scripts/extract-district-from-geojson.mjs RAUTAHAT
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const districtArg = (process.argv[2] ?? 'RAUTAHAT').toUpperCase()
const inputPath = path.join(root, 'public', 'new.geojson')
const safeName = districtArg.toLowerCase().replace(/[^a-z0-9-]+/g, '-')
const outPath = path.join(root, 'public', `${safeName}-district.geojson`)

const raw = fs.readFileSync(inputPath, 'utf8')
const data = JSON.parse(raw)
if (data.type !== 'FeatureCollection' || !Array.isArray(data.features)) {
  throw new Error('Expected FeatureCollection with features array')
}

const features = data.features.filter(
  (f) => String(f?.properties?.DISTRICT ?? '').toUpperCase() === districtArg,
)

const out = {
  type: 'FeatureCollection',
  ...(data.crs != null ? { crs: data.crs } : {}),
  features,
}

fs.writeFileSync(outPath, JSON.stringify(out))
console.log(`Wrote ${features.length} feature(s) to ${path.relative(root, outPath)}`)
