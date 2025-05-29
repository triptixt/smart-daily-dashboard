
let tasks = [];
let isDarkMode = false;
let currentMood = '😊';
let sectionsVisible = true;

const quotes = [
    "Everything will be fine! 🌟",
    "Stay motivated! 💪",
    "Today is a new opportunity! ✨",
    "Believe in yourself! 🚀",
    "Progress, not perfection! 📈",
    "You've got this! 💯",
    "Dream big, work hard! 🎯",
    "Success starts with self-belief! ⭐",
    "Every day is a fresh start! 🌅",
    "Make today amazing! 🚀"
];


function showToast(title, description) {
    const toastContainer = document.getElementById('toastContainer');

    const toast = document.createElement('div');
    toast.className = 'toast';

    toast.innerHTML = `
        <div class="toast-title">${title}</div>
        <div class="toast-description">${description}</div>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

function setGoal() {
    const goalInput = document.getElementById('goalInput');
    const goal = goalInput.value.trim();

    if (goal) {
        showToast('🎯 Goal Set Successfully!', `Your goal: "${goal}"`);
        goalInput.value = '';
    } else {
        showToast('⚠️ Missing Goal', 'Please enter a goal first');
    }
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const task = taskInput.value.trim();

    if (task) {
        tasks.push(task);
        renderTasks();
        updateTaskCounter();
        showToast('✅ Task Added!', `"${task}" added to your list`);
        taskInput.value = '';
    } else {
        showToast('⚠️ Empty Task', 'Please enter a task description');
    }
}

function removeTask(index) {
    const removedTask = tasks[index];
    tasks.splice(index, 1);
    renderTasks();
    updateTaskCounter();
    showToast('🎉 Task Completed!', `"${removedTask}" marked as done!`);
}

function updateTaskCounter() {
    const taskCounter = document.getElementById('taskCounter');
    const count = tasks.length;
    taskCounter.textContent = `${count} task${count !== 1 ? 's' : ''}`;
}

function renderTasks() {
    const taskList = document.getElementById('taskList');

    if (tasks.length === 0) {
        taskList.innerHTML = '<p class="empty-tasks">No tasks yet. Add one above! 📝</p>';
        return;
    }

    taskList.innerHTML = tasks.map((task, index) => `
        <div class="task-item" onclick="removeTask(${index})">
            <span class="task-item-text">${task}</span>
            <span class="task-item-hint">Click to mark as completed ✓</span>
        </div>
    `).join('');
}

function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    const body = document.body;
    const themeText = document.getElementById('themeText');

    body.classList.toggle('dark-mode');
    themeText.innerHTML = isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode';

    showToast('🎨 Theme Updated!', `Switched to ${isDarkMode ? 'dark' : 'light'} mode`);
}


function changeWeather() {
    showToast('⛅ Weather Updated!', 'Weather information refreshed successfully!');
}

function generateNewQuote() {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    showToast('💭 New Quote!', randomQuote);
}

function setMood(mood, buttonElement) {
    currentMood = mood;
    const moodMessage = document.getElementById('moodMessage');

   
    document.querySelectorAll('.mood-button').forEach(btn => {
        btn.classList.remove('active');
    });


    buttonElement.classList.add('active');

    const moodMap = {
        '😊': 'happy',
        '😂': 'joyful',
        '🥲': 'emotional'
    };

    moodMessage.textContent = `You are feeling ${moodMap[mood]} today.`;
    showToast('😊 Mood Updated!', `You're feeling ${moodMap[mood]} today!`);
}

function toggleSections() {
    sectionsVisible = !sectionsVisible;
    const header = document.getElementById('header');
    const quoteCard = document.getElementById('quoteCard');
    const toggleText = document.getElementById('toggleText');

    if (sectionsVisible) {
        header.classList.remove('hidden');
        quoteCard.classList.remove('hidden');
        toggleText.innerHTML = '👁️ Hide Greeting & Quote';
    } else {
        header.classList.add('hidden');
        quoteCard.classList.add('hidden');
        toggleText.innerHTML = '👁️ Show Greeting & Quote';
    }

    showToast('🧪 Sections Toggled!', `${sectionsVisible ? 'Showing' : 'Hiding'} greeting and quote sections`);
}

document.addEventListener('DOMContentLoaded', function () {
    const goalInput = document.getElementById('goalInput');
    const taskInput = document.getElementById('taskInput');

    goalInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            setGoal();
        }
    });

    taskInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    renderTasks();
    updateTaskCounter();
});