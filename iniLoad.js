async function fetchInitialCounters() {
    try {
        const response = await fetch('http://kovaqa.pythonanywhere.com/api/mcll-get', {
            method: 'GET',
            })
        
        const data = await response.json();
        
        for (const [divId, count] of Object.entries(data)) {
            const counterElement = document.getElementById(`counter-${divId}`);
            if (counterElement) {
                counterElement.textContent = count;
            }
        }
        // Find highest value and its key
        const leaderDiv = document.querySelector('.toptier');
        const highestEntry = Object.entries(data).reduce((max, current) => 
            current[1] > max[1] ? current : max
        );
        const leaderDivId = highestEntry[0];
        const leaderCount = highestEntry[1];
        const worstCompanySpan = leaderDiv.querySelector('.worst-company');
        worstCompanySpan.textContent = `${leaderDivId.toUpperCase()} - ${leaderCount} puteadas`;
        const leaderImage = document.createElement('img');
        leaderImage.classList.add('leader-image');
        // Switch case for image URLs
        switch(leaderDivId) {
            case 'edesur':
                leaderImage.src = "https://upload.wikimedia.org/wikipedia/commons/e/e5/Edesur_logo22.png";
                break;
            case 'edenor':
                leaderImage.src = "https://www.edenor.com/themes/custom/edenor/logo.svg";
                break;
            case 'edea':
                leaderImage.src = "https://www.edeaweb.com.ar/wp-content/uploads/2023/10/Edea-blanco.png";
                break;
            case 'eden':
                leaderImage.src = "https://www.edensa.com.ar/wp-content/uploads/2023/10/EDEN-logo-blanco-300x101.png";
                break;    
            case 'edes':
                leaderImage.src = 'https://www.infoedes.com/wp-content/uploads/2023/10/Edes-blanco.png'
                break;
            case 'edelap':
                leaderImage.src = "https://www.edelap.com.ar/wp-content/uploads/2023/10/Edelap-blanco.png";
                break;
            case 'ecsapem':
                leaderImage.src = "https://oficina-virtual.ecsapem.com.ar/img/logo%20SERVICIO.png";
                break;
            case 'secheep':
                leaderImage.src = "https://new.secheep.com/wp-content/uploads/2020/07/logo03.png";
                break;
            case 'epec':
                leaderImage.src = "https://www.epec.com.ar/assets/template/images/footer/logo-footer.png"
                break;
            case 'dpec':
                leaderImage.src = "https://www.dpec.com.ar/recursos/DPEC/css/lib/imagenes/iconos/Dpec-small.png"
                break;
            case 'enersa':
                leaderImage.src = "https://www.enersa.com.ar/wp-content/uploads/2024/10/1111-5-1.png"
                break;
            case 'refsa':
                leaderImage.src = "https://www.recursosyenergia.com.ar/_res/images/logo_web.png"
                break;
            case 'ejesa':
                leaderImage.src = "https://www.ejesa.com.ar/info/pwa/Content/Images/LOGOEJESAAZUL.png"
                break;
            case 'edelar':
                leaderImage.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD4sYsd19R73D0ojdxXKD5JtUOOVtjznLuiA&s"
                break;
            case 'edemsa':
                leaderImage.src = "https://www.edemsa.com/wp-content/uploads/2024/02/logo-edemsa.png"
                break;
            case 'edeste':
                leaderImage.src = "https://www.edeste.com.ar/assets/img/logo/logo-gradient.png"
                break;
            case 'emsa':
                leaderImage.src = "https://www.energiademisiones.com.ar/wp-content/themes/emsa/images/logo_web.png"
                break;
            case 'edersa':
                leaderImage.src = "http://www.edersa.com.ar/wp-content/themes/altovalley/img/logo-edersa.png"
                break;
            case 'edesa':
                leaderImage.src = "https://www.edesa.com.ar/wp-content/uploads/2023/11/Edesa-blanco.png"
                break;
            case 'naturgysj':
                leaderImage.src = "https://www.naturgysj.com.ar/wp-content/uploads/2024/04/Naturgy_CMYK_Principal_Positiva.svg"
                break;
            case 'edesal':
                leaderImage.src = "https://edesalenergia.com.ar/eener/image/logo.jpg"
                break;
            case 'epesf':
                leaderImage.src = "https://www.epe.santafe.gov.ar/institucional/img/logoEPE2.svg"
                break;
            case 'edese':
                leaderImage.src = "https://edese.com.ar/_nuxt/img/logo.0f590b7.png"
                break;
            case 'epetdf':
                leaderImage.src = "https://www.epe.santafe.gov.ar/institucional/img/logoEPE2.svg"
                break;
            case 'edet':
                leaderImage.src = "https://www.edetsa.com/info/pwa/Content/Images/isologotipo-edet-sin-slogan-f.svg"
                break;
            // Add other cases here
            default:
                leaderImage.src = "https://github.com/gamartin23/mcll/blob/main/mcll.png?raw=true";
                
        }
        worstCompanySpan.parentNode.insertBefore(leaderImage, worstCompanySpan);
        leaderImage.style.height = "8vw";
        leaderImage.style.width = "auto";
        leaderImage.style.margin = "2vw";
    } catch (error) {
        console.error('Error fetching initial counts:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchInitialCounters);