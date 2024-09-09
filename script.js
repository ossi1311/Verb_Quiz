document.addEventListener('DOMContentLoaded', () => {
    const flashcards = [
        ["menettää, kadottaa, hävitä", "lose", "lost", "lost"],
["tehdä, valmistaa", "make", "made", "made"],
["tarkoittaa", "mean", "meant", "meant"],
["tavata", "meet", "met", "met"],
["voittaa, päästä yli", "overcome", "overcame", "overcome"],
["maksaa", "pay", "paid", "paid"],
["panna, asettaa", "put", "put", "put"],
["lopettaa", "quit", "quit", "quit"],
["lukea", "read", "read", "read"],
["ajaa (polkupyörällä), ratsastaa", "ride", "rode", "ridden"],
["soida, soittaa", "ring", "rang", "rung"],
["nousta", "rise", "rose", "risen"],
["juosta", "run", "ran", "run"],
["sanoa", "say", "said", "said"],
["nähdä", "see", "saw", "seen"],
["myydä", "sell", "sold", "sold"],
["lähettää", "send", "sent", "sent"],
["asettaa", "set", "set", "set"],
["ravistaa, vapista", "shake", "shook", "shaken"],
["paistaa, loistaa", "shine", "shone", "shone"],
["ampua, kuvata", "shoot", "shot", "shot"],
["näyttää, osoittaa", "show", "showed", "shown"],
["sulkea", "shut", "shut", "shut"],
["laulaa", "sing", "sang", "sung"],
["upota", "sink", "sank", "sunk"],
["istua", "sit", "sat", "sat"],
["nukkua", "sleep", "slept", "slept"],
["haistaa, haista", "smell", "smelt", "smelt"],
["puhua", "speak", "spoke", "spoken"],
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
