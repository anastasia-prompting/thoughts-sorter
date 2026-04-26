# Потерянные мысли

[![Deploy to GitHub Pages](https://github.com/anastasia-prompting/thoughts-sorter/actions/workflows/deploy.yml/badge.svg)](https://github.com/anastasia-prompting/thoughts-sorter/actions/workflows/deploy.yml)
[![Live demo](https://img.shields.io/badge/demo-online-22c55e)](https://anastasia-prompting.github.io/thoughts-sorter/)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Made with Vite](https://img.shields.io/badge/made%20with-Vite-646cff.svg)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/react-18-149eca.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/typescript-5-3178c6.svg)](https://www.typescriptlang.org/)

Короткая mobile-first браузерная игра про сортировку собственных мыслей.
Игрок ловит проплывающие облачка-мысли и раскладывает их по трём корзинам:
**Сделать**, **Сохранить**, **Отпустить**. Раунд длится 60 секунд, очки
суммируются за корректные сортировки и комбо.

Демо: [anastasia-prompting.github.io/thoughts-sorter](https://anastasia-prompting.github.io/thoughts-sorter/)

<p align="center">
  <img src="src/assets/moon-observatory/bg-start.webp" alt="Превью сцены Moon Observatory" width="720" />
</p>

## Особенности

- Атмосферная визуальная тема **Moon Observatory** — рисованные фоны, маскот
  Cloud Moth и облачные пузырьки мыслей.
- Полноценная адаптивность: full-browser на десктопе и full-screen в мобильном
  браузере, с поддержкой safe-area (iOS notch).
- Локальное состояние через Zustand, прогресс сохраняется в `localStorage`.
- Лёгкий стек без серверной части — статический билд деплоится на GitHub Pages.

## Стек

- React 18 + TypeScript
- Vite 5
- Tailwind CSS 3
- Zustand 4
- GitHub Actions для CI/CD на GitHub Pages

## Запуск

Требуется Node.js 20+.

```bash
# 1. Установить зависимости
npm install

# 2. Запустить dev-сервер (http://localhost:5173)
npm run dev

# 3. Production-сборка в папку dist/
npm run build

# 4. Локальный предпросмотр сборки
npm run preview
```

## Публикация на GitHub Pages

Проект собирается с `base: "/thoughts-sorter/"`, поэтому работает по адресу
`https://<user>.github.io/thoughts-sorter/`. Если имя репозитория изменится,
поправьте `base` в [`vite.config.ts`](./vite.config.ts).

Автодеплой настроен через GitHub Actions ([.github/workflows/deploy.yml](./.github/workflows/deploy.yml)):

1. На GitHub: `Settings` → `Pages` → `Build and deployment` → `Source` =
   **GitHub Actions**.
2. Любой push в `main` запускает workflow, собирает проект и публикует
   содержимое `dist/`.

Файл [`public/.nojekyll`](./public/.nojekyll) отключает Jekyll, чтобы GitHub
Pages не игнорировал файлы, начинающиеся с `_` (они появляются в сборке Vite).

## Архитектура

```text
src/
├── App.tsx                   # корневой роутинг по экранам
├── main.tsx                  # точка входа
├── styles.css                # глобальные стили + scene/bubble/NPC темы
│
├── store/gameStore.ts        # глобальное состояние и переходы между экранами
├── game/engine.ts            # логика спавна мыслей, очков и комбо
├── data/thoughts.ts          # пул мыслей с категориями и редкостью
├── hooks/useRoundLoop.ts     # цикл таймера и спавна
├── utils/                    # балансировка, motion-параметры пузырьков
│
├── screens/                  # старт, туториал, игра, результаты, статистика, настройки
├── components/               # UI-блоки: TopHUD, ThoughtBubble, CatchTray, BucketButtons,
│                             #          NPCCloudMoth, SceneBackground
│
├── theme/                    # дизайн-токены и пути ассетов
└── assets/moon-observatory/  # фоны, маскот, спрайты пузырьков
```

## MVP-функциональность

- Раунд 60 секунд.
- Спавн мыслей каждые 1.2–2.2 сек, до 6 одновременно.
- Поимка тапом/кликом, сортировка через три кнопки категорий.
- Очки и комбо по правилам ТЗ.
- Экраны итогов, статистики и настроек.
- Сохранение прогресса между перезагрузками.

## Разработка ассетов

Скрипт [`scripts/strip-checker.ps1`](./scripts/strip-checker.ps1) использовался
один раз для удаления нарисованной alpha-чешки из исходных PNG-ассетов
маскота и пузырьков (flood-fill chroma key из четырёх углов). Хранится для
переотработки, если придут новые ассеты в том же формате.

## Лицензия

[MIT](./LICENSE)
