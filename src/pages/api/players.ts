import type { NextApiRequest, NextApiResponse } from 'next'

type Player = {
  name: string;
  goals: number;
  assists: number;
  worldCups: number;
};

let players: Player[] = [
  {
    name: 'Lionel Messi',
    goals: 13,
    assists: 8,
    worldCups: 1,
  },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Player[] | { message: string }>
) {
  if (req.method === 'GET') {
    res.status(200).json(players);
  }

  else if (req.method === 'POST') {
    const { name, goals, assists, worldCups } = req.body;

    if (!name || goals === undefined || assists === undefined || worldCups === undefined) {
      return res.status(400).json({ message: 'Missing fields in body' });
    }

    const newPlayer: Player = { name, goals, assists, worldCups };
    players.push(newPlayer);

    res.status(201).json(players); // returns updated list
  }

  else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}