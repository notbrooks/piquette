const JWT_SECRET = "BSjXMWA67gfUJPuaenCXH6ohGw7UHb69Nfn9UKqyCcQ=";

function base64UrlEncode(buffer: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function base64UrlDecode(input: string): Uint8Array {
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const binaryString = atob(base64);
  return Uint8Array.from(binaryString, char => char.charCodeAt(0));
}

async function createHMAC(payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(JWT_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload)
  );

  return base64UrlEncode(signature);
}

export async function createToken(payload: Record<string, any>): Promise<string> {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const encodedHeader = base64UrlEncode(
    new TextEncoder().encode(JSON.stringify(header))
  );
  const encodedPayload = base64UrlEncode(
    new TextEncoder().encode(JSON.stringify(payload))
  );

  const dataToSign = `${encodedHeader}.${encodedPayload}`;
  const signature = await createHMAC(dataToSign);

  return `${dataToSign}.${signature}`;
}

export async function verifyToken(token: string): Promise<Record<string, any> | null> {
  const [encodedHeader, encodedPayload, encodedSignature] = token.split(".");
  if (!encodedHeader || !encodedPayload || !encodedSignature) {
    throw new Error("Invalid token format");
  }

  const dataToVerify = `${encodedHeader}.${encodedPayload}`;
  const expectedSignature = await createHMAC(dataToVerify);

  if (expectedSignature !== encodedSignature) {
    throw new Error("Invalid token signature");
  }

  const decodedPayload = JSON.parse(
    new TextDecoder().decode(base64UrlDecode(encodedPayload))
  );

  // Add your own validation for expiration or other claims if needed.
  return decodedPayload;
}