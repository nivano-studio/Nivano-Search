@echo off
title Iniciando Nivano Search...
chcp 65001 > nul
echo =======================================================
echo              INICIANDO NIVANO SEARCH
echo =======================================================
echo.

:: Verifica e instala dependências se necessário
if not exist "node_modules" (
    echo [INFO] Instalando dependências da raiz...
    call npm install
)
if not exist "backend\node_modules" (
    echo [INFO] Instalando dependências do backend...
    call npm install --prefix backend
)
if not exist "frontend\node_modules" (
    echo [INFO] Instalando dependências do frontend...
    call npm install --prefix frontend --legacy-peer-deps
)

echo.
echo [INFO] Iniciando servidores de backend e frontend...
echo [INFO] O seu navegador padrão abrirá em: http://localhost:5173/
echo.

:: Abre o navegador padrão no endereço do frontend
start http://localhost:5173/

:: Inicia o processo de desenvolvimento concorrente local
call npm run dev

pause
