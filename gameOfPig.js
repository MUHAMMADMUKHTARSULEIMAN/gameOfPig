(function(){
  "use strict";

  // set scores to zero
  let p = 0;
  let q = 0;


  // get relevant elements
  const start = document.querySelector('#start');
  const game = document.querySelector('#game');
  const control = document.querySelector('#control');
  const score = document.querySelector('#score');
  const button = document.querySelector('#button');
  const player = document.createElement('p');
  const winner = document.createElement('h1');
  const snake = document.createElement('p');
  const roll = document.createElement('button');
  roll.append("Roll the dice");
  const heading = document.createElement('h1');
  heading.append("The game has started");
  const quit = document.createElement('button');
  quit.append('Quit');
  const startNew = document.createElement('button');
  startNew.append('Start New Game')
  const die1 = document.createElement('img');
  const die2 = document.createElement('img');
  const scoreX = document.createElement('p');
  scoreX.textContent = "First player score: " + p;
  const scoreY = document.createElement('p');
  scoreY.textContent = "Second player score: " + q;
  const pass = document.createElement('button');
  pass.append('Pass');
  const reroll = document.createElement('button');
  reroll.append('Reroll');
  const or = document.createElement('span');
  or.append(' or ');
  

  // generate interface for when game starts
  button.addEventListener('click', function(e) {
    e.preventDefault;

    start.textContent = "";
    start.appendChild(heading);
    start.appendChild(quit);

    decideFirstPlayer();

    control.appendChild(roll);

    
    score.appendChild(scoreX);
    score.appendChild(scoreY);
  })

  // generate die faces
  const dieOne = (i) => {
    if(i == 1) {
      die1.src = 'images/faceone.jpg';
    }
    else if(i == 2) {
      die1.src = 'images/facetwo.jpg';
    }
    else if(i == 3) {
      die1.src = 'images/facethree.jpg';
    }
    else if(i == 4) {
      die1.src = 'images/facefour.jpg';
    }
    else if(i == 5) {
      die1.src = 'images/facefive.jpg';
    }
    else {
      die1.src = 'images/facesix.jpg';
    }
  }
  
  const dieTwo = (j) => {
    if(j == 1) {
      die2.src = 'images/faceone.jpg';
    }
    else if(j == 2) {
      die2.src = 'images/facetwo.jpg';
    }
    else if(j == 3) {
      die2.src = 'images/facethree.jpg';
    }
    else if(j == 4) {
      die2.src = 'images/facefour.jpg';
    }
    else if(j == 5) {
      die2.src = 'images/facefive.jpg';
    }
    else {
      die2.src = 'images/facesix.jpg';
    }
  }

  // decide first player
  function decideFirstPlayer() {
    // generate variables to determine who goes first
    const x = Math.random();
    const y = Math.random();

    if (x > y) {
      player.innerText = 'Roll the dice for player one';
      game.appendChild(player);
    }

    else if (y > x) {
      player.innerText = 'Roll the dice for player two';
      game.appendChild(player);
    }
    else {
      decideFirstPlayer();
    }
  }


  // roll the dice
  roll.addEventListener('click', function() {
    if(player.textContent == 'Roll the dice for player one') {
      playerOne();
    }
    else {
      playerTwo();
    }
  });

  // roll the dice for player one
  function playerOne() {
    let i = Math.floor((Math.random() * 6) + 1);
    let j = Math.floor((Math.random() * 6) + 1);
    
    // setting the image for each number of both dice
    dieOne(i);
    dieTwo(j);

    // set score for that round
    setScore(i, j);
  }

  // function for player two
  function playerTwo() {
    let i = Math.floor((Math.random() * 6) + 1);
    let j = Math.floor((Math.random() * 6) + 1);
    
    // setting the image for each number of both dice
    dieOne(i);
    dieTwo(j);

    // set score for that round
    setScore(i, j);
    }


  // quit button
  quit.addEventListener('click', function() {
    const answer = confirm('Are you sure you want to quit?')
    if (answer == true) {
      p = 0;
      q = 0;

      scoreX.textContent = "First player score: " + p;
      scoreY.textContent = "Second player score: " + q;

      start.textContent = "";
      game.textContent = "";
      control.textContent = "";
      score.textContent = "";

      let text = document.createElement('h1');
      text.append('Start Game')
      start.appendChild(text);
      start.appendChild(button);
    }
  })


  // startNew function
  startNew.addEventListener('click', function() {
    p = 0;
    q = 0;

    scoreX.textContent = "First player score: " + p;
    scoreY.textContent = "Second player score: " + q;

    start.textContent = "";
    game.textContent = "";
    control.textContent = "";
    score.textContent = "";

    let text = document.createElement('h1');
    text.append('Start Game')
    start.appendChild(text);
    start.appendChild(button);
  })


  // reroll function
  reroll.addEventListener('click', function() {
    let i = Math.floor((Math.random() * 6) + 1);
    let j = Math.floor((Math.random() * 6) + 1);

    control.removeChild(reroll);
    control.removeChild(or);
    control.removeChild(pass);
    if(player.textContent == "Roll the dice for player one") {
      // remove dice from and append player to game
      game.textContent = "";
      game.appendChild(player);

      // setting the image for each number of both dice
      dieOne(i);
      dieTwo(j);

      // if neither die returns one
      if (i != 1 && j != 1) {
        game.appendChild(die1);
        game.appendChild(die2);
  
        p += (i + j);
  
        control.appendChild(reroll);
        control.appendChild(or);
        control.appendChild(pass);

        scoreX.textContent = "First player score: " + p;
        scoreY.textContent = "Second player score: " + q;

        score.textContent = "";
        score.appendChild(scoreX);
        score.appendChild(scoreY);
  
        if(p >= 30) {
          game.removeChild(player);
          control.textContent = "";
          score.textContent = "";
          winner.innerText = "Player one wins with " + p + " points";
          score.appendChild(winner);
          start.removeChild(heading);
          start.removeChild(quit);
          start.appendChild(startNew);
        }
      }

      // if both of the dice return one
      else if (i == 1 && j == 1) {
        game.appendChild(die1);
        game.appendChild(die2);

        p = 0;

        snake.innerText = "Oh snap! Snake eyes!"
        game.appendChild(snake);
        control.textContent = "";

        scoreX.textContent = "First player score: " + p;
        scoreY.textContent = "Second player score: " + q;

        score.textContent = "";
        score.appendChild(scoreX);
        score.appendChild(scoreY);

        setTimeout(function() {
          game.removeChild(snake);
          game.removeChild(die1);
          game.removeChild(die2);
          player.textContent = "Roll the dice for player two";
          control.appendChild(roll);
        }, 2000);
      }

      // if either of them returns one
      else if(i == 1 || j == 1) {
        game.appendChild(die1);
        game.appendChild(die2);
        snake.innerText = "Sorry, one of your rolls was a one; switching to player two";
        game.appendChild(snake);
        control.textContent = "";

        scoreX.textContent = "First player score: " + p;
        scoreY.textContent = "Second player score: " + q;

        score.textContent = "";
        score.appendChild(scoreX);
        score.appendChild(scoreY);
        
        setTimeout(function() {
          game.removeChild(snake);
          game.removeChild(die1);
          game.removeChild(die2);
          player.textContent = "Roll the dice for player two";
          control.appendChild(roll);
        }, 2000);
      }
    }
    else {
      // remove dice from and append player to game
      game.textContent = "";
      game.appendChild(player);

      // setting the image for each number of both dice
      dieOne(i);
      dieTwo(j);

      // if neither die returns one
      if (i != 1 && j != 1) {
        game.appendChild(die1);
        game.appendChild(die2);
  
        q += (i + j);
  
        control.appendChild(reroll);
        control.appendChild(or);
        control.appendChild(pass);

        scoreX.textContent = "First player score: " + p;
        scoreY.textContent = "Second player score: " + q;

        score.textContent = "";
        score.appendChild(scoreX);
        score.appendChild(scoreY);
  
        if(q >= 30) {
          game.removeChild(player);
          control.textContent = "";
          score.textContent = "";
          winner.innerText = "Player two wins with " + q + " points";
          score.appendChild(winner);
          start.removeChild(heading);
          start.removeChild(quit);
          start.appendChild(startNew);
        }
      }

      // if both of the dice return one
      else if (i == 1 && j == 1) {
        game.appendChild(die1);
        game.appendChild(die2);

        q = 0;

        snake.innerText = "Oh snap! Snake eyes!"
        game.appendChild(snake);
        control.textContent = "";

        scoreX.textContent = "First player score: " + p;
        scoreY.textContent = "Second player score: " + q;

        score.textContent = "";
        score.appendChild(scoreX);
        score.appendChild(scoreY);

        setTimeout(function() {
          game.removeChild(snake);
          game.removeChild(die1);
          game.removeChild(die2);
          player.textContent = "Roll the dice for player one";
          control.appendChild(roll);
        }, 2000);
      }

      // if either of them returns one
      else if(i == 1 || j == 1) {
        game.appendChild(die1);
        game.appendChild(die2);

        snake.innerText = "Sorry, one of your rolls was a one; switching to player one";
        game.appendChild(snake);
        control.textContent = "";
        
        scoreX.textContent = "First player score: " + p;
        scoreY.textContent = "Second player score: " + q;

        score.textContent = "";
        score.appendChild(scoreX);
        score.appendChild(scoreY);

        setTimeout(function() {
          game.removeChild(snake);
          game.removeChild(die1);
          game.removeChild(die2);
          player.textContent = "Roll the dice for player one";
          control.appendChild(roll);
        }, 2000);
      }
    }
  });


  // end of pass function
  pass.addEventListener('click', function() {
    game.removeChild(die1);
    game.removeChild(die2);
    if(player.textContent == "Roll the dice for player one") {
      player.textContent = "Roll the dice for player two";
      control.textContent = "";
      control.appendChild(roll);
    }
    else {
      player.textContent = "Roll the dice for player one";
      control.textContent = "";
      control.appendChild(roll);
    }
  });

  // function that handles score logic
  const setScore = (i, j) => {
    // if neither die returns one
    if (i != 1 && j != 1) {
      game.appendChild(die1);
      game.appendChild(die2);
  
      p += (i + j);
  
      control.removeChild(roll);
      control.appendChild(reroll);
      control.appendChild(or);
      control.appendChild(pass);
  
      scoreX.textContent = "First player score: " + p;
      scoreY.textContent = "Second player score: " + q;
  
      score.textContent = "";
      score.appendChild(scoreX);
      score.appendChild(scoreY);
  
      if(p >= 30) {
        game.removeChild(player);
        control.textContent = "";
        score.textContent = "";
        winner.innerText = "Player one wins with " + p + " points";
        score.appendChild(winner);
        start.removeChild(heading);
        start.removeChild(quit);
        start.appendChild(startNew);
      }
    }
  
    // if both of the dice return one
    else if (i == 1 && j == 1) {
      game.appendChild(die1);
      game.appendChild(die2);
      p = 0;
  
      snake.innerText = "Oh snap! Snake eyes!"
      game.appendChild(snake);
      control.textContent = "";
  
      scoreX.textContent = "First player score: " + p;
      scoreY.textContent = "Second player score: " + q;
  
      score.textContent = "";
      score.appendChild(scoreX);
      score.appendChild(scoreY);
  
      setTimeout(function() {
        game.removeChild(snake);
        game.removeChild(die1);
        game.removeChild(die2);
        player.textContent = "Roll the dice for player two";
        control.appendChild(roll);
      }, 2000);
    }
  
    // if only one of them returns one
    else if(i == 1 || j == 1) {
      game.appendChild(die1);
      game.appendChild(die2);
  
      snake.innerText = "Sorry, one of your rolls was a one; switching to player two";
      game.appendChild(snake);
      control.textContent = "";
  
      scoreX.textContent = "First player score: " + p;
      scoreY.textContent = "Second player score: " + q;
  
      score.textContent = "";
      score.appendChild(scoreX);
      score.appendChild(scoreY);
      
      setTimeout(function() {
        game.removeChild(snake);
        game.removeChild(die1);
        game.removeChild(die2);
        player.textContent = "Roll the dice for player two";
        control.appendChild(roll);
      }, 2000);
    }
  }
}());