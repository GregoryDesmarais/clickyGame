import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import Footer from "./components/Footer";
import friends from "./friends.json";

//"Friend" shuffle function
function shuffleCards(array) {
  let newArr = array.slice(0); //Create new temp Array from state.friends.
  for (let i = newArr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

class App extends Component {
  state = {
    friends,
    shuffledFriends: [],
    score: 0,
    highScore: 0,
    selectedCards: [],
    feedback: "",
    active: true
  };

  playGame = (id) => {
    // Check if game state is not active.  If not, reset game.
    if (!this.state.active) {
      this.resetGame(false);
    }
    // Game is active, selected card is not in selectedCards list.
    else if (this.state.selectedCards.indexOf(id) === -1) {
      let tempArray = this.state.selectedCards;
      tempArray.push(id);
      this.setState({
        shuffledFriends: shuffleCards(this.state.friends),
        selectedCards: tempArray,
        feedback: "Keep going!",
        score: this.state.score + 1
      })
      if (this.state.score === 12) {
        this.setState({
          feedback: "You've won! Click here to play again!"
        })
      }
    } 
    // Card has already been selected.  Show feedback, and set game to false to prevent additional plays on the current game.
    else {
      this.setState({
        feedback: "Sorry, that card has already been selected.  Click here to play again!",
        active: false
      })
    }
  }

  resetGame = (state) => {
    if (this.state.feedback.indexOf("Sorry") > -1 || this.state.feedback.indexOf("You've") > -1 || !state) {
      this.setState({
        highScore: this.state.score,
        score: 0,
        selectedCards: [],
        feedback: "",
        shuffledFriends: shuffleCards(this.state.friends),
        active: true
      })
    }
  }

  //On load, shuffle the cards.
  componentDidMount = () => {
    this.setState({
      shuffledFriends: shuffleCards(this.state.friends)
    })
  }

  render() {
    return (
      <Wrapper>
        <Title> clickyGame </Title> {
          this.state.shuffledFriends.map(friend => (
            <FriendCard
              playGame={this.playGame}
              id={friend.id}
              key={friend.id}
              image={friend.image}
            />
          ))
        }
        <Footer
          feedback={this.state.feedback}
          score={this.state.score}
          highScore={this.state.highScore}
          resetGame={this.resetGame}
        />
      </Wrapper>
    );
  }
}

export default App;