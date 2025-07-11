// This file contains the JavaScript code that handles the functionality of the page.
// It includes logic for loading the song list, handling form submissions, and sending the nomination data to Formspree.

document.addEventListener('DOMContentLoaded', function() {
    const songSelect = document.getElementById('song-select');
    const nameInput = document.getElementById('name-input');
    const additionalNamesInput = document.getElementById('additional-names');
    const submitButton = document.getElementById('submit-button');
    const form = document.getElementById('nomination-form');
    const confirmationMessage = document.getElementById('confirmation-message');

    // Load song list from JSON file
    fetch('songs/songlist.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(song => {
                const option = document.createElement('option');
                option.value = `${song.title} by ${song.artist}`;
                option.textContent = `${song.title} by ${song.artist}`;
                songSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error loading song list:', error);
            songSelect.innerHTML = '<option value="">Error loading songs - please refresh</option>';
        });

    // Handle form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const selectedSong = songSelect.value;
        const name = nameInput.value.trim();
        const additionalNames = additionalNamesInput.value.trim();

        if (!selectedSong || selectedSong === "") {
            showMessage('Please select a song!', 'error');
            return;
        }

        if (!name) {
            showMessage('Please enter your name!', 'error');
            return;
        }

        // Disable submit button to prevent double submission
        submitButton.disabled = true;
        submitButton.value = 'Submitting...';

        // Prepare form data for Formspree
        const formData = new FormData();
        formData.append('song', selectedSong);
        formData.append('name', name);
        formData.append('additionalNames', additionalNames);
        formData.append('timestamp', new Date().toLocaleString());

        // Send to Formspree (replace YOUR_FORM_ID with your actual Formspree form ID)
        fetch('https://formspree.io/f/xldnqoke', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                showMessage(`🎤 Nomination submitted successfully! ${name} has been nominated for "${selectedSong}"`, 'success');
                form.reset();
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .catch(error => {
            console.error('Error submitting nomination:', error);
            showMessage('Error submitting nomination. Please try again or tell the band directly!', 'error');
        })
        .finally(() => {
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.value = 'Nominate for Bandeoki!';
        });
    });

    function showMessage(message, type) {
        confirmationMessage.innerHTML = message;
        confirmationMessage.className = type === 'success' ? 'success-message' : 'error-message';
        confirmationMessage.style.display = 'block';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            confirmationMessage.style.display = 'none';
        }, 5000);
    }
});