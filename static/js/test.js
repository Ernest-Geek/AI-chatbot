const socket = io()

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!SpeechRecognition) {
    console.error("Speech recognition not supported in this browser.");
} else {
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US'; 

    recognition.addEventListener('result', (event) => {
        const transcript = event.results[0][0].transcript;
        socket.emit('chat message', text);

        console.log('Recognized speech:', transcript);
    });

    recognition.addEventListener('error', (event) => {
        console.error('Speech recognition error:', event.error);
    });

    const button = document.querySelector('button');
    if (button) {
        button.addEventListener('click', () => {
            try {
                recognition.start();
                console.log('Speech recognition started.');
            } catch (error) {
                console.error('Failed to start speech recognition:', error);
            }
        });
    } else {
        console.error('Button not found.');
    }
}
