document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name');
    const img = params.get('img');
    const encounters = params.get('encounters');

    document.getElementById('pokemon-img').src = img;
    document.getElementById('pokemon-name').textContent = name;

    fetch(encounters)
        .then(response => response.json())
        .then(data => {
            const locationName = data[0].location_area.name;

            document.getElementById('pokemon-encounters').textContent = `Location Area: ${locationName}`;
        })
        .catch(error => {
            console.error(error);
        });
});