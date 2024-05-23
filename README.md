# Homework for Course "Fullstack Application Development with Node.js + Express.js + React.js 2023/2024" in FMI

## Task:

- Cooking Recipe Frontend
- Includes Users and Recipes
- Everyone can create users, log in as user, logout, view all users and edit/delete them (no security)
- Guest can only see last 10 recipes and filter by Tag and by Author of recipe
- Only logged users can see all of the recipes and edit/delete them (again no security)
- Logged users can add new recipes
- Written in ReactJS with Typescript

### task in Bulgarian:

Да се реализира клиентско (браузър) приложение с ReactJS, без презареждане на страницата (Single Page Application - SPA) използвайки рутиране с React Router v6.23, което пази данните в backend REST API реализирано с json-server (както в проектите разработени по време на занятия), със следната функционалност:

За всеки потребител (User) се съхранява следната информация (с валидация на данните):

    идентификатор на записа (до 24 символа);
    име на потребителя;реализоирано
    login име (username - до 15 символа - word characters);
    парола (поне 8 символа, поне една цифра и знак различен от буква и цифра);
    пол;
    потребителска роля (user или admin);
    снимка на потребителя (може да бъде URL, ако липсва се замества с аватара по подразбиране в зависимост от пола);
    кратко представяне на потребителя (до 512 символа);
    статус на валидност на акаунта - (active, suspended или deactivated);
    дата и час на регистрация (генерира се автоматично);
    дата и час на последна модификация (генерира се автоматично);

За всяка рецепта (Recipe) се съхранява следната информация (с валидация на данните):

    идентификатор на рецептата (до 24 символа);
    идентификатор на потребителя споделил рецептата (до 24 символа);
    име на рецептата (до 80 символа);
    кратко описание на рецептата (до 256 символа);
    време за приготвяне (в минути);
    използвани продукти (списък от продукти);
    снимка на резултата от рецептата (валиден URL, задължителен атрибут);
    подробно описание (до 2048 символа);
    ключови думи - tags (списък от тагове);
    дата и час на споделяне (генерира се автоматично);
    дата и час на последна модификация (генерира се автоматично);

    Позволява добавяне на нов потребител (в тази версия без секюрити рестрикции). (10 точки)
    Позволява избор на активен потребител (login) - в тази версия login-а се случва изцяло в ReactJS клиента, а не на backend сървъра, тъй като json-server не предлага подобна функционалност. Аутентикираният потребител се пази в Window.sessionStorage и се взима от там докато не приключи потребителската сесия с приложението в браузъра или потребителят не избере sign-out опция от менюто. (10 точки)
    Позволява публикуване на нова рецепта от активния потребител. (10 точки)
    Извеждане на последните 10 публикувани рецепти, с възможност за филтриране по ключови думи (tags) и автор (потребител споделил рецептата), със снимка на резултата, в съкратен (summary) формат (до 150 символа), сортирани (обратно - descending) по дата на публикуване. (10 точки)
    Извежда списък на всички рецепти, като до всяка рецепта се извеждат бутон за редактиране и бутон за изтриване на рецептата, който да активира съответната функционалност (редактиране в нов изглед - view или изтриване). За редактирането можете да използвате повторно формата за публикуване реализирана в предишна точка. (15 точки).
    Извежда списък на всички потребители, като до всеки потребител се извеждат бутон за редактиране и бутон за изтриване на пoтребителя, който да активира съответната функционалност (редактиране в нов изглед - view или изтриване) (15 точки).
    Меню позволяващо избор на всека от функционалностите (изгледите, views) реализирани в задачата с рутиране с React Router v6.23. (10 точки).

## Technologies Used:

- ReactJS (with TS)
- json-server
- react-hook-form
- react-router-6.23.1
- yup
- @hookform/resolvers
- vite

## Default README.md below:

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
