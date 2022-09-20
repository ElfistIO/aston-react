# Magic The Gathering Project

![](./src/assets/images/mtg-logo2.png)

## Примеры запросов

- Lotus
- Urza
- Akroma

# Реализованы следующие требования к функциональности:
## 1 уровень
### React

- Функциональные компоненты c хуками в приоритете над классовыми.
- Есть четкое разделение на умные и глупые компоненты.
- Есть рендеринг списков [ImageType](./src/pages/searchResult/imageType/imageType.tsx), [FullType](./src/pages/searchResult/FullType/FullType.tsx), [CheckListType](./src/pages/searchResult/checkListType/checkListType.tsx).
- Реализована хотя бы одна форма [Search](./src/components/search/search.tsx), [Login](./src/pages/login/login.tsx), [Register](./src/pages/register/register.tsx).
- Есть применение Контекст API [AuthContext](./src/App.tsx), (./src/services/AuthContext/AuthContext.tsx).
- Есть применение предохранителя [ErrorBoundary](./src/components/ErrorBoundary.tsx), (./src/App.tsx).
- Есть хотя бы один кастомный хук [useNavigateSearch] [useDebounceFunc] [useDebounceValue](./src/app/hooks.ts), [useAuth](./src/services/AuthContext/AuthContext.tsx).
- Хотя бы несколько компонентов используют PropTypes [Card](./src/components/card/card.tsx), [Pdgination](./src/components/pagination/pagination.tsx)
- Поиск не должен триггерить много запросов к серверу (реализован debounce) [Search](./src/components/search/search.tsx).
- Есть применение lazy + Suspense [App](./src/App.tsx)

### Redux

- Используем Modern Redux with Redux Toolkit [reducers](./src/app/store.ts).
- Используем слайсы [reducers](./src/app/slices/).
- Есть хотя бы одна кастомная мидлвара [logger](./src/app/middleware/logger.ts).
- Используется RTK Query [apiSlice](./src/app/slices/apiSlice.ts).
- Используется Transforming Responses [apiSlice](./src/app/slices/apiSlice.ts).

## 2 уровень

- Использование TypeScript.