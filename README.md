## ATTENSION! this part of work wos made by AI!

## Структура проекту

Проект організовано за принципами модульності NestJS:

- **src/** — основна папка з вихідним кодом
  - **main.ts** — точка входу в застосунок
  - **app.module.ts** — кореневий модуль
  - **db/** — сутності бази даних
    - **entity/group.entity.ts** — опис групи
    - **entity/student.entity.ts** — опис студента
  - **exception/** — обробка помилок
    - **error.exception.ts** — кастомні винятки
  - **external/** — інтеграція із зовнішніми сервісами
    - **external.controller.ts**, **external.service.ts**, **external.module.ts**
    - **interface/product.interface.ts** — інтерфейси зовнішніх продуктів
  - **groups/** — логіка для груп
    - **groups.controller.ts**, **groups.service.ts**, **groups.repository.ts**, **groups.module.ts**
    - **dto/** — DTO для груп (addStudent, createGroup, groupIdParam)
  - **students/** — логіка для студентів
    - **students.controller.ts**, **students.service.ts**, **students.repository.ts**, **students.module.ts**
    - **dto/** — DTO для студентів (createStudent, studentIdParam)

- **package.json** — залежності та скрипти
- **tsconfig.json** — налаштування TypeScript
- **eslint.config.mjs** — налаштування ESLint

Кожен модуль містить контролери, сервіси, DTO та репозиторії для ізоляції бізнес-логіки.

## Реалізація інтеграції із зовнішніми сервісами

Інтеграція із зовнішніми API реалізована у модулі `external`:

- **ExternalService** використовує `HttpService` для HTTP-запитів до зовнішнього ресурсу (URL зберігається у змінних оточення через `ConfigService`).
- Для підвищення надійності дані кешуються через `CacheManager`. Якщо зовнішній сервіс недоступний, повертаються дані з кешу.
- **ExternalController** надає endpoint `/external`, який повертає дані із зовнішнього API або кешу.
- Модуль `ExternalModule` підключає `HttpModule`, `CacheModule` та `ConfigModule` для роботи із HTTP, кешем та конфігурацією.

**Переваги підходу:**

- Відмова зовнішнього сервісу не призводить до повної втрати функціоналу — дані повертаються з кешу.
- Гнучке налаштування через змінні оточення (`EXTERNAL_URL`, `CACHE_TTL`).
- Можливість легко додати кешування на рівні контролера через `@UseInterceptors(CacheInterceptor)`.

## Опис кешування

У проекті використовується кешування для підвищення надійності та продуктивності при роботі із зовнішніми API:

- Підключено `CacheModule` з асинхронною конфігурацією (TTL задається через змінну оточення `CACHE_TTL`, за замовчуванням 300 секунд).
- Кешування реалізовано у сервісі `ExternalService` через `CacheManager` — дані зберігаються у кеші після успішного запиту до зовнішнього API.
- Якщо зовнішній сервіс недоступний, дані повертаються з кешу (ключ `externalData`).
- Кешування можна легко розширити на рівень контролера за допомогою декоратора `@UseInterceptors(CacheInterceptor)` при зміні деяких умов ТЗ!.
- Кеш є глобальним для всього застосунку (isGlobal: true).

**Налаштування:**
У файлі `.env` потрібно вказати TTL кешу (у секундах):

```
CACHE_TTL=300
```

## Інструкція запуску

1. Скопіюйте `.env.example` у `.env` та вкажіть необхідні змінні (наприклад, `EXTERNAL_URL`, `CACHE_TTL`, параметри БД тощо).
2. Встановіть залежності:

```bash
npm install
```

3. Запустіть застосунок у потрібному режимі:

```bash
npm run start         # звичайний запуск
npm run start:dev     # режим розробки з hot-reload
npm run start:prod    # production-режим
```

4. Для тестування використовуйте:

```bash
npm run test          # юніт-тести

```

---
