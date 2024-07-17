#!/bin/bash

# Строгий режим.
set -u -o pipefail

conclude() {
  local LABEL="\e[1;32mconclude():\e[0m"

  msg "Shleeping..."
  exec sleep infinity
}

# AF: TODO: Fin.
# Это ущербный вариант, здесь не получится live-редактировать.
# А нужно именно это. Пусть даже ценой вздутия конфига.
# copy_try1() {
#   local LABEL="\e[1;32mcopy_try1():\e[0m"

#   local SUBJ="try1"
#   local UG="$(id -u):$(id -g)"

#   msg "Copying \`${SUBJ}\`…"

#   # Готовим путь и копируем.
#   (set -x; sudo chown ${UG} ~/${SUBJ}) || return 1
#   cp -afv /mnt/try1/* ~/try1 || return 1

#   msg "Done"
# }

prepare_try1() {
  local LABEL="\e[1;32mcopy_try1():\e[0m"

  local SUBJ="try1"
  local UG="$(id -u):$(id -g)"

  # Аккуратно готовим top-level диру.
  (set -x; sudo chown ${UG} ~/${SUBJ}) || return 1
}

#--------------------------------------- Инструменты

# Выводим сообщение с меткой `${LABEL}`.
# $1: (optional) Message.
msg() {
  echo -e "${LABEL} ${1:-}"
}

#--------------------------------------- Main

# AF: TODO: Fin.
#copy_try1 || exit 1
prepare_try1 || exit 1

conclude
