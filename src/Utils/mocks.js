import { generateUniqueId } from "./utils";

const transactionEvent = {
  id: generateUniqueId(),
  sum: 2000,
  currency: "USD",
  from: "ИП, Петров Денис Игоревич",
  desc: "Разработка дизайна и макетирование выставочного стенда",
  type: "Приход",
  date: new Date(2019, 1, 13),
  eventType: "transaction"
};

const newsEvent = {
  id: generateUniqueId(),
  title: "ИП или ООО: в чём разница и как зарегистрировать",
  desc:
    "ИП подойдёт тому, кто не имеет опыта в предпринимательстве, только начинает бизнес и планирует заниматься им без партнёров. ООО — для тех, кто хочет масштабировать бизнес или открывает компанию с партнёрами. А теперь детали.",
  date: new Date(2019, 1, 7),
  eventType: "news"
};

export const mockEvents = [transactionEvent, newsEvent];
