const phaseSelect = document.getElementById('phaseSelect');
const specialtySelect = document.getElementById('specialtySelect');
const semesterSelect = document.getElementById('semesterSelect');
const specGroup = document.getElementById('specGroup');
const semesterGroup = document.getElementById('semesterGroup');
const subjectsContainer = document.getElementById('subjectsContainer');
const resultsSection = document.getElementById('resultsSection');
const subjectsSection = document.getElementById('subjectsSection');
const calcBtn = document.getElementById('calcBtn');
const resetBtn = document.getElementById('resetBtn');
const semesterScoreEl = document.getElementById('semesterScore');
const statusMsg = document.getElementById('statusMsg');
const themeToggle = document.getElementById('themeToggle');
const progressBar = document.getElementById('progressBar');
const prevSemInput = document.getElementById('prevSemInput');
const annualScore = document.getElementById('annualScore');
const calcAnnualBtn = document.getElementById('calcAnnualBtn');

const printSection = document.getElementById('printSection');
const showPrintBtn = document.getElementById('showPrintBtn');
const closePrintBtn = document.getElementById('closePrintBtn');
const printBtn = document.getElementById('printBtn');
const savePdfBtn = document.getElementById('savePdfBtn');
const printSubjectsTable = document.getElementById('printSubjectsTable');
const printTotalAverage = document.getElementById('printTotalAverage');
const printTotalPoints = document.getElementById('printTotalPoints');
const printFinalGPA = document.getElementById('printFinalGPA');
const printStatus = document.getElementById('printStatus');
const printSpecialty = document.getElementById('printSpecialty');
const printSemester = document.getElementById('printSemester');
const printDate = document.getElementById('printDate');

const TYPES = {
    STD: { tp: 0.2, td: 0.2, exam: 0.6 }, 
    TD_EX: { td: 0.4, exam: 0.6 },        
    TP_EX: { tp: 0.4, exam: 0.6 },        
    EX_ONLY: { exam: 1.0 },               
    PROJ: { exam: 1.0, isProject: true }, 
    HALF: { tp: 0.5, exam: 0.5 },         
    HALF_TD: { td: 0.5, exam: 0.5 }       
};

const curriculum = {
    prep: {
        s1: [
            { name: "Algorithmique 1", coef: 5, type: TYPES.STD },
            { name: "Structure machine", coef: 4, type: TYPES.TD_EX },
            { name: "Intro OS 1", coef: 3, type: TYPES.TP_EX },
            { name: "Analyse 1", coef: 3, type: TYPES.TD_EX },
            { name: "Algèbre 1", coef: 3, type: TYPES.TD_EX },
            { name: "Electronique", coef: 1, type: TYPES.EX_ONLY },
            { name: "Tech d'expression", coef: 1, type: TYPES.HALF }
        ],
        s2: [
            { name: "Algorithmique 2", coef: 4, type: TYPES.STD },
            { name: "Architecture Ordi", coef: 4, type: TYPES.STD },
            { name: "Analyse 2", coef: 3, type: TYPES.TD_EX },
            { name: "Algèbre 2", coef: 3, type: TYPES.TD_EX },
            { name: "Logique Math", coef: 3, type: TYPES.TD_EX },
            { name: "Proba & Stat 1", coef: 2, type: TYPES.TD_EX },
            { name: "Tech Expression 2", coef: 1, type: TYPES.EX_ONLY }
        ],
        s3: [
            { name: "Algorithmique 3", coef: 4, type: TYPES.STD },
            { name: "POO 1", coef: 4, type: TYPES.TP_EX },
            { name: "Intro SI", coef: 3, type: TYPES.TD_EX },
            { name: "Algèbre 3", coef: 3, type: TYPES.TD_EX },
            { name: "Analyse 3", coef: 3, type: TYPES.TD_EX },
            { name: "Proba & Stat 2", coef: 2, type: TYPES.TD_EX },
            { name: "Entrepreneuriat", coef: 1, type: TYPES.EX_ONLY }
        ],
        s4: [
            { name: "POO 2", coef: 4, type: TYPES.TP_EX },
            { name: "Intro OS 2", coef: 4, type: TYPES.STD },
            { name: "Réseaux Info", coef: 3, type: TYPES.STD },
            { name: "Bases de données", coef: 3, type: TYPES.STD },
            { name: "Théorie Langages", coef: 3, type: TYPES.TD_EX },
            { name: "Théorie Graphes", coef: 2, type: TYPES.TD_EX },
            { name: "Déontologie", coef: 1, type: TYPES.EX_ONLY }
        ]
    },
    ds: {
        s5: [
            { name: "Compilation", coef: 3, type: TYPES.STD },
            { name: "Réseaux Avancés", coef: 3, type: TYPES.TD_EX },
            { name: "Prog Avancée", coef: 3, type: TYPES.TP_EX },
            { name: "Fondements IA", coef: 3, type: TYPES.STD },
            { name: "Analyse Données", coef: 3, type: TYPES.STD },
            { name: "Fondement DS", coef: 2, type: TYPES.TD_EX },
            { name: "Génie Logiciel", coef: 2, type: TYPES.TP_EX },
            { name: "Innovation", coef: 1, type: TYPES.EX_ONLY }
        ],
        s6: [
            { name: "BDD Avancées", coef: 3, type: TYPES.STD },
            { name: "Prog Web Avancée", coef: 3, type: TYPES.STD },
            { name: "Sécurité Données", coef: 3, type: TYPES.TD_EX },
            { name: "Machine Learning 1", coef: 4, type: TYPES.STD },
            { name: "Analyse Données Adv", coef: 3, type: TYPES.STD },
            { name: "Méthodes Num", coef: 3, type: TYPES.STD },
            { name: "Cybersécurité", coef: 1, type: TYPES.TD_EX }
        ],
        s7: [
            { name: "Stat en DS", coef: 4, type: TYPES.STD },
            { name: "Prog Linéaire", coef: 4, type: TYPES.STD },
            { name: "Machine Learning 2", coef: 4, type: TYPES.STD },
            { name: "Visualisation", coef: 3, type: TYPES.STD },
            { name: "Gestion Projet DS", coef: 2, type: TYPES.TD_EX },
            { name: "DEVOPS", coef: 2, type: TYPES.TP_EX },
            { name: "Ethique", coef: 1, type: TYPES.EX_ONLY }
        ],
        s8: [
            { name: "Gestion Incertain", coef: 3, type: TYPES.STD },
            { name: "Tech Prédiction", coef: 3, type: TYPES.STD },
            { name: "Deep Learning", coef: 3, type: TYPES.STD },
            { name: "IA Générative", coef: 3, type: TYPES.STD },
            { name: "NLP", coef: 2, type: TYPES.TP_EX },
            { name: "Traitement Image", coef: 2, type: TYPES.TP_EX },
            { name: "Projet Pluri", coef: 3, type: TYPES.PROJ },
            { name: "Blockchain", coef: 1, type: TYPES.EX_ONLY }
        ],
        s9: [
            { name: "Système Aide Décision", coef: 3, type: TYPES.STD },
            { name: "Big Data", coef: 3, type: TYPES.STD },
            { name: "Calcul Intensif", coef: 3, type: TYPES.TP_EX },
            { name: "Optimisation Adv", coef: 3, type: TYPES.STD },
            { name: "Cloud Computing", coef: 2, type: TYPES.TP_EX },
            { name: "App Avancées DS", coef: 3, type: TYPES.TP_EX },
            { name: "Syst Recommandation", coef: 2, type: TYPES.TP_EX },
            { name: "Rédaction Sci", coef: 1, type: TYPES.EX_ONLY }
        ],
        s10: [
            { name: "Mémoire de fin d'études", coef: 1, type: TYPES.PROJ }
        ]
    },
    gl: {
        s5: [
            { name: "Algo & Complexité Adv", coef: 4, type: TYPES.STD },
            { name: "Génie Logiciel (GL)", coef: 4, type: TYPES.STD },
            { name: "BDD Admin/Archi", coef: 4, type: TYPES.TP_EX },
            { name: "Système Expl (Sync)", coef: 3, type: TYPES.STD },
            { name: "Tech Optimisation", coef: 3, type: TYPES.TD_EX },
            { name: "Fondements IA", coef: 2, type: TYPES.TP_EX }
        ],
        s6: [
            { name: "Conception Logiciels", coef: 4, type: TYPES.STD },
            { name: "Prog WEB (PWEB)", coef: 3, type: TYPES.TP_EX },
            { name: "BDD Optimisation", coef: 3, type: TYPES.STD },
            { name: "Compilation 1", coef: 4, type: TYPES.STD },
            { name: "Analyse Numérique", coef: 4, type: TYPES.TD_EX },
            { name: "Intro Sécurité", coef: 2, type: TYPES.STD }
        ],
        s7: [
            { name: "Concepts Adv BD", coef: 3, type: TYPES.STD },
            { name: "Gestion Projets", coef: 3, type: TYPES.TP_EX },
            { name: "Web Adv & Micro", coef: 2, type: TYPES.TP_EX },
            { name: "Data-Mining", coef: 3, type: TYPES.STD },
            { name: "Compilation 2", coef: 3, type: TYPES.STD },
            { name: "Management Agile", coef: 2, type: TYPES.TP_EX },
            { name: "Réseaux & Proto", coef: 2, type: TYPES.TP_EX },
            { name: "IHM", coef: 2, type: TYPES.TP_EX }
        ],
        s8: [
            { name: "Archi SI Adv", coef: 3, type: TYPES.STD },
            { name: "Big-Data & NoSQL", coef: 3, type: TYPES.STD },
            { name: "Archi Logicielles", coef: 2, type: TYPES.TP_EX },
            { name: "Procédés Logiciels", coef: 3, type: TYPES.STD },
            { name: "Test Logiciel / QA", coef: 2, type: TYPES.TP_EX },
            { name: "Modélisation Perf", coef: 2, type: TYPES.TD_EX },
            { name: "SE Mobiles", coef: 2, type: TYPES.TP_EX },
            { name: "Projet Pluri", coef: 3, type: TYPES.PROJ }
        ],
        s9: [
            { name: "Méthodes Formelles", coef: 3, type: TYPES.STD },
            { name: "Logiciels Embarqués", coef: 3, type: TYPES.TP_EX },
            { name: "Jeux Vidéo", coef: 3, type: TYPES.TP_EX },
            { name: "IoT", coef: 3, type: TYPES.STD },
            { name: "DevOps & Cloud", coef: 3, type: TYPES.TP_EX },
            { name: "Sécurité Logicielle", coef: 2, type: TYPES.TP_EX },
            { name: "Dev Mobile", coef: 2, type: TYPES.TP_EX },
            { name: "Aspects Juridiques", coef: 1, type: TYPES.EX_ONLY }
        ],
        s10: [
            { name: "Mémoire de fin d'études", coef: 1, type: TYPES.PROJ }
        ]
    },

    ai: {
        s5: [
            { name: "Archi & Admin BDD", coef: 4, type: TYPES.TP_EX },
            { name: "Compilation", coef: 4, type: TYPES.TD_EX },
            { name: "Prog Linéaire & Dyn", coef: 3, type: TYPES.TD_EX },
            { name: "Analyse numérique 1", coef: 2, type: TYPES.TD_EX },
            { name: "Fondements de l'IA", coef: 3, type: TYPES.TP_EX },
            { name: "Génie logiciel", coef: 2, type: TYPES.TD_EX },
            { name: "Module optionnel", coef: 2, type: TYPES.TP_EX }
        ],
        s6: [
            { name: "Réseaux avancés", coef: 3, type: TYPES.STD },
            { name: "SE: Sync & Comm", coef: 4, type: TYPES.STD },
            { name: "Gestion de projets", coef: 4, type: TYPES.STD },
            { name: "Programmation WEB", coef: 3, type: TYPES.STD },
            { name: "Analyse numérique 2", coef: 2, type: TYPES.STD },
            { name: "Intro sécurité info", coef: 2, type: TYPES.STD },
            { name: "Ethique de l'IA", coef: 2, type: TYPES.EX_ONLY }
        ],
        s7: [
            { name: "Repr des connaissances", coef: 4, type: TYPES.STD },
            { name: "Calcul HPC", coef: 3, type: TYPES.STD },
            { name: "Machine Learning", coef: 4, type: TYPES.TP_EX },
            { name: "Modélisation & Sim", coef: 3, type: TYPES.STD },
            { name: "Business Intelligence", coef: 2, type: TYPES.TP_EX },
            { name: "Recherche Opérationnelle", coef: 2, type: TYPES.STD },
            { name: "Techniques de rédaction", coef: 2, type: TYPES.TP_EX }
        ],
        s8: [
            { name: "TALN (NLP)", coef: 3, type: TYPES.TD_EX },
            { name: "Deep Learning", coef: 4, type: TYPES.STD },
            { name: "Sécurité des données", coef: 3, type: TYPES.TD_EX },
            { name: "Analyse/Trait Image", coef: 3, type: TYPES.TD_EX },
            { name: "Calcul Distribué", coef: 2, type: TYPES.TD_EX },
            { name: "Massive Data", coef: 2, type: TYPES.TD_EX },
            { name: "Projet pluridisciplinaire", coef: 3, type: TYPES.PROJ }
        ],
        s9: [
            { name: "Visualisation de données", coef: 4, type: TYPES.TP_EX },
            { name: "Vision par ordinateur", coef: 3, type: TYPES.TP_EX },
            { name: "Generative AI", coef: 4, type: TYPES.TP_EX },
            { name: "Méthodes bio-inspirées", coef: 3, type: TYPES.STD },
            { name: "Blockchain", coef: 2, type: TYPES.TD_EX },
            { name: "Recherche d'info", coef: 2, type: TYPES.TD_EX },
            { name: "Séminaire & workshops", coef: 2, type: TYPES.EX_ONLY }
        ],
        s10: [{ name: "Mémoire", coef: 1, type: TYPES.PROJ }]
    },

    networks: {
        s5: [
            { name: "SE: Sync & Comm", coef: 4, type: TYPES.STD },
            { name: "Réseaux avancés 1", coef: 4, type: TYPES.STD },
            { name: "BDD Avancées", coef: 3, type: TYPES.STD },
            { name: "Compilation", coef: 3, type: TYPES.STD },
            { name: "IHM", coef: 2, type: TYPES.TD_EX },
            { name: "Modélisation SI", coef: 2, type: TYPES.TD_EX },
            { name: "Technologie Web", coef: 2, type: TYPES.TD_EX }
        ],
        s6: [
            { name: "Systèmes distribués", coef: 4, type: TYPES.STD },
            { name: "Réseaux avancés 2", coef: 4, type: TYPES.STD },
            { name: "Algo & Complexité Adv", coef: 3, type: TYPES.STD },
            { name: "Génie logiciel", coef: 3, type: TYPES.STD },
            { name: "Introduction à l'IA", coef: 3, type: TYPES.STD },
            { name: "Analyse numérique", coef: 2, type: TYPES.STD },
            { name: "Economie numérique", coef: 1, type: TYPES.EX_ONLY }
        ],
        s7: [
            { name: "Admin Systèmes/Réseaux", coef: 3, type: TYPES.STD },
            { name: "Virtualisation", coef: 4, type: TYPES.TP_EX },
            { name: "Cryptographie", coef: 4, type: TYPES.STD },
            { name: "Perf Réseaux", coef: 3, type: TYPES.STD },
            { name: "Machine Learning", coef: 3, type: TYPES.STD },
            { name: "Traitement du signal", coef: 2, type: TYPES.TD_EX },
            { name: "Soft-Skills", coef: 1, type: TYPES.EX_ONLY }
        ],
        s8: [
            { name: "Cloud Computing", coef: 3, type: TYPES.STD },
            { name: "Réseaux Sans Fil", coef: 4, type: TYPES.STD },
            { name: "Sécurité Réseaux/Syst", coef: 3, type: TYPES.STD },
            { name: "Optimisation Réseaux", coef: 3, type: TYPES.STD },
            { name: "Développement mobile", coef: 2, type: TYPES.STD },
            { name: "Systèmes embarqués", coef: 2, type: TYPES.PROJ },
            { name: "Projet pluridisciplinaire", coef: 3, type: TYPES.PROJ }
        ],
        s9: [
            { name: "IoT & Apps", coef: 4, type: TYPES.TP_EX },
            { name: "Sécurité Syst/Réseaux", coef: 4, type: TYPES.STD },
            { name: "Multimédia & QoS", coef: 3, type: TYPES.STD },
            { name: "Micro-services", coef: 3, type: TYPES.TP_EX },
            { name: "Gestion de projets", coef: 3, type: TYPES.STD },
            { name: "Business Intelligence", coef: 2, type: TYPES.TP_EX },
            { name: "Aspect Juridique", coef: 1, type: TYPES.EX_ONLY }
        ],
        s10: [{ name: "Mémoire", coef: 1, type: TYPES.PROJ }]
    },

    security: {
        s5: [
            { name: "Math for Crypto", coef: 4, type: TYPES.HALF },
            { name: "Operational Research", coef: 4, type: TYPES.HALF },
            { name: "Compilation", coef: 4, type: TYPES.HALF },
            { name: "Software Engineering", coef: 2, type: TYPES.TP_EX },
            { name: "Python Programming", coef: 2, type: TYPES.TD_EX },
            { name: "Web Development", coef: 2, type: TYPES.TP_EX },
            { name: "Info Theory & Coding", coef: 1, type: TYPES.TD_EX },
            { name: "Business Intelligence", coef: 1, type: TYPES.EX_ONLY }
        ],
        s6: [
            { name: "Advanced Crypto", coef: 4, type: TYPES.HALF },
            { name: "Modeling & Sim", coef: 3, type: TYPES.HALF },
            { name: "Cloud Computing", coef: 3, type: TYPES.TP_EX },
            { name: "Advanced Databases", coef: 3, type: TYPES.HALF },
            { name: "Mobile Development", coef: 2, type: TYPES.TP_EX },
            { name: "Signal Processing", coef: 3, type: TYPES.HALF },
            { name: "AI Principles", coef: 1, type: TYPES.TD_EX },
            { name: "Startup Development", coef: 1, type: TYPES.EX_ONLY }
        ],
        s7: [
            { name: "Adv Operating Systems", coef: 3, type: TYPES.TP_EX },
            { name: "Advanced Networks", coef: 4, type: TYPES.HALF },
            { name: "Comp Systems Security", coef: 3, type: TYPES.TP_EX },
            { name: "Info & Data Security", coef: 3, type: TYPES.TP_EX },
            { name: "Prog by Constraint", coef: 2, type: TYPES.TD_EX },
            { name: "ML/DL & Security", coef: 2, type: TYPES.TP_EX },
            { name: "Malwares Analysis", coef: 2, type: TYPES.TP_EX },
            { name: "Critical Thinking", coef: 1, type: TYPES.EX_ONLY }
        ],
        s8: [
            { name: "OS Security", coef: 3, type: TYPES.TD_EX },
            { name: "Cybersecurity", coef: 3, type: TYPES.TD_EX },
            { name: "Network Security", coef: 4, type: TYPES.HALF_TD },
            { name: "Wireless Security", coef: 3, type: TYPES.TP_EX },
            { name: "Access Management", coef: 1, type: TYPES.TD_EX },
            { name: "Secure SW Dev", coef: 2, type: TYPES.HALF },
            { name: "Innovation/Entrep", coef: 1, type: TYPES.EX_ONLY },
            { name: "Multidisc. Project", coef: 3, type: TYPES.PROJ }
        ],
        s9: [
            { name: "Web/Mobile Security", coef: 4, type: TYPES.TD_EX },
            { name: "Embedded Sys Security", coef: 4, type: TYPES.TD_EX },
            { name: "Digital Forensics", coef: 3, type: TYPES.TD_EX },
            { name: "DevOps", coef: 3, type: TYPES.TD_EX },
            { name: "Ethical Hacking", coef: 2, type: TYPES.TD_EX },
            { name: "Project Management", coef: 2, type: TYPES.TD_EX },
            { name: "Emerging Tech", coef: 1, type: TYPES.EX_ONLY },
            { name: "Academic Comm", coef: 1, type: TYPES.EX_ONLY }
        ],
        s10: [{ name: "Mémoire", coef: 1, type: TYPES.PROJ }]
    },

    si: {
        s5: [
            { name: "BDD Avancées", coef: 3, type: TYPES.STD },
            { name: "Génie logiciel", coef: 3, type: TYPES.TD_EX },
            { name: "SI Avancés 1", coef: 3, type: TYPES.TD_EX },
            { name: "Compilation", coef: 3, type: TYPES.STD },
            { name: "Réseaux & Protocoles", coef: 2, type: TYPES.TP_EX },
            { name: "Repr Connaissances", coef: 2, type: TYPES.STD },
            { name: "Recherche Opérationnelle", coef: 2, type: TYPES.TD_EX },
            { name: "Recherche d'info", coef: 2, type: TYPES.TP_EX }
        ],
        s6: [
            { name: "BDD NoSQL", coef: 3, type: TYPES.TP_EX },
            { name: "Conception Logiciels", coef: 3, type: TYPES.STD },
            { name: "SI Avancés 2", coef: 3, type: TYPES.STD },
            { name: "Transformation Digitale", coef: 3, type: TYPES.STD },
            { name: "Réseaux avancés", coef: 2, type: TYPES.TP_EX },
            { name: "Web sémantique", coef: 2, type: TYPES.TP_EX },
            { name: "Analyse de Données", coef: 2, type: TYPES.TD_EX },
            { name: "Syst Recommandation", coef: 2, type: TYPES.TP_EX }
        ],
        s7: [
            { name: "ERP", coef: 3, type: TYPES.TP_EX },
            { name: "Développement Web", coef: 3, type: TYPES.TP_EX },
            { name: "Ingénierie Exigences", coef: 3, type: TYPES.TD_EX },
            { name: "Interopérabilité SI", coef: 3, type: TYPES.STD },
            { name: "Sécurité Info", coef: 3, type: TYPES.STD },
            { name: "Fondements de l'IA", coef: 3, type: TYPES.STD },
            { name: "Ingénierie Systèmes", coef: 2, type: TYPES.TD_EX }
        ],
        s8: [
            { name: "Archi & Gestion SI", coef: 3, type: TYPES.TD_EX },
            { name: "Développement mobile", coef: 3, type: TYPES.TP_EX },
            { name: "Architectures logicielles", coef: 2, type: TYPES.TD_EX },
            { name: "Big Data Analytics", coef: 3, type: TYPES.TP_EX },
            { name: "Sécurité des SI", coef: 2, type: TYPES.STD },
            { name: "ML & DL", coef: 2, type: TYPES.STD },
            { name: "Projet pluridisciplinaire", coef: 3, type: TYPES.PROJ },
            { name: "Fondements Data Science", coef: 2, type: TYPES.STD }
        ],
        s9: [
            { name: "IHM", coef: 3, type: TYPES.TP_EX },
            { name: "Blockchain", coef: 3, type: TYPES.TP_EX },
            { name: "DevOps & Cloud", coef: 3, type: TYPES.TD_EX },
            { name: "IoT", coef: 3, type: TYPES.TD_EX },
            { name: "Business Intelligence", coef: 3, type: TYPES.TD_EX },
            { name: "Gestion Projets", coef: 3, type: TYPES.TD_EX },
            { name: "Aspect Juridique", coef: 2, type: TYPES.EX_ONLY }
        ],
        s10: [{ name: "Mémoire", coef: 1, type: TYPES.PROJ }]
    }
};

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (savedTheme === 'auto' && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
    
    updateThemeToggleIcon();
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    updateThemeToggleIcon();
    
    themeToggle.classList.add('pulse');
    setTimeout(() => {
        themeToggle.classList.remove('pulse');
    }, 500);
}

function updateThemeToggleIcon() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const sunIcon = themeToggle.querySelector('.fa-sun');
    const moonIcon = themeToggle.querySelector('.fa-moon');
    
    if (currentTheme === 'dark') {
        sunIcon.style.opacity = '0';
        moonIcon.style.opacity = '1';
    } else {
        sunIcon.style.opacity = '1';
        moonIcon.style.opacity = '0';
    }
}

function updateProgressBar() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = scrollTop / docHeight * 100;
    
    progressBar.style.width = scrollPercent + '%';
}

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    window.addEventListener('scroll', updateProgressBar);
    updateProgressBar();
    loadSavedData();
});

themeToggle.addEventListener('click', toggleTheme);

phaseSelect.addEventListener('change', (e) => {
    const phase = e.target.value;
    
    resetUI();
    updateProgress(phase ? 25 : 0);
    
    if (phase === 'prep') {
        specGroup.classList.add('hidden');
        populateSemesters(['s1', 's2', 's3', 's4']);
        semesterGroup.classList.remove('hidden');
    } else if (phase === 'spec') {
        specGroup.classList.remove('hidden');
        semesterGroup.classList.add('hidden');
        updateProgress(50);
    }
    
    saveToLocalStorage();
});

specialtySelect.addEventListener('change', () => {
    if (phaseSelect.value === 'spec') {
        populateSemesters(['s5', 's6', 's7', 's8', 's9', 's10']);
        semesterGroup.classList.remove('hidden');
        subjectsContainer.innerHTML = createEmptyState('اختر الفصل الدراسي لعرض المواد');
        resultsSection.classList.add('hidden');
        updateProgress(75);
        saveToLocalStorage();
    }
});

semesterSelect.addEventListener('change', () => {
    renderSubjects();
    updateProgress(100);
    saveToLocalStorage();
});

calcBtn.addEventListener('click', calculateResult);
resetBtn.addEventListener('click', resetInputs);

calcAnnualBtn.addEventListener('click', calculateAnnualAverage);

if (showPrintBtn) {
    showPrintBtn.addEventListener('click', showPrintView);
}

if (closePrintBtn) {
    closePrintBtn.addEventListener('click', () => {
        printSection.classList.add('hidden');
    });
}

if (printBtn) {
    printBtn.addEventListener('click', printTranscript);
}

if (savePdfBtn) {
    savePdfBtn.addEventListener('click', saveAsPDF);
}

document.addEventListener('input', (e) => {
    if (e.target.classList.contains('mark-input')) {
        validateMarkInput(e.target);
    }
});


function updateProgress(percent) {
    progressBar.style.width = percent + '%';
}

function createEmptyState(message) {
    return `
        <div class="empty-state">
            <div class="empty-icon">
                <i class="fas fa-clipboard-list"></i>
            </div>
            <h3>${message}</h3>
            <p>اختر الخيارات المناسبة للمتابعة</p>
        </div>
    `;
}

function resetUI() {
    subjectsContainer.innerHTML = createEmptyState('ابدأ باختيار المسار الدراسي');
    resultsSection.classList.add('hidden');
    semesterSelect.innerHTML = '<option value="">-- اختر الفصل --</option>';
    
    statusMsg.innerHTML = `
        <i class="fas fa-info-circle"></i>
        <span>ادخل العلامات ثم اضغط على "حساب المعدل"</span>
    `;
    
    semesterScoreEl.textContent = '0.00';
    annualScore.textContent = '--';
    prevSemInput.value = '';
}

function resetInputs() {
    document.querySelectorAll('.mark-input').forEach(input => {
        input.value = '';
        input.style.borderColor = '';
    });
    
    semesterScoreEl.textContent = '0.00';
    annualScore.textContent = '--';
    prevSemInput.value = '';
    
    statusMsg.innerHTML = `
        <i class="fas fa-info-circle"></i>
        <span>ادخل العلامات ثم اضغط على "حساب المعدل"</span>
    `;
    
    resetBtn.classList.add('pulse');
    setTimeout(() => {
        resetBtn.classList.remove('pulse');
    }, 500);
}

function populateSemesters(sems) {
    semesterSelect.innerHTML = '<option value="">-- اختر الفصل --</option>';
    
    sems.forEach(sem => {
        const option = document.createElement('option');
        option.value = sem;
        
        const semNumber = sem.replace('s', '');
        let semName = '';
        
        if (semNumber === '1' || semNumber === '2') {
            semName = `الفصل ${semNumber} (السنة الأولى)`;
        } else if (semNumber === '3' || semNumber === '4') {
            semName = `الفصل ${semNumber} (السنة الثانية)`;
        } else if (semNumber === '5' || semNumber === '6') {
            semName = `الفصل ${semNumber} (السنة الثالثة)`;
        } else if (semNumber === '7' || semNumber === '8') {
            semName = `الفصل ${semNumber} (السنة الرابعة)`;
        } else if (semNumber === '9' || semNumber === '10') {
            semName = `الفصل ${semNumber} (السنة الخامسة)`;
        }
        
        option.textContent = semName;
        semesterSelect.appendChild(option);
    });
}

function renderSubjects() {
    const phase = phaseSelect.value;
    const spec = specialtySelect.value;
    const sem = semesterSelect.value;
    
    if (!sem) return;
    
    let subjects = [];
    if (phase === 'prep') {
        subjects = curriculum.prep[sem];
    } else {
        subjects = curriculum[spec][sem];
    }
    
    subjectsContainer.innerHTML = '';
    
    subjects.forEach((sub, index) => {
        const card = document.createElement('div');
        card.className = 'subject-card fade-in';
        card.style.animationDelay = `${index * 0.05}s`;
        card.dataset.coef = sub.coef;
        card.dataset.type = JSON.stringify(sub.type);
        
        let inputsHtml = '';
        
        if (sub.type.isProject) {
            inputsHtml += createInput('exam', 'علامة المشروع', '100%');
        } else {
            if (sub.type.tp) inputsHtml += createInput('tp', `TP`, `${sub.type.tp * 100}%`);
            if (sub.type.td) inputsHtml += createInput('td', `TD`, `${sub.type.td * 100}%`);
            if (sub.type.exam) inputsHtml += createInput('exam', `EXAM`, `${sub.type.exam * 100}%`);
        }
        
        card.innerHTML = `
            <div class="subject-header">
                <span class="subject-title">${sub.name}</span>
                <span class="subject-coef">معامل: ${sub.coef}</span>
            </div>
            <div class="inputs-container">
                ${inputsHtml}
            </div>
        `;
        
        subjectsContainer.appendChild(card);
    });
    
    resultsSection.classList.remove('hidden');
    subjectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function createInput(name, label, percentage) {
    return `
        <div class="input-group">
            <label>${label} <small>(${percentage})</small></label>
            <input type="number" class="mark-input" data-key="${name}" 
                   step="0.01" min="0" max="20" placeholder="0.00"
                   oninput="validateMarkInput(this)">
        </div>
    `;
}

function validateMarkInput(input) {
    const value = parseFloat(input.value);
    
    if (input.value === '') {
        input.style.borderColor = '';
        return;
    }
    
    if (isNaN(value) || value < 0 || value > 20) {
        input.style.borderColor = 'var(--danger-color)';
    } else {
        input.style.borderColor = 'var(--success-color)';
    }
}

function calculateResult() {
    const cards = document.querySelectorAll('.subject-card');
    let totalScore = 0;
    let totalCoef = 0;
    let allValid = true;
    let emptyFields = [];
    
    cards.forEach((card, index) => {
        const coef = parseFloat(card.dataset.coef);
        const type = JSON.parse(card.dataset.type);
        const inputs = card.querySelectorAll('input');
        const subjectName = card.querySelector('.subject-title').textContent;
        
        let subjectAvg = 0;
        let hasEmptyField = false;

        if (type.isProject) {
            const val = parseFloat(inputs[0].value) || 0;
            if (inputs[0].value === '') hasEmptyField = true;
            if (val < 0 || val > 20) allValid = false;
            subjectAvg = val;
        } else {
            let sum = 0;
            inputs.forEach(input => {
                const val = parseFloat(input.value) || 0;
                const key = input.dataset.key;
                const weight = type[key];
                
                if (input.value === '') hasEmptyField = true;
                if (val < 0 || val > 20) allValid = false;
                sum += val * weight;
            });
            subjectAvg = sum;
        }
        
        if (hasEmptyField) {
            emptyFields.push(subjectName);
        }
        
        totalScore += subjectAvg * coef;
        totalCoef += coef;
    });
    
    if (emptyFields.length > 0 && !confirm(`بعض الحقول فارغة في المواد التالية:\n${emptyFields.join('\n')}\n\nهل تريد المتابعة مع الحساب؟`)) {
        return;
    }
    
    if (!allValid) {
        showNotification('توجد علامات خارج النطاق (0-20).', 'error');
        return;
    }
    
    const finalAvg = totalScore / totalCoef;
    semesterScoreEl.textContent = finalAvg.toFixed(2);
    
    updateStatusMessage(finalAvg);
    
    semesterScoreEl.parentElement.classList.add('pulse');
    setTimeout(() => {
        semesterScoreEl.parentElement.classList.remove('pulse');
    }, 500);
    
    saveToLocalStorage();
}

function updateStatusMessage(average) {
    const statusIcon = statusMsg.querySelector('i');
    const statusText = statusMsg.querySelector('span');
    
    if (average >= 15) {
        statusIcon.className = 'fas fa-check-circle';
        statusIcon.style.color = 'var(--success-color)';
        statusText.textContent = `ناجح - معدل ممتاز! 🎉 (${average.toFixed(2)}/20)`;
        statusText.style.color = 'var(--success-color)';
        document.querySelector('.score-circle').style.borderColor = 'var(--success-color)';
        semesterScoreEl.style.color = 'var(--success-color)';
    } else if (average >= 10) {
        statusIcon.className = 'fas fa-exclamation-circle';
        statusIcon.style.color = 'var(--warning-color)';
        statusText.textContent = `مقبول - تحتاج إلى تحسين (${average.toFixed(2)}/20)`;
        statusText.style.color = 'var(--warning-color)';
        document.querySelector('.score-circle').style.borderColor = 'var(--warning-color)';
        semesterScoreEl.style.color = 'var(--warning-color)';
    } else {
        statusIcon.className = 'fas fa-times-circle';
        statusIcon.style.color = 'var(--danger-color)';
        statusText.textContent = `راسب - المعدل غير كافٍ (${average.toFixed(2)}/20)`;
        statusText.style.color = 'var(--danger-color)';
        document.querySelector('.score-circle').style.borderColor = 'var(--danger-color)';
        semesterScoreEl.style.color = 'var(--danger-color)';
    }
}

function calculateAnnualAverage() {
    const current = parseFloat(semesterScoreEl.textContent);
    const prev = parseFloat(prevSemInput.value);
    
    if (isNaN(current) || current === 0) {
        showNotification('يرجى حساب المعدل الحالي أولاً.', 'warning');
        return;
    }
    
    if (isNaN(prev) || prev < 0 || prev > 20) {
        showNotification('يرجى إدخال معدل الفصل الآخر بشكل صحيح (0-20).', 'error');
        return;
    }
    
    const annual = (current + prev) / 2;
    annualScore.textContent = annual.toFixed(2);
    
    annualScore.classList.add('pulse');
    setTimeout(() => {
        annualScore.classList.remove('pulse');
    }, 500);
    
    saveToLocalStorage();
}


function showPrintView() {
    updatePrintData();
    printSection.classList.remove('hidden');
    printSection.scrollIntoView({ behavior: 'smooth' });
}

function updatePrintData() {
    updatePrintInfo();
    updatePrintTable();
    updatePrintDate();
    updatePrintResults();
}

function updatePrintInfo() {
    const phase = phaseSelect.value;
    const spec = specialtySelect.value;
    const sem = semesterSelect.value;
    
    let specialtyText = '--';
    if (phase === 'prep') {
        specialtyText = 'الطور التحضيري';
    } else if (phase === 'spec' && spec) {
        const specialtyNames = {
            'ds': 'علوم البيانات',
            'gl': 'الهندسة البرمجية',
            'ai': 'الذكاء الاصطناعي',
            'networks': 'الشبكات',
            'security': 'الأمن المعلوماتي',
            'si': 'نظم المعلومات'
        };
        specialtyText = specialtyNames[spec] || '--';
    }
    printSpecialty.textContent = specialtyText;
    
    if (sem) {
        const semesterNames = {
            's1': 'الفصل الأول - السنة الأولى',
            's2': 'الفصل الثاني - السنة الأولى',
            's3': 'الفصل الثالث - السنة الثانية',
            's4': 'الفصل الرابع - السنة الثانية',
            's5': 'الفصل الخامس - السنة الثالثة',
            's6': 'الفصل السادس - السنة الثالثة',
            's7': 'الفصل السابع - السنة الرابعة',
            's8': 'الفصل الثامن - السنة الرابعة',
            's9': 'الفصل التاسع - السنة الخامسة',
            's10': 'الفصل العاشر - السنة الخامسة'
        };
        printSemester.textContent = semesterNames[sem] || sem.toUpperCase();
    } else {
        printSemester.textContent = '--';
    }
}

function updatePrintTable() {
    const cards = document.querySelectorAll('.subject-card');
    let html = '';
    let totalAverage = 0;
    let totalPoints = 0;
    let totalCoef = 0;
    
    cards.forEach((card, index) => {
        const subjectName = card.querySelector('.subject-title').textContent;
        const coef = parseFloat(card.dataset.coef);
        const type = JSON.parse(card.dataset.type);
        const inputs = card.querySelectorAll('input');
        
        let tpValue = '--';
        let tdValue = '--';
        let examValue = '--';
        let subjectAvg = 0;
        
        inputs.forEach(input => {
            const val = input.value;
            const key = input.dataset.key;
            
            if (val) {
                if (key === 'tp') tpValue = parseFloat(val).toFixed(2);
                if (key === 'td') tdValue = parseFloat(val).toFixed(2);
                if (key === 'exam') examValue = parseFloat(val).toFixed(2);
            }
        });
        
        if (type.isProject) {
            subjectAvg = examValue !== '--' ? parseFloat(examValue) : 0;
        } else {
            let sum = 0;
            inputs.forEach(input => {
                const val = parseFloat(input.value) || 0;
                const key = input.dataset.key;
                const weight = type[key];
                sum += val * weight;
            });
            subjectAvg = sum;
        }
        
        const points = subjectAvg * coef;
        let notes = '--';
        if (subjectAvg >= 10) {
            notes = 'ناجح';
        } else if (subjectAvg > 0) {
            notes = 'راسب';
        }
        
        html += `
            <tr>
                <td>${index + 1}</td>
                <td class="text-start">${subjectName}</td>
                <td>${coef}</td>
                <td>${tpValue}</td>
                <td>${tdValue}</td>
                <td>${examValue}</td>
                <td>${subjectAvg > 0 ? subjectAvg.toFixed(2) : '--'}</td>
                <td>${points > 0 ? points.toFixed(2) : '--'}</td>
                <td>${notes}</td>
            </tr>
        `;
        
        if (subjectAvg > 0) {
            totalAverage += subjectAvg * coef;
            totalPoints += points;
            totalCoef += coef;
        }
    });
    
    printSubjectsTable.innerHTML = html;
    const finalAverage = totalCoef > 0 ? totalAverage / totalCoef : 0;
    printTotalAverage.textContent = finalAverage.toFixed(2);
    printTotalPoints.textContent = totalPoints.toFixed(2);
}

function updatePrintDate() {
    const now = new Date();
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
    };
    printDate.textContent = now.toLocaleDateString('ar-Dz', options);
}

function updatePrintResults() {
    const currentScore = parseFloat(semesterScoreEl.textContent);
    
    if (!isNaN(currentScore) && currentScore > 0) {
        printFinalGPA.textContent = currentScore.toFixed(2) + '/20';
        
        let statusText = '';
        let statusColor = '';
        
        if (currentScore >= 10) {
            statusText = 'ناجح - معدل ممتاز';
            statusColor = '#2ecc71';
        } else if (currentScore >= 8) {
            statusText = 'مقبول - تحتاج إلى تحسين';
            statusColor = '#f39c12';
        } else {
            statusText = 'راسب - المعدل غير كافٍ';
            statusColor = '#e74c3c';
        }
        
        printStatus.textContent = statusText;
        printStatus.style.color = statusColor;
    } else {
        printFinalGPA.textContent = '--';
        printStatus.textContent = '--';
    }
}

function printTranscript() {
    updatePrintData();
    
    setTimeout(() => {
        window.print();
    }, 100);
}

function saveAsPDF() {
    showNotification('جاري تحضير الملف PDF...', 'info');
    
    setTimeout(() => {
        showNotification('يمكنك استخدام خاصية الطباعة لحفظ PDF', 'info');
        
        const printInstructions = confirm(
            'لحفظ كـ PDF:\n' +
            '1. اضغط على "طباعة الكشف"\n' +
            '2. في نافذة الطباعة، اختر "حفظ كـ PDF"\n' +
            '3. اضغط على "حفظ"\n\n' +
            'هل تريد المتابعة إلى الطباعة الآن؟'
        );
        
        if (printInstructions) {
            printTranscript();
        }
    }, 500);
}

function showNotification(message, type = 'info') {
    const oldNotification = document.querySelector('.notification');
    if (oldNotification) {
        oldNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    let icon = '';
    switch(type) {
        case 'success': icon = 'fa-check-circle'; break;
        case 'error': icon = 'fa-exclamation-circle'; break;
        case 'warning': icon = 'fa-exclamation-triangle'; break;
        default: icon = 'fa-info-circle';
    }
    
    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--success-color)' : 
                     type === 'error' ? 'var(--danger-color)' : 
                     type === 'warning' ? 'var(--warning-color)' : 'var(--info-color)'};
        color: white;
        padding: 15px 20px;
        border-radius: var(--border-radius-sm);
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

const style = document.createElement('style');
style.textContent = `
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
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

function saveToLocalStorage() {
    const data = {
        phase: phaseSelect.value,
        specialty: specialtySelect.value,
        semester: semesterSelect.value,
        marks: getMarksData(),
        currentScore: semesterScoreEl.textContent,
        annualScore: annualScore.textContent,
        prevSemInput: prevSemInput.value,
        theme: document.documentElement.getAttribute('data-theme')
    };
    
    localStorage.setItem('gpaCalculatorData', JSON.stringify(data));
}

function getMarksData() {
    const marks = {};
    document.querySelectorAll('.subject-card').forEach((card, index) => {
        const inputs = card.querySelectorAll('input');
        const subjectData = {};
        
        inputs.forEach(input => {
            if (input.value) {
                subjectData[input.dataset.key] = input.value;
            }
        });
        
        if (Object.keys(subjectData).length > 0) {
            marks[index] = subjectData;
        }
    });
    
    return marks;
}

function loadSavedData() {
    const savedData = localStorage.getItem('gpaCalculatorData');
    
    if (!savedData) return;
    
    try {
        const data = JSON.parse(savedData);
        
        if (data.theme) {
            document.documentElement.setAttribute('data-theme', data.theme);
            updateThemeToggleIcon();
        }
        
        if (data.phase) {
            phaseSelect.value = data.phase;
            phaseSelect.dispatchEvent(new Event('change'));
            
            if (data.phase === 'spec' && data.specialty) {
                setTimeout(() => {
                    specialtySelect.value = data.specialty;
                    specialtySelect.dispatchEvent(new Event('change'));
                    
                    if (data.semester) {
                        setTimeout(() => {
                            semesterSelect.value = data.semester;
                            semesterSelect.dispatchEvent(new Event('change'));
                            
                            if (data.marks) {
                                setTimeout(() => {
                                    restoreMarks(data.marks);
                                }, 100);
                            }
                            
                            if (data.currentScore && data.currentScore !== '0.00') {
                                setTimeout(() => {
                                    semesterScoreEl.textContent = data.currentScore;
                                    annualScore.textContent = data.annualScore || '--';
                                    prevSemInput.value = data.prevSemInput || '';
                                    updateStatusMessage(parseFloat(data.currentScore));
                                }, 200);
                            }
                        }, 100);
                    }
                }, 100);
            } else if (data.phase === 'prep' && data.semester) {
                setTimeout(() => {
                    semesterSelect.value = data.semester;
                    semesterSelect.dispatchEvent(new Event('change'));
                    
                    if (data.marks) {
                        setTimeout(() => {
                            restoreMarks(data.marks);
                        }, 100);
                    }
                    
                    if (data.currentScore && data.currentScore !== '0.00') {
                        setTimeout(() => {
                            semesterScoreEl.textContent = data.currentScore;
                            annualScore.textContent = data.annualScore || '--';
                            prevSemInput.value = data.prevSemInput || '';
                            updateStatusMessage(parseFloat(data.currentScore));
                        }, 200);
                    }
                }, 100);
            }
        }
    } catch (error) {
        console.error('خطأ في تحميل البيانات المحفوظة:', error);
    }
}

function restoreMarks(marksData) {
    const cards = document.querySelectorAll('.subject-card');
    
    Object.keys(marksData).forEach(index => {
        if (cards[index]) {
            const inputs = cards[index].querySelectorAll('input');
            const subjectMarks = marksData[index];
            
            inputs.forEach(input => {
                const key = input.dataset.key;
                if (subjectMarks[key]) {
                    input.value = subjectMarks[key];
                    validateMarkInput(input);
                }
            });
        }
    });
}

window.addEventListener('load', () => {
    loadSavedData();
    updateProgressBar();
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

window.addEventListener('scroll', updateProgressBar);