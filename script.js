document.addEventListener('DOMContentLoaded', () => {
    const flashcards = [
        ["tavata, kirjoittaa", "spell spelt spelt"],
        ["vietta, kuluttaa", "spend spent spent"],
        ["pilata", "spoil spoilt spoilt"],
        ["levita, levittää", "spread spread spread"],
        ["seisoa", "stand stood stood"],
        ["varastaa", "steal stole stolen"],
        ["pistää, kiinnittää", "stick stuck stuck"],
        ["pistää (hyönteinen)", "sting stung stung"],
        ["vannoa, kirota", "swear swore sworn"],
        ["uida", "swim swam swum"],
        ["ottaa, viedä", "take took taken"],
        ["kestää", "teach taught taught"],
        ["opettaa", "tell told told"],
        ["kertoa, käskeä", "think thought thought"],
        ["ajatella, olla jotakin mieltä, luulla", "throw threw thrown"],
        ["heittää", "understand understood understood"],
        ["ymmärtää", "wake woke woken"],
        ["herätä, herättää", "wear wore worn"],
        ["pitaä yllään, käyttää", "win won won"],
        ["voittaa", "write wrote written"],
        ["kirjoittaa", "write wrote written"]
    ];

    let currentQuestionIndex = 0;
    let correctAnswers = 0;

    const startContainer = document.getElementById('start-container');
    const questionContainer = document.getElementById('question-container');
    const completionContainer = document.getElementById('completion');
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
        console.log('Start button clicked');
        currentQuestionIndex = 0;
        correctAnswers = 0;

        shuffle(flashcards);

        startContainer.style.display = 'none';
        questionContainer.style.display = 'block';
        completionContainer.style.display = 'none';

        loadNextQuestion();
    }

    function loadNextQuestion() {
        if (currentQuestionIndex >= flashcards.length) {
            questionContainer.style.display = 'none';
            completionContainer.style.display = 'block';
            completionTextElement.textContent = `You got ${correctAnswers} out of ${flashcards.length} correct.`;
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
        const correctAnswer = `${currentFlashcard[1].toLowerCase()}`;

        if (userAnswer === correctAnswer) {
            feedbackElement.textContent = 'Correct!';
            correctAnswers++;
        } else {
            feedbackElement.textContent = `Incorrect. The correct answer is '${currentFlashcard[1]}'.`;
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
