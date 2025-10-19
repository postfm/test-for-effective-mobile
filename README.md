Приложение для работы с базой данных.
Создано в ходе выполнения тестового задания от Effective Mobile.

Использовались:

1. Nodejs - 24.4.1;
2. Express - 5.1.0;
3. PostgreSQL - 17.5;
4. PgAdmin - 9.5;
5. Prisma - 6.17.1;
6. TypeScrypt - 5.9.3;
7. Docker Desktop - 4.48.0.

Запуск сервера БД:

1. Запускаем Docker Desktop.
2. В командной строке выполняем команду: "docker compose -f 'src\docker-compose.dev.yml' up -d --build"

Запуск приложения:

1. npm install.
2. Переименовать все файлы .env.example в .env.
3. npm run start - для продакшэна, npm run start:dev - для режима разработки.

Работа с БД:
npm run db:migrate - миграция (инициализация) БД;
npm run db:validate - проверка БД;
npm run db:generate - инициирование Prisma Client;
npm run db:seed - наполнение БД тестовыми данными.

Описание остальных скриптов для работы с приложением находятся в файле package.json.

Примеры запросов для проверки работоспособности приложения находятся в файле app.http
