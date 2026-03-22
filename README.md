# VK Selection Task

Приложение для просмотра фильмов по ТЗ на `React + TypeScript + Effector + VKUI`.

## Функционал

- Лента фильмов с infinite scroll (по 50 записей).
- Фильтры по жанрам, рейтингу, году (с 1990), синхронизированные с URL.
- Страница детальной информации о фильме.
- Избранное с подтверждением добавления через кастомную модалку.
- Сравнение до 2 фильмов (при добавлении третьего вытесняется первый).

## Технологии

- React
- TypeScript
- React Router
- Effector + effector-react
- VKUI
- Axios

## Запуск

```bash
git clone https://github.com/DKMFzF/vk-selection-task.git
cd vk-selection-task
npm i
# создать .env на основе .env.default
npm run dev
```

## .env

`.env.default`:
- `PORT` - порт dev-сервера
- `KINOPOISK_API_URL` - base url API
- `KINOPOISK_API_KEY` - API ключ kinopoisk.dev