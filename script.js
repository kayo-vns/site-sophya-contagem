document.addEventListener('DOMContentLoaded', function() {
    // Data de início do amor - 18 de outubro de 2025
    const startDate = new Date('2025-10-18T00:00:00');
    
    // Elementos do contador
    const yearsElement = document.getElementById('years');
    const monthsElement = document.getElementById('months');
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    // Atualizar contador
    function updateLoveTimer() {
        const now = new Date();
        let diff = now - startDate;
        
        // Calcular anos, meses, dias, etc.
        const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
        diff -= years * (1000 * 60 * 60 * 24 * 365.25);
        
        const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30.44));
        diff -= months * (1000 * 60 * 60 * 24 * 30.44);
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        diff -= days * (1000 * 60 * 60 * 24);
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        diff -= hours * (1000 * 60 * 60);
        
        const minutes = Math.floor(diff / (1000 * 60));
        diff -= minutes * (1000 * 60);
        
        const seconds = Math.floor(diff / 1000);
        
        // Atualizar elementos
        yearsElement.textContent = years;
        monthsElement.textContent = months;
        daysElement.textContent = days;
        hoursElement.textContent = hours;
        minutesElement.textContent = minutes;
        secondsElement.textContent = seconds;
    }
    
    // Atualizar a cada segundo
    updateLoveTimer();
    setInterval(updateLoveTimer, 1000);

    // Contador rápido infinito de "anos futuros"
    const fastCounterEl = document.getElementById('fastCounter');
    const ellipsisEl = document.getElementById('ellipsis');
    let fastValue = 0;

    function updateFastCounter() {
        fastValue++;
        const s = String(fastValue);
        if (s.length <= 6) {
            // mostra com zeros à esquerda até 6 dígitos, sem reticências
            fastCounterEl.textContent = s.padStart(6, '0');
            ellipsisEl.style.display = 'none';
        } else {
            // quando ultrapassar 6 dígitos, mostra os 6 primeiros e reticências
            fastCounterEl.textContent = s.slice(0, 6);
            ellipsisEl.style.display = 'inline';
        }
    }

    // Muito rápido: atualiza a cada 30ms (~33 increments/s). Ajuste se quiser mais/menos rápido.
    setInterval(updateFastCounter, 30);
    
    // Inicializar Swiper (Carrossel)
    const swiper = new Swiper('.swiper', {
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
            rotate: 20,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
    });
    
    // Sistema de Música Simples
    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const playIcon = document.getElementById('play-icon');
    const volumeControl = document.getElementById('volume');
    
    // Lista de músicas (substitua com suas músicas)
    const songs = [
        {
            title: "Nossa Música Especial",
            artist: "Artista Favorito",
            src: "sua-musica.mp3" // Coloque sua música aqui
        },
        // Adicione mais músicas se quiser
    ];
    
    let currentSongIndex = 0;
    let audio = new Audio(songs[currentSongIndex].src);
    let isPlaying = false;
    
    function updateSongInfo() {
        document.getElementById('song-title').textContent = songs[currentSongIndex].title;
        document.getElementById('song-artist').textContent = songs[currentSongIndex].artist;
    }
    
    playBtn.addEventListener('click', function() {
        if (isPlaying) {
            audio.pause();
            playIcon.className = 'fas fa-play';
            isPlaying = false;
        } else {
            audio.play();
            playIcon.className = 'fas fa-pause';
            isPlaying = true;
            // Confete quando a música começa
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    });
    
    prevBtn.addEventListener('click', function() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        audio.src = songs[currentSongIndex].src;
        updateSongInfo();
        if (isPlaying) {
            audio.play();
        }
    });
    
    nextBtn.addEventListener('click', function() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        audio.src = songs[currentSongIndex].src;
        updateSongInfo();
        if (isPlaying) {
            audio.play();
        }
    });
    
    volumeControl.addEventListener('input', function() {
        audio.volume = this.value / 100;
    });
    
    // Efeito de confete aleatório
    function randomConfetti() {
        if (Math.random() > 0.7) {
            confetti({
                particleCount: Math.floor(Math.random() * 50) + 20,
                angle: Math.random() * 360,
                spread: Math.random() * 70 + 30,
                origin: {
                    x: Math.random(),
                    y: Math.random() * 0.5
                }
            });
        }
    }
    
    // Confete a cada 10-30 segundos
    setInterval(randomConfetti, Math.random() * 20000 + 10000);
    
    // Confete inicial
    setTimeout(() => {
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 }
        });
    }, 1000);
    
    // Efeito de digitação na mensagem (opcional)
    const messageBox = document.querySelector('.message-box');
    const originalText = messageBox.innerHTML;
    
    // Atualizar informações da música
    updateSongInfo();
});