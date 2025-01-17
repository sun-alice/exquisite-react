import React, { Component } from "react";
import "./Game.css";
import PlayerSubmissionForm from "./PlayerSubmissionForm";
import FinalPoem from "./FinalPoem";
import RecentSubmission from "./RecentSubmission";

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lines: [],
      finalPoem: false
    };
  }

  addLine = newLine => {
    const lines = this.state.lines;
    lines.push(newLine);

    this.setState({
      lines
    });
  };

  revealPoem = () => {
    this.setState({
      finalPoem: true
    });
  };

  render() {
    const exampleFormat = FIELDS.map(field => {
      if (field.key) {
        return field.placeholder;
      } else {
        return field;
      }
    }).join(" ");

    let recentSub = "";

    if (this.state.lines.length > 0) {
      recentSub = (
        <RecentSubmission
          recentSub={this.state.lines[this.state.lines.length - 1]}
        />
      );
    }

    let submissionForm = "";

    if (!this.state.finalPoem) {
      submissionForm = (
        <div>
          {recentSub}
          <PlayerSubmissionForm
            addPoemLineCallback={this.addLine}
            fields={FIELDS}
            playerNum={this.state.lines.length + 1}
          />
        </div>
      );
    }
    return (
      <div className="Game">
        <h2>Game</h2>

        <p>
          Each player should take turns filling out and submitting the form
          below. Each turn should be done individually and <em>in secret!</em>{" "}
          Take inspiration from the revealed recent submission. When all players
          are finished, click the final button on the bottom to reveal the
          entire poem.
        </p>

        <p>Please follow the following format for your poetry submission:</p>

        <p className="Game__format-example">{exampleFormat}</p>

        {submissionForm}

        <FinalPoem
          lines={this.state.lines}
          showFinalPoem={this.state.finalPoem}
          showFinalPoemCallback={this.revealPoem}
        />
      </div>
    );
  }
}

const FIELDS = [
  "The",
  {
    key: "adj1",
    placeholder: "adjective"
  },
  {
    key: "noun1",
    placeholder: "noun"
  },
  {
    key: "adv",
    placeholder: "adverb"
  },
  {
    key: "verb",
    placeholder: "verb"
  },
  "the",
  {
    key: "adj2",
    placeholder: "adjective"
  },
  {
    key: "noun2",
    placeholder: "noun"
  },
  "."
];

export default Game;
