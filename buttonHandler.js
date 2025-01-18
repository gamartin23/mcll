(() => {
    const buttons = document.querySelectorAll('.putear-button');
    
    buttons.forEach(button => {
        button.type = 'button';
        button.removeAttribute('formaction');
        button.removeAttribute('form');
        
        button.onclick = async function(e) {
            e.preventDefault();
            e.stopPropagation();
            
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
                        // Crear el texto que subirá
                        const risingText = document.createElement('span');
                        risingText.classList.add('rising-text');
                        risingText.innerText = `La concha de tu madre, ${parentId.toUpperCase()}!`;
                        
                        // Obtener la posición del botón
                        const rect = this.parentElement.getBoundingClientRect();
                        const x = rect.left + rect.width / 2; // Centro horizontal del botón
                        const y = rect.bottom; // Parte superior del botón

                        // Establecer posición inicial
                        risingText.style.left = `${x}px`;
                        risingText.style.top = `${y*2}px`;
                        risingText.style.transform = 'translate(-50%, 0)'; // Centrado horizontal

                        // Agregar el texto al documento
                        document.body.appendChild(risingText);

                        // Forzar reflujo para aplicar la animación
                        requestAnimationFrame(() => {
                        risingText.style.transform = 'translate(-50%, -50px)'; // Subir
                        risingText.style.opacity = '0'; // Perder opacidad
                        });

                        // Eliminar el texto después de 3 segundos
                        setTimeout(() => {
                        risingText.remove();
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