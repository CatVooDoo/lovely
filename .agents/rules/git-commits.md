---
trigger: always_on
---

# Правило оформления Git-коммитов
Все коммиты должны строго следовать регламенту:
## Формат
<task-name-or-id> | <Title in English>
--<ACTION> <краткое описание на русском>
--<ACTION> <краткое описание на русском>
## Требования:
- Первая строка (Subject):
  - <task-name-or-id>: ID задачи (например, 60476) либо краткое имя фичи в kebab-case (например, order-reports).
  - Разделитель:  |  (пробел, вертикальная черта, пробел).
  - <Title in English>: ёмкий заголовок задачи на английском языке.
- Строки описания (Body):
  - Начинаются строго с -- (двойное тире без пробела перед ACTION).
  - <ACTION> пишется капсом. Допустимые варианты:
    INIT, COPIED, MOVED, ADDED, CHANGED, DELETED, REFACTORED.
  - Описание действия пишется на русском языке.
- Кодировка: UTF-8 без BOM.
## Пример:
order-reports | Export orders to Excel and Telegram
--ADDED библиотека SimpleXLSXGen для формирования файлов Excel
--ADDED отправка отчетов в Telegram бот через sendTelegramDocument
--ADDED обработчик api_export_orders.php для выгрузки отчетов
--CHANGED раздел заказов orders.php с кнопкой и модальным окном выбора периода