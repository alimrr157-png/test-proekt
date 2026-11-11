[
  {
    "name": "",
    "age": 0,
    "photo": "url"
  },
  {
    "name": "",
    "age": 0,
    "photo": "url"
  },
  {
    "name": "",
    "age": 0,
    "photo": "url"
  }
]
function validateEmail(email) {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(email);
}
function moveBlock(position = 0) {
    const smallBlock = document.querySelector(".small-block"); 
    
    if (!smallBlock) return; 

    
    position += 2;
    smallBlock.style.left = `${position}px`;

    
    if (position < 300) {
        
        setTimeout(() => {
            moveBlock(position);
        }, 20); 
    }
}

