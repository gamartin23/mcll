(() => {
    const buttons = document.querySelectorAll('.putear-button');
    
    buttons.forEach(button => {
        button.type = 'button';
        button.removeAttribute('formaction');
        button.removeAttribute('form');
        
        button.onclick = async function(e) {
            e.preventDefault();
            e.stopPropagation();
            const position = button.getBoundingClientRect()
            
            const parentId = this.parentElement.id;
            try {
                const response = await fetch(`http://127.0.0.1:5000/api/mcll-post?${parentId}`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    const data = await response.json();
                    const counterElement = document.getElementById(`counter-${parentId}`);
                    if (counterElement && data.counter !== undefined) {
                        counterElement.textContent = data.counter;

                        const risingText = document.createElement('span');
                        risingText.classList.add('rising-text');
                        risingText.innerText = `La concha de tu madre, ${parentId.toUpperCase()}!`;

                        // Get the viewport dimensions
                        const viewportWidth = window.innerWidth;
                        const viewportHeight = window.innerHeight;

                        // Position the text in the center of the viewport
                        risingText.style.position = 'fixed'; // Use fixed to make it relative to the viewport
                        risingText.style.left = '50%'; // Center horizontally
                        risingText.style.top = '50%'; // Center vertically
                        risingText.style.transform = 'translate(-50%, -50%)'; // Exactly center it

                        document.body.appendChild(risingText);

                        // Trigger animation: Move up and fade out
                        requestAnimationFrame(() => {
                            risingText.style.transition = 'transform 1s, opacity 1s'; // Smooth transition
                            risingText.style.transform = 'translate(-50%, -150%)'; // Move up
                            risingText.style.opacity = '0'; // Fade out
                        });

                        // Remove the text after 3 seconds
                        setTimeout(() => {
                            risingText.remove();
                        }, 2000);




                    }
                }
            } catch (error) {
                console.error('Error:', error);
            }


            return false;
        };
    });
})();