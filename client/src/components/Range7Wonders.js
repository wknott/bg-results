import React, { Component } from 'react';
import LabeledRange from './LabeledRange';

const propsByState = {
  military: { title: 'Military points', min: -9, max: 18, color: '#dc3545' },
  coin: { title: 'Coin points', min: 0, max: 10, color: 'yellow' },
  wonder: { title: 'Wonder points', min: 0, max: 25, color: 'orange' },
  civilian: { title: 'Civilian points', min: 0, max: 30, color: '#007bff' },
  commerce: { title: 'Commerce points', min: 0, max: 10, color: '#ffc107' },
  guild: { title: 'Guild points', min: 0, max: 20, color: 'indigo' },
  science: { title: 'Science points', min: 0, max: 50, color: '#28a745' }
};

export default class Range7Wonders extends Component {
  render() {
    const { type, scores, onScoresChange } = this.props;
    const { title, min, max, color } = propsByState[type];
    return (
      <div>
        <h4
          style={{
            color: { color },
            textAlign: 'center',
            textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black'
          }}
        >
          {title}
        </h4>
        {scores.map((score, index) => {
          return (
            <LabeledRange
              key={index}
              MIN={min}
              MAX={max}
              onChange={value => {
                const pointsValue = value[0];
                const updatedScore = {
                  ...score,
                  points: { ...score.points, [type]: pointsValue }
                };
                const newScores = scores.map(s =>
                  s === score ? updatedScore : s
                );
                onScoresChange(newScores);
              }}
            />
          );
        })}
      </div>
    );
  }
}
