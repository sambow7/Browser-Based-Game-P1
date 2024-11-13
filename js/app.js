const textElement = document.getElementById("text");
const optionButtonsElement = document.getElementById("option-buttons");

// Audio elements
const backgroundMusic = document.getElementById("background-music");
const clickSound = document.getElementById("click-sound");
const toggleMusicButton = document.getElementById("toggle-music");
const victorySound = document.getElementById("victory-sound");


let state = {};

// Function to play background music
function playBackgroundMusic() {
  if (backgroundMusic) {
    backgroundMusic.volume = 0.5;
    backgroundMusic.loop = true;
    backgroundMusic.play().catch(error => {
      console.log("Autoplay blocked: ", error);
    });
  }
}

function toggleMusic() {
  if (backgroundMusic.paused) {
    backgroundMusic.play();
    toggleMusicButton.innerText = "Pause Music";
  } else {
    backgroundMusic.pause();
    toggleMusicButton.innerText = "Play Music";
  }
}

toggleMusicButton.addEventListener("click", toggleMusic);

// Function to start the game
function startGame() {
  state = {};
  showTextNode(1);
  playBackgroundMusic();
}

document.getElementById('start-button').addEventListener('click', function () {
  document.getElementById('intro-screen').style.display = 'none';
  document.getElementById('game-container').style.display = 'block';
  startGame();
});

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
  textElement.innerText = textNode.text;

  // Clear previous options
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement("button");
      button.innerText = option.text;
      button.classList.add("btn");
      button.addEventListener("click", () => selectOption(option));
      optionButtonsElement.appendChild(button);
    }
  });
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {

  clickSound.play();

  const nextTextNodeId = option.nextText;

  // Check if the selected option is a victory condition
  if (nextTextNodeId === 11) { // "Throw the tablet at it" leads to victory
    showTextNode(nextTextNodeId);
    victorySound.play();

  
    setTimeout(() => {
      startGame();
    }, 20000);

    return;
  }

  // restart the game
  if (nextTextNodeId === -1) {
    return startGame();
  }

  state = Object.assign(state, option.setState);
  showTextNode(nextTextNodeId);
}

const textNodes = [
  {
    id: 1,
    text: "Standing outside Corpo, before you enter, you notice a hacking device on the ground.",
    options: [
      {
        text: "Take the hacking device",
        setState: { tablet: true },
        nextText: 2
      },
      {
        text: "Leave the hacking device",
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: "You venture on in search of answers and come across a gaurd outside Corpo",
    options: [
      {
        text: "Barder the hacking device for a laser gun",
        requiredState: (currentState) => currentState.tablet,
        setState: { tablet: false, laserGun: true },
        nextText: 3
      },
      {
        text: "Trade the hacking device for a deployable shield",
        requiredState: (currentState) => currentState.tablet,
        setState: { tablet: false, shield: true },
        nextText: 3
      },
      {
        text: "Ignore the gaurd",
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: "After leaving the gaurd you you look for a way to sneak in",
    options: [
      {
        text: "Enter through the sewage pipe",
        nextText: 4
      },
      {
        text: "Wait out front for a delivery truck and hide in the back",
        nextText: 5
      },
      {
        text: "Find a grassy patch to rest and sneak in at night",
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: "You are so tired that you fall asleep while exploring the outside of Corpo and are killed by an evil robot in your sleep.",
    options: [
      {
        text: "Restart",
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: "After sneaking into the delivery truck you notice the delivery is full of pillows for high council so you fall asleep only to be discovered when the delivery gaurd opens the back.",
    options: [
      {
        text: "Restart",
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: "You wake up well rested and full of energy ready to sneak into Corpo.",
    options: [
      {
        text: "Explore Corpo",
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: "While exploring Corpo you come across an evil robot in your path.",
    options: [
      {
        text: "Try to run",
        nextText: 8
      },
      {
        text: "Attack it with your laser gun",
        requiredState: (currentState) => currentState.laserGun,
        nextText: 9
      },
      {
        text: "Hide behind your shield",
        requiredState: (currentState) => currentState.shield,
        nextText: 10
      },
      {
        text: "Throw the tablet at it",
        requiredState: (currentState) => currentState.tablet,
        nextText: 11,
      }
    ]
  },
  {
    id: 8,
    text: "You havent been doing your cardio so you fail to out run the robot and it easily catches you",
    options: [
      {
        text: "Restart",
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: "You foolishly thought this robot could be destroyed with a single laser gun",
    options: [
      {
        text: "Restart",
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: "The robot laughed as you hid behind your shield and then crushes you.",
    options: [
      {
        text: "Restart",
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: "You threw your tablet at the robot. He steps on it like a lego and falls over. After the dust settled you saw the robot short circuted. Seeing your victory you decide to claim Corpo as yours and live out the rest of your days there.",
    options: [
      {
        text: "Victory! Play Again.",
        nextText: -1,
        victory: true

      }
    ]
  }
]


startGame();