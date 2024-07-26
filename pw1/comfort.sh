
#
# Инструменты для комфортной работы в шелле.
#

# Настройки.
_CMF_COMPILE_MODE="!"       # Раскомментировать, если мы в режиме компиляции.
_CMF_OUT_PATH="out/"
_CMF_TEST_PATH="tests/"
_CMF_UI_PORT="3333"

# Запускаем тесты.
# $@: (optional) Дополнительные аргументы главной команды.
t() {
  if _cmf_is_compile_mode; then
    _cmf_t_compiled "$@"
  else
    _cmf_t_basic "$@"
  fi
}

# Запускаем тесты в режиме UI. 🤘
# $@: (optional) Дополнительные аргументы главной команды.
ui() {
  if _cmf_is_compile_mode; then
    _cmf_ui_compiled "$@"
  else
    _cmf_ui_basic "$@"
  fi
}

# Запускаем UI и watch-компиляцию одним набором. По Ctrl+C можно остановить всё.
uiw() {(
  echo "Starting background UI server..."
  _cmf_ui_compiled &
  sleep 1
  echo "Starting TS compilation in watch mode. Press Ctrl+C to terminate."
  watch
)}

# Следим за изменениями и перекомпилируем код по мере изменений.
watch() {
  _cmf_ensure_pwd || return 1
  _cmf_compile -w
}

#--------------------------------------- Инструменты

#
# ВАЖНО:
#
# 1. Рассматриваем каждую функцию как независимую. Пусть будут одни и те же проверки, надёжности
#    много не бывает.
#

# Компилируем тесты.
# $@: (optional) Дополнительные аргументы главной команды.
_cmf_compile() {
  _cmf_ensure_pwd || return 1
  (
    set -x
    rm -rf "${_CMF_OUT_PATH}"
    npx tsc -p "${_CMF_TEST_PATH}" "$@"
  )
}

# Возвращаем 0, если находимся в правильной дире.
_cmf_ensure_pwd() {
  [[ -r "package.json" ]] || {
    echo "Error: \`package.json\` is not found. Please step into the right directory." >&2
    return 1
  }
}

# Возвращаем 0 если мы в режиме компиляции.
_cmf_is_compile_mode() {
  [[ "${_CMF_COMPILE_MODE:-}" = "!" ]]
}

# `t` -- начальный вариант.
_cmf_t_basic() {
  _cmf_ensure_pwd || return 1
  (set -x; npx playwright test "$@")
}

# `t` -- вариант с компиляцией.
_cmf_t_compiled() {
  _cmf_ensure_pwd || return 1
  _cmf_compile
  (set -x; npx playwright test -c "${_CMF_OUT_PATH}" "$@")
}

# `ui` -- начальный вариант.
_cmf_ui_basic() {
  _cmf_ensure_pwd || return 1

  local A=(
    --ui
    --ui-host 0.0.0.0
    --ui-port ${_CMF_UI_PORT}
  )

  (set -x; npx playwright test ${A[@]} "$@")
}

# `ui` -- вариант с компиляцией.
_cmf_ui_compiled() {
  _cmf_ensure_pwd || return 1

  local A=(
    -c "${_CMF_OUT_PATH}"
    --ui
    --ui-host 0.0.0.0
    --ui-port ${_CMF_UI_PORT}
  )

  (set -x; npx playwright test ${A[@]} "$@")
}
