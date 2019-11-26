import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Container from "./components/Container";
import Row from "./components/Row";
import Col from "./components/Col";
import Instructions from "./components/Instructions";
import Navbar from "./components/Navbar";
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
          feedback: "You've won!"
        })
      }
    }
    // Card has already been selected.  Show feedback, and set game to false to prevent additional plays on the current game.
    else {
      this.setState({
        feedback: "You've lost the game!",
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
      <div>
        <Navbar>
          <Container class="fluid">
            <Row>
              <Col class="col-4 text-left">
                clickyGame
              </Col>
              <Col class="col-4 text-center feedback">
               {this.state.feedback}
              </Col>
              <Col class="col-4 text-right">
                Score: {this.state.score} | High Score: {this.state.highScore}
              </Col>
            </Row>
          </Container>
        </Navbar>
        <Instructions/>
        <Wrapper>
          {
            this.state.shuffledFriends.map(friend => (
              <FriendCard
                playGame={this.playGame}
                id={friend.id}
                key={friend.id}
                image={friend.image}
              />
            ))
          }
        </Wrapper>
      </div>
    );
  }
}

export default App;