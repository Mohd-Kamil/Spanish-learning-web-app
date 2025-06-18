// Global Variables
let currentModule = null;
let currentLessonIndex = 0;
let userProgress = {
    totalXP: 0,
    dayStreak: 0,
    lessonsCompleted: 0,
    achievementsUnlocked: 0,
    modulesCompleted: 0,
    lastLoginDate: null,
    goalProgress: {}
};
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

// Enhanced Goals System with Immersive Features
let goals = [
    {
        id: 1,
        text: "Complete 5 lessons",
        type: "lessons",
        target: 5,
        current: 0,
        completed: false,
        reward: 50,
        icon: "fas fa-book",
        color: "primary"
    },
    {
        id: 2,
        text: "Maintain a 3-day streak",
        type: "streak",
        target: 3,
        current: 0,
        completed: false,
        reward: 100,
        icon: "fas fa-fire",
        color: "warning"
    },
    {
        id: 3,
        text: "Earn 100 XP",
        type: "xp",
        target: 100,
        current: 0,
        completed: false,
        reward: 75,
        icon: "fas fa-star",
        color: "success"
    },
    {
        id: 4,
        text: "Unlock 3 achievements",
        type: "achievements",
        target: 3,
        current: 0,
        completed: false,
        reward: 150,
        icon: "fas fa-trophy",
        color: "info"
    },
    {
        id: 5,
        text: "Complete Beginner Module",
        type: "module",
        target: 1,
        current: 0,
        completed: false,
        reward: 200,
        icon: "fas fa-graduation-cap",
        color: "secondary"
    }
];

let nextGoalId = 6;

// Lesson Data
const lessonData = {
    beginner: [
        {
            title: "Basic Greetings",
            type: "multiple-choice",
            question: "How do you say 'Hello' in Spanish?",
            options: ["Hola", "Adiós", "Gracias", "Por favor"],
            correct: 0,
            explanation: "¡Hola! is the most common and friendly way to say hello in Spanish. It's used throughout the day and is appropriate in most situations."
        },
        {
            title: "Numbers 1-10",
            type: "multiple-choice",
            question: "What is the Spanish word for 'five'?",
            options: ["Tres", "Cuatro", "Cinco", "Seis"],
            correct: 2,
            explanation: "Cinco means five in Spanish. The numbers 1-10 are: uno, dos, tres, cuatro, cinco, seis, siete, ocho, nueve, diez."
        },
        {
            title: "Colors",
            type: "multiple-choice",
            question: "What color is 'rojo'?",
            options: ["Blue", "Red", "Green", "Yellow"],
            correct: 1,
            explanation: "Rojo means red in Spanish. Other common colors: azul (blue), verde (green), amarillo (yellow), negro (black), blanco (white)."
        },
        {
            title: "Family Members",
            type: "fill-blank",
            question: "Complete: 'Mi _____ se llama María' (My mother is called María)",
            answer: "madre",
            hint: "This is the word for mother in Spanish - think of 'maternal'",
            explanation: "Madre means mother in Spanish. Other family members: padre (father), hermano (brother), hermana (sister), hijo (son), hija (daughter)."
        },
        {
            title: "Days of the Week",
            type: "drag-drop",
            question: "Arrange the days of the week in order (Monday to Sunday):",
            items: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
            explanation: "The days of the week in Spanish: Lunes (Monday), Martes (Tuesday), Miércoles (Wednesday), Jueves (Thursday), Viernes (Friday), Sábado (Saturday), Domingo (Sunday)."
        },
        {
            title: "Common Phrases",
            type: "multiple-choice",
            question: "How do you say 'Thank you' in Spanish?",
            options: ["Por favor", "Gracias", "De nada", "Lo siento"],
            correct: 1,
            explanation: "Gracias means thank you in Spanish. 'De nada' means you're welcome, 'Por favor' means please, and 'Lo siento' means I'm sorry."
        },
        {
            title: "Animals",
            type: "multiple-choice",
            question: "What is the Spanish word for 'dog'?",
            options: ["Gato", "Perro", "Pájaro", "Pez"],
            correct: 1,
            explanation: "Perro means dog in Spanish. Other animals: gato (cat), pájaro (bird), pez (fish), caballo (horse), vaca (cow)."
        },
        {
            title: "Food Items",
            type: "fill-blank",
            question: "Complete: 'Me gusta el _____' (I like bread)",
            answer: "pan",
            hint: "This is a basic food item that's a staple in many cultures",
            explanation: "Pan means bread in Spanish. Other food items: leche (milk), agua (water), carne (meat), pescado (fish), fruta (fruit)."
        },
        {
            title: "Basic Verbs",
            type: "multiple-choice",
            question: "What does 'comer' mean?",
            options: ["To drink", "To eat", "To sleep", "To walk"],
            correct: 1,
            explanation: "Comer means to eat in Spanish. Other basic verbs: beber (to drink), dormir (to sleep), caminar (to walk), hablar (to speak)."
        },
        {
            title: "Weather Terms",
            type: "drag-drop",
            question: "Arrange these weather terms from hot to cold:",
            items: ["Caliente", "Templado", "Fresco", "Frío"],
            explanation: "Weather terms: Caliente (hot), Templado (warm), Fresco (cool), Frío (cold). These describe temperature from highest to lowest."
        },
        {
            title: "Time Expressions",
            type: "multiple-choice",
            question: "How do you say 'Good morning' in Spanish?",
            options: ["Buenas noches", "Buenas tardes", "Buenos días", "Hasta luego"],
            correct: 2,
            explanation: "Buenos días means good morning. Other time greetings: Buenas tardes (good afternoon), Buenas noches (good night)."
        },
        {
            title: "Body Parts",
            type: "fill-blank",
            question: "Complete: 'Tengo dos _____' (I have two hands)",
            answer: "manos",
            hint: "This is the plural form of the word for hand",
            explanation: "Manos means hands in Spanish. Other body parts: cabeza (head), ojos (eyes), boca (mouth), piernas (legs), pies (feet)."
        },
        {
            title: "Transportation",
            type: "multiple-choice",
            question: "What is the Spanish word for 'car'?",
            options: ["Autobús", "Coche", "Tren", "Avión"],
            correct: 1,
            explanation: "Coche means car in Spanish. Other transportation: autobús (bus), tren (train), avión (plane), bicicleta (bicycle)."
        },
        {
            title: "Emotions",
            type: "drag-drop",
            question: "Arrange these emotions from positive to negative:",
            items: ["Feliz", "Contento", "Triste", "Enojado"],
            explanation: "Emotions: Feliz (happy), Contento (content), Triste (sad), Enojado (angry). These range from most positive to most negative."
        },
        {
            title: "Professions",
            type: "multiple-choice",
            question: "What is the Spanish word for 'teacher'?",
            options: ["Doctor", "Profesor", "Ingeniero", "Abogado"],
            correct: 1,
            explanation: "Profesor means teacher in Spanish. Other professions: doctor (doctor), ingeniero (engineer), abogado (lawyer), enfermero (nurse)."
        },
        {
            title: "Numbers 11-20",
            type: "multiple-choice",
            question: "What is the Spanish word for 'fifteen'?",
            options: ["Catorce", "Quince", "Dieciséis", "Diecisiete"],
            correct: 1,
            explanation: "Quince means fifteen in Spanish. The numbers 11-20: once, doce, trece, catorce, quince, dieciséis, diecisiete, dieciocho, diecinueve, veinte."
        },
        {
            title: "Months of the Year",
            type: "drag-drop",
            question: "Arrange these months in order (January to December):",
            items: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
            explanation: "The months in Spanish: Enero (January), Febrero (February), Marzo (March), Abril (April), Mayo (May), Junio (June), Julio (July), Agosto (August), Septiembre (September), Octubre (October), Noviembre (November), Diciembre (December)."
        },
        {
            title: "Clothing Items",
            type: "multiple-choice",
            question: "What is the Spanish word for 'shirt'?",
            options: ["Pantalón", "Camisa", "Zapatos", "Sombrero"],
            correct: 1,
            explanation: "Camisa means shirt in Spanish. Other clothing: pantalón (pants), zapatos (shoes), sombrero (hat), vestido (dress)."
        },
        {
            title: "Household Items",
            type: "fill-blank",
            question: "Complete: 'La _____ está en la cocina' (The table is in the kitchen)",
            answer: "mesa",
            hint: "This is a piece of furniture where you eat meals",
            explanation: "Mesa means table in Spanish. Other household items: silla (chair), cama (bed), puerta (door), ventana (window)."
        },
        {
            title: "Directions",
            type: "multiple-choice",
            question: "What does 'derecha' mean?",
            options: ["Left", "Right", "Up", "Down"],
            correct: 1,
            explanation: "Derecha means right in Spanish. Other directions: izquierda (left), arriba (up), abajo (down), adelante (forward)."
        },
        {
            title: "Seasons",
            type: "drag-drop",
            question: "Arrange the seasons in order (Spring to Winter):",
            items: ["Primavera", "Verano", "Otoño", "Invierno"],
            explanation: "The seasons in Spanish: Primavera (Spring), Verano (Summer), Otoño (Autumn), Invierno (Winter)."
        }
    ],
    intermediate: [
        {
            title: "Present Tense Verbs",
            type: "multiple-choice",
            question: "What is the correct form of 'hablar' (to speak) for 'yo'?",
            options: ["Hablas", "Hablo", "Habla", "Hablan"],
            correct: 1,
            explanation: "Yo hablo means 'I speak' in Spanish. The present tense conjugation for 'hablar' is: yo hablo, tú hablas, él/ella habla, nosotros hablamos, vosotros habláis, ellos/ellas hablan."
        },
        {
            title: "Ser vs Estar",
            type: "multiple-choice",
            question: "Which verb would you use to say 'I am happy'?",
            options: ["Ser", "Estar", "Both", "Neither"],
            correct: 1,
            explanation: "Estar is used for temporary states like emotions. 'Estoy feliz' means 'I am happy'. Ser is used for permanent characteristics."
        },
        {
            title: "Question Words",
            type: "fill-blank",
            question: "Complete: '¿_____ es tu nombre?' (What is your name?)",
            answer: "cuál",
            hint: "This question word asks for a choice or selection from a group",
            explanation: "¿Cuál es tu nombre? means 'What is your name?' Cuál is used when asking for a choice from a group of possibilities."
        },
        {
            title: "Weather Expressions",
            type: "multiple-choice",
            question: "How do you say 'It's sunny' in Spanish?",
            options: ["Hace frío", "Hace sol", "Llueve", "Está nublado"],
            correct: 1,
            explanation: "Hace sol means 'It's sunny' in Spanish. Other weather expressions: Hace frío (It's cold), Llueve (It's raining), Está nublado (It's cloudy)."
        },
        {
            title: "Past Tense",
            type: "multiple-choice",
            question: "What is the past tense of 'hablar' for 'yo'?",
            options: ["Hablaba", "Hablé", "Hablo", "Hablaré"],
            correct: 1,
            explanation: "Yo hablé means 'I spoke' in Spanish. This is the preterite tense, used for completed actions in the past."
        },
        {
            title: "Reflexive Verbs",
            type: "fill-blank",
            question: "Complete: 'Me _____ por la mañana' (I wake up in the morning)",
            answer: "levanto",
            hint: "This is the reflexive form of 'levantar' (to raise/lift)",
            explanation: "Me levanto means 'I wake up' in Spanish. Reflexive verbs use reflexive pronouns: me, te, se, nos, os, se."
        },
        {
            title: "Comparisons",
            type: "multiple-choice",
            question: "How do you say 'bigger than' in Spanish?",
            options: ["Más grande que", "Más pequeño que", "Tan grande como", "El más grande"],
            correct: 0,
            explanation: "Más grande que means 'bigger than' in Spanish. The structure is: más + adjective + que for comparisons."
        },
        {
            title: "Future Tense",
            type: "drag-drop",
            question: "Arrange these future tense forms of 'hablar' in order:",
            items: ["Hablaré", "Hablarás", "Hablará", "Hablaremos"],
            explanation: "Future tense of hablar: hablaré (I will speak), hablarás (you will speak), hablará (he/she will speak), hablaremos (we will speak)."
        },
        {
            title: "Direct Object Pronouns",
            type: "multiple-choice",
            question: "What is the direct object pronoun for 'me' in Spanish?",
            options: ["Te", "Me", "Lo", "La"],
            correct: 1,
            explanation: "Me is the direct object pronoun for 'me' in Spanish. Other pronouns: te (you), lo/la (him/her/it), nos (us), os (you all), los/las (them)."
        },
        {
            title: "Imperative Mood",
            type: "fill-blank",
            question: "Complete: '_____ aquí' (Come here)",
            answer: "ven",
            hint: "This is the informal command form of 'venir' (to come)",
            explanation: "Ven aquí means 'Come here' in Spanish. This is the informal imperative form of the verb 'venir'."
        },
        {
            title: "Indirect Object Pronouns",
            type: "multiple-choice",
            question: "What is the indirect object pronoun for 'to me' in Spanish?",
            options: ["Te", "Me", "Le", "Se"],
            correct: 1,
            explanation: "Me is the indirect object pronoun for 'to me' in Spanish. Other pronouns: te (to you), le (to him/her), nos (to us), os (to you all), les (to them)."
        },
        {
            title: "Present Progressive",
            type: "fill-blank",
            question: "Complete: 'Estoy _____ español' (I am studying Spanish)",
            answer: "estudiando",
            hint: "This is the gerund form of 'estudiar' (to study)",
            explanation: "Estudiando is the gerund form of 'estudiar'. The gerund is used with 'estar' to form the present progressive tense."
        },
        {
            title: "Possessive Adjectives",
            type: "multiple-choice",
            question: "What is the possessive adjective for 'my' in Spanish?",
            options: ["Tu", "Mi", "Su", "Nuestro"],
            correct: 1,
            explanation: "Mi means 'my' in Spanish. Other possessive adjectives: tu (your), su (his/her/their), nuestro (our), vuestro (your all)."
        },
        {
            title: "Demonstrative Adjectives",
            type: "drag-drop",
            question: "Arrange these demonstrative adjectives from near to far:",
            items: ["Este", "Ese", "Aquel"],
            explanation: "Demonstrative adjectives: Este (this - near), Ese (that - medium distance), Aquel (that - far)."
        },
        {
            title: "Prepositions",
            type: "multiple-choice",
            question: "What does 'con' mean in Spanish?",
            options: ["With", "Without", "Against", "For"],
            correct: 0,
            explanation: "Con means 'with' in Spanish. Other prepositions: sin (without), contra (against), para (for), por (for/by)."
        },
        {
            title: "Adverbs of Frequency",
            type: "fill-blank",
            question: "Complete: '_____ voy al gimnasio' (I always go to the gym)",
            answer: "siempre",
            hint: "This adverb means 'always' in Spanish",
            explanation: "Siempre means 'always' in Spanish. Other frequency adverbs: nunca (never), a veces (sometimes), frecuentemente (frequently)."
        },
        {
            title: "Conditional Tense",
            type: "multiple-choice",
            question: "What does 'Yo hablaría' mean?",
            options: ["I speak", "I spoke", "I would speak", "I will speak"],
            correct: 2,
            explanation: "Yo hablaría means 'I would speak' in Spanish. The conditional tense is used for hypothetical situations or polite requests."
        },
        {
            title: "Past Progressive",
            type: "fill-blank",
            question: "Complete: 'Estaba _____ cuando llamaste' (I was studying when you called)",
            answer: "estudiando",
            hint: "This is the gerund form used with 'estar' in past tense",
            explanation: "Estaba estudiando means 'I was studying' in Spanish. The past progressive uses 'estar' in imperfect + gerund."
        },
        {
            title: "Relative Pronouns",
            type: "multiple-choice",
            question: "Which relative pronoun means 'who' in Spanish?",
            options: ["Que", "Quien", "Cual", "Donde"],
            correct: 1,
            explanation: "Quien means 'who' in Spanish. Other relative pronouns: que (that/which), cual (which), donde (where)."
        },
        {
            title: "Adverbial Phrases",
            type: "drag-drop",
            question: "Arrange these time expressions from shortest to longest:",
            items: ["Ahora", "Hoy", "Esta semana", "Este mes"],
            explanation: "Time expressions: Ahora (now), Hoy (today), Esta semana (this week), Este mes (this month)."
        }
    ],
    advanced: [
        {
            title: "Subjunctive Mood",
            type: "multiple-choice",
            question: "Which form is correct: 'Espero que _____ bien' (I hope you are well)?",
            options: ["estás", "estés", "estarás", "estabas"],
            correct: 1,
            explanation: "The subjunctive 'estés' is used after 'espero que' because it expresses hope or desire. The subjunctive is used for uncertainty, doubt, or emotion."
        },
        {
            title: "Conditional Tense",
            type: "multiple-choice",
            question: "What does 'Yo hablaría' mean?",
            options: ["I speak", "I spoke", "I would speak", "I will speak"],
            correct: 2,
            explanation: "Yo hablaría means 'I would speak' in Spanish. The conditional tense is used for hypothetical situations or polite requests."
        },
        {
            title: "Future Perfect",
            type: "fill-blank",
            question: "Complete: 'Para mañana, ya _____ el trabajo' (By tomorrow, I will have finished the work)",
            answer: "habré terminado",
            hint: "This is the future perfect tense - 'will have' + past participle",
            explanation: "Habré terminado means 'I will have finished' in Spanish. The future perfect uses 'haber' in future + past participle."
        },
        {
            title: "Idiomatic Expressions",
            type: "multiple-choice",
            question: "What does 'Tener ganas de' mean?",
            options: ["To have money", "To feel like", "To be tired", "To be hungry"],
            correct: 1,
            explanation: "Tener ganas de means 'to feel like' doing something. It's a common idiomatic expression used to express desire or willingness."
        },
        {
            title: "Complex Sentences",
            type: "drag-drop",
            question: "Arrange to form a correct sentence:",
            items: ["Si", "tuviera", "tiempo", "iría", "al", "cine"],
            explanation: "Si tuviera tiempo, iría al cine means 'If I had time, I would go to the movies.' This is a conditional sentence using the subjunctive and conditional tenses."
        },
        {
            title: "Passive Voice",
            type: "multiple-choice",
            question: "How do you say 'The book was written by the author' in Spanish?",
            options: ["El autor escribió el libro", "El libro fue escrito por el autor", "El libro es escrito por el autor", "El autor escribe el libro"],
            correct: 1,
            explanation: "El libro fue escrito por el autor is the passive voice construction. It uses 'ser' + past participle + 'por' + agent."
        },
        {
            title: "Gerund and Infinitive",
            type: "fill-blank",
            question: "Complete: 'Estoy _____ español' (I am studying Spanish)",
            answer: "estudiando",
            hint: "This is the gerund form of 'estudiar' (to study)",
            explanation: "Estudiando is the gerund form of 'estudiar'. The gerund is used with 'estar' to form the present progressive tense."
        },
        {
            title: "Relative Pronouns",
            type: "multiple-choice",
            question: "Which relative pronoun means 'which' in Spanish?",
            options: ["Que", "Quien", "Cual", "Donde"],
            correct: 2,
            explanation: "Cual means 'which' in Spanish. Other relative pronouns: que (that/which), quien (who), donde (where)."
        },
        {
            title: "Adverbial Clauses",
            type: "drag-drop",
            question: "Arrange to form a temporal clause:",
            items: ["Cuando", "llegues", "a", "casa", "llámame"],
            explanation: "Cuando llegues a casa, llámame means 'When you arrive home, call me.' This is a temporal clause using the subjunctive."
        },
        {
            title: "Reported Speech",
            type: "multiple-choice",
            question: "How do you say 'He said he was tired' in Spanish?",
            options: ["Dijo que está cansado", "Dijo que estaba cansado", "Dice que está cansado", "Dice que estaba cansado"],
            correct: 1,
            explanation: "Dijo que estaba cansado means 'He said he was tired.' In reported speech, the verb tense often changes to reflect the past."
        },
        {
            title: "Present Perfect Subjunctive",
            type: "fill-blank",
            question: "Complete: 'Es posible que ya _____ el trabajo' (It's possible that he has already finished the work)",
            answer: "haya terminado",
            hint: "This is the present perfect subjunctive form of 'terminar'",
            explanation: "Haya terminado is the present perfect subjunctive form of 'terminar'. It's used after expressions of doubt or possibility."
        },
        {
            title: "Imperfect Subjunctive",
            type: "multiple-choice",
            question: "What is the imperfect subjunctive form of 'hablar' for 'yo'?",
            options: ["Hablara", "Hablase", "Both", "Neither"],
            correct: 2,
            explanation: "Both 'hablara' and 'hablase' are correct imperfect subjunctive forms. The -ra form is more common in modern Spanish."
        },
        {
            title: "Compound Tenses",
            type: "drag-drop",
            question: "Arrange these compound tenses from past to future:",
            items: ["He hablado", "Había hablado", "Habré hablado"],
            explanation: "Compound tenses: He hablado (present perfect), Había hablado (past perfect), Habré hablado (future perfect)."
        },
        {
            title: "Causative Constructions",
            type: "multiple-choice",
            question: "How do you say 'I had my car fixed' in Spanish?",
            options: ["Tuve mi coche arreglado", "Hice arreglar mi coche", "Both", "Neither"],
            correct: 2,
            explanation: "Both constructions are correct. 'Tuve mi coche arreglado' and 'Hice arreglar mi coche' both mean 'I had my car fixed'."
        },
        {
            title: "Diminutives and Augmentatives",
            type: "fill-blank",
            question: "Complete: 'Es un _____ muy bonito' (It's a very pretty little house)",
            answer: "casita",
            hint: "This is the diminutive form of 'casa' (house)",
            explanation: "Casita is the diminutive form of 'casa'. Diminutives add -ito/-ita to make things smaller or cuter."
        },
        {
            title: "Prepositional Phrases",
            type: "multiple-choice",
            question: "What does 'a pesar de' mean?",
            options: ["In spite of", "Because of", "Instead of", "In front of"],
            correct: 0,
            explanation: "A pesar de means 'in spite of' in Spanish. It's used to express contrast or opposition."
        },
        {
            title: "Conjunctions",
            type: "drag-drop",
            question: "Arrange these conjunctions from weakest to strongest contrast:",
            items: ["Pero", "Sin embargo", "No obstante"],
            explanation: "Conjunctions: Pero (but), Sin embargo (however), No obstante (nevertheless). These express increasing levels of contrast."
        },
        {
            title: "Modal Verbs",
            type: "fill-blank",
            question: "Complete: '_____ que estudies más' (You should study more)",
            answer: "deberías",
            hint: "This is the conditional form of 'deber' (should/must)",
            explanation: "Deberías means 'you should' in Spanish. It's the conditional form of the modal verb 'deber'."
        },
        {
            title: "Impersonal Expressions",
            type: "multiple-choice",
            question: "What does 'Se dice que' mean?",
            options: ["It is said that", "It seems that", "It is known that", "It is believed that"],
            correct: 0,
            explanation: "Se dice que means 'It is said that' in Spanish. It's an impersonal expression used to report information."
        },
        {
            title: "Conditional Clauses",
            type: "drag-drop",
            question: "Arrange to form a mixed conditional:",
            items: ["Si", "hubiera", "estudiado", "habría", "aprobado"],
            explanation: "Si hubiera estudiado, habría aprobado means 'If I had studied, I would have passed.' This is a mixed conditional using past perfect subjunctive + conditional perfect."
        }
    ]
};

// AI Chat Responses
const aiResponses = {
    greetings: [
        "¡Hola! ¿Cómo estás?",
        "¡Buenos días! ¿En qué puedo ayudarte?",
        "¡Hola! Me alegro de verte aquí.",
        "¡Saludos! ¿Cómo va tu aprendizaje de español?"
    ],
    questions: [
        "¡Excelente pregunta! Te explico...",
        "Me gusta tu curiosidad. La respuesta es...",
        "¡Buena pregunta! Déjame ayudarte con eso...",
        "Interesante pregunta. Aquí tienes la explicación..."
    ],
    encouragement: [
        "¡Muy bien! Sigue así.",
        "¡Excelente trabajo! Estás progresando mucho.",
        "¡Fantástico! Tu español está mejorando.",
        "¡Perfecto! Eres un gran estudiante."
    ],
    corrections: [
        "Casi correcto, pero sería mejor decir: ",
        "Buena intento, pero la forma correcta es: ",
        "Cerca, pero la expresión correcta es: ",
        "Casi perfecto, pero se dice: "
    ]
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing EspanolPro...');
    
    try {
        // Load data
        loadUsers();
        checkAuthStatus();
        loadGoals();
        loadUserProgress();
        loadDarkMode();
        
        // Setup UI
        updateUI();
        updateGoalsDisplay();
        updateGoalsSummary();
        updateOverallProgress();
        updateAuthUI();
        
        // Setup event listeners
        setupAuthForms();
        setupProfileHandlers();
        setupChatHandlers();
        
        // Initialize features
        initializeAnimations();
        initializeScrollAnimations();
        initializeModuleInteractions();
        initializeGoalInteractions();
        
        // Update displays
        updateOverallProgress();
        updateStatsDisplay();
        updateAchievementCount();
        
        console.log('EspanolPro initialized successfully!');
    } catch (error) {
        console.error('Error during initialization:', error);
    }
});

// Authentication System
function setupAuthForms() {
    console.log('Setting up authentication forms...');
    
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }
    
    // Signup form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleSignup();
        });
    }
    
    // Profile form
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleProfileUpdate();
        });
    }
    
    // Settings form
    const settingsForm = document.getElementById('settingsForm');
    if (settingsForm) {
        settingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleSettingsUpdate();
        });
    }
}

function setupProfileHandlers() {
    // Profile picture upload for main profile section
    const changePicBtn = document.getElementById('changePicBtn');
    const profilePicInput = document.getElementById('profilePicInput');
    
    if (changePicBtn && profilePicInput) {
        changePicBtn.onclick = () => profilePicInput.click();
        profilePicInput.onchange = function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const imageData = e.target.result;
                    document.getElementById('profilePic').src = imageData;
                    
                    if (currentUser) {
                        currentUser.profilePic = imageData;
                        saveUserData();
                        
                        // Update navbar avatar
                        const userAvatar = document.getElementById('userAvatar');
                        if (userAvatar) {
                            userAvatar.src = imageData;
                        }
                    }
                };
                reader.readAsDataURL(file);
            }
        };
    }
    
    // Profile picture upload for modal
    const modalChangePicBtn = document.getElementById('modalChangePicBtn');
    const modalProfilePicInput = document.getElementById('modalProfilePicInput');
    
    if (modalChangePicBtn && modalProfilePicInput) {
        modalChangePicBtn.onclick = () => modalProfilePicInput.click();
        modalProfilePicInput.onchange = function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const imageData = e.target.result;
                    document.getElementById('modalProfilePic').src = imageData;
                    
                    if (currentUser) {
                        currentUser.profilePic = imageData;
                        saveUserData();
                        
                        // Update navbar avatar and main profile pic
                        const userAvatar = document.getElementById('userAvatar');
                        const mainProfilePic = document.getElementById('profilePic');
                        if (userAvatar) {
                            userAvatar.src = imageData;
                        }
                        if (mainProfilePic) {
                            mainProfilePic.src = imageData;
                        }
                    }
                };
                reader.readAsDataURL(file);
            }
        };
    }
}

// Authentication Handlers
function handleLogin() {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    if (!email || !password) {
        showNotification('❌ Please enter both email and password', 'error');
        return;
    }
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Login successful
        currentUser = user;
        
        if (rememberMe) {
            localStorage.setItem('rememberedUser', JSON.stringify({ email: user.email }));
        }
        
        // Load user data
        loadUserData();
        
        // Clear form
        document.getElementById('loginEmail').value = '';
        document.getElementById('loginPassword').value = '';
        document.getElementById('rememberMe').checked = false;
        
        // Close modal and update UI
        bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
        updateAuthUI();
        
        showNotification('✅ Welcome back, ' + user.name + '!', 'success');
    } else {
        showNotification('❌ Invalid email or password', 'error');
        document.getElementById('loginPassword').value = '';
    }
}

function handleSignup() {
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const agreeTerms = document.getElementById('agreeTerms').checked;
    
    if (!name || !email || !password || !confirmPassword) {
        showNotification('❌ Please fill in all fields', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showNotification('❌ Passwords do not match', 'error');
        return;
    }
    
    if (!agreeTerms) {
        showNotification('❌ Please agree to the Terms of Service', 'error');
        return;
    }
    
    if (users.find(u => u.email === email)) {
        showNotification('❌ Email already registered', 'error');
        return;
    }
    
    // Create new user
    const newUser = {
        id: Date.now().toString(),
        name: name,
        email: email,
        password: password,
        createdAt: new Date().toISOString(),
        profilePic: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=150`,
        progress: {
            totalXP: 0,
            dayStreak: 0,
            lessonsCompleted: 0,
            achievementsUnlocked: 0,
            modulesCompleted: 0,
            lastLoginDate: null,
            goalProgress: {}
        },
        achievements: {
            firstLesson: false,
            perfectScore: false,
            weekStreak: false
        },
        settings: {
            darkMode: false
        },
        goals: [...goals] // Copy default goals
    };
    
    users.push(newUser);
    saveUsers();
    
    // Login the new user
    currentUser = newUser;
    loadUserData();
    
    // Clear form
    document.getElementById('signupName').value = '';
    document.getElementById('signupEmail').value = '';
    document.getElementById('signupPassword').value = '';
    document.getElementById('confirmPassword').value = '';
    document.getElementById('agreeTerms').checked = false;
    
    // Close modal and update UI
    bootstrap.Modal.getInstance(document.getElementById('signupModal')).hide();
    updateAuthUI();
    
    showNotification('✅ Account created successfully! Welcome, ' + name + '!', 'success');
}

function handleProfileUpdate() {
    if (!currentUser) return;
    
    const newName = document.getElementById('profileNameInput').value.trim();
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmNewPassword').value;
    const darkModeChecked = document.getElementById('profileDarkMode').checked;
    
    if (!newName) {
        showNotification('❌ Name cannot be empty', 'error');
        return;
    }
    
    if (newPassword && newPassword !== confirmPassword) {
        showNotification('❌ Passwords do not match', 'error');
        return;
    }
    
    // Update user data
    currentUser.name = newName;
    if (newPassword) {
        currentUser.password = newPassword;
    }
    if (!currentUser.settings) currentUser.settings = {};
    currentUser.settings.darkMode = darkModeChecked;
    
    // Save and update UI
    saveUserData();
    updateAuthUI();
    
    // Apply settings
    if (darkMode !== darkModeChecked) {
        darkMode = darkModeChecked;
        applyDarkMode();
        updateDarkModeUI();
    }
    
    // Close modal
    bootstrap.Modal.getInstance(document.getElementById('profileModal')).hide();
    
    showNotification('✅ Profile updated successfully!', 'success');
}

function handleSettingsUpdate() {
    if (!currentUser) return;
    
    const newName = document.getElementById('settingsName').value.trim();
    const newPassword = document.getElementById('settingsNewPassword').value;
    const confirmPassword = document.getElementById('settingsConfirmPassword').value;
    const darkModeChecked = document.getElementById('settingsDarkMode').checked;
    
    if (newPassword && newPassword !== confirmPassword) {
        showNotification('❌ Passwords do not match', 'error');
        return;
    }
    
    // Update user data
    currentUser.name = newName;
    if (newPassword) {
        currentUser.password = newPassword;
    }
    if (!currentUser.settings) currentUser.settings = {};
    currentUser.settings.darkMode = darkModeChecked;
    
    // Save and update UI
    saveUserData();
    updateAuthUI();
    
    // Apply settings
    if (darkMode !== darkModeChecked) {
        darkMode = darkModeChecked;
        applyDarkMode();
        updateDarkModeUI();
    }
    
    // Close modal
    bootstrap.Modal.getInstance(document.getElementById('settingsModal')).hide();
    
    showNotification('✅ Settings updated successfully!', 'success');
}

// Modal Functions
function openLoginModal() {
    console.log('Opening login modal...');
    try {
        const loginModal = document.getElementById('loginModal');
        if (loginModal) {
            const modal = new bootstrap.Modal(loginModal);
            modal.show();
        } else {
            console.error('Login modal not found');
        }
    } catch (error) {
        console.error('Error opening login modal:', error);
    }
}

function openSignupModal() {
    console.log('Opening signup modal...');
    try {
        const signupModal = document.getElementById('signupModal');
        if (signupModal) {
            const modal = new bootstrap.Modal(signupModal);
            modal.show();
        } else {
            console.error('Signup modal not found');
        }
    } catch (error) {
        console.error('Error opening signup modal:', error);
    }
}

function openProfileModal() {
    console.log('Opening profile modal...');
    if (!currentUser) {
        showNotification('Please log in first', 'error');
        return;
    }
    
    try {
        // Fill profile modal with current user data
        const profileName = document.getElementById('profileName');
        const profileEmail = document.getElementById('profileEmail');
        const profileNameInput = document.getElementById('profileNameInput');
        const profileEmailInput = document.getElementById('profileEmailInput');
        const profilePic = document.getElementById('profilePic');
        const profileDarkMode = document.getElementById('profileDarkMode');
        
        if (profileName) profileName.textContent = currentUser.name;
        if (profileEmail) profileEmail.textContent = currentUser.email;
        if (profileNameInput) profileNameInput.value = currentUser.name;
        if (profileEmailInput) profileEmailInput.value = currentUser.email;
        
        // Set profile picture
        const picUrl = currentUser.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name)}&size=150`;
        if (profilePic) profilePic.src = picUrl;
        
        // Also update modal profile picture
        const modalProfilePic = document.getElementById('modalProfilePic');
        if (modalProfilePic) modalProfilePic.src = picUrl;
        
        // Set settings
        if (profileDarkMode) profileDarkMode.checked = currentUser.settings?.darkMode || false;
        
        // Clear password fields
        const newPassword = document.getElementById('newPassword');
        const confirmNewPassword = document.getElementById('confirmNewPassword');
        if (newPassword) newPassword.value = '';
        if (confirmNewPassword) confirmNewPassword.value = '';
        
        // Show modal
        const profileModal = document.getElementById('profileModal');
        if (profileModal) {
            const modal = new bootstrap.Modal(profileModal);
            modal.show();
        } else {
            console.error('Profile modal not found');
        }
    } catch (error) {
        console.error('Error opening profile modal:', error);
    }
}

function openSettingsModal() {
    console.log('Opening settings modal...');
    if (!currentUser) {
        showNotification('Please log in first', 'error');
        return;
    }
    
    try {
        // Fill settings modal
        const settingsName = document.getElementById('settingsName');
        const settingsEmail = document.getElementById('settingsEmail');
        const settingsDarkMode = document.getElementById('settingsDarkMode');
        
        if (settingsName) settingsName.value = currentUser.name;
        if (settingsEmail) settingsEmail.value = currentUser.email;
        if (settingsDarkMode) settingsDarkMode.checked = currentUser.settings?.darkMode || false;
        
        // Clear password fields
        const settingsNewPassword = document.getElementById('settingsNewPassword');
        const settingsConfirmPassword = document.getElementById('settingsConfirmPassword');
        if (settingsNewPassword) settingsNewPassword.value = '';
        if (settingsConfirmPassword) settingsConfirmPassword.value = '';
        
        // Show modal
        const settingsModal = document.getElementById('settingsModal');
        if (settingsModal) {
            const modal = new bootstrap.Modal(settingsModal);
            modal.show();
        } else {
            console.error('Settings modal not found');
        }
    } catch (error) {
        console.error('Error opening settings modal:', error);
    }
}

function switchToSignup() {
    bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
    openSignupModal();
}

function switchToLogin() {
    bootstrap.Modal.getInstance(document.getElementById('signupModal')).hide();
    openLoginModal();
}

function logout() {
    console.log('Logging out user:', currentUser?.name);
    
    // Save current progress
    if (currentUser) {
        saveUserData();
    }
    
    // Clear user session
    currentUser = null;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('rememberedUser');
    
    // Reset to default state
    userProgress = {
        totalXP: 0,
        dayStreak: 0,
        lessonsCompleted: 0,
        achievementsUnlocked: 0,
        modulesCompleted: 0,
        lastLoginDate: null,
        goalProgress: {}
    };
    
    achievements = {
        firstLesson: false,
        perfectScore: false,
        weekStreak: false
    };
    
    goals = [
        {
            id: 1,
            text: "Complete 5 lessons",
            type: "lessons",
            target: 5,
            current: 0,
            completed: false,
            reward: 50,
            icon: "fas fa-book",
            color: "primary"
        },
        {
            id: 2,
            text: "Maintain a 3-day streak",
            type: "streak",
            target: 3,
            current: 0,
            completed: false,
            reward: 100,
            icon: "fas fa-fire",
            color: "warning"
        },
        {
            id: 3,
            text: "Earn 100 XP",
            type: "xp",
            target: 100,
            current: 0,
            completed: false,
            reward: 75,
            icon: "fas fa-star",
            color: "success"
        }
    ];
    
    // Reset dark mode
    darkMode = false;
    applyDarkMode();
    updateDarkModeUI();
    
    // Update UI
    updateAuthUI();
    updateUI();
    updateGoalsDisplay();
    
    showNotification('✅ Logged out successfully', 'info');
}

// User Data Management
function loadUserData() {
    if (!currentUser) return;
    
    // Load user-specific data
    if (currentUser.progress) {
        userProgress = currentUser.progress;
    }
    if (currentUser.achievements) {
        achievements = currentUser.achievements;
    }
    if (currentUser.goals) {
        goals = currentUser.goals;
    }
    if (currentUser.settings) {
        darkMode = currentUser.settings.darkMode || false;
    }
    
    // Apply settings
    applyDarkMode();
    updateDarkModeUI();
}

function saveUserData() {
    if (!currentUser) return;
    
    // Update user data with current state
    currentUser.progress = userProgress;
    currentUser.achievements = achievements;
    currentUser.goals = goals;
    if (!currentUser.settings) currentUser.settings = {};
    currentUser.settings.darkMode = darkMode;
    
    // Save to users array and localStorage
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex] = currentUser;
    }
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    saveUsers();
}

function checkAuthStatus() {
    const savedUser = localStorage.getItem('currentUser');
    const rememberedUser = localStorage.getItem('rememberedUser');
    
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        loadUserData();
    } else if (rememberedUser) {
        const remembered = JSON.parse(rememberedUser);
        const user = users.find(u => u.email === remembered.email);
        if (user) {
            currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            loadUserData();
        }
    }
}

function updateAuthUI() {
    const authButtons = document.getElementById('auth-buttons');
    const userMenu = document.getElementById('user-menu');
    
    if (currentUser) {
        // User is logged in - hide auth buttons, show user menu
        if (authButtons) authButtons.classList.add('d-none');
        if (userMenu) userMenu.classList.remove('d-none');
        
        // Update user info in dropdown
        document.getElementById('user-name').textContent = currentUser.name;
        const userAvatar = document.getElementById('userAvatar');
        if (userAvatar) {
            userAvatar.src = currentUser.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.name)}&size=24`;
        }
    } else {
        // User is not logged in - show auth buttons, hide user menu
        if (authButtons) authButtons.classList.remove('d-none');
        if (userMenu) userMenu.classList.add('d-none');
    }
}

// Utility Functions
function loadUsers() {
    const savedUsers = localStorage.getItem('espanolProUsers');
    if (savedUsers) {
        users = JSON.parse(savedUsers);
    }
}

function saveUsers() {
    localStorage.setItem('espanolProUsers', JSON.stringify(users));
}

function loadUserProgress() {
    if (currentUser) {
        if (currentUser.progress) {
            userProgress = currentUser.progress;
        }
        if (currentUser.achievements) {
            achievements = currentUser.achievements;
        }
    }
}

function saveUserProgress() {
    if (currentUser) {
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        if (userIndex !== -1) {
            users[userIndex].progress = userProgress;
            users[userIndex].achievements = achievements;
            currentUser = users[userIndex];
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            saveUsers();
        }
    }
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
    console.log('Starting learning...');
    try {
        const modulesSection = document.getElementById('modules');
        if (modulesSection) {
            modulesSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            console.error('Modules section not found');
        }
    } catch (error) {
        console.error('Error starting learning:', error);
    }
}

function openModule(moduleName) {
    currentModule = moduleName;
    currentLessonIndex = 0;
    
    // Update module stats to show correct lesson count
    const lessonCount = lessonData[moduleName].length;
    const moduleCards = document.querySelectorAll('.module-card');
    moduleCards.forEach(card => {
        const stats = card.querySelector('.module-stats span:first-child');
        if (stats) {
            stats.innerHTML = `<i class="fas fa-book"></i> ${lessonCount} Lessons`;
        }
    });
    
    // Load the first lesson
    loadLesson();
    
    // Open the lesson modal
    const lessonModal = new bootstrap.Modal(document.getElementById('lessonModal'));
    lessonModal.show();
}

function loadLesson() {
    if (!currentModule || !lessonData[currentModule]) {
        console.error('No module or lesson data available');
        return;
    }
    
    const lesson = lessonData[currentModule][currentLessonIndex];
    if (!lesson) {
        console.error('Lesson not found');
        return;
    }
    
    // Update the modal title
    const lessonTitle = document.getElementById('lessonTitle');
    if (lessonTitle) {
        lessonTitle.textContent = lesson.title;
    }
    
    // Disable next button initially
    const nextLessonBtn = document.getElementById('nextLessonBtn');
    if (nextLessonBtn) {
        nextLessonBtn.disabled = true;
        nextLessonBtn.style.opacity = '0.5';
        nextLessonBtn.classList.remove('show');
    }
    
    let exerciseHTML = '';
    
    switch (lesson.type) {
        case 'multiple-choice':
            exerciseHTML = createMultipleChoiceExercise(lesson);
            break;
        case 'fill-blank':
            exerciseHTML = createFillBlankExercise(lesson);
            break;
        case 'drag-drop':
            exerciseHTML = createDragDropExercise(lesson);
            break;
        default:
            exerciseHTML = '<p>Exercise type not supported</p>';
    }
    
    const lessonContent = document.getElementById('lessonContent');
    if (lessonContent) {
        lessonContent.innerHTML = exerciseHTML;
        
        // Setup drag and drop if needed
        if (lesson.type === 'drag-drop') {
            setTimeout(() => {
                setupDragAndDrop();
            }, 100);
        }
        
        // Update progress bar
        updateProgressBar();
    }
}

function createMultipleChoiceExercise(lesson) {
    let optionsHTML = '';
    lesson.options.forEach((option, index) => {
        optionsHTML += `
            <div class="exercise-option immersive-option" onclick="checkAnswer(${index}, ${lesson.correct})" data-index="${index}">
                <div class="option-content">
                    <div class="option-icon">
                        <i class="fas fa-circle"></i>
                    </div>
                    <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                    <span class="option-text">${option}</span>
                    <div class="option-ripple"></div>
                </div>
                <div class="option-feedback">
                    <div class="feedback-icon correct-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <div class="feedback-icon incorrect-icon">
                        <i class="fas fa-times-circle"></i>
                    </div>
                </div>
                <div class="option-particles"></div>
            </div>
        `;
    });
    
    return `
        <div class="exercise-container immersive-exercise">
            <div class="exercise-header">
                <h4 class="exercise-question">${lesson.question}</h4>
                <div class="exercise-type-badge">
                    <i class="fas fa-list-ul"></i>
                    Multiple Choice
                </div>
            </div>
            <div class="options-container immersive-options">
                ${optionsHTML}
            </div>
            <div class="exercise-hint">
                <i class="fas fa-lightbulb"></i>
                <span>Click on the correct answer</span>
            </div>
            <div class="exercise-progress">
                <div class="progress-bar">
                    <div class="progress-fill"></div>
                </div>
                <span class="progress-text">Question ${currentLessonIndex + 1} of ${lessonData[currentModule].length}</span>
            </div>
        </div>
    `;
}

function createFillBlankExercise(lesson) {
    return `
        <div class="exercise-container immersive-exercise">
            <div class="exercise-header">
                <h4 class="exercise-question">${lesson.question}</h4>
                <div class="exercise-type-badge">
                    <i class="fas fa-pencil-alt"></i>
                    Fill in the Blank
                </div>
            </div>
            <div class="fill-blank-container immersive-fill-blank">
                <div class="input-group">
                    <div class="input-wrapper">
                        <input type="text" id="fillBlankAnswer" class="form-control immersive-input" placeholder="Type your answer..." autocomplete="off">
                        <div class="input-focus-border"></div>
                        <div class="input-particles"></div>
                    </div>
                    <button class="btn btn-primary check-answer-btn" onclick="checkFillBlankAnswer()">
                        <i class="fas fa-check"></i> Check Answer
                    </button>
                </div>
                <div class="hint-container">
                    <i class="fas fa-lightbulb hint-icon"></i>
                    <span class="hint-text">Hint: ${lesson.hint}</span>
                </div>
            </div>
            <div class="exercise-progress">
                <div class="progress-bar">
                    <div class="progress-fill"></div>
                </div>
                <span class="progress-text">Question ${currentLessonIndex + 1} of ${lessonData[currentModule].length}</span>
            </div>
        </div>
    `;
}

function createDragDropExercise(lesson) {
    const shuffledItems = [...lesson.items].sort(() => Math.random() - 0.5);
    
    return `
        <div class="exercise-container immersive-exercise">
            <div class="exercise-header">
                <h4 class="exercise-question">${lesson.question}</h4>
                <div class="exercise-type-badge">
                    <i class="fas fa-arrows-alt"></i>
                    Drag & Drop
                </div>
            </div>
            <div class="drag-drop-container immersive-drag-drop">
                <div class="drag-items" id="dragItems">
                    ${shuffledItems.map(item => `
                        <div class="drag-item immersive-drag-item" draggable="true" data-item="${item}">
                            <div class="drag-item-content">
                                <span class="drag-item-text">${item}</span>
                                <div class="drag-item-particles"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="drop-zone immersive-drop-zone" id="dropZone">
                    <div class="drop-zone-content">
                        <i class="fas fa-arrow-down drop-icon"></i>
                        <p>Drop items here in the correct order</p>
                        <div class="drop-zone-particles"></div>
                    </div>
                </div>
            </div>
            <div class="exercise-actions">
                <button class="btn btn-primary check-answer-btn" onclick="checkDragDropAnswer()">
                    <i class="fas fa-check"></i> Check Answer
                </button>
                <button class="btn btn-outline-secondary reset-btn" onclick="resetDragDrop()">
                    <i class="fas fa-redo"></i> Reset
                </button>
            </div>
            <div class="exercise-progress">
                <div class="progress-bar">
                    <div class="progress-fill"></div>
                </div>
                <span class="progress-text">Question ${currentLessonIndex + 1} of ${lessonData[currentModule].length}</span>
            </div>
        </div>
    `;
}

function setupDragAndDrop() {
    const dragItems = document.querySelectorAll('.drag-item');
    const dropZone = document.getElementById('dropZone');
    
    if (!dropZone) return;
    
    // Setup drag items
    dragItems.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
    });
    
    // Setup drop zone
    dropZone.addEventListener('dragover', handleDragOver);
    dropZone.addEventListener('drop', handleDrop);
    dropZone.addEventListener('dragenter', handleDragEnter);
    dropZone.addEventListener('dragleave', handleDragLeave);
}

function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.dataset.item);
    e.target.classList.add('dragging');
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDragEnter(e) {
    e.preventDefault();
    e.target.closest('.drop-zone').classList.add('drag-over');
}

function handleDragLeave(e) {
    if (!e.target.closest('.drop-zone').contains(e.relatedTarget)) {
        e.target.closest('.drop-zone').classList.remove('drag-over');
    }
}

function handleDrop(e) {
    e.preventDefault();
    const dropZone = e.target.closest('.drop-zone');
    dropZone.classList.remove('drag-over');
    
    const itemData = e.dataTransfer.getData('text/plain');
    const draggedElement = document.querySelector(`[data-item="${itemData}"]`);
    
    if (draggedElement && dropZone) {
        // Remove the original element
        draggedElement.remove();
        
        // Create a new element in the drop zone
        const newItem = document.createElement('div');
        newItem.className = 'drag-item dropped-item';
        newItem.dataset.item = itemData;
        newItem.innerHTML = `<span>${itemData}</span>`;
        
        // Add to drop zone
        dropZone.appendChild(newItem);
        
        // Update drop zone content if it's the first item
        const dropZoneContent = dropZone.querySelector('.drop-zone-content');
        if (dropZoneContent) {
            dropZoneContent.style.display = 'none';
        }
    }
}

function checkAnswer(selectedIndex, correctIndex) {
    const options = document.querySelectorAll('.exercise-option');
    const selectedOption = options[selectedIndex];
    const correctOption = options[correctIndex];
    
    // Disable all options
    options.forEach(option => {
        option.style.pointerEvents = 'none';
    });
    
    // Disable next button initially
    const nextLessonBtn = document.getElementById('nextLessonBtn');
    if (nextLessonBtn) {
        nextLessonBtn.disabled = true;
        nextLessonBtn.style.opacity = '0.5';
    }
    
    // Add immersive animations
    selectedOption.classList.add('selected');
    
    if (selectedIndex === correctIndex) {
        // Correct answer
        selectedOption.classList.add('correct');
        selectedOption.classList.add('correct-animation');
        
        // Play success sound (if available)
        playSound('success');
        
        // Add particle effects
        createParticles(selectedOption, 'success');
        
        // Show success notification with animation
        showNotification('✅ ¡Excelente! ¡Correcto!', 'success');
        
        // Award XP with animation
        awardXP(10);
        
        // Complete lesson
        completeLesson(currentModule, currentLessonIndex);
        
        // Add celebration animation
        setTimeout(() => {
            selectedOption.classList.add('celebration');
        }, 500);
        
    } else {
        // Incorrect answer
        selectedOption.classList.add('incorrect');
        selectedOption.classList.add('incorrect-animation');
        correctOption.classList.add('correct');
        correctOption.classList.add('correct-animation');
        
        // Play error sound (if available)
        playSound('error');
        
        // Add particle effects
        createParticles(selectedOption, 'error');
        createParticles(correctOption, 'success');
        
        // Show error notification
        showNotification('❌ Incorrecto. ¡Inténtalo de nuevo!', 'error');
        
        // Add shake animation
        selectedOption.classList.add('shake');
    }
    
    // Show explanation with delay
    setTimeout(() => {
        const lesson = lessonData[currentModule][currentLessonIndex];
        showNotification(lesson.explanation, 'info');
        
        // Enable next button after explanation
        setTimeout(() => {
            if (nextLessonBtn) {
                nextLessonBtn.disabled = false;
                nextLessonBtn.style.opacity = '1';
                nextLessonBtn.classList.add('show');
            }
        }, 2000);
    }, 1500);
}

// Helper function to play sounds
function playSound(type) {
    // Create audio context for sound effects
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        if (type === 'success') {
            // Success sound - ascending tones
            playTone(audioContext, 523.25, 0.1, 0); // C5
            setTimeout(() => playTone(audioContext, 659.25, 0.1, 0.1), 100); // E5
            setTimeout(() => playTone(audioContext, 783.99, 0.2, 0.2), 200); // G5
        } else if (type === 'error') {
            // Error sound - descending tones
            playTone(audioContext, 523.25, 0.1, 0); // C5
            setTimeout(() => playTone(audioContext, 493.88, 0.1, 0.1), 100); // B4
            setTimeout(() => playTone(audioContext, 466.16, 0.2, 0.2), 200); // A#4
        }
    } catch (e) {
        console.log('Audio not supported');
    }
}

// Helper function to play tones
function playTone(audioContext, frequency, duration, delay) {
    setTimeout(() => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    }, delay * 1000);
}

// Helper function to create particle effects
function createParticles(element, type) {
    const particlesContainer = element.querySelector('.option-particles');
    if (!particlesContainer) return;
    
    const colors = type === 'success' ? ['#58cc02', '#4CAF50', '#8BC34A'] : ['#ff4b4b', '#f44336', '#e91e63'];
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        const angle = (i / 8) * 2 * Math.PI;
        const velocity = 50 + Math.random() * 50;
        const x = Math.cos(angle) * velocity;
        const y = Math.sin(angle) * velocity;
        
        particle.style.setProperty('--x', x + 'px');
        particle.style.setProperty('--y', y + 'px');
        
        particlesContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1000);
    }
}

// Helper function to add next button
function addNextButton() {
    const nextLessonBtn = document.getElementById('nextLessonBtn');
    if (nextLessonBtn) {
        // Enable the existing next button in the modal footer
        nextLessonBtn.disabled = false;
        nextLessonBtn.style.opacity = '1';
        nextLessonBtn.style.transform = 'scale(1)';
        
        // Add entrance animation
        nextLessonBtn.classList.add('show');
    }
}

function checkFillBlankAnswer() {
    const userAnswer = document.getElementById('fillBlankAnswer').value.trim().toLowerCase();
    const lesson = lessonData[currentModule][currentLessonIndex];
    const correctAnswer = lesson.answer.toLowerCase();
    const inputElement = document.getElementById('fillBlankAnswer');
    
    // Disable next button initially
    const nextLessonBtn = document.getElementById('nextLessonBtn');
    if (nextLessonBtn) {
        nextLessonBtn.disabled = true;
        nextLessonBtn.style.opacity = '0.5';
    }
    
    if (userAnswer === correctAnswer) {
        // Correct answer
        inputElement.classList.add('correct');
        inputElement.classList.add('correct-animation');
        
        // Play success sound
        playSound('success');
        
        // Add particle effects
        createInputParticles(inputElement, 'success');
        
        // Show success notification
        showNotification('✅ ¡Perfecto! ¡Correcto!', 'success');
        
        // Award XP
        awardXP(10);
        
        // Complete lesson
        completeLesson(currentModule, currentLessonIndex);
        
        // Add celebration animation
        setTimeout(() => {
            inputElement.classList.add('celebration');
        }, 500);
        
    } else {
        // Incorrect answer
        inputElement.classList.add('incorrect');
        inputElement.classList.add('incorrect-animation');
        
        // Play error sound
        playSound('error');
        
        // Add particle effects
        createInputParticles(inputElement, 'error');
        
        // Show error notification
        showNotification('❌ Incorrecto. La respuesta correcta es: ' + lesson.answer, 'error');
        
        // Add shake animation
        inputElement.classList.add('shake');
        
        // Show correct answer
        setTimeout(() => {
            inputElement.value = lesson.answer;
            inputElement.classList.remove('incorrect');
            inputElement.classList.add('show-correct');
        }, 1000);
    }
    
    // Show explanation with delay
    setTimeout(() => {
        showNotification(lesson.explanation, 'info');
        
        // Enable next button after explanation
        setTimeout(() => {
            if (nextLessonBtn) {
                nextLessonBtn.disabled = false;
                nextLessonBtn.style.opacity = '1';
                nextLessonBtn.classList.add('show');
            }
        }, 2000);
    }, 1500);
}

// Helper function to create input particle effects
function createInputParticles(inputElement, type) {
    const particlesContainer = inputElement.parentNode.querySelector('.input-particles');
    if (!particlesContainer) return;
    
    const colors = type === 'success' ? ['#58cc02', '#4CAF50', '#8BC34A'] : ['#ff4b4b', '#f44336', '#e91e63'];
    
    for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.className = 'input-particle';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        const angle = (i / 6) * 2 * Math.PI;
        const velocity = 30 + Math.random() * 40;
        const x = Math.cos(angle) * velocity;
        const y = Math.sin(angle) * velocity;
        
        particle.style.setProperty('--x', x + 'px');
        particle.style.setProperty('--y', y + 'px');
        
        particlesContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 800);
    }
}

function checkDragDropAnswer() {
    const dropZone = document.getElementById('dropZone');
    const droppedItems = dropZone.querySelectorAll('.dropped-item');
    const lesson = lessonData[currentModule][currentLessonIndex];
    
    if (droppedItems.length === 0) {
        showNotification('❌ Por favor, arrastra los elementos a la zona de destino', 'error');
        return;
    }
    
    // Disable next button initially
    const nextLessonBtn = document.getElementById('nextLessonBtn');
    if (nextLessonBtn) {
        nextLessonBtn.disabled = true;
        nextLessonBtn.style.opacity = '0.5';
    }
    
    const userOrder = Array.from(droppedItems).map(item => item.dataset.item);
    const correctOrder = lesson.items;
    
    let isCorrect = true;
    for (let i = 0; i < userOrder.length; i++) {
        if (userOrder[i] !== correctOrder[i]) {
            isCorrect = false;
            break;
        }
    }
    
    if (isCorrect) {
        // Correct answer
        droppedItems.forEach(item => {
            item.classList.add('correct');
            item.classList.add('correct-animation');
        });
        
        // Play success sound
        playSound('success');
        
        // Add particle effects to all items
        droppedItems.forEach(item => {
            createDragParticles(item, 'success');
        });
        
        // Show success notification
        showNotification('✅ ¡Excelente! ¡Orden correcto!', 'success');
        
        // Award XP
        awardXP(10);
        
        // Complete lesson
        completeLesson(currentModule, currentLessonIndex);
        
        // Add celebration animation
        setTimeout(() => {
            droppedItems.forEach(item => {
                item.classList.add('celebration');
            });
        }, 500);
        
    } else {
        // Incorrect answer
        droppedItems.forEach(item => {
            item.classList.add('incorrect');
            item.classList.add('incorrect-animation');
        });
        
        // Play error sound
        playSound('error');
        
        // Add particle effects
        droppedItems.forEach(item => {
            createDragParticles(item, 'error');
        });
        
        // Show error notification
        showNotification('❌ Orden incorrecto. ¡Inténtalo de nuevo!', 'error');
        
        // Add shake animation
        droppedItems.forEach(item => {
            item.classList.add('shake');
        });
        
        // Show correct order
        setTimeout(() => {
            showCorrectDragOrder(correctOrder);
        }, 1000);
    }
    
    // Show explanation with delay
    setTimeout(() => {
        showNotification(lesson.explanation, 'info');
        
        // Enable next button after explanation
        setTimeout(() => {
            if (nextLessonBtn) {
                nextLessonBtn.disabled = false;
                nextLessonBtn.style.opacity = '1';
                nextLessonBtn.classList.add('show');
            }
        }, 2000);
    }, 1500);
}

// Helper function to create drag particle effects
function createDragParticles(dragItem, type) {
    const particlesContainer = dragItem.querySelector('.drag-item-particles');
    if (!particlesContainer) return;
    
    const colors = type === 'success' ? ['#58cc02', '#4CAF50', '#8BC34A'] : ['#ff4b4b', '#f44336', '#e91e63'];
    
    for (let i = 0; i < 4; i++) {
        const particle = document.createElement('div');
        particle.className = 'drag-particle';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        const angle = (i / 4) * 2 * Math.PI;
        const velocity = 20 + Math.random() * 30;
        const x = Math.cos(angle) * velocity;
        const y = Math.sin(angle) * velocity;
        
        particle.style.setProperty('--x', x + 'px');
        particle.style.setProperty('--y', y + 'px');
        
        particlesContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 600);
    }
}

// Helper function to show correct drag order
function showCorrectDragOrder(correctOrder) {
    const dropZone = document.getElementById('dropZone');
    const dropZoneContent = dropZone.querySelector('.drop-zone-content');
    
    // Clear current items
    const currentItems = dropZone.querySelectorAll('.dropped-item');
    currentItems.forEach(item => item.remove());
    
    // Show correct order
    correctOrder.forEach((item, index) => {
        setTimeout(() => {
            const correctItem = document.createElement('div');
            correctItem.className = 'drag-item dropped-item correct-item';
            correctItem.dataset.item = item;
            correctItem.innerHTML = `
                <div class="drag-item-content">
                    <span class="drag-item-text">${item}</span>
                    <div class="drag-item-particles"></div>
                </div>
            `;
            
            dropZone.appendChild(correctItem);
            
            // Add entrance animation
            setTimeout(() => {
                correctItem.classList.add('show-correct');
            }, 50);
        }, index * 200);
    });
    
    // Hide drop zone content
    if (dropZoneContent) {
        dropZoneContent.style.display = 'none';
    }
}

function nextLesson() {
    if (!currentModule || !lessonData[currentModule]) {
        console.error('No module available');
        return;
    }
    
    currentLessonIndex++;
    
    // Check if we've completed all lessons in the module
    if (currentLessonIndex >= lessonData[currentModule].length) {
        completeModule();
        return;
    }
    
    // Load the next lesson
    loadLesson();
}

function completeModule() {
    // Show completion message
    const lessonContent = document.getElementById('lessonContent');
    if (lessonContent) {
        lessonContent.innerHTML = `
            <div class="module-completion text-center">
                <div class="completion-icon">
                    <i class="fas fa-trophy"></i>
                </div>
                <h3>¡Felicidades! Module Complete!</h3>
                <p>You've successfully completed the ${currentModule} module!</p>
                <div class="completion-stats">
                    <div class="stat">
                        <i class="fas fa-star"></i>
                        <span>+200 XP Earned</span>
                    </div>
                    <div class="stat">
                        <i class="fas fa-medal"></i>
                        <span>Module Badge Unlocked</span>
                    </div>
                </div>
                <button class="btn btn-primary btn-lg mt-3" onclick="closeLessonModal()">
                    <i class="fas fa-check"></i> Continue
                </button>
            </div>
        `;
    }
    
    // Award XP for module completion
    awardXP(200);
    
    // Update progress
    if (currentUser) {
        userProgress.modulesCompleted++;
        saveUserProgress();
    }
}

function closeLessonModal() {
    const lessonModal = bootstrap.Modal.getInstance(document.getElementById('lessonModal'));
    if (lessonModal) {
        lessonModal.hide();
    }
}

function awardXP(amount) {
    userProgress.totalXP += amount;
    
    if (currentUser) {
        saveUserData();
    } else {
        saveGoals();
    }
    
    updateProgressDisplay();
    updateGoalsProgress();
    updateGoalsSummary();
    updateOverallProgress();
    showXPNotification(amount);
}

function unlockAchievement(achievementName) {
    if (achievements[achievementName]) return;
    
    achievements[achievementName] = true;
    userProgress.achievementsUnlocked++;
    
    if (currentUser) {
        saveUserData();
    } else {
        saveGoals();
    }
    
    updateProgressDisplay();
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
        <div>
            <strong>Achievement Unlocked!</strong>
            <span>${getAchievementText(achievementName)}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// AI Chat Functions
function openAIChat() {
    console.log('Opening AI chat...');
    try {
        const aiChatModal = document.getElementById('aiChatModal');
        if (aiChatModal) {
            const modal = new bootstrap.Modal(aiChatModal);
            modal.show();
            
            // Clear chat messages
            const chatMessages = document.getElementById('chatMessages');
            if (chatMessages) {
                chatMessages.innerHTML = '';
            }
        } else {
            console.error('AI chat modal not found');
        }
    } catch (error) {
        console.error('Error opening AI chat:', error);
    }
}

function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    addChatMessage(message, 'user');
    input.value = '';
    
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

// UI Update Functions
function updateUI() {
    updateProgressDisplay();
    updateAchievementsDisplay();
    updateGoalsDisplay();
}

function updateProgressDisplay() {
    const progressElements = document.querySelectorAll('.progress-percentage');
    const xpElements = document.querySelectorAll('.xp-display');
    const streakElements = document.querySelectorAll('.streak-display');
    
    progressElements.forEach(el => {
        el.textContent = `${userProgress.lessonsCompleted}%`;
    });
    
    xpElements.forEach(el => {
        el.textContent = userProgress.totalXP;
    });
    
    streakElements.forEach(el => {
        el.textContent = userProgress.dayStreak;
    });
}

function updateAchievementsDisplay() {
    const achievementItems = document.querySelectorAll('.achievement-item');
    achievementItems.forEach(item => {
        const achievementName = item.getAttribute('data-achievement');
        if (achievements[achievementName]) {
            item.classList.remove('locked');
            item.classList.add('unlocked');
        }
    });
}

function updateGoalsDisplay() {
    const goalsContainer = document.querySelector('.goal-list');
    if (!goalsContainer) return;
    
    goalsContainer.innerHTML = '';
    
    goals.forEach((goal, index) => {
        const goalElement = document.createElement('div');
        goalElement.className = `goal-item ${goal.completed ? 'completed' : ''}`;
        goalElement.innerHTML = `
            <div class="goal-header">
                <div class="goal-icon ${goal.color}">
                    <i class="${goal.icon}"></i>
                </div>
                <div class="goal-info">
                    <div class="goal-title">${goal.text}</div>
                    <div class="goal-reward">
                        <i class="fas fa-star"></i>
                        <span>${goal.reward || 0} XP</span>
                    </div>
                </div>
                <div class="goal-status">
                    ${goal.completed ? 
                        '<div class="completed-icon"><i class="fas fa-check"></i></div>' : 
                        `<div class="goal-progress-ring">
                            <span>${goal.current || 0}/${goal.target || 0}</span>
                        </div>`
                    }
                </div>
            </div>
            <div class="goal-progress-container">
                <div class="goal-progress-bar">
                    <div class="progress-track">
                        <div class="progress-fill" style="width: ${Math.min(((goal.current || 0) / (goal.target || 1)) * 100, 100)}%"></div>
                    </div>
                    <div class="progress-text">${goal.current || 0} / ${goal.target || 0}</div>
                </div>
            </div>
            <div class="goal-actions">
                <button class="btn btn-sm btn-outline-primary" onclick="editGoal(${index})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteGoal(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        goalsContainer.appendChild(goalElement);
    });
    
    // Update the overall goals progress
    const goalsProgress = document.getElementById('goalsProgress');
    if (goalsProgress) {
        const completedGoals = goals.filter(goal => goal.completed).length || 0;
        const totalGoals = goals.length || 0;
        goalsProgress.textContent = `${completedGoals}/${totalGoals} Goals Completed`;
    }
    
    // Update goals summary
    updateGoalsSummary();
}

function updateGoalsSummary() {
    const completedGoals = goals.filter(goal => goal.completed).length || 0;
    const currentStreak = userProgress.dayStreak || 0;
    const totalXP = userProgress.totalXP || 0;
    
    // Update summary items with proper fallbacks
    const summaryItems = document.querySelectorAll('.summary-item strong');
    if (summaryItems.length >= 3) {
        summaryItems[0].textContent = completedGoals.toString();
        summaryItems[1].textContent = `${currentStreak} days`;
        summaryItems[2].textContent = totalXP.toString();
    }
    
    // Also update the goals progress text
    const goalsProgress = document.getElementById('goalsProgress');
    if (goalsProgress) {
        const totalGoals = goals.length || 0;
        goalsProgress.textContent = `${completedGoals}/${totalGoals} Goals Completed`;
    }
}

// Goals Management
function saveGoals() {
    localStorage.setItem('espanolProGoals', JSON.stringify(goals));
    localStorage.setItem('espanolProProgress', JSON.stringify(userProgress));
}

function loadGoals() {
    const savedGoals = localStorage.getItem('espanolProGoals');
    const savedProgress = localStorage.getItem('espanolProProgress');
    
    if (savedGoals) {
        goals = JSON.parse(savedGoals);
        // Ensure all goals have proper default values
        goals.forEach(goal => {
            goal.current = goal.current || 0;
            goal.target = goal.target || 1;
            goal.completed = goal.completed || false;
            goal.reward = goal.reward || 10;
        });
    } else {
        // Initialize with default goals if none exist
        goals = [
            {
                text: "Complete 5 lessons",
                type: "lessons",
                target: 5,
                current: 0,
                completed: false,
                reward: 50,
                icon: "fas fa-book",
                color: "primary"
            },
            {
                text: "Maintain a 3-day streak",
                type: "streak",
                target: 3,
                current: 0,
                completed: false,
                reward: 30,
                icon: "fas fa-fire",
                color: "warning"
            },
            {
                text: "Earn 100 XP",
                type: "xp",
                target: 100,
                current: 0,
                completed: false,
                reward: 25,
                icon: "fas fa-star",
                color: "success"
            }
        ];
    }
    
    if (savedProgress) {
        userProgress = JSON.parse(savedProgress);
        // Ensure userProgress has proper default values
        userProgress.lessonsCompleted = userProgress.lessonsCompleted || 0;
        userProgress.dayStreak = userProgress.dayStreak || 0;
        userProgress.totalXP = userProgress.totalXP || 0;
        userProgress.achievementsUnlocked = userProgress.achievementsUnlocked || 0;
        userProgress.modulesCompleted = userProgress.modulesCompleted || 0;
    } else {
        // Initialize with default progress if none exists
        userProgress = {
            lessonsCompleted: 0,
            dayStreak: 0,
            totalXP: 0,
            achievementsUnlocked: 0,
            modulesCompleted: 0,
            lastLoginDate: null
        };
    }
}

function updateGoalsProgress() {
    goals.forEach(goal => {
        switch (goal.type) {
            case 'lessons':
                goal.current = userProgress.lessonsCompleted;
                break;
            case 'streak':
                goal.current = userProgress.dayStreak;
                break;
            case 'xp':
                goal.current = userProgress.totalXP;
                break;
            case 'achievements':
                goal.current = userProgress.achievementsUnlocked;
                break;
            case 'module':
                goal.current = userProgress.modulesCompleted;
                break;
        }
        
        if (goal.current >= goal.target && !goal.completed) {
            goal.completed = true;
            completeGoal(goal);
        }
    });
    
    saveGoals();
    updateGoalsDisplay();
    updateGoalsSummary();
}

function completeGoal(goal) {
    userProgress.totalXP += goal.reward;
    showGoalCompletionNotification(goal);
    saveGoals();
    updateProgressDisplay();
}

function showGoalCompletionNotification(goal) {
    const notification = document.createElement('div');
    notification.className = 'goal-completion-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <div class="goal-icon ${goal.color}">
                <i class="${goal.icon}"></i>
            </div>
            <div class="notification-text">
                <h4>Goal Completed!</h4>
                <p>${goal.text}</p>
                <span class="reward">+${goal.reward} XP</span>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Lesson Completion
function completeLesson(moduleName, lessonIndex) {
    userProgress.lessonsCompleted++;
    
    const today = new Date().toDateString();
    if (userProgress.lastLoginDate !== today) {
        userProgress.dayStreak++;
        userProgress.lastLoginDate = today;
    }
    
    if (currentUser) {
        saveUserData();
    } else {
        saveGoals();
    }
    
    updateProgressDisplay();
    updateGoalsProgress();
    showLessonCompletionMessage();
}

function showLessonCompletionMessage() {
    const message = document.createElement('div');
    message.className = 'lesson-completion-message';
    message.innerHTML = `
        <div class="completion-content">
            <i class="fas fa-check-circle"></i>
            <h3>Lesson Completed!</h3>
            <p>Great job! You've completed another lesson.</p>
            <div class="completion-stats">
                <span>+10 XP</span>
                <span>Streak: ${userProgress.dayStreak} days</span>
            </div>
        </div>
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        message.classList.remove('show');
        setTimeout(() => message.remove(), 300);
    }, 3000);
}

function showXPNotification(amount) {
    const notification = document.createElement('div');
    notification.className = 'xp-notification';
    notification.innerHTML = `
        <div class="xp-content">
            <i class="fas fa-star"></i>
            <span>+${amount} XP</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 2000);
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
        saveUserData();
    } else {
        localStorage.setItem('espanolProDarkMode', darkMode.toString());
    }
}

function toggleDarkMode() {
    console.log('Toggling dark mode...');
    try {
        darkMode = !darkMode;
        applyDarkMode();
        saveDarkMode();
        updateDarkModeUI();
        
        const modeText = darkMode ? 'Dark Mode' : 'Light Mode';
        showNotification(`${modeText} enabled!`, 'info');
    } catch (error) {
        console.error('Error toggling dark mode:', error);
    }
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
    if (icon) {
        icon.className = darkMode ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Animation Functions
function initializeAnimations() {
    // Add any initialization animations here
}

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.module-card, .progress-overview, .stats-card').forEach(el => {
        observer.observe(el);
    });
}

function initializeModuleInteractions() {
    const moduleCards = document.querySelectorAll('.module-card');
    
    moduleCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function initializeGoalInteractions() {
    // Add goal interaction handlers if needed
}

function updateOverallProgress() {
    // Calculate total lessons across all modules
    const totalLessons = 75; // 20 + 25 + 30 lessons
    const completedLessons = userProgress.lessonsCompleted || 0;
    const percentage = Math.round((completedLessons / totalLessons) * 100);
    
    const progressCircle = document.querySelector('.progress-circle');
    if (progressCircle) {
        progressCircle.style.background = `conic-gradient(#58cc02 ${percentage * 3.6}deg, #e9ecef ${percentage * 3.6}deg)`;
    }
    
    const progressPercentage = document.querySelector('.progress-percentage');
    if (progressPercentage) {
        progressPercentage.textContent = `${percentage}%`;
    }
    
    // Update progress lessons display
    const progressLessons = document.querySelector('.progress-lessons');
    if (progressLessons) {
        progressLessons.textContent = `${completedLessons}/${totalLessons}`;
    }
    
    // Update progress stats
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length >= 3) {
        // Completed lessons
        statNumbers[0].textContent = completedLessons.toString();
        
        // Estimated hours (assuming 10 minutes per lesson)
        const estimatedHours = Math.round((completedLessons * 10) / 60);
        statNumbers[1].textContent = estimatedHours.toString();
        
        // Total XP
        const totalXP = userProgress.totalXP || 0;
        statNumbers[2].textContent = totalXP.toString();
    }
    
    // Also update the stats display
    updateStatsDisplay();
}

function updateStatsDisplay() {
    const statValues = document.querySelectorAll('.stat-value');
    
    statValues.forEach(stat => {
        const targetValue = parseInt(stat.getAttribute('data-target') || '0');
        animateNumber(stat, 0, targetValue);
    });
}

function animateNumber(element, start, end) {
    const duration = 1000;
    const increment = (end - start) / (duration / 16);
    let current = start;
    
    const animate = () => {
        current += increment;
        if (current >= end) {
            current = end;
        }
        
        element.textContent = Math.round(current);
        
        if (current < end) {
            requestAnimationFrame(animate);
        }
    };
    
    animate();
}

function updateAchievementCount() {
    const unlockedCount = Object.values(achievements).filter(Boolean).length;
    const totalCount = Object.keys(achievements).length;
    
    const achievementCounters = document.querySelectorAll('.achievement-count');
    achievementCounters.forEach(counter => {
        counter.textContent = `${unlockedCount}/${totalCount}`;
    });
}

// Goal Management Functions
function addGoal() {
    const goalText = prompt('Enter goal text:');
    if (!goalText) return;
    
    const newGoal = {
        id: nextGoalId++,
        text: goalText,
        type: 'custom',
        target: 1,
        current: 0,
        completed: false,
        reward: 25,
        icon: 'fas fa-bullseye',
        color: 'primary'
    };
    
    goals.push(newGoal);
    saveGoals();
    updateGoalsDisplay();
    showNotification('Goal added successfully!', 'success');
}

function editGoal(goalId) {
    const goal = goals.find(g => g.id === goalId);
    if (!goal) return;
    
    const newText = prompt('Edit goal text:', goal.text);
    if (!newText) return;
    
    goal.text = newText;
    saveGoals();
    updateGoalsDisplay();
    showNotification('Goal updated successfully!', 'success');
}

function deleteGoal(goalId) {
    if (!confirm('Are you sure you want to delete this goal?')) return;
    
    goals = goals.filter(g => g.id !== goalId);
    saveGoals();
    updateGoalsDisplay();
    showNotification('Goal deleted successfully!', 'success');
}

function resetProgress() {
    if (!confirm('Are you sure you want to reset all progress? This cannot be undone.')) return;
    
    userProgress = {
        totalXP: 0,
        dayStreak: 0,
        lessonsCompleted: 0,
        achievementsUnlocked: 0,
        modulesCompleted: 0,
        lastLoginDate: null,
        goalProgress: {}
    };
    
    achievements = {
        firstLesson: false,
        perfectScore: false,
        weekStreak: false
    };
    
    goals.forEach(goal => {
        goal.current = 0;
        goal.completed = false;
    });
    
    if (currentUser) {
        saveUserData();
    } else {
        saveGoals();
    }
    
    updateUI();
    showNotification('Progress reset successfully!', 'info');
}

// Add missing chat handlers
function setupChatHandlers() {
    const chatInput = document.getElementById('chatInput');
    const sendChatBtn = document.querySelector('#aiChatModal .btn-primary');
    
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendChatMessage();
            }
        });
    }
    
    if (sendChatBtn) {
        sendChatBtn.addEventListener('click', function(e) {
            e.preventDefault();
            sendChatMessage();
        });
    }
}

function resetDragDrop() {
    const dropZone = document.getElementById('dropZone');
    const dragItems = document.getElementById('dragItems');
    
    if (dropZone && dragItems) {
        // Move all items back to drag area
        const droppedItems = Array.from(dropZone.children).filter(child => child.classList.contains('drag-item'));
        droppedItems.forEach(item => {
            dragItems.appendChild(item);
        });
        
        // Clear drop zone content and show original content
        dropZone.innerHTML = `
            <div class="drop-zone-content">
                <i class="fas fa-arrow-down"></i>
                <p>Drop items here in the correct order</p>
            </div>
        `;
        
        // Re-setup drag and drop
        setTimeout(() => {
            setupDragAndDrop();
        }, 100);
    }
}

// Helper function to update progress bar
function updateProgressBar() {
    const progressFill = document.querySelector('.exercise-progress .progress-fill');
    if (progressFill && currentModule && lessonData[currentModule]) {
        const progress = ((currentLessonIndex + 1) / lessonData[currentModule].length) * 100;
        progressFill.style.width = progress + '%';
    }
} 