const PROVINCE_ORDER = [
    'tucuman', 
    'buenosaires',
    'chaco', 
    'misiones',
    'corrientes',
    'formosa',
    'jujuy',
    'la-rioja',
    'mendoza',
    'salta',
    'san-juan',
    'san-luis',
    'santafe', 
    'cordoba',
    'tierradelfuego',
    'chubut',
    'neuquen',
    'santacruz',
];


function sortGridItems(sortBy) {
    const gridContainer = document.querySelector('.grid-container');
    const items = Array.from(gridContainer.querySelectorAll('.grid-item')); 

    items.sort((a, b) => {
        if (sortBy === 'votos') {
            const votesA = parseInt(a.querySelector('.counter-1').textContent.replace(/[^0-9]/g, '') || 0);
            const votesB = parseInt(b.querySelector('.counter-1').textContent.replace(/[^0-9]/g, '') || 0);
            return votesB - votesA;

        } else if (sortBy === 'alfabetico') {
            const nameA = a.id.toLowerCase();
            const nameB = b.id.toLowerCase();
            return nameA.localeCompare(nameB);

        } else if (sortBy === 'provincia') {
            const provA = a.getAttribute('data-provincia');
            const provB = b.getAttribute('data-provincia');
            
            const indexA = PROVINCE_ORDER.indexOf(provA);
            const indexB = PROVINCE_ORDER.indexOf(provB);

            if (indexA !== indexB) {
                if (indexA === -1) return 1;
                if (indexB === -1) return -1;
                return indexA - indexB;
            }
            const nameA = a.id.toLowerCase();
            const nameB = b.id.toLowerCase();
            return nameA.localeCompare(nameB);
        }
        return 0; 
    });

    items.forEach(item => gridContainer.appendChild(item));
}


(() => {
    document.addEventListener('DOMContentLoaded', () => {
        const sortButton = document.getElementById('sort-button');

        if (sortButton) {
            
            sortGridItems('provincia'); 
            
            sortButton.setAttribute('data-sort-by', 'provincia'); 
            sortButton.textContent = 'Votos'; 
            
            sortButton.addEventListener('click', () => {
                let currentSortBy = sortButton.getAttribute('data-sort-by');
                let nextSortBy;
                let nextButtonText;

                if (currentSortBy === 'provincia') {
                    nextSortBy = 'votos';
                    nextButtonText = 'Nombre';
                } else if (currentSortBy === 'votos') {
                    nextSortBy = 'alfabetico';
                    nextButtonText = 'Provincia';
                } else {
                    nextSortBy = 'provincia';
                    nextButtonText = 'Votos';
                }

                sortGridItems(nextSortBy);
                sortButton.setAttribute('data-sort-by', nextSortBy);
                sortButton.textContent = nextButtonText;
            });
        }
    });

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
                        stickyText.style.opacity = '0';
                        stickyText.style.transition = 'opacity 1s';

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