const navbar = document.querySelector('.navbar');
navbar.insertAdjacentHTML('beforeend',
    `
    <a href="/" class="navbar-dropdown-button"><b>Обо мне</b></a>

    <div class="navbar-dropdown-projects">
        <a class="navbar-dropdown-button"><b>Проектики</b></a>
        <div class="navbar-dropdown-projects-content">
            <a href="/Projects/Images"><b>Картиночки</b></a>
            <a href="/Projects/Audio"><b>Аудио</b></a>
        </div>
    </div>

    <a href="/Messenger" class="navbar-dropdown-button"><b>Мессенджер</b></a>

    <div class="navbar-dropdown-projects">
        <a class="navbar-dropdown-button"><b>Игры</b></a>
        <div class="navbar-dropdown-projects-content">
            <a href="/Games/PilotBrothers"><b>Pilot Brothers</b></a>
            <a href="/Games/WhackAMole"><b>Whack a Mole</b></a>
        </div>
    </div>

    <a href="/Countdown" class="navbar-dropdown-button"><b>Countdown</b></a>`
    )
