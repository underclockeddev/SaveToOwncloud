function showStatusAlert(message, duration = 3000) {
    const alert = document.createElement('div');
    alert.textContent = message;

    alert.style.position = 'fixed';
    alert.style.bottom = '20px';
    alert.style.left = '20px';
    alert.style.padding = '10px';
    alert.style.backgroundColor = 'green';
    alert.style.color = 'white';
    alert.style.borderRadius = '5px';
    alert.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
    alert.style.zIndex = '1000';

    document.body.appendChild(alert);

    setTimeout(() => {
        alert.remove();
    }, duration);
}