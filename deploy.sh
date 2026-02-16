#!/bin/bash
# ===========================================
# Deploy Script - Luminus E-commerce Dashboard
# ===========================================
# Uso: Execute este script NO SERVIDOR ou localmente com SSH
#
# Opção A - Direto no servidor:
#   1. Acesse: ssh root@45.67.216.116
#   2. Cole e execute este script
#
# Opção B - Do seu computador local:
#   scp -r ./luminus root@45.67.216.116:/AOIS2
#   ssh root@45.67.216.116 'cd /AOIS2 && bash deploy.sh'
# ===========================================

set -e

INSTALL_DIR="/AOIS2"
PORT=3000

echo "=========================================="
echo "  Luminus Dashboard - Deploy"
echo "=========================================="

# 1. Instalar Node.js se não existir
if ! command -v node &> /dev/null; then
    echo "[1/5] Instalando Node.js 20..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs
else
    echo "[1/5] Node.js já instalado: $(node -v)"
fi

# 2. Instalar PM2 para manter o servidor rodando
if ! command -v pm2 &> /dev/null; then
    echo "[2/5] Instalando PM2..."
    npm install -g pm2
else
    echo "[2/5] PM2 já instalado"
fi

# 3. Instalar dependências
echo "[3/5] Instalando dependências..."
cd "$INSTALL_DIR"
npm install

# 4. Build de produção
echo "[4/5] Criando build de produção..."
npx next build

# 5. Iniciar com PM2
echo "[5/5] Iniciando servidor..."
pm2 stop luminus 2>/dev/null || true
pm2 delete luminus 2>/dev/null || true
pm2 start npm --name "luminus" -- start -- -p $PORT
pm2 save
pm2 startup 2>/dev/null || true

echo ""
echo "=========================================="
echo "  Deploy concluído com sucesso!"
echo "=========================================="
echo ""
echo "  Dashboard disponível em:"
echo "  http://45.67.216.116:${PORT}"
echo ""
echo "  Comandos úteis:"
echo "  pm2 status        - Ver status"
echo "  pm2 logs luminus  - Ver logs"
echo "  pm2 restart luminus - Reiniciar"
echo "=========================================="
