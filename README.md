# Луч солнца

1)
```
docker compose up -d
```
или
```
npm run develop # в папке backend
npm start # в папке frontend
```
2) Создать файлы `.env` в корневом каталоге проекта, а также в папках `frontend` и `backend` путём копирования файла `.env.example`
3) Перейти по адресу [https://localhost:1337/admin](http://localhost:1337/admin) и создать аккаунт администратора
4) Создать ключ доступа в личном кабинете Strapi (Settings > API Tokens > Create new API Token)
5) Вставить токен в переменную `REACT_APP_API_TOKEN` в файле `frontend/.env`
6) Перезапустить frontend
7) Создать тестовые данные в личном кабинете Strapi (Content Manager)

Оплата изначально работает в тестовом режиме. Чтобы подключить сайт к реальному аккаунту paykeeper, нужно изменить соответствующие параметры в файле `backend/.env` и перезапустить backend
