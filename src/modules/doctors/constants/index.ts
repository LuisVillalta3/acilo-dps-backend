/* eslint-disable prettier/prettier */
export const DIAS = {
  1: 'Lunes',
  2: 'Martes',
  3: 'Miércoles',
  4: 'Jueves',
  5: 'Viernes',
  6: 'Sábado',
  7: 'Domingo',
}

export const defaultHorarios = (idDoctor: number) => Array.from({ length: 7 }, (_, i) => i + 1).map(
  (dia) => ({
    dia,
    inicio: new Date().setHours(8, 0, 0, 0),
    fin: new Date().setHours(20, 0, 0, 0),
    idDoctor,
  }),
);
