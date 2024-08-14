
# (ref #151647) Добавить запуск UI-тестов в CI

Здесь активно балуюсь, широкой полосой собирая нужные практические аспекты.
В итоге нарастёт материал уже для настоящего тестирующего стенда.

## После перерыва

Две недели писал на Vlang, эту шляпу всю забыл. Фиксирую ценные мыстли как влиться в контекст.

Запускаю контейнер (отдельное окно Win+V):

```sh
c1f
```

Захожу в шелл контейнера (отдельное окно, Magenta, Win+C):

```sh
c1sh
```

В контейнере запускаю сервер в watch-режиме:

```sh
uiw
```

<pre>
[10:30:16 AM] Starting compilation in watch mode...
[10:30:18 AM] Found 0 errors. Watching for file changes.
</pre>

Браузером иду в UI-консоль: 🌍http://localhost:3333.

Управление — из браузера.

Профитъ. 🤘
