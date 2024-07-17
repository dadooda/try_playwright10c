#!/bin/bash

# Строгий режим.
set -u -o pipefail

conclude() {
  local LABEL="\e[1;32mconclude():\e[0m"

  msg "Shleeping..."
  exec sleep infinity
}

#--------------------------------------- Инструменты

# Выводим сообщение с меткой `${LABEL}`.
# $1: (optional) Message.
msg() {
  echo -e "${LABEL} ${1:-}"
}

#--------------------------------------- Main

conclude
