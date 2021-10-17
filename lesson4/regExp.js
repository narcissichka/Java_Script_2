function fetchText() {
    let array;
    fetch('https://raw.githubusercontent.com/narcissichka/Java_Script_2/Lesson4/lesson4/texttoreplace.txt')
        .then(response => response.text())
        .then((data) => {
            array = data.split('\n');
            array.forEach((str) => {
                document.querySelector('.entry-text').insertAdjacentHTML('beforeend', str + '<br>');
                document.querySelector('.modified-text').insertAdjacentHTML('beforeend', str.replace(/\B'|'\B/g, '"') + '<br>');
            });
        });
}
fetchText();
