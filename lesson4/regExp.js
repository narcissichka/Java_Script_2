function fetchText() {
    let array;
    fetch('https://raw.githubusercontent.com/narcissichka/Java_Script_2/Lesson4/lesson4/texttoreplace.txt')
        .then(response => response.text())
        .then((data) => {
            array = data.split('\n');
            array.forEach((str) => {
                document.querySelector('.entry-text').insertAdjacentHTML('beforeend', str + '<br>');
                if (!/[a-z]'[a-z]/i.test(str)) {
                    document.querySelector('.modified-text').insertAdjacentHTML('beforeend', str.replace(/'/g, '"') + '<br>');
                } else {
                    let buf = str.replace(/'/g, '"');
                    for (let sym of buf.match(/[a-z]"[a-z]/ig)) {
                        str = buf.replace(sym, sym.replace('"', '\''));
                        buf = str;
                    }
                    document.querySelector('.modified-text').insertAdjacentHTML('beforeend', str + '<br>');
                }
            });
        });
}
fetchText();
