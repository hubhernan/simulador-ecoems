export const exams = [
  {
    examId: 'exam-1',
    nombre: 'Examen Tipo A',
    descripcion: 'Simulación completa COMIPEMS. Ideal para medir tu línea base.',
    duracionMaxima: 180 * 60, // 3 hours in seconds
    totalPreguntas: 128,
    totalSecciones: 4,
    intentos: 2,
    secciones: [
      { sectionId: 'sec-1', nombre: 'Matemáticas', numPreguntas: 32 },
      { sectionId: 'sec-2', nombre: 'Español', numPreguntas: 32 },
      { sectionId: 'sec-3', nombre: 'Ciencias', numPreguntas: 32 },
      { sectionId: 'sec-4', nombre: 'Historia', numPreguntas: 32 }
    ]
  },
  {
    examId: 'exam-2',
    nombre: 'Examen Tipo B',
    descripcion: 'Enfocado en razonamiento y habilidades verbales.',
    duracionMaxima: 180 * 60,
    totalPreguntas: 128,
    totalSecciones: 4,
    intentos: 0,
    secciones: [
      { sectionId: 'sec-1', nombre: 'Matemáticas', numPreguntas: 32 },
      { sectionId: 'sec-2', nombre: 'Español', numPreguntas: 32 },
      { sectionId: 'sec-3', nombre: 'Ciencias', numPreguntas: 32 },
      { sectionId: 'sec-4', nombre: 'Historia', numPreguntas: 32 }
    ]
  },
  {
    examId: 'exam-3',
    nombre: 'Examen Tipo C',
    descripcion: 'Alto grado de dificultad. Para etapa final de preparación.',
    duracionMaxima: 180 * 60,
    totalPreguntas: 128,
    totalSecciones: 4,
    intentos: 1,
    secciones: [
      { sectionId: 'sec-1', nombre: 'Matemáticas', numPreguntas: 32 },
      { sectionId: 'sec-2', nombre: 'Español', numPreguntas: 32 },
      { sectionId: 'sec-3', nombre: 'Ciencias', numPreguntas: 32 },
      { sectionId: 'sec-4', nombre: 'Historia', numPreguntas: 32 }
    ]
  },
  {
    examId: 'exam-4',
    nombre: 'Examen Tipo D (No. 4)',
    descripcion: 'Evaluación integral basada en el Examen No. 4 original.',
    duracionMaxima: 180 * 60,
    totalPreguntas: 128,
    totalSecciones: 4,
    intentos: 0,
    secciones: [
      { sectionId: 'sec-1', nombre: 'Matemáticas', numPreguntas: 32 },
      { sectionId: 'sec-2', nombre: 'Español', numPreguntas: 32 },
      { sectionId: 'sec-3', nombre: 'Ciencias', numPreguntas: 32 },
      { sectionId: 'sec-4', nombre: 'Historia', numPreguntas: 32 }
    ]
  }
];

export const userProgress = {
  lastScore: 82,
  bestExam: 'Tipo A',
  averageScore: 78,
  lastTime: '2:31:44'
};
