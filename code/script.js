// DOM selectors
const chat = document.getElementById('chat');
const form = document.getElementById('name-form');
const input = document.getElementById('name-input');

// Functions goes here 👇

// A function that will add a chat bubble in the correct place based on who the sender is
const showMessage = (message, sender) => {
  // The if statement checks if the sender is the user and if that's the case it inserts
  // an HTML section inside the chat with the posted message from the user
  if (sender === 'user') {
    chat.innerHTML += `
      <section class="user-msg">
        <div class="bubble user-bubble">
          <p>${message}</p>
        </div>
        <img src="assets/user.png" alt="User" />  
      </section>
    `
    // The else if statement checks if the sender is the bot and if that's the case it inserts
    // an HTML section inside the chat with the posted message from the bot
  } else if (sender === 'bot') {
    chat.innerHTML += `
      <section class="bot-msg">
        <img src="assets/bot.png" alt="Bot" />
        <div class="bubble bot-bubble">
          <p>${message}</p>
        </div>
      </section>
    `
  }

  // Scroll to the latest message
  chat.scrollTop = chat.scrollHeight
}

// A function(greeting) to start the conversation
const greetUser = () => {
  // Here we call the function showMessage, that we declared earlier with the argument:
  // "Hello there, what's your name?" for message, and the argument "bot" for sender
  showMessage("Hello there, what's your name?", 'bot')
  // Just to check it out, change 'bot' to 'user' here 👆 and see what happens
}

const handleNameInput = (name) => {
  showMessage(`Nice to meet you, ${name}! What can I help you with today?`, 'bot');
};

// Respond to follow-up messages
const handleUserInput = (message) => {
  if (message.toLowerCase().includes('weather')) {
    showMessage("I can't predict the weather, but it's always a good day for a chat!", 'bot');
  } else if (message.toLowerCase().includes('time')) {
    const currentTime = new Date().toLocaleTimeString();
    showMessage(`The current time is ${currentTime}.`, 'bot');
  } else {
    showMessage("I'm still learning! Ask me about the weather or time.", 'bot');
  }
};

// Eventlisteners goes here 👇
// Event listener for the form submission
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent form from refreshing the page

  const userMessage = input.value.trim();
  if (userMessage) {
    showMessage(userMessage, 'user'); // Show user message

    if (!chat.dataset.nameSet) {
      chat.dataset.nameSet = 'true'; // Mark that the name has been set
      handleNameInput(userMessage); // Handle name input
    } else {
      handleUserInput(userMessage); // Handle follow-up input
    }

    input.value = ''; // Clear input field
  }
});



// Here we invoke the first function to get the chatbot to ask the first question when
// the website is loaded. Normally we invoke functions like this: greeting()
// To add a little delay to it, we can wrap it in a setTimeout (a built in JavaScript function):
// and pass along two arguments:
// 1.) the function we want to delay, and 2.) the delay in milliseconds 
// This means the greeting function will be called one second after the website is loaded.
setTimeout(greetUser, 1000)
