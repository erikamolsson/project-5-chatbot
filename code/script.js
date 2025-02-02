// DOM selectors
const chat = document.getElementById('chat');
const form = document.getElementById('name-form');
const input = document.getElementById('name-input');
const inputWrapper = document.getElementById('input-wrapper');

// Variables to track user choices
let userName = "";
let step = 1;
let typeOfFood = "";
let chooseFoodSub = "";
let userAge = 0;

// Function to display messages
const showMessage = (message, sender) => {
  if (sender === 'user') {
    chat.innerHTML += `
      <section class="user-msg">
        <div class="bubble user-bubble">
          <p>${message}</p>
        </div>
        <img src="assets/user.png" alt="User" />  
      </section>
    `;
  } else {
    chat.innerHTML += `
      <section class="bot-msg">
        <img src="assets/bot.png" alt="Bot" />
        <div class="bubble bot-bubble">
          <p>${message}</p>
        </div>
      </section>
    `;
  }
  chat.scrollTop = chat.scrollHeight;
};

// Function to generate option buttons
const showOptions = (options, stepIndex) => {
  inputWrapper.innerHTML = '';
  options.forEach(option => {
    const button = document.createElement('button');
    button.textContent = option.text;
    button.classList.add('option-button');
    button.addEventListener('click', () => handleInput(option.value));
    inputWrapper.appendChild(button);
  });
};

// Function to start the chatbot
const startChat = () => {
  showMessage("Welcome to our Javascript Pizzeria. Ready to start? What's your name?", 'bot');
};

// Function to handle input based on step
const handleInput = (userMessage) => {
  if (step === 1) {
    userName = userMessage;
    showMessage(`Hello, ${userName}!`, 'bot');
    setTimeout(() => {
      showMessage("What type of food would you like to order?", 'bot');
      showOptions([
        { text: "Pizza", value: "1" },
        { text: "Pasta", value: "2" },
        { text: "Salad", value: "3" }
      ], step);
    }, 1000);
    step++;
  } else if (step === 2) {
    const foodTypes = { "1": "Pizza", "2": "Pasta", "3": "Salad" };
    typeOfFood = foodTypes[userMessage];
    showMessage(`You have chosen ${typeOfFood}!`, 'bot');
    
    const foodOptions = {
      "Pizza": ["Margaritha", "Hawaii", "Vesuvio"],
      "Pasta": ["Bolognese", "Puttanesca", "Carbonara"],
      "Salad": ["Greek", "Shrimp", "Falafel"]
    };
    
    setTimeout(() => {
      showMessage(`What type of ${typeOfFood.toLowerCase()} do you want?`, 'bot');
      showOptions(foodOptions[typeOfFood].map((item, index) => ({ text: item, value: (index + 1).toString() })), step);
    }, 1000);
    step++;
  } else if (step === 3) {
    const selectedFoodOptions = {
      "Pizza": ["Margaritha", "Hawaii", "Vesuvio"],
      "Pasta": ["Bolognese", "Puttanesca", "Carbonara"],
      "Salad": ["Greek Salad", "Shrimp Salad", "Falafel Salad"]
    };
    chooseFoodSub = selectedFoodOptions[typeOfFood][parseInt(userMessage) - 1];
    showMessage(`You have chosen ${chooseFoodSub}!`, 'bot');
    setTimeout(() => {
      showMessage("Do you want to order a kids or an adult meal? Enter your age below:", 'bot');
      inputWrapper.innerHTML = '<input id="age-input" type="number" placeholder="Enter your age" />';
      const ageInput = document.getElementById('age-input');
      ageInput.addEventListener('change', () => handleInput(ageInput.value));
    }, 1000);
    step++;
  } else if (step === 4) {
    userAge = parseInt(userMessage);
    if (!isNaN(userAge)) {
      if (userAge <= 12) {
        showMessage(`You want to order a kids-sized portion of our ${chooseFoodSub}!`, 'bot');
      } else {
        showMessage(`You want to order an adult-sized portion of our ${chooseFoodSub}!`, 'bot');
      }
      setTimeout(() => {
        showMessage("Do you want to confirm your order?", 'bot');
        showOptions([
          { text: "Yes", value: "1" },
          { text: "No", value: "2" }
        ], step);
      }, 1000);
      step++;
    } else {
      showMessage("Please enter a valid age.", 'bot');
    }
  } else if (step === 5) {
    if (userMessage === "1") {
      showMessage("Thank you for your order at JavaScript Pizzeria. It will be ready and on its way in 15-20 minutes!", 'bot');
    } else {
      showMessage("You have declined your order. But JavaScript Pizzeria will be open for you if you change your mind. Hope to see you soon!", 'bot');
    }
  }
};

// Event listener for the form submission
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const userMessage = input.value.trim();
  if (userMessage) {
    showMessage(userMessage, 'user');
    handleInput(userMessage);
    input.value = '';
  }
});

// Start chatbot on load
setTimeout(startChat, 1000);
