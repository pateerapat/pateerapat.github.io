const SECRET = 'T11 => 7fcc0035-4cdf-448d-83c8-8bbb5ae01ad7'
const LEVEL_LIST = ['1', '2', '3', '4', 'T']
let currentLevel = 0

document.addEventListener('DOMContentLoaded', function() {
  // Initialize the light div
  const light = document.createElement('div');
  light.classList.add('light'); // Use this class for styling the light
  light.style.position = 'absolute';
  light.style.borderRadius = '50%';
  light.style.width = '200px'; // Light diameter
  light.style.height = '200px';
  light.style.pointerEvents = 'none';
  document.body.appendChild(light);

  // Function to move the light with the mouse
  document.addEventListener('mousemove', function(e) {
    light.style.left = e.pageX - 100 + 'px'; // Centers the light on the cursor
    light.style.top = e.pageY - 100 + 'px';

    const lightX = e.pageX;
    const lightY = e.pageY;
    const character = document.getElementById('character');
    const characterRect = character.getBoundingClientRect();
    const lightRadius = 100; // Adjust based on your light source size
    const characterCenterX = characterRect.left + (characterRect.width / 2);
    const characterCenterY = characterRect.top + (characterRect.height / 2);

    // Check if the light overlaps with the character
    if (Math.abs(lightX - characterCenterX) < lightRadius && Math.abs(lightY - characterCenterY) < lightRadius) {
      character.style.opacity = 1; // Fully visible
    } else {
      character.style.opacity = 0; // Fully transparent
    }
  });

  function createCharacterWithRandomPosition() {
    if (currentLevel == 5) {
      alert('You are all set my darling!')
      const gameArea = document.getElementById('game_area');
      gameArea.id = 'congrat'
      gameArea.innerHTML = SECRET
      gameArea.style.background = 'white'
      return
    }
    const character = document.createElement('div');
    character.id = 'character'
    character.innerHTML = LEVEL_LIST[currentLevel]
    const gameArea = document.getElementById('game_area');
    const maxX = gameArea.clientWidth - character.clientWidth;
    const maxY = gameArea.clientHeight - character.clientHeight;
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    character.style.left = randomX + 'px';
    character.style.top = randomY + 'px';

    character.addEventListener('click', function() {
      removeExistCharacter()
      setTimeout(() => {
        createCharacterWithRandomPosition()
      }, 500); // Reappear with a delay for a smooth transition
    });

    gameArea.appendChild(character)
    currentLevel++
  }

  function removeExistCharacter() {
    const character = document.getElementById('character');
    character.remove()
  }

  // Initial random position for the character
  createCharacterWithRandomPosition();
});
