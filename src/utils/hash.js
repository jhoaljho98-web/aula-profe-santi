/**
 * Hashea un texto (número de documento) con SHA-256.
 * Usa la Web Crypto API — funciona en el navegador sin dependencias externas.
 *
 * @param {string} texto - Texto a hashear (por ejemplo, un número de documento).
 * @returns {Promise<string>} Hash en hexadecimal.
 */
export async function sha256(texto) {
  const encoder = new TextEncoder()
  const data = encoder.encode(texto.trim())
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}
