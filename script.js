window.onload = function() {
    document.body.classList.add('loaded');
    updateDarkModeButton(); // Update button text on load
    updateLanguage(); // Update language on load
};

const backgroundImages = [
    'assets/bg1.jpg', // Image 1
    'assets/bg4.jpg', // Image 2
    'assets/bg5.jpg', // Image 3
];

let currentIndex = 0;

function changeBackground() {
    // Set the next background image
    document.body.style.backgroundImage = `url(${backgroundImages[currentIndex]})`;

    // Update index, loop back to the first image if it's the last one
    currentIndex = (currentIndex + 1) % backgroundImages.length;
}

// Call the changeBackground function every 5 seconds (5000ms)
setInterval(changeBackground, 5000);

// Initially set the first background image
changeBackground();

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    updateDarkModeButton(); // Update button text when toggling dark mode
}

function updateDarkModeButton() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (document.body.classList.contains('dark-mode')) {
        darkModeToggle.textContent = 'Dark Mode OFF';
    } else {
        darkModeToggle.textContent = 'Dark Mode ON';
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
    const isSidebarOpen = sidebar.classList.contains('open');
    
    toolbarIcon.classList.toggle('fa-bars', isSidebarOpen);
    toolbarIcon.classList.toggle('fa-times', !isSidebarOpen); // Change to close icon
    sidebar.classList.toggle('open'); // Toggle sidebar visibility
    header.classList.toggle('open'); // Adjust header position
    introMessage.classList.toggle('open'); // Adjust intro message position
    inputArea.classList.toggle('open'); // Adjust input area position
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

function applySettings() {
    updateLanguage();
    const aiFeaturesEnabled = document.getElementById('aiFeatures').checked;
    const responseSpeed = document.getElementById('responseSpeed').value;
    // Apply AI features and response speed settings
    console.log(`AI Features Enabled: ${aiFeaturesEnabled}`);
    console.log(`Response Speed: ${responseSpeed}`);
    alert('Settings applied successfully!');
}

// Add event listener to the language select dropdown
document.getElementById('language').addEventListener('change', updateLanguage);

// Add event listener to the apply settings button
document.getElementById('applySettings').addEventListener('click', applySettings);
