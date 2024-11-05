const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  });
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: "Standing outside Corpo before you enter you notice a hacking device on the ground.",
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
    text: 'You venture on in search of answers you come across a gaurd outside Corpo',
    options: [
      {
        text: 'Barder the hacking device for a Laser Gun',
        requiredState: (currentState) => currentState.tablet,
        setState: { tablet: false, laserGun: true },
        nextText: 3
      },
      {
        text: 'Trade the hacking device for a deployable shield',
        requiredState: (currentState) => currentState.tablet,
        setState: { tablet: false, shield: true },
        nextText: 3
      },
      {
        text: 'Ignore the gaurd',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'After leaving the gaurd you you look for a way to sneak in.',
    options: [
      {
        text: 'Enter through the sewage pipe',
        nextText: 4
      },
      {
        text: 'Wait out front for a delivery truck and hide in the back',
        nextText: 5
      },
      {
        text: 'Find a grassy patch to rest and sneak at night',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'You are so tired that you fall asleep while exploring the outside Corpo and are killed by some evil robot in your sleep.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: "After sneaking into the delivery truck you notice the delivery is full of pillows for high council so you fall asleep only to be discovered when the delivery gaurd opens the back.",
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'You wake up well rested and full of energy ready to sneak into Corpo.',
    options: [
      {
        text: 'Explore Corpo',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'While exploring Corpo you come across a evil robot in your path.',
    options: [
      {
        text: 'Try to run',
        nextText: 8
      },
      {
        text: 'Attack it with your laser gun',
        requiredState: (currentState) => currentState.laserGun,
        nextText: 9
      },
      {
        text: 'Hide behind your shield',
        requiredState: (currentState) => currentState.shield,
        nextText: 10
      },
      {
        text: 'Throw the tablet at it',
        requiredState: (currentState) => currentState.tablet,
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'You havent been doing your cardio so you fail to out run the robot and it easily catches.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'You foolishly thought this robot could be destroyed with a single laser gun.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'The monster laughed as you hid behind your shield and crushes you.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'You threw your tablet at the robot and he steps on it like a lego and falls over. After the dust settled you saw the robot short circuted. Seeing your victory you decide to claim Corpo as your and live out the rest of your days there.',
    options: [
      {
        text: 'Congratulations. Play Again.',
        nextText: -1
      }
    ]
  }
]


startGame()