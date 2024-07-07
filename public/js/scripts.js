document.getElementById("uploadForm").onsubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const response = await fetch("/api/images/upload", {
    method: "POST",
    body: formData,
  });
  const result = await response.json();
  document.getElementById("uploadResponse").innerText =
    result.message || "Upload successful";
};

document.getElementById("resizeForm").onsubmit = async (e) => {
  e.preventDefault();
  const params = new URLSearchParams(new FormData(e.target)).toString();
  const response = await fetch(`/api/images/resize?${params}`);
  if (response.ok) {
    const imageUrl = response.url;
    document.getElementById("resizeResponse").innerText =
      `Resized image available at: ${imageUrl}`;
  } else {
    document.getElementById("resizeResponse").innerText =
      "Failed to resize image";
  }
};
