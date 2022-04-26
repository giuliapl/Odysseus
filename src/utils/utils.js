const obstaclesIcons = [
   require('../assets/icons/cyclop.png'),
   require('../assets/icons/mermaid.png'),
   require('../assets/icons/witch.png')
];

function randomIntFromInterval(min, max) { // min and max included 
   return Math.floor(Math.random() * (max - min + 1) + min)
}

const getRandomIcon = () => {
   let randomIndex = Math.floor(Math.random() * obstaclesIcons.length);
   return obstaclesIcons[randomIndex];
}

function setUser(username, navigate, path) {
   if (username !== '') {
      navigate(path, {
         state: {
            currentUser: username
         }
      });
   }
   else {
      alert('Please choose a valid username');
   }
}

export {
   obstaclesIcons,
   randomIntFromInterval,
   getRandomIcon,
   setUser
}