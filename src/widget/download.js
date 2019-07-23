import fileSaver from 'file-saver';
function download (blob, name = 'template', options) {
    if (!(blob instanceof Blob)) {
        if (typeof blob === 'string') {
            blob = [
                blob,
            ];
        }
        blob = new Blob(blob, options);
    }

    fileSaver.saveAs(blob, name);
}

export {
    download,
};
