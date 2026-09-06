@echo off
chcp 65001 >nul
echo ========================================================
echo   PUBLICAR REDAÇÃO UEG SEM MISTÉRIO NO GITHUB PAGES
echo ========================================================
echo.

git remote -v | findstr origin >nul 2>&1
if %errorlevel% neq 0 (
    echo Nenhum link de repositorio remoto do GitHub configurado ainda.
    echo.
    echo 1. Crie um novo repositorio vazio no seu GitHub: https://github.com/new
    echo 2. Cole o link HTTPS do seu repositorio aqui (ex: https://github.com/usuario/repo.git)
    echo.
    set /p REPO_URL="Cole o link do repositorio: "
    git remote add origin %REPO_URL%
)

echo.
echo Sincronizando arquivos e enviando para a branch main...
git branch -M main
git add .
git commit -m "Deploy atualizado: Redação UEG Sem Mistério" >nul 2>&1
git push -u origin main

echo.
echo ========================================================
echo   SUCESSO! SEU SITE FOI ENVIADO PARA O GITHUB!
echo ========================================================
echo.
echo Para ativar o GitHub Pages:
echo 1. Acesse o seu repositorio no GitHub
echo 2. Va em Settings (Configuracoes) -^> Pages
echo 3. Em "Branch", selecione "main" e "/ (root)"
echo 4. Clique em Save. Em 1 minuto seu site estara no ar!
echo.
pause
