
#
# Инструменты для комфортной работы в шелле.
#

# Настройки.
_CMF_UI_PORT="3333"

# Запускаем тесты.
t() {
  _cmf_ensure_testdir || return 1
  (set -x; npx playwright test "$@")
}

# Запускаем тесты в режиме UI. 🤘
ui() {
  _cmf_ensure_testdir || return 1

  local A=(
    --ui
    --ui-host 0.0.0.0
    --ui-port ${_CMF_UI_PORT}
  )

  (set -x; npx playwright test ${A[@]} "$@")
}

#---------------------------------------

_cmf_ensure_testdir() {
  [ -r "package.json" ] || {
    echo "Error: \`package.json\` is not found. Please step into the right directory." >&2
    return 1
  }
}
