// lib/mockup.tsx
interface Card {
  id: string;
  name: string;
  // Add other properties based on your data structure
}

export async function getData(): Promise<Card[]> {
  const response = await fetch('https://657f87fc6ae0629a3f5362f1.mockapi.io/api/v1/card');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  await new Promise(resolve => setTimeout(resolve, 1000));
  const data: Card[] = await response.json() as Card[];
  return data;
}