# Tashenev University

Демонстрационный редизайн главной страницы университета имени Жумабека Ахметулы Ташенева. Логотип, фотография и справочные сведения взяты с [официального сайта университета](https://tashenev.edu.kz/ru).

Анимации адаптированы из Skiper UI. Линия с силуэтом фасада использует [Skiper19](https://skiper-ui.com/v1/skiper19), подчёркивание ссылок — [Skiper40](https://skiper-ui.com/v1/skiper40), перекат букв в меню — [Skiper58](https://skiper-ui.com/v1/skiper58), а кольцо над фотографией кампуса — [Skiper61](https://skiper-ui.com/v1/skiper61). При включённом уменьшении движения страница показывает статичные варианты.

Фотография выпускников взята из [репортажа университета о вручении дипломов](https://tashenev.edu.kz/ru/media/item/1222).

В фотопереключателе адаптирован [Animated Tabs от Build UI на 21st.dev](https://21st.dev/@builduilabs/components/animated-tabs) по [публичному коду авторов](https://buildui.com/recipes/animated-tabs). Главная ссылка адаптирует [Interactive Hover Button от Dillion Verma на 21st.dev](https://21st.dev/@dillionverma/components/interactive-hover-button) по [реестру Magic UI](https://magicui.design/r/interactive-hover-button.json). Лицензия Magic UI приложена в `licenses/Magic-UI-MIT.txt`.

## Локальный запуск

Для выпускного, корпуса и библиотеки исходные фотографии получили цветокоррекцию по вариантам ImageGen. На сайте используются исходные пиксели с изменёнными цветами. Кадры меняются после декодирования изображения, с плавным переходом и поддержкой уменьшенного движения.

Понадобятся Node.js 24 и pnpm 11.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

`pnpm build` проверяет типы и собирает статический сайт в `dist/`. GitHub Actions публикует сборку в GitHub Pages при обновлении ветки `main`.
