import { numberOfGames, getWinners } from './game-statistics';

test('Number of games test', () => {
  const game = { _id: '12345' };
  const results = [
    { _id: '1', game: { _id: '12345' } },
    { _id: '2', game: { _id: '11111' } },
    { _id: '3', game: { _id: '12345' } }
  ];
  expect(numberOfGames(game, results)).toBe(2);
});

test('Get winners test', () => {
  const result = {
    scores: [
      { user: { username: 'player1' }, points: 3 },
      { user: { username: 'player2' }, points: 2 },
      { user: { username: 'player3' }, points: 3 },
      { user: { username: 'player4' }, points: 1 }
    ]
  };
  expect(getWinners(result)).toEqual(['player1', 'player3']);
});
