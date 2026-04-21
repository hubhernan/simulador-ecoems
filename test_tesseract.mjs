import { createWorker } from 'tesseract.js';

(async () => {
  console.log("Loading worker...");
  const worker = await createWorker('spa');
  console.log("Recognizing...");
  const { data: { text } } = await worker.recognize('exam3_images-000.png');
  console.log(text);
  await worker.terminate();
})();
