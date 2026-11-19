// Browsers name the saved PDF after document.title, so give it a recruiter-friendly filename.
export function printResume() {
  const prev = document.title;
  document.title = "James_Smith_Resume";
  window.addEventListener("afterprint", () => { document.title = prev; }, { once: true });
  window.print();
}
