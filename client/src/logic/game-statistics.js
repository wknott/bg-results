export const numberOfGames = (game, results) => {
  return results.filter(result => result.game._id === game._id).length;
};

const getPlayers = result => {
  return result.scores.map(score => score);
};

export const getWinners = result => {
  const winnerPoints = Math.max(...result.scores.map(score => score.points));
  return result.scores
    .filter(score => score.points === winnerPoints)
    .map(score => score.user.username);
};

export const winnerList = (game, results) => {
  const gameResults = results.filter(result => result.game._id === game._id);
  const winsByPlayer = {};
  const gamesByPlayer = {};
  const pointsByPlayer = {};
  if (game.name === '7 Cudów Świata Pojedynek') {
    const gamesByPlayerWithoutPoints = {};
    gameResults.forEach(result => {
      getWinners(result).forEach(winner => {
        winsByPlayer[winner] = (winsByPlayer[winner] || 0) + 1;
      });
      getPlayers(result).forEach(player => {
        if (player.points < 3) {
          gamesByPlayerWithoutPoints[player.user.username] =
            (gamesByPlayerWithoutPoints[player.user.username] || 0) + 1;
          gamesByPlayer[player.user.username] =
            (gamesByPlayer[player.user.username] || 0) + 1;
        } else {
          pointsByPlayer[player.user.username] =
            (pointsByPlayer[player.user.username] || 0) + player.points;
          gamesByPlayer[player.user.username] =
            (gamesByPlayer[player.user.username] || 0) + 1;
        }
      });
    });
    const listOfWinners = Object.keys(gamesByPlayer).map(player => ({
      name: player,
      numberOfGames: gamesByPlayer[player],
      numberOfWins: winsByPlayer[player] || 0,
      points:
        (pointsByPlayer[player] * gamesByPlayer[player]) /
        (gamesByPlayer[player] - gamesByPlayerWithoutPoints[player])
    }));
    return listOfWinners.sort((a, b) => b.numberOfWins - a.numberOfWins);
  } else {
    gameResults.forEach(result => {
      getWinners(result).forEach(winner => {
        winsByPlayer[winner] = (winsByPlayer[winner] || 0) + 1;
      });
      getPlayers(result).forEach(player => {
        pointsByPlayer[player.user.username] =
          (pointsByPlayer[player.user.username] || 0) + player.points;
        gamesByPlayer[player.user.username] =
          (gamesByPlayer[player.user.username] || 0) + 1;
      });
    });
    const listOfWinners = Object.keys(gamesByPlayer).map(player => ({
      name: player,
      numberOfGames: gamesByPlayer[player],
      numberOfWins: winsByPlayer[player] || 0,
      points: pointsByPlayer[player]
    }));
    return listOfWinners.sort((a, b) => b.numberOfWins - a.numberOfWins);
  }
};

// winnerList(game) {
//   const listOfWinners = [
//     { name: null, numberOfWins: null, numberOfGames: null }
//   ];
//   for (let result of this.state.results) {
//     if (result.game._id === game._id) {
//       const winners = this.getWinners(result);
//       const players = this.getPlayers(result);
//       for (let winner of winners) {
//         const indexOfWinner = listOfWinners.findIndex(
//           win => win.name === winner
//         );
//         if (indexOfWinner === -1) {
//           listOfWinners.push({
//             name: winner,
//             numberOfWins: 1,
//             numberOfGames: 0
//           });
//         } else listOfWinners[indexOfWinner].numberOfWins++;
//       }
//       for (let player of players) {
//         const indexOfWinner = listOfWinners.findIndex(
//           win => win.name === player
//         );
//         if (indexOfWinner === -1) {
//           listOfWinners.push({
//             name: player,
//             numberOfWins: 0,
//             numberOfGames: 1
//           });
//         } else listOfWinners[indexOfWinner].numberOfGames++;
//       }
//     }
//   }
//   listOfWinners.shift();
//   return listOfWinners
//     .slice()
//     .sort((a, b) => b.numberOfWins - a.numberOfWins);
// }
