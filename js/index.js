const thread = (start, stop, callback) => {
    const loop = port => {
        if (port < stop) {
            fetch('http://127.0.0.1:' + port, {
                mode: 'no-cors'
            }).then(resp => {
                callback(port);
                loop(port + 1);
            }).catch(err => {
                loop(port + 1);
            });
        }
    };
    setTimeout(() => loop(start), 0);
};

const scanRange = (start, stop, thread_count) => {
    const port_range = stop - start;
    const thread_range = port_range / thread_count;
    for (let i = 0; i < thread_count; i++) {
        const _start = 0 | start + thread_range * i;
        const _stop = 0 | start + thread_range * (i + 1);
        thread(_start, _stop, port => {
            const el = document.createElement('div');
            el.innerText = 'Server found at :' + port;
            document.body.appendChild(el);
        });
    }
}

window.onload = () => {
    scanRange(80, 10000, 100);
};
