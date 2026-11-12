import sharp from 'sharp'
import { writeFile } from 'node:fs/promises'

const imageVariants = [
  { name: 'vinteq-logo', width: 135 },
  { name: 'vinteq-logo', width: 270 },
  { name: 'vinteq-logo-light', width: 135 },
  { name: 'vinteq-logo-light', width: 270 },
  { name: 'vinteq-mark', width: 135 },
  { name: 'vinteq-mark', width: 270 },
  { name: 'vinteq-mark-light', width: 135 },
  { name: 'vinteq-mark-light', width: 270 },
]

for (const { name, width } of imageVariants) {
  const input = `public/${name}.png`
  const output = `public/${name}-${width}.webp`
  await sharp(input)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82, effort: 5 })
    .toFile(output)
  console.log(`Created ${output}`)
}

const optimizedOgImage = await sharp('public/og-image.png')
  .png({ compressionLevel: 9, effort: 10 })
  .toBuffer()
await writeFile('public/og-image.png', optimizedOgImage)
console.log('Optimized public/og-image.png')
