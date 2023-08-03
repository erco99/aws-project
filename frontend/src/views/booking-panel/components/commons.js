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

const dayToString = [
  "Domenica",
  "Lunedì",
  "Martedì",
  "Mercoledì",
  "Giovedì",
  "Venerdì",
  "Sabato",
];

const monthToString = [
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

export function domainDate(date) {
  return date.toISOString().split("T")[0];
}

export function getStringMonth(domainDate) {
  return monthToString[new Date(domainDate).getMonth()];
}

export function getDate(domainDate) {
  return new Date(domainDate).getDate();
}

export function getStringDay(domainDate) {
  return dayToString[new Date(domainDate).getDay()];
}
