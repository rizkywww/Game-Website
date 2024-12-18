const images = [
    {
        url: 'assets/images/kue-cucur.jpg',
        answer: 'kue cucur',
        hint: 'Jajanan yang berbentuk bulat tipis dan berwarna hijau'
    },
    {
        url: 'assets/images/kue-putu.jpg',
        answer: 'kue putu',
        hint: 'Jajanan yang berbentuk tabung dan berwarna hijau'
    },
    {
        url: 'assets/images/onde-onde.jpg',
        answer: 'onde onde',
        hint: 'Jajanan yang berbentuk bulat dan berwarna coklat'
    },
    {
        url: 'assets/images/klepon.jpg',
        answer: 'klepon',
        hint: 'Jajanan yang berisi gula merah'
    },
    {
        url: 'assets/images/lemper.jpg', 
        answer: 'lemper',
        hint: 'Jajanan yang berisi ayam dan dibungkus daun pisang'
    },
    {
        url: 'assets/images/nagasari.jpg',
        answer: 'nagasari',
        hint: 'Jajanan yang berisi pisang dan dibungkus daun pisang'
    },
    {
        url: 'assets/images/papeda.jpg',
        answer: 'papeda',
        hint: 'Jajanan yang berasal dari Papua'
    },
    {
        url: 'assets/images/pempek.jpg',
        answer: 'pempek',
        hint: 'Jajanan khas dari Palembang'
    },
    {
        url: 'assets/images/bika-ambon.jpg',
        answer: 'bika ambon',
        hint: 'Jajanan khas Medan dan berongga'
    },
    {
        url: 'assets/images/kue-lapis.jpg',
        answer: 'kue lapis',
        hint: 'Jajanan yang berwarna-warni'
    }
];

let currentImage = 0;
let score = 0;
let attempts = 0;
let correctAnswers = 0;
let gameTimer;
let timeLeft = 30;
let totalTime = 0;

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function startGame() {
    const playerName = document.getElementById('playerName').value.trim();
    if (!playerName) {
        alert('Silakan masukkan nama Kamu!');
        return;
    }
    

    document.getElementById('gamePlayerName').textContent = playerName;
    document.getElementById('score').textContent = '0';
    document.getElementById('level').textContent = '1';
    
    score = 0;
    currentImage = 0;
    correctAnswers = 0;
    totalTime = 0;
    
    showScreen('gameScreen');
    loadImage();
    startTimer();
}

function startTimer() {
timeLeft = 30; // Atur waktu awal
updateTimerDisplay();

const progressBar = document.getElementById('progressBar');
if (progressBar) {
progressBar.style.width = '100%';
}

gameTimer = setInterval(() => {
timeLeft--;
totalTime++;
updateTimerDisplay();

if (progressBar) {
    progressBar.style.width = `${(timeLeft / 30) * 100}%`; // Update lebar progress bar
}

if (timeLeft <= 0) {
    clearInterval(gameTimer); // Hentikan timer
    timeOut(); // Panggil fungsi ketika waktu habis
}
}, 1000); // Interval setiap 1 detik
}

function updateTimerDisplay() {
const timerElement = document.getElementById('timer');
if (timerElement) {
timerElement.textContent = timeLeft; // Tampilkan waktu tersisa
}
}


function loadImage() {
const result = document.getElementById('result');
result.className = 'result';
result.textContent = '';

const imageContainer = document.getElementById('imageContainer');
const gameImage = document.getElementById('gameImage');
const hint = document.getElementById('hint');

imageContainer.classList.remove('revealed');
gameImage.src = images[currentImage].url;
hint.textContent = `Hint: ${images[currentImage].hint}`;
document.getElementById('guess').value = '';
document.getElementById('level').textContent = currentImage + 1;
attempts = 0;
}

function showNotification(message, type = "info") {
const notification = document.getElementById('notification');

// Atur warna notifikasi berdasarkan jenis
if (type === "success") {
notification.style.backgroundColor = "rgba(35, 173, 35, 0.8)";
} else if (type === "error") {
notification.style.backgroundColor = "rgba(216, 99, 117, 0.8)";
} else if (type === "warning") {
notification.style.backgroundColor = "rgba(243, 174, 77, 0.8)";
} else {
notification.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
}

// Tampilkan pesan dan notifikasi
notification.textContent = message;
notification.classList.remove('hidden');
notification.classList.add('show');

// Sembunyikan setelah 3 detik
setTimeout(() => {
notification.classList.remove('show');
notification.classList.add('hidden');
}, 3000);
}


function checkAnswer() {
const guess = document.getElementById('guess').value.toLowerCase().trim();
const result = document.getElementById('result');
const imageContainer = document.getElementById('imageContainer');
const correctSound = document.getElementById('correctSound');
const wrongSound = document.getElementById('wrongSound');

    if (guess === images[currentImage].answer) {
document.getElementById('correctSound').play(); // Mainkan suara benar
} else {
document.getElementById('wrongSound').play(); // Mainkan suara salah
}

if (guess === images[currentImage].answer) {
showNotification("Selamat jawaban Kamu benar 🎉", "success");
// Logika jawaban benar (seperti sebelumnya)
} else {
showNotification("Yahh jawaban Kamu salah, coba lagi!", "error");

if (attempts >= 3) {
showNotification(`Jawaban yang benar adalah ${images[currentImage].answer}`, "warning");
}
}


    
attempts++;

if (guess === images[currentImage].answer) {
result.className = 'result correct';
result.textContent = 'Selamat Kamu Benar! 🎉';

// Perhitungan skor berdasarkan percobaan
if (attempts === 1) {
score += 10; // Jawaban benar di percobaan pertama
} else {
score += 5; // Jawaban benar di percobaan kedua atau ketiga
}

document.getElementById('score').textContent = score;
imageContainer.classList.add('revealed');
correctAnswers++;

clearInterval(gameTimer);

if (currentImage < images.length - 1) {
setTimeout(() => {
    currentImage++;
    loadImage();
    startTimer();
}, 2000);
} else {
setTimeout(endGame, 2000);
}
} else {
result.className = 'result wrong';
result.textContent = 'Yah Salah, coba lagi!';

if (attempts >= 3) {
imageContainer.classList.add('revealed');
result.textContent = `Jawaban yang benar adalah: ${images[currentImage].answer}`;

clearInterval(gameTimer);

if (currentImage < images.length - 1) {
    setTimeout(() => {
        currentImage++;
        loadImage();
        startTimer();
    }, 2000);
} else {
    setTimeout(endGame, 2000);
}
}
}
}

function timeOut() {
clearInterval(gameTimer);

const result = document.getElementById('result');
const imageContainer = document.getElementById('imageContainer');
const sound = document.getElementById('timeUpSound');

if (sound) sound.play();

imageContainer.classList.add('revealed');
result.className = 'result wrong';
result.textContent = `Waktu habis! Jawabannya ${images[currentImage].answer}`;

showNotification("Waktu habis! Jawabannya " + images[currentImage].answer, "warning");

if (currentImage < images.length - 1) {
setTimeout(() => {
    currentImage++;
    loadImage();
    startTimer();
}, 2000);
} else {
setTimeout(endGame, 2000);
}
}




function endGame() {
    clearInterval(gameTimer);
    
    document.getElementById('finalPlayerName').textContent = document.getElementById('playerName').value;
    document.getElementById('finalScore').textContent = score;
    document.getElementById('correctAnswers').textContent = correctAnswers;
    document.getElementById('totalTime').textContent = `${Math.floor(totalTime / 60)}m ${totalTime % 60}s`;
    document.getElementById('finalScore').classList.add('score-animation');

    
    showScreen('resultScreen');
}

function restartGame() {
    currentImage = 0;
    score = 0;
    correctAnswers = 0;
    totalTime = 0;
    showScreen('gameScreen');
    loadImage();
    startTimer();
}

function goToHome() {
    showScreen('homeScreen');
}

// Event listener untuk tombol Enter
document.getElementById('guess').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkAnswer();
    }
});

document.getElementById('playerName').addEventListener('keypress', function(e) {
if (e.key === 'Enter') {
startGame();
}
});
