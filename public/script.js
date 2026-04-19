async function uploadFile() {
  const fileInput = document.getElementById("fileInput");
  const formData = new FormData();
  formData.append("file", fileInput.files[0]);

  await fetch("/upload", {
    method: "POST",
    body: formData
  });

  alert("File Uploaded");
  loadFiles();
}

async function loadFiles() {
  const res = await fetch("/files");
  const files = await res.json();

  const list = document.getElementById("filelist");
  list.innerHTML = "";

  files.forEach(f => {
    const li = document.createElement("li");
    li.textContent = f.filename;
    list.appendChild(li);
  });
}

loadFiles();