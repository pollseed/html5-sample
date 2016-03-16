"use strict";

function handleFileSelect(evt) {
  evt.stopPropagation();
  evt.preventDefault();

  let files = evt.dataTransfer.files, output = [],
    preview = document.getElementById('preview'),
    img,
    reader;

  for (let i = 0, f; f = files[i]; i++) {
    output.push(
      '<li>',
      `<strong>${escape(f.name)}</strong> (`,
      f.type || 'n/a',
      ') - ',
      f.size,
      'bytes, last modified:',
      f.lastModifiedDate.toLocaleDateString(),
      '</li>');
    img = document.createElement('img');
    img.classList.add('preview');
    img.file = f;
    preview.appendChild(img);

    reader = new FileReader();
    reader.onload = (aImg => { return e => {
      aImg.src = e.target.result;
    };})(img);
    reader.readAsDataURL(f);
  }
  document.getElementById('list').innerHTML
    = `<ol>${output.join('')}</ol>`;
}

function handleDragOver(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  evt.dataTransfer.dropEffect = 'copy';
}

function preview() {
  let img = document.createElement('img');
}

let dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);
