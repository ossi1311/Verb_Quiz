document.addEventListener('DOMContentLoaded', () => {
    const flashcards = [
        ["ruokkia", "feed", "fed", "fed"],
        ["tuntea, tuntea itsensä/olonsa joksikin", "feel", "felt", "felt"],
        ["taistella, tapella", "fight", "fought", "fought"],
        ["löytää", "find", "found", "found"],
        ["paeta", "flee", "fled", "fled"],
        ["lentää", "fly", "flew", "flown"],
        ["unohtaa", "forget", "forgot", "forgotten"],
        ["antaa anteeksi", "forgive", "forgave", "forgiven"],
        ["jäätyä", "freeze", "froze", "frozen"],
        ["saada, hakea, päästä, tulla joksikin", "get", "got", "got/gotten"],
        ["antaa", "give", "gave", "given"],
        ["mennä", "go", "went", "gone"],
        ["kasvaa, viljellä", "grow", "grew", "grown"],
        ["riippua, ripustaa, roikkua", "hang", "hung", "hung"],
        ["olla (jollakulla), omistaa", "have", "had", "had"],
        ["kuulla", "hear", "heard", "heard"],
        ["piilottaa, piiloutua", "hide", "hid", "hidden"],
        ["lyödä, osua", "hit", "hit", "hit"],
        ["pitää (kiinni), pidellä", "hold", "held", "held"],
        ["satuttaa, loukata, sattua", "hurt", "hurt", "hurt"],
        ["pitää, säilyttää", "keep", "kept", "kept"],
        ["tietää, tuntea", "know", "knew", "known"],
        ["panna, asettaa", "lay", "laid", "laid"],
        ["johtaa", "lead", "led", "led"],
        ["oppia", "learn", "learnt", "learnt"],
        ["lähteä, jättää", "leave", "left", "left"],
        ["lainata jollekin", "lend", "lent", "lent"],
        ["antaa, sallia", "let", "let", "let"],
        ["maata, olla", "lie", "lay", "lain"],
        ["sytyttää", "light", "lit", "lit"]
    ];

    let currentQuestionIndex = 0;
    let totalQuestions = 0;
    let correctAnswers = 0;

    const startContainer = document.getElementById('start-container');
    const questionContainer = document.getElementById('question-container');
    const completionContainer = document.getElementById('completion');
    const questionCountElement = document.getElementById('question-count');
    const questionElement = document.getElementById('question');
    const answerInput = document.getElementById('answer');
    const feedbackElement = document.getElementById('feedback');
    const roundElement = document.getElementById('round');
    const startButton = document.getElementById('start-btn');
    const submitButton = document.getElementById('submit-btn');
    const nextButton = document.getElementById('next-btn');
    const restartButton = document.getElementById('restart-btn');
    const completionTextElement = document.getElementById('completion-text');

    startButton.addEventListener('click', startQuiz);
    submitButton.addEventListener('click', checkAnswer);
    nextButton.addEventListener('click', loadNextQuestion);
    restartButton.addEventListener('click', restartQuiz);

    function startQuiz() {
        currentQuestionIndex = 0;
        correctAnswers = 0;
        totalQuestions = parseInt(questionCountElement.value);

        shuffle(flashcards);

        startContainer.style.display = 'none';
        questionContainer.style.display = 'block';
        completionContainer.style.display = 'none';

        loadNextQuestion();
    }

    function loadNextQuestion() {
        if (currentQuestionIndex >= totalQuestions || currentQuestionIndex >= flashcards.length) {
            questionContainer.style.display = 'none';
            completionContainer.style.display = 'block';
            completionTextElement.textContent = `You got ${correctAnswers} out of ${totalQuestions} correct.`;
        } else {
            const currentFlashcard = flashcards[currentQuestionIndex];
            questionElement.textContent = `${currentFlashcard[0]}?`;
            answerInput.value = '';
            feedbackElement.textContent = '';
            nextButton.style.display = 'none';
            submitButton.style.display = 'inline-block';

            roundElement.textContent = `Round ${currentQuestionIndex + 1}`;
        }
    }

    function checkAnswer() {
        const currentFlashcard = flashcards[currentQuestionIndex];
        const userAnswer = answerInput.value.trim().toLowerCase();
        const correctAnswer = `${currentFlashcard[1].toLowerCase()}, ${currentFlashcard[2].toLowerCase()}, ${currentFlashcard[3].toLowerCase()}`;

        if (userAnswer === correctAnswer) {
            feedbackElement.textContent = 'Correct!';
            correctAnswers++;
        } else {
            feedbackElement.textContent = `Incorrect. The correct answer is '${currentFlashcard[1]}, ${currentFlashcard[2]}, ${currentFlashcard[3]}'.`;
        }

        submitButton.style.display = 'none';
        nextButton.style.display = 'inline-block';
        currentQuestionIndex++;
    }

    function restartQuiz() {
        startContainer.style.display = 'block';
        questionContainer.style.display = 'none';
        completionContainer.style.display = 'none';
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
});
