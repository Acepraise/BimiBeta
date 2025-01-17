window.onload = function() {
    document.body.classList.add('loaded');
    loadDarkModeSetting(); // Load dark mode setting on load
    updateDarkModeButton(); // Update button text on load
    updateLanguage(); // Update language on load
    updateTheme(); // Update theme on load
    createChatContainer(); // Ensure chat container is created on load
    console.log('Chat container created on load');
};

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    updateDarkModeButton(); // Update button text when toggling dark mode
    saveDarkModeSetting(); // Save dark mode setting
}

function updateDarkModeButton() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (document.body.classList.contains('dark-mode')) {
        darkModeToggle.textContent = 'Dark Mode OFF';
    } else {
        darkModeToggle.textContent = 'Dark Mode ON';
    }
}

function saveDarkModeSetting() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
}

function loadDarkModeSetting() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

// Add event listener to the dark mode toggle button
document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);

function toggleToolbar() {
    const toolbarIcon = document.querySelector('.toolbar-icon i');
    const sidebar = document.querySelector('.sidebar');
    const header = document.querySelector('.header');
    const introMessage = document.querySelector('.intro-message');
    const inputArea = document.querySelector('.input-area');
    const chatContainer = document.querySelector('.chat-container');
    const messages = document.querySelectorAll('.message');
    const isSidebarOpen = sidebar.classList.contains('open');
    
    toolbarIcon.classList.toggle('fa-bars', isSidebarOpen);
    toolbarIcon.classList.toggle('fa-times', !isSidebarOpen); // Change to close icon
    sidebar.classList.toggle('open'); // Toggle sidebar visibility
    header.classList.toggle('open'); // Adjust header position
    introMessage.classList.toggle('open'); // Adjust intro message position
    inputArea.classList.toggle('open'); // Adjust input area position
    if (chatContainer) {
        chatContainer.classList.toggle('open'); // Adjust chat container position
    }
    messages.forEach(message => {
        message.classList.toggle('open'); // Adjust message position
    });
}

function toggleFAQ() {
    const faqDropdown = document.querySelector('.faq-dropdown');
    const faqContent = document.querySelector('.faq-content');
    faqDropdown.classList.toggle('open');
    faqContent.classList.toggle('open');
}

const translations = {
    en: {
        introMessage: "Hello Active Citizen",
        userInputPlaceholder: "Ask me anything...",
        darkModeToggle: "Dark Mode ON",
        signUp: "Sign Up",
        signIn: "Sign In",
        accessELearning: "Access eLearning",
        giveFeedback: "Give Feedback"
    },
    es: {
        introMessage: "Hola Ciudadano Activo",
        userInputPlaceholder: "Pregúntame cualquier cosa...",
        darkModeToggle: "Modo Oscuro ON",
        signUp: "Regístrate",
        signIn: "Iniciar Sesión",
        accessELearning: "Acceder a eLearning",
        giveFeedback: "Dar Retroalimentación"
    },
    fr: {
        introMessage: "Bonjour Citoyen Actif",
        userInputPlaceholder: "Demandez-moi n'importe quoi...",
        darkModeToggle: "Mode Sombre ON",
        signUp: "S'inscrire",
        signIn: "Se Connecter",
        accessELearning: "Accéder à eLearning",
        giveFeedback: "Donner des Commentaires"
    }
};

function updateLanguage() {
    const languageSelect = document.getElementById('language');
    const selectedLanguage = languageSelect.value;
    const translation = translations[selectedLanguage];

    document.querySelector('.intro-message').textContent = translation.introMessage;
    document.getElementById('userInput').placeholder = translation.userInputPlaceholder;
    document.getElementById('darkModeToggle').textContent = translation.darkModeToggle;
    const sidebarLinks = document.querySelectorAll('.sidebar a');
    sidebarLinks[0].textContent = translation.signUp;
    sidebarLinks[1].textContent = translation.signIn;
    sidebarLinks[2].textContent = translation.accessELearning;
    sidebarLinks[3].textContent = translation.giveFeedback;
}

function updateTheme() {
    const themeSelect = document.getElementById('theme');
    const selectedTheme = themeSelect.value;
    if (selectedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

function applySettings() {
    updateLanguage();
    const aiFeaturesEnabled = document.getElementById('aiFeatures').checked;
    const responseSpeed = document.getElementById('responseSpeed').value;
    // Apply AI features and response speed settings
    console.log(`AI Features Enabled: ${aiFeaturesEnabled}`);
    console.log(`Response Speed: ${responseSpeed}`);
    updateTheme(); // Apply theme settings
    showModal(); // Show confirmation modal
}

function showModal() {
    const modal = document.getElementById('confirmationModal');
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('confirmationModal');
    modal.style.display = 'none';
}

function showChat(messageText, isUser = true) {
    let chatContainer = document.querySelector('.chat-container');
    if (!chatContainer) {
        createChatContainer();
        chatContainer = document.querySelector('.chat-container');
    }

    console.log('Appending message to chat container:', messageText);

    const chatMessage = document.createElement('div');
    chatMessage.className = `message ${isUser ? 'user' : 'ai'}`;

    if (!isUser) {
        const avatar = document.createElement('img');
        avatar.src = 'assets/bimi.png';
        avatar.alt = 'Bimi Avatar';
        avatar.className = 'avatar';
        chatMessage.appendChild(avatar);
    }

    const messageTextNode = document.createElement('span');
    messageTextNode.textContent = messageText;
    chatMessage.appendChild(messageTextNode);

    chatContainer.appendChild(chatMessage);
    chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to the bottom to show the latest message
}

function createChatContainer() {
    const body = document.querySelector('body');
    const chatContainer = document.createElement('div');
    chatContainer.className = 'chat-container'; // Add class for dark mode styling and toggling
    chatContainer.style.display = 'flex';
    chatContainer.style.flexDirection = 'column';
    chatContainer.style.alignItems = 'center';
    chatContainer.style.justifyContent = 'flex-start'; // Align items to the top
    chatContainer.style.width = '100vw'; // Full width
    chatContainer.style.height = '100vh'; // Full height
    chatContainer.style.position = 'fixed'; // Cover the entire window
    chatContainer.style.top = '0'; // Start from the top
    chatContainer.style.left = '0';
    chatContainer.style.zIndex = '0'; // Ensure it is behind other elements
    chatContainer.style.overflowY = 'auto'; // Add vertical scroll if content overflows
    chatContainer.style.paddingTop = '70px'; // Add padding to ensure background covers until the input area
    chatContainer.style.paddingBottom = '70px'; // Add padding to ensure background covers until the input area

    body.appendChild(chatContainer);
    console.log('Chat container created');
}

function sendMessage() {
    const userInput = document.getElementById('userInput');
    const messageText = userInput.value.trim();
    if (messageText === '') return;

    showChat(messageText); // Show user's message first

    userInput.value = ''; // Clear the input field

    // Simulate AI response
    setTimeout(() => {
        const aiResponse = generateAIResponse(messageText);
        showChat(aiResponse, false); // Show AI response after user's message
    }, 1000); // Delay for 1 second
}

function generateAIResponse(userMessage) {
    // Generate a meaningful AI response based on the user message
    return `I'm here to help you with "${userMessage}". What else can I assist you with?`;
}

function handleKeyDown(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function startNewChat() {
    window.location.href = 'index.html'; // Redirect to the homepage
}

function startChatFromFAQ(event) {
    const faqText = event.target.textContent;
    showChat(faqText);

    // Simulate AI response
    setTimeout(() => {
        const aiResponse = generateAIResponse(faqText);
        showChat(aiResponse, false);
    }, 1000); // Delay for 1 second
}

// Add event listeners to FAQ items
document.querySelectorAll('.faq-content a').forEach(faqItem => {
    faqItem.addEventListener('click', startChatFromFAQ);
});

// Add event listener to the language select dropdown
document.getElementById('language').addEventListener('change', updateLanguage);

// Add event listener to the apply settings button
document.getElementById('applySettings').addEventListener('click', applySettings);

// Add event listener to the theme select dropdown
document.getElementById('theme').addEventListener('change', updateTheme);
