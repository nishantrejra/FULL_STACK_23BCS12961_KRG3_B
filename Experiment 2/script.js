const themeToggleBtn = document.getElementById('themeToggle');
const body = document.body;

const savedTheme = localStorage.getItem('dashboardTheme');
if (savedTheme === 'dark-mode') {
    body.classList.add('dark-mode');
}

themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('dashboardTheme', 'dark-mode');
    } else {
        localStorage.setItem('dashboardTheme', ''); // clear theme
    }
});
