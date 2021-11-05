var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);
    return value;
};

var getPlayerName = function() {
  var name = "";
  while(name === "" || name === null){
    name = prompt("What is your robot's name?");
  }
  return name;
}

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if(this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars");
            this.health += 20;
            this.money -= 7;
        } else {
            window.alert("u got no money");
        }
    },
    upgradeAttack: function() {
        if(this.money >= 7){
            window.alert("u got more attack bb");
            this.attack += 6;
            this.money -= 7;
        } else {
            window.alert("u need more money bitch");
        }
    }
};

var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10,14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10,14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10,14)
    }
];

var fightOrSkip = function() {
  var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter FIGHT or SKIP to choose.");
  promptFight = promptFight.toLowerCase();

  if(promptFight === "" || promptFight === null) {
    window.alert("u dum bitch give a valid answer");
    return fightOrSkip();
  }

  if(promptFight === "skip") {
    var confirmSkip = window.confirm("Are you sure you want to quit?");
    if(confirmSkip) {
      window.alert(playerInfo.name + " has decided ot skip this fight. bye bye money")
      playerInfo.money = playerInfo.money - 10;
      return true;
    }

  }
}

var fight = function(enemy) {
  // keep track of who goes first
  var isPlayerTurn = true;

  // randomly change turn order
  if (Math.random() > 0.5) {
    isPlayerTurn = false;
  }

  while (playerInfo.health > 0 && enemy.health > 0) {
    if (isPlayerTurn) {
      // ask player if they'd like to fight or skip using fightOrSkip function
      if (fightOrSkip()) {
        // if true, leave fight by breaking loop
        break;
      }

      var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

      // remove enemy's health by subtracting the amount we set in the damage variable
      enemy.health = Math.max(0, enemy.health - damage);
      console.log(
        playerInfo.name +
          " attacked " +
          enemy.name +
          ". " +
          enemy.name +
          " now has " +
          enemy.health +
          " health remaining."
      );

      // check enemy's health
      if (enemy.health <= 0) {
        window.alert(enemy.name + " has died!");

        // award player money for winning
        playerInfo.money = playerInfo.money + 20;

        // leave while() loop since enemy is dead
        break;
      } else {
        window.alert(enemy.name + " still has " + enemy.health + " health left.");
      }
      // player gets attacked first
    } else {
      var damage = randomNumber(enemy.attack - 3, enemy.attack);

      // remove player's health by subtracting the amount we set in the damage variable
      playerInfo.health = Math.max(0, playerInfo.health - damage);
      console.log(
        enemy.name +
          " attacked " +
          playerInfo.name +
          ". " +
          playerInfo.name +
          " now has " +
          playerInfo.health +
          " health remaining."
      );

      // check player's health
      if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + " has died!");
        // leave while() loop if player is dead
        break;
      } else {
        window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
      }
    }
    // switch turn order for next round
    isPlayerTurn = !isPlayerTurn;
  }
};

var startGame = function () {
  // reset player stats

    playerInfo.reset();

    for (var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
          window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
          var pickedEnemyObj = enemyInfo[i];
          pickedEnemyObj.health = randomNumber(40, 60);
          fight(pickedEnemyObj);
          if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
            var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
            if(storeConfirm){
              shop();
            }
          }
        }
    }
    endGame();
};

var shop = function() {
    var shopOptionPrompt = window.prompt("Would you like to REFILL(1) your health, UPGRADE(2) your attack, or LEAVE(3) the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice.");
    shopOptionPrompt = parseInt(shopOptionPrompt);
    switch (shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            break;
        case 2:
            playerInfo.upgradeAttack();
            break;
        case 3:
            window.alert("Leaving the store");
            break;
        default:
            window.alert("u stupid bitch");
            shop();
            break;
    }
};

var endGame = function () {
  // if player is still alive, player wins!
  if (playerInfo.health > 0) {
    window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money +".");
    var highScore = localStorage.getItem("highScore");
    if(highScore === null){
      highScore = 0;
    }
    if(playerInfo.money > highScore){
      window.alert("New high score of " + playerInfo.money);
      localStorage.setItem("highScore", playerInfo.money);
      localStorage.setItem("name", playerInfo.name);
    } else {
      window.alert("no new high score u bitch");
    }
  } else {
    window.alert("You've lost your robot in battle.");
  }

  var playAgainConfirm = window.confirm("Would you like to play again?");

  if(playAgainConfirm) {
      startGame();
  } else {
      window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
};

startGame();
