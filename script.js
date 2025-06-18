// Global Variables
let currentModule = null;
let currentLessonIndex = 0;
let userProgress = {
    beginner: { completed: 0, total: 20, xp: 0 },
    intermediate: { completed: 0, total: 25, xp: 0 },
    advanced: { completed: 0, total: 30, xp: 0 },
    overall: { xp: 0, streak: 0, lessonsCompleted: 0 }
};
let soundEnabled = true;
let achievements = {
    firstLesson: false,
    perfectScore: false,
    weekStreak: false
};

// User Authentication Variables
let currentUser = null;
let users = [];

// Dark Mode Variables
let darkMode = false;

// Learning Goals Variables
let learningGoals = [
    {
        id: 1,
        text: "Complete 5 lessons",
        type: "lessons",
        target: 5,
        current: 3,
        completed: false
    },
    {
        id: 2,
        text: "Maintain a 3-day streak",
        type: "streak",
        target: 3,
        current: 1,
        completed: false
    },
    {
        id: 3,
        text: "Earn 100 XP",
        type: "xp",
        target: 100,
        current: 45,
        completed: false
    },
    {
        id: 4,
        text: "Complete Beginner Module",
        type: "module",
        target: 1,
        current: 1,
        completed: true
    }
];

let nextGoalId = 5;

// Lesson Data
const lessonData = {
    beginner: [
        {
            title: "Basic Greetings",
            type: "multiple-choice",
            question: "How do you say 'Hello' in Spanish?",
            options: ["Hola", "Adiós", "Gracias", "Por favor"],
            correct: 0,
            explanation: "¡Hola! is the most common way to say hello in Spanish."
        },
        {
            title: "Numbers 1-10",
            type: "multiple-choice",
            question: "What is the Spanish word for 'five'?",
            options: ["Tres", "Cuatro", "Cinco", "Seis"],
            correct: 2,
            explanation: "Cinco means five in Spanish."
        },
        {
            title: "Colors",
            type: "multiple-choice",
            question: "What color is 'rojo'?",
            options: ["Blue", "Red", "Green", "Yellow"],
            correct: 1,
            explanation: "Rojo means red in Spanish."
        },
        {
            title: "Family Members",
            type: "fill-blank",
            question: "Complete: 'Mi _____ se llama María' (My mother is called María)",
            answer: "madre",
            hint: "Think of the word for mother in Spanish",
            explanation: "Madre means mother in Spanish."
        },
        {
            title: "Days of the Week",
            type: "drag-drop",
            question: "Arrange the days of the week in order:",
            items: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
            explanation: "These are the days of the week in Spanish: Monday to Sunday."
        }
    ],
    intermediate: [
        {
            title: "Present Tense Verbs",
            type: "multiple-choice",
            question: "What is the correct form of 'hablar' (to speak) for 'yo'?",
            options: ["Hablas", "Hablo", "Habla", "Hablan"],
            correct: 1,
            explanation: "Yo hablo means 'I speak' in Spanish."
        },
        {
            title: "Ser vs Estar",
            type: "multiple-choice",
            question: "Which verb would you use to say 'I am happy'?",
            options: ["Ser", "Estar", "Both", "Neither"],
            correct: 1,
            explanation: "Estar is used for temporary states like emotions."
        },
        {
            title: "Question Words",
            type: "fill-blank",
            question: "Complete: '¿_____ es tu nombre?' (What is your name?)",
            answer: "cuál",
            hint: "This question word asks for a choice or selection",
            explanation: "¿Cuál es tu nombre? means 'What is your name?'"
        },
        {
            title: "Weather Expressions",
            type: "multiple-choice",
            question: "How do you say 'It's sunny' in Spanish?",
            options: ["Hace frío", "Hace sol", "Llueve", "Está nublado"],
            correct: 1,
            explanation: "Hace sol means 'It's sunny' in Spanish."
        }
    ],
    advanced: [
        {
            title: "Subjunctive Mood",
            type: "multiple-choice",
            question: "Which form is correct: 'Espero que tú _____ bien' (I hope you are well)?",
            options: ["Estás", "Estés", "Estabas", "Estarás"],
            correct: 1,
            explanation: "The subjunctive form 'estés' is used after 'espero que'."
        },
        {
            title: "Idiomatic Expressions",
            type: "multiple-choice",
            question: "What does 'Tener ganas de' mean?",
            options: ["To be tired", "To feel like", "To be hungry", "To be angry"],
            correct: 1,
            explanation: "Tener ganas de means 'to feel like' doing something."
        },
        {
            title: "Complex Grammar",
            type: "fill-blank",
            question: "Complete: 'Si _____ tiempo, iría al cine' (If I had time, I would go to the movies)",
            answer: "tuviera",
            hint: "This is the imperfect subjunctive form of 'tener'",
            explanation: "Tuviera is the imperfect subjunctive form of 'tener'."
        }
    ]
};

// AI Chat Responses
const aiResponses = {
    greetings: [
        "¡Hola! ¿Cómo estás?",
        "¡Buenos días! ¿Qué tal?",
        "¡Hola! ¿Cómo va tu día?",
        "¡Saludos! ¿Todo bien?"
    ],
    questions: [
        "¿Puedes repetir eso más despacio?",
        "¿Qué quieres decir exactamente?",
        "¿Podrías explicar eso de otra manera?",
        "No entiendo completamente, ¿puedes aclarar?"
    ],
    encouragement: [
        "¡Excelente! Tu español está mejorando mucho.",
        "¡Muy bien! Sigues así.",
        "¡Perfecto! Estás progresando muy bien.",
        "¡Genial! Cada día aprendes más."
    ],
    corrections: [
        "Casi correcto, pero sería mejor decir...",
        "Buena intento, pero la forma correcta es...",
        "Estás cerca, pero la palabra correcta es...",
        "Casi lo tienes, pero se dice..."
    ]
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadUsers();
    checkAuthStatus();
    loadProgress();
    loadGoals();
    loadDarkMode();
    updateUI();
    updateGoalsDisplay();
    initializeAnimations();
    setupAuthForms();
});

// Authentication Functions
function setupAuthForms() {
    // Login form
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        login();
    });

    // Signup form
    document.getElementById('signupForm').addEventListener('submit', function(e) {
        e.preventDefault();
        signup();
    });

    // Settings form
    document.getElementById('settingsForm').addEventListener('submit', function(e) {
        e.preventDefault();
        updateSettings();
    });
}

function openLoginModal() {
    const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
    loginModal.show();
}

function openSignupModal() {
    const signupModal = new bootstrap.Modal(document.getElementById('signupModal'));
    signupModal.show();
}

function openSettingsModal() {
    if (!currentUser) return;
    
    document.getElementById('settingsName').value = currentUser.name;
    document.getElementById('settingsEmail').value = currentUser.email;
    document.getElementById('darkModeSetting').checked = darkMode;
    
    const settingsModal = new bootstrap.Modal(document.getElementById('settingsModal'));
    settingsModal.show();
}

function switchToSignup() {
    bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
    openSignupModal();
}

function switchToLogin() {
    bootstrap.Modal.getInstance(document.getElementById('signupModal')).hide();
    openLoginModal();
}

function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        if (rememberMe) {
            localStorage.setItem('rememberedUser', JSON.stringify({ email: user.email }));
        }
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
        updateAuthUI();
        loadUserProgress();
        loadDarkMode();
        updateUI();
        updateGoalsDisplay();
        showNotification('Welcome back, ' + user.name + '!', 'success');
    } else {
        showNotification('Invalid email or password', 'error');
    }
}

function signup() {
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;

    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }

    if (!agreeTerms) {
        showNotification('Please agree to the Terms of Service', 'error');
        return;
    }

    if (users.find(u => u.email === email)) {
        showNotification('Email already registered', 'error');
        return;
    }

    const newUser = {
        id: Date.now().toString(),
        name: name,
        email: email,
        password: password,
        createdAt: new Date().toISOString(),
        progress: {
            beginner: { completed: 0, total: 20, xp: 0 },
            intermediate: { completed: 0, total: 25, xp: 0 },
            advanced: { completed: 0, total: 30, xp: 0 },
            overall: { xp: 0, streak: 0, lessonsCompleted: 0 }
        },
        achievements: {
            firstLesson: false,
            perfectScore: false,
            weekStreak: false
        },
        settings: {
            soundEnabled: true,
            darkMode: false
        }
    };

    users.push(newUser);
    saveUsers();
    
    currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    bootstrap.Modal.getInstance(document.getElementById('signupModal')).hide();
    updateAuthUI();
    loadDarkMode();
    updateUI();
    updateGoalsDisplay();
    showNotification('Account created successfully! Welcome to EspanolPro!', 'success');
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('rememberedUser');
    
    // Reset to default progress
    userProgress = {
        beginner: { completed: 0, total: 20, xp: 0 },
        intermediate: { completed: 0, total: 25, xp: 0 },
        advanced: { completed: 0, total: 30, xp: 0 },
        overall: { xp: 0, streak: 0, lessonsCompleted: 0 }
    };
    achievements = {
        firstLesson: false,
        perfectScore: false,
        weekStreak: false
    };
    
    // Reset dark mode to default
    darkMode = false;
    applyDarkMode();
    updateDarkModeUI();
    
    updateAuthUI();
    updateUI();
    showNotification('Logged out successfully', 'info');
}

function updateSettings() {
    if (!currentUser) return;

    const newName = document.getElementById('settingsName').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmNewPassword = document.getElementById('confirmNewPassword').value;
    const newDarkMode = document.getElementById('darkModeSetting').checked;

    if (newPassword && newPassword !== confirmNewPassword) {
        showNotification('New passwords do not match', 'error');
        return;
    }

    // Update user data
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex].name = newName;
        if (newPassword) {
            users[userIndex].password = newPassword;
        }
        if (!users[userIndex].settings) users[userIndex].settings = {};
        users[userIndex].settings.darkMode = newDarkMode;
        
        currentUser = users[userIndex];
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        saveUsers();
        
        // Apply dark mode change if needed
        if (darkMode !== newDarkMode) {
            darkMode = newDarkMode;
            applyDarkMode();
            updateDarkModeUI();
        }
        
        updateAuthUI();
        bootstrap.Modal.getInstance(document.getElementById('settingsModal')).hide();
        showNotification('Settings updated successfully', 'success');
    }
}

function checkAuthStatus() {
    const savedUser = localStorage.getItem('currentUser');
    const rememberedUser = localStorage.getItem('rememberedUser');
    
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        loadUserProgress();
        loadDarkMode();
        updateAuthUI();
    } else if (rememberedUser) {
        const remembered = JSON.parse(rememberedUser);
        const user = users.find(u => u.email === remembered.email);
        if (user) {
            currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            loadUserProgress();
            loadDarkMode();
            updateAuthUI();
        }
    }
}

function updateAuthUI() {
    const authButtons = document.getElementById('auth-buttons');
    const userMenu = document.getElementById('user-menu');
    const userName = document.getElementById('user-name');

    if (currentUser) {
        authButtons.classList.add('d-none');
        userMenu.classList.remove('d-none');
        userName.textContent = currentUser.name;
    } else {
        authButtons.classList.remove('d-none');
        userMenu.classList.add('d-none');
    }
}

function loadUserProgress() {
    if (currentUser) {
        userProgress = currentUser.progress;
        achievements = currentUser.achievements;
        soundEnabled = currentUser.settings.soundEnabled;
    }
}

function saveUserProgress() {
    if (currentUser) {
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        if (userIndex !== -1) {
            users[userIndex].progress = userProgress;
            users[userIndex].achievements = achievements;
            users[userIndex].settings.soundEnabled = soundEnabled;
            currentUser = users[userIndex];
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            saveUsers();
        }
    }
}

function loadUsers() {
    const savedUsers = localStorage.getItem('espanolProUsers');
    if (savedUsers) {
        users = JSON.parse(savedUsers);
    }
}

function saveUsers() {
    localStorage.setItem('espanolProUsers', JSON.stringify(users));
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function showTerms() {
    alert('Terms of Service:\n\n1. This is a demo application for learning purposes.\n2. Your data is stored locally in your browser.\n3. No real authentication or data persistence is implemented.\n4. This is a frontend-only demonstration.');
}

// Navigation and UI Functions
function startLearning() {
    document.getElementById('modules').scrollIntoView({ behavior: 'smooth' });
}

function openModule(moduleName) {
    currentModule = moduleName;
    currentLessonIndex = 0;
    loadLesson();
    const lessonModal = new bootstrap.Modal(document.getElementById('lessonModal'));
    lessonModal.show();
}

function loadLesson() {
    if (!currentModule || !lessonData[currentModule]) return;
    
    const lesson = lessonData[currentModule][currentLessonIndex];
    if (!lesson) return;
    
    document.getElementById('lessonTitle').textContent = `${currentModule.charAt(0).toUpperCase() + currentModule.slice(1)} - ${lesson.title}`;
    
    let content = '';
    
    switch (lesson.type) {
        case 'multiple-choice':
            content = createMultipleChoiceExercise(lesson);
            break;
        case 'fill-blank':
            content = createFillBlankExercise(lesson);
            break;
        case 'drag-drop':
            content = createDragDropExercise(lesson);
            break;
    }
    
    document.getElementById('lessonContent').innerHTML = content;
}

function createMultipleChoiceExercise(lesson) {
    let options = '';
    lesson.options.forEach((option, index) => {
        options += `
            <button class="option-btn" onclick="checkAnswer(${index}, ${lesson.correct})">
                ${option}
            </button>
        `;
    });
    
    return `
        <div class="exercise-card">
            <div class="exercise-question">${lesson.question}</div>
            <div class="options-list">
                ${options}
            </div>
            <div id="feedback" style="display: none;"></div>
        </div>
    `;
}

function createFillBlankExercise(lesson) {
    return `
        <div class="exercise-card">
            <div class="exercise-question">${lesson.question}</div>
            <div class="mb-3">
                <input type="text" id="fillBlankAnswer" class="form-control" placeholder="Type your answer...">
                <small class="text-muted">Hint: ${lesson.hint}</small>
            </div>
            <button class="btn btn-primary" onclick="checkFillBlankAnswer()">Check Answer</button>
            <div id="feedback" style="display: none;"></div>
        </div>
    `;
}

function createDragDropExercise(lesson) {
    let items = '';
    lesson.items.forEach((item, index) => {
        items += `<div class="drag-item" draggable="true" data-index="${index}">${item}</div>`;
    });
    
    return `
        <div class="exercise-card">
            <div class="exercise-question">${lesson.question}</div>
            <div class="drag-container">
                <div class="drag-area" id="dragArea">
                    ${items}
                </div>
            </div>
            <button class="btn btn-primary mt-3" onclick="checkDragDropAnswer()">Check Order</button>
            <div id="feedback" style="display: none;"></div>
        </div>
    `;
}

// Answer Checking Functions
function checkAnswer(selectedIndex, correctIndex) {
    const buttons = document.querySelectorAll('.option-btn');
    const feedback = document.getElementById('feedback');
    
    buttons.forEach(btn => btn.disabled = true);
    
    if (selectedIndex === correctIndex) {
        buttons[selectedIndex].classList.add('correct');
        feedback.innerHTML = `
            <div class="feedback-message feedback-correct">
                <i class="fas fa-check-circle"></i> ¡Correcto! ${lessonData[currentModule][currentLessonIndex].explanation}
            </div>
        `;
        awardXP(10);
        playSound('correct');
    } else {
        buttons[selectedIndex].classList.add('incorrect');
        buttons[correctIndex].classList.add('correct');
        feedback.innerHTML = `
            <div class="feedback-message feedback-incorrect">
                <i class="fas fa-times-circle"></i> Incorrecto. ${lessonData[currentModule][currentLessonIndex].explanation}
            </div>
        `;
        playSound('incorrect');
    }
    
    feedback.style.display = 'block';
    setTimeout(() => {
        nextLesson();
    }, 2000);
}

function checkFillBlankAnswer() {
    const userAnswer = document.getElementById('fillBlankAnswer').value.toLowerCase().trim();
    const correctAnswer = lessonData[currentModule][currentLessonIndex].answer.toLowerCase();
    const feedback = document.getElementById('feedback');
    
    if (userAnswer === correctAnswer) {
        feedback.innerHTML = `
            <div class="feedback-message feedback-correct">
                <i class="fas fa-check-circle"></i> ¡Correcto! ${lessonData[currentModule][currentLessonIndex].explanation}
            </div>
        `;
        awardXP(10);
        playSound('correct');
    } else {
        feedback.innerHTML = `
            <div class="feedback-message feedback-incorrect">
                <i class="fas fa-times-circle"></i> Incorrecto. La respuesta correcta es "${lessonData[currentModule][currentLessonIndex].answer}". ${lessonData[currentModule][currentLessonIndex].explanation}
            </div>
        `;
        playSound('incorrect');
    }
    
    feedback.style.display = 'block';
    setTimeout(() => {
        nextLesson();
    }, 3000);
}

function checkDragDropAnswer() {
    const dragItems = document.querySelectorAll('.drag-item');
    const correctOrder = lessonData[currentModule][currentLessonIndex].items;
    const feedback = document.getElementById('feedback');
    
    let isCorrect = true;
    dragItems.forEach((item, index) => {
        if (item.textContent !== correctOrder[index]) {
            isCorrect = false;
        }
    });
    
    if (isCorrect) {
        feedback.innerHTML = `
            <div class="feedback-message feedback-correct">
                <i class="fas fa-check-circle"></i> ¡Correcto! ${lessonData[currentModule][currentLessonIndex].explanation}
            </div>
        `;
        awardXP(15);
        playSound('correct');
    } else {
        feedback.innerHTML = `
            <div class="feedback-message feedback-incorrect">
                <i class="fas fa-times-circle"></i> Incorrecto. ${lessonData[currentModule][currentLessonIndex].explanation}
            </div>
        `;
        playSound('incorrect');
    }
    
    feedback.style.display = 'block';
    setTimeout(() => {
        nextLesson();
    }, 3000);
}

function nextLesson() {
    currentLessonIndex++;
    
    if (currentLessonIndex >= lessonData[currentModule].length) {
        // Module completed
        completeModule();
        const lessonModal = bootstrap.Modal.getInstance(document.getElementById('lessonModal'));
        lessonModal.hide();
        showCompletionMessage();
    } else {
        loadLesson();
    }
}

function completeModule() {
    userProgress[currentModule].completed++;
    userProgress.overall.lessonsCompleted++;
    awardXP(50); // Bonus for completing module
    
    if (!achievements.firstLesson) {
        unlockAchievement('firstLesson');
    }
    
    // Update goal progress
    updateGoalProgress();
    
    saveProgress();
    updateUI();
}

function awardXP(amount) {
    userProgress[currentModule].xp += amount;
    userProgress.overall.xp += amount;
    
    // Check for achievements
    if (userProgress.overall.xp >= 100 && !achievements.perfectScore) {
        unlockAchievement('perfectScore');
    }
    
    // Update goal progress
    updateGoalProgress();
    
    saveProgress();
    updateUI();
}

// Progress and Achievement Functions
function unlockAchievement(achievementName) {
    achievements[achievementName] = true;
    
    const achievementElement = document.querySelector(`[data-achievement="${achievementName}"]`);
    if (achievementElement) {
        achievementElement.classList.remove('locked');
        achievementElement.classList.add('unlocked');
        achievementElement.innerHTML = `
            <i class="fas fa-trophy"></i>
            <span>${getAchievementText(achievementName)}</span>
        `;
    }
    
    showAchievementNotification(achievementName);
}

function getAchievementText(achievementName) {
    const texts = {
        firstLesson: 'First Lesson',
        perfectScore: 'Perfect Score',
        weekStreak: 'Week Streak'
    };
    return texts[achievementName] || achievementName;
}

function showAchievementNotification(achievementName) {
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
        <i class="fas fa-trophy"></i>
        <span>Achievement Unlocked: ${getAchievementText(achievementName)}!</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// AI Chat Functions
function openAIChat() {
    const aiChatModal = new bootstrap.Modal(document.getElementById('aiChatModal'));
    aiChatModal.show();
}

function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    addChatMessage(message, 'user');
    input.value = '';
    
    // Generate AI response
    setTimeout(() => {
        const aiResponse = generateAIResponse(message);
        addChatMessage(aiResponse, 'ai');
    }, 1000);
}

function addChatMessage(text, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.innerHTML = `
        <div class="message-content">
            ${text}
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateAIResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Simple AI logic
    if (message.includes('hola') || message.includes('hello')) {
        return getRandomResponse(aiResponses.greetings);
    } else if (message.includes('?') || message.includes('qué') || message.includes('como')) {
        return getRandomResponse(aiResponses.questions);
    } else if (message.includes('gracias') || message.includes('thanks')) {
        return getRandomResponse(aiResponses.encouragement);
    } else {
        return getRandomResponse(aiResponses.corrections) + " '" + userMessage + "'";
    }
}

function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
}

// Utility Functions
function updateUI() {
    // Update progress bars
    Object.keys(userProgress).forEach(module => {
        if (module !== 'overall') {
            const progress = (userProgress[module].completed / userProgress[module].total) * 100;
            const progressBar = document.querySelector(`.module-card.${module} .progress-bar`);
            const progressText = document.querySelector(`.module-card.${module} .progress-text`);
            
            if (progressBar && progressText) {
                progressBar.style.width = `${progress}%`;
                progressText.textContent = `${Math.round(progress)}% Complete`;
            }
        }
    });
    
    // Update overall progress
    const totalLessons = Object.values(userProgress).reduce((sum, module) => {
        return module !== 'overall' ? sum + module.total : sum;
    }, 0);
    const completedLessons = Object.values(userProgress).reduce((sum, module) => {
        return module !== 'overall' ? sum + module.completed : sum;
    }, 0);
    
    const overallProgress = (completedLessons / totalLessons) * 100;
    const progressCircle = document.querySelector('.progress-circle');
    const progressPercentage = document.querySelector('.progress-percentage');
    
    if (progressCircle && progressPercentage) {
        progressCircle.style.background = `conic-gradient(var(--primary-color) ${overallProgress * 3.6}deg, #e9ecef ${overallProgress * 3.6}deg)`;
        progressPercentage.textContent = `${Math.round(overallProgress)}%`;
    }
    
    // Update stats
    const statValues = document.querySelectorAll('.stat-value');
    if (statValues.length >= 3) {
        statValues[0].textContent = userProgress.overall.streak;
        statValues[1].textContent = userProgress.overall.xp;
        statValues[2].textContent = userProgress.overall.lessonsCompleted;
    }
    
    // Update achievements display
    updateAchievementsDisplay();
}

function updateAchievementsDisplay() {
    const achievementItems = document.querySelectorAll('.achievement-item');
    achievementItems.forEach(item => {
        const achievementName = item.getAttribute('data-achievement');
        if (achievements[achievementName]) {
            item.classList.remove('locked');
            item.classList.add('unlocked');
            item.innerHTML = `
                <i class="fas fa-trophy"></i>
                <span>${getAchievementText(achievementName)}</span>
            `;
        } else {
            item.classList.add('locked');
            item.classList.remove('unlocked');
            item.innerHTML = `
                <i class="fas fa-lock"></i>
                <span>${getAchievementText(achievementName)}</span>
            `;
        }
    });
}

function saveProgress() {
    if (currentUser) {
        saveUserProgress();
    } else {
        localStorage.setItem('espanolProProgress', JSON.stringify(userProgress));
        localStorage.setItem('espanolProAchievements', JSON.stringify(achievements));
    }
}

function loadProgress() {
    if (currentUser) {
        loadUserProgress();
    } else {
        const savedProgress = localStorage.getItem('espanolProProgress');
        const savedAchievements = localStorage.getItem('espanolProAchievements');
        
        if (savedProgress) {
            userProgress = JSON.parse(savedProgress);
        }
        
        if (savedAchievements) {
            achievements = JSON.parse(savedAchievements);
        }
    }
}

function resetProgress() {
    if (confirm('Are you sure you want to reset all your progress? This cannot be undone.')) {
        userProgress = {
            beginner: { completed: 0, total: 20, xp: 0 },
            intermediate: { completed: 0, total: 25, xp: 0 },
            advanced: { completed: 0, total: 30, xp: 0 },
            overall: { xp: 0, streak: 0, lessonsCompleted: 0 }
        };
        achievements = {
            firstLesson: false,
            perfectScore: false,
            weekStreak: false
        };
        
        saveProgress();
        updateUI();
        showNotification('Progress reset successfully', 'info');
    }
}

function toggleSound() {
    soundEnabled = !soundEnabled;
    const button = event.target.closest('button');
    const icon = button.querySelector('i');
    
    if (soundEnabled) {
        icon.className = 'fas fa-volume-up';
        button.innerHTML = '<i class="fas fa-volume-up"></i> Toggle Sound';
    } else {
        icon.className = 'fas fa-volume-mute';
        button.innerHTML = '<i class="fas fa-volume-mute"></i> Toggle Sound';
    }
}

function playSound(type) {
    if (!soundEnabled) return;
    
    // Create audio context for sound effects
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    if (type === 'correct') {
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        if (navigator.vibrate) navigator.vibrate([30, 20, 30]);
    } else if (type === 'incorrect') {
        oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(300, audioContext.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        if (navigator.vibrate) navigator.vibrate([80]);
    }
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
}

function initializeAnimations() {
    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.module-card, .progress-overview, .stats-card, .profile-card, .learning-goals').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Add CSS for notifications and animations
const style = document.createElement('style');
style.textContent = `
    .achievement-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--gradient-primary);
        color: var(--white);
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-heavy);
        z-index: 9999;
        animation: slideInRight 0.5s ease-out;
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .completion-message {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    }
    
    .completion-content {
        background: var(--white);
        padding: 2rem;
        border-radius: var(--border-radius);
        text-align: center;
        box-shadow: var(--shadow-heavy);
        animation: scaleIn 0.5s ease-out;
    }
    
    .completion-content i {
        font-size: 3rem;
        color: var(--accent-color);
        margin-bottom: 1rem;
    }
    
    .drag-container {
        border: 2px dashed #ccc;
        border-radius: 8px;
        padding: 1rem;
        min-height: 200px;
    }
    
    .drag-item {
        background: var(--white);
        border: 1px solid #e9ecef;
        border-radius: 8px;
        padding: 0.5rem 1rem;
        margin: 0.25rem;
        cursor: grab;
        display: inline-block;
        transition: var(--transition);
    }
    
    .drag-item:hover {
        background: var(--light-color);
        transform: translateY(-2px);
    }
    
    .drag-item:active {
        cursor: grabbing;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes scaleIn {
        from {
            transform: scale(0.8);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Initialize drag and drop functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add drag and drop event listeners when drag drop exercise is loaded
    document.addEventListener('click', function(e) {
        if (e.target.matches('.drag-item')) {
            initializeDragAndDrop();
        }
    });
});

function initializeDragAndDrop() {
    const dragItems = document.querySelectorAll('.drag-item');
    const dragArea = document.getElementById('dragArea');
    
    dragItems.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
    });
    
    dragArea.addEventListener('dragover', handleDragOver);
    dragArea.addEventListener('drop', handleDrop);
}

function handleDragStart(e) {
    e.target.style.opacity = '0.5';
    e.target.style.boxShadow = '0 0 16px 4px #1cb0f6';
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.outerHTML);
}

function handleDragEnd(e) {
    e.target.style.opacity = '1';
    e.target.style.boxShadow = '';
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

function handleDrop(e) {
    e.preventDefault();
    const draggedItem = e.dataTransfer.getData('text/html');
    const dropTarget = e.target.closest('.drag-area');
    
    if (dropTarget) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = draggedItem;
        const newItem = tempDiv.firstElementChild;
        
        // Remove the original item
        const originalItem = document.querySelector('.drag-item[style*="opacity: 0.5"]');
        if (originalItem) {
            originalItem.remove();
        }
        
        // Add the new item at the drop position
        dropTarget.appendChild(newItem);
        newItem.addEventListener('dragstart', handleDragStart);
        newItem.addEventListener('dragend', handleDragEnd);
    }
}

// Floating Action Button for AI Chat
window.openAIChat = function() {
    const aiChatModal = new bootstrap.Modal(document.getElementById('aiChatModal'));
    aiChatModal.show();
};

// Navbar auto-hide on scroll
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', function() {
    let st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop && st > 60) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScrollTop = st <= 0 ? 0 : st;
});

// Section fade-in on scroll
const fadeSections = document.querySelectorAll('.hero-section, .modules-section, .progress-section, .profile-section');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'none';
        }
    });
}, { threshold: 0.1 });
fadeSections.forEach(section => {
    fadeObserver.observe(section);
});

// Confetti animation on module completion
function showCompletionMessage() {
    const message = document.createElement('div');
    message.className = 'completion-message';
    message.innerHTML = `
        <div class="completion-content">
            <i class="fas fa-star"></i>
            <h3>¡Felicidades!</h3>
            <p>You've completed the ${currentModule} module!</p>
            <button class="btn btn-primary" onclick="this.parentElement.parentElement.remove()">Continue</button>
        </div>
    `;
    document.body.appendChild(message);
    launchConfetti();
}

function launchConfetti() {
    for (let i = 0; i < 80; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.background = `hsl(${Math.random()*360}, 80%, 60%)`;
        confetti.style.animationDuration = (Math.random() * 1 + 1.5) + 's';
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 2000);
    }
}

// Add confetti CSS
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
.confetti {
    position: fixed;
    top: 0;
    width: 10px;
    height: 18px;
    border-radius: 3px;
    opacity: 0.8;
    z-index: 99999;
    pointer-events: none;
    animation: confetti-fall linear forwards;
}
@keyframes confetti-fall {
    to {
        transform: translateY(100vh) rotateZ(360deg);
        opacity: 0.6;
    }
}`;
document.head.appendChild(confettiStyle);

// Learning Goals Functions
function loadGoals() {
    if (currentUser) {
        const savedGoals = localStorage.getItem(`espanolProGoals_${currentUser.id}`);
        if (savedGoals) {
            learningGoals = JSON.parse(savedGoals);
            nextGoalId = Math.max(...learningGoals.map(g => g.id)) + 1;
        }
    } else {
        const savedGoals = localStorage.getItem('espanolProGoals');
        if (savedGoals) {
            learningGoals = JSON.parse(savedGoals);
            nextGoalId = Math.max(...learningGoals.map(g => g.id)) + 1;
        }
    }
}

function saveGoals() {
    if (currentUser) {
        localStorage.setItem(`espanolProGoals_${currentUser.id}`, JSON.stringify(learningGoals));
    } else {
        localStorage.setItem('espanolProGoals', JSON.stringify(learningGoals));
    }
}

function updateGoalsDisplay() {
    const goalsContainer = document.getElementById('goalsContainer');
    if (!goalsContainer) return;

    goalsContainer.innerHTML = '';
    
    learningGoals.forEach(goal => {
        const progressPercentage = Math.min((goal.current / goal.target) * 100, 100);
        const isCompleted = goal.completed || goal.current >= goal.target;
        
        const goalElement = document.createElement('div');
        goalElement.className = `goal-item ${isCompleted ? 'completed' : ''}`;
        goalElement.setAttribute('data-goal-id', goal.id);
        
        goalElement.innerHTML = `
            <div class="goal-checkbox">
                <input type="checkbox" id="goal${goal.id}" ${isCompleted ? 'checked' : ''} onchange="toggleGoal(${goal.id})">
                <label for="goal${goal.id}" class="goal-label">
                    <span class="goal-text">${goal.text}</span>
                    <div class="goal-progress">
                        <div class="progress">
                            <div class="progress-bar" style="width: ${progressPercentage}%"></div>
                        </div>
                        <span class="progress-text">${goal.current}/${goal.target} ${getGoalUnit(goal.type)}</span>
                    </div>
                </label>
            </div>
            <div class="goal-actions">
                <button class="btn btn-sm btn-outline-secondary" onclick="editGoal(${goal.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteGoal(${goal.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        goalsContainer.appendChild(goalElement);
    });
    
    updateGoalsSummary();
}

function updateGoalsSummary() {
    const completedGoals = learningGoals.filter(g => g.completed || g.current >= g.target).length;
    const totalGoals = learningGoals.length;
    
    // Update goals progress header
    const goalsProgress = document.querySelector('.goals-progress');
    if (goalsProgress) {
        goalsProgress.textContent = `${completedGoals}/${totalGoals} Goals Completed`;
    }
    
    // Update summary items
    const summaryItems = document.querySelectorAll('.summary-item strong');
    if (summaryItems.length >= 3) {
        summaryItems[0].textContent = completedGoals;
        summaryItems[1].textContent = `${userProgress.overall.streak} days`;
        summaryItems[2].textContent = userProgress.overall.xp;
    }
}

function getGoalUnit(type) {
    switch (type) {
        case 'lessons': return '';
        case 'streak': return 'days';
        case 'xp': return 'XP';
        case 'module': return 'module';
        default: return '';
    }
}

function addNewGoal() {
    const goalText = prompt('Enter your new learning goal:');
    if (!goalText) return;
    
    const goalTypes = [
        { value: 'lessons', label: 'Complete X lessons' },
        { value: 'streak', label: 'Maintain X-day streak' },
        { value: 'xp', label: 'Earn X XP' },
        { value: 'module', label: 'Complete X modules' }
    ];
    
    const typeOptions = goalTypes.map(t => `${t.value}: ${t.label}`).join('\n');
    const goalType = prompt(`Choose goal type:\n${typeOptions}`);
    if (!goalType) return;
    
    const target = parseInt(prompt('Enter target number:'));
    if (isNaN(target) || target <= 0) {
        showNotification('Please enter a valid target number', 'error');
        return;
    }
    
    const newGoal = {
        id: nextGoalId++,
        text: goalText,
        type: goalType.split(':')[0],
        target: target,
        current: 0,
        completed: false
    };
    
    learningGoals.push(newGoal);
    saveGoals();
    updateGoalsDisplay();
    showNotification('New goal added successfully!', 'success');
}

function editGoal(goalId) {
    const goal = learningGoals.find(g => g.id === goalId);
    if (!goal) return;
    
    const newText = prompt('Edit goal text:', goal.text);
    if (!newText) return;
    
    const newTarget = parseInt(prompt('Edit target number:', goal.target));
    if (isNaN(newTarget) || newTarget <= 0) {
        showNotification('Please enter a valid target number', 'error');
        return;
    }
    
    goal.text = newText;
    goal.target = newTarget;
    goal.completed = goal.current >= goal.target;
    
    saveGoals();
    updateGoalsDisplay();
    showNotification('Goal updated successfully!', 'success');
}

function deleteGoal(goalId) {
    if (!confirm('Are you sure you want to delete this goal?')) return;
    
    learningGoals = learningGoals.filter(g => g.id !== goalId);
    saveGoals();
    updateGoalsDisplay();
    showNotification('Goal deleted successfully!', 'info');
}

function toggleGoal(goalId) {
    const goal = learningGoals.find(g => g.id === goalId);
    if (!goal) return;
    
    goal.completed = !goal.completed;
    saveGoals();
    updateGoalsDisplay();
    
    if (goal.completed) {
        showNotification(`Goal completed: ${goal.text}! 🎉`, 'success');
        awardXP(10); // Bonus XP for completing a goal
    }
}

function updateGoalProgress() {
    // Update lesson-based goals
    const lessonGoals = learningGoals.filter(g => g.type === 'lessons');
    lessonGoals.forEach(goal => {
        goal.current = userProgress.overall.lessonsCompleted;
        goal.completed = goal.current >= goal.target;
    });
    
    // Update streak-based goals
    const streakGoals = learningGoals.filter(g => g.type === 'streak');
    streakGoals.forEach(goal => {
        goal.current = userProgress.overall.streak;
        goal.completed = goal.current >= goal.target;
    });
    
    // Update XP-based goals
    const xpGoals = learningGoals.filter(g => g.type === 'xp');
    xpGoals.forEach(goal => {
        goal.current = userProgress.overall.xp;
        goal.completed = goal.current >= goal.target;
    });
    
    // Update module-based goals
    const moduleGoals = learningGoals.filter(g => g.type === 'module');
    moduleGoals.forEach(goal => {
        const completedModules = Object.values(userProgress).filter(p => 
            p !== userProgress.overall && p.completed >= p.total
        ).length;
        goal.current = completedModules;
        goal.completed = goal.current >= goal.target;
    });
    
    saveGoals();
    updateGoalsDisplay();
}

function resetGoals() {
    if (!confirm('Are you sure you want to reset all your learning goals? This will reset all goal progress and cannot be undone.')) {
        return;
    }
    
    // Reset all goals to default state
    learningGoals = [
        {
            id: 1,
            text: "Complete 5 lessons",
            type: "lessons",
            target: 5,
            current: 0,
            completed: false
        },
        {
            id: 2,
            text: "Maintain a 3-day streak",
            type: "streak",
            target: 3,
            current: 0,
            completed: false
        },
        {
            id: 3,
            text: "Earn 100 XP",
            type: "xp",
            target: 100,
            current: 0,
            completed: false
        },
        {
            id: 4,
            text: "Complete Beginner Module",
            type: "module",
            target: 1,
            current: 0,
            completed: false
        }
    ];
    
    nextGoalId = 5;
    
    // Save the reset goals
    saveGoals();
    updateGoalsDisplay();
    
    // Show confirmation notification
    showNotification('All learning goals have been reset successfully!', 'info');
    
    // Optional: Add a small animation effect
    const goalsContainer = document.getElementById('goalsContainer');
    if (goalsContainer) {
        goalsContainer.style.opacity = '0.5';
        setTimeout(() => {
            goalsContainer.style.opacity = '1';
        }, 300);
    }
}

// Dark Mode Functions
function loadDarkMode() {
    if (currentUser) {
        darkMode = currentUser.settings?.darkMode || false;
    } else {
        const savedDarkMode = localStorage.getItem('espanolProDarkMode');
        darkMode = savedDarkMode === 'true';
    }
    applyDarkMode();
}

function saveDarkMode() {
    if (currentUser) {
        if (!currentUser.settings) currentUser.settings = {};
        currentUser.settings.darkMode = darkMode;
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        if (userIndex !== -1) {
            users[userIndex] = currentUser;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            saveUsers();
        }
    } else {
        localStorage.setItem('espanolProDarkMode', darkMode.toString());
    }
}

function toggleDarkMode() {
    darkMode = !darkMode;
    applyDarkMode();
    saveDarkMode();
    updateDarkModeUI();
    
    const modeText = darkMode ? 'Dark Mode' : 'Light Mode';
    showNotification(`${modeText} enabled!`, 'info');
}

function applyDarkMode() {
    const body = document.body;
    if (darkMode) {
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
    }
}

function updateDarkModeUI() {
    const icon = document.getElementById('darkModeIcon');
    const setting = document.getElementById('darkModeSetting');
    
    if (icon) {
        icon.className = darkMode ? 'fas fa-sun' : 'fas fa-moon';
    }
    
    if (setting) {
        setting.checked = darkMode;
    }
} 