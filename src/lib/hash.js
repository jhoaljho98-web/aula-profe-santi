export async function sha256(texto) {
  const bytes = new TextEncoder().encode(String(texto).trim())
  const hash = await crypto.subtle.digest('SHA-256', bytes)
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}
