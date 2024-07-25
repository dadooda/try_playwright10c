
#
# Инструменты для комфортной работы в шелле.
#

# Настройки.
_CMF_OUT_PATH="tests-out/"
_CMF_TEST_PATH="tests/"
_CMF_UI_PORT="3333"

# Запускаем тесты.
t() {
  _cmf_ensure_testpwd || return 1

  # AF: TODO: Разбил на `_t_basic`, `_t_regular`.

  # Стартовый вариант. Работает без `tsc`.
  # (set -x; npx playwright test "$@")

  # Обычный вариант. Когда проект без `tsc` уже не запускается.
  (
    set -x
    npx tsc -p "${_CMF_TEST_PATH}" && npx playwright test -c "${_CMF_OUT_PATH}" "$@"
  )
}

# Запускаем тесты в режиме UI. 🤘
ui() {
  #_cmf_ui_basic
  _cmf_ui_compiled
}

# Запускаем UI и watch-компиляцию.
uiw() {(
  echo "Starting background UI server..."
  _cmf_ui_compiled &
  sleep 1
  echo "Starting TS compilation in watch mode. Press Ctrl+C to terminate."
  watch
)}

# Следим за изменениями и перекомпилируем `tests/` когда надо.
watch() {
  _cmf_ensure_testpwd || return 1

  (set -x; npx tsc -p "${_CMF_TEST_PATH}" -w)
}

#---------------------------------------

_cmf_ensure_testpwd() {
  [ -r "package.json" ] || {
    echo "Error: \`package.json\` is not found. Please step into the right directory." >&2
    return 1
  }
}

# `ui` -- начальный вариант.
_cmf_ui_basic() {
  _cmf_ensure_testpwd || return 1

  local A=(
    --ui
    --ui-host 0.0.0.0
    --ui-port ${_CMF_UI_PORT}
  )

  (set -x; npx playwright test ${A[@]} "$@")
}

# `ui` -- вариант с компиляцией TS.
_cmf_ui_compiled() {
  _cmf_ensure_testpwd || return 1

  local A=(
    -c "${_CMF_OUT_PATH}"
    --ui
    --ui-host 0.0.0.0
    --ui-port ${_CMF_UI_PORT}
  )

  (set -x; npx playwright test ${A[@]} "$@")
}
