// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export type Results = {
  name: string,
  height: number,
  mass: number,
  hair_color: string,
  skin_color: string,
  eye_color: string,
  birth_year: string,
  gender: string,
  homeworld: string,
  films: string[],
  species: [],
  vehicles: string[],
  starships: string[],
  created: string,
  edited: string,
  url: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Results[]>
) {
  const response = await fetch('https://swapi.dev/api/people/');
  const data = await response.json();
  res.status(200).json(data.results);
}
