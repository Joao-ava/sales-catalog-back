import { hostServer } from "../config/server.js";

const weekDays = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

const getStatus = (horarios) => {
  const now = new Date();
  const day = weekDays[now.getDay()];
  const currentTime = now.getHours() * 60 + now.getMinutes(); // Convertendo para minutos

  const hours = horarios.find(item => item.weekDay === day);
  if (!hours) return 'Fechados';

  const [fromHours, fromMinutes] = hours.from.split(":").map(Number);
  const [toHours, toMinutes] = hours.to.split(":").map(Number);

  const fromTime = fromHours * 60 + fromMinutes;
  const toTime = toHours * 60 + toMinutes;

  const isInTime = currentTime >= fromTime && currentTime <= toTime
  if (isInTime) return 'Ativos';
  return 'Fechados';
};

export const storeAdapter = (store) => {
  const item = store.toObject();
  return {
    ...item,
    status: getStatus(item.horarios),
    imagem: `${hostServer}/${item.imagem}`
  }
}
