export function stringfy(hours, minutes) {
  if (hours < 10) {
    if (minutes < 10) {
      return "0".concat(String(hours), ":", String(minutes), "0");
    }
    return "0".concat(String(hours), ":", String(minutes));
  }
  if (minutes < 10) {
    return String(hours).concat(":", String(minutes), "0");
  }
  return String(hours).concat(":", String(minutes));
}

export const dayToString = [
  "Domenica",
  "Lunedì",
  "Martedì",
  "Mercoledì",
  "Giovedì",
  "Venerdì",
  "Sabato",
];

export const monthToString = [
  "Gennaio",
  "Febbraio",
  "Marzo",
  "Aprile",
  "Maggio",
  "Giugno",
  "Luglio",
  "Agosto",
  "Settembre",
  "Ottobre",
  "Novembre",
  "Dicembre",
];
