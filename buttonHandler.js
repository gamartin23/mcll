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
                const response = await fetch(`https://kovaqa.pythonanywhere.com/api/mcll-post?${parentId}`, {
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

                        const stickyText = document.createElement('div');
                        stickyText.classList.add('sticky-text');
                        stickyText.innerText = `La concha de tu madre, ${parentId.toUpperCase()}!`;

                        // Estilo para el texto sticky
                        stickyText.style.position = 'fixed'; 
                        stickyText.style.top = '0';
                        stickyText.style.left = '0';
                        stickyText.style.width = '100%';
                        stickyText.style.backgroundColor = 'rgb(0, 163, 68)'; 
                        stickyText.style.color = '#ffffff';
                        stickyText.style.textAlign = 'center';
                        stickyText.style.padding = '10px'; 
                        stickyText.style.zIndex = '1000';
                        stickyText.style.fontSize = '30px'; 
                        stickyText.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'; 
                        stickyText.style.textShadow = `
                            -1px -1px 2px black, /* Sombra superior izquierda */
                            1px -1px 2px black,  /* Sombra superior derecha */
                            -1px 1px 2px black,  /* Sombra inferior izquierda */
                            1px 1px 2px black    /* Sombra inferior derecha */
                        `;
                        stickyText.style.opacity = '0'; // Comienza invisible
                        stickyText.style.transition = 'opacity 1s'; // Transición suave para el efecto de entrada y salida

                        document.body.appendChild(stickyText);

                        setTimeout(() => {
                            stickyText.style.opacity = '1';
                        }, 10); 

                        setTimeout(() => {
                            stickyText.style.opacity = '0';
                            setTimeout(() => {
                                stickyText.remove();
                            }, 1000);
                        }, 3000); 




                    }
                }
            } catch (error) {
                console.error('Error:', error);
            }


            return false;
        };
    });
})();