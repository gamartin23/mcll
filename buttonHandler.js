const PROVINCE_ORDER = [
    'caba', 
    'ba',
    'ca', 
    'ch',
    'co',
    'cr',
    'er',
    'fo',
    'ju',
    'lr',
    'mz',
    'mi',
    'rn', 
    'sa',
    'sj',
    'sl',
    'sf',
    'se',
    'tf',
    'tu'
];


function sortGridItems(sortBy) {
    const gridContainer = document.querySelector('.grid-container');
    const items = Array.from(gridContainer.querySelectorAll('.grid-item')); 

    items.sort((a, b) => {
        if (sortBy === 'votos') {
            const counterA = a.querySelector('[id^="counter-"]');
            const counterB = b.querySelector('[id^="counter-"]');

            const votesA = parseInt(counterA?.textContent.replace(/[^0-9]/g, '') || 0);
            const votesB = parseInt(counterB?.textContent.replace(/[^0-9]/g, '') || 0);
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

                        let layer = document.getElementById('global-ui-layer')

                        const stickyText = document.createElement('div');
                        stickyText.classList.add('sticky-text');
                        stickyText.innerText = `La concha de tu madre, ${parentId.toUpperCase()}!`;

                        layer.appendChild(stickyText);

                        // setTimeout(() => {
                        //     stickyText.style.opacity = '1';
                        // }, 10); 

                        // setTimeout(() => {
                        //     stickyText.style.opacity = '0';
                        //     setTimeout(() => {
                        //         stickyText.remove();
                        //     }, 1000);
                        // }, 3000); 


                    }
                }
            } catch (error) {
                console.error('Error:', error);
            }


            return false;
        };
    });
})();