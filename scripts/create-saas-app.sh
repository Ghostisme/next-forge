#!/bin/bash

###############################################################################
# SaaS 应用快速构建脚本 (Bash 版本)
# 用法: ./scripts/create-saas-app.sh my-app
###############################################################################

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# 日志函数
log_step() {
    echo -e "\n${CYAN}[$1/5] $2${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

log_info() {
    echo -e "${YELLOW}$1${NC}"
}

# 检查参数
if [ -z "$1" ]; then
    log_error "请提供应用名称！"
    echo -e "\n${YELLOW}用法: ./scripts/create-saas-app.sh <app-name>${NC}"
    echo -e "${YELLOW}示例: ./scripts/create-saas-app.sh my-admin${NC}\n"
    exit 1
fi

APP_NAME="$1"

# 验证应用名称
if ! [[ "$APP_NAME" =~ ^[a-z0-9-]+$ ]]; then
    log_error "应用名称只能包含小写字母、数字和连字符！"
    exit 1
fi

echo -e "\n${BOLD}🚀 开始创建 SaaS 应用...${NC}\n"
echo -e "${BLUE}📦 应用名称: $APP_NAME${NC}"

# 路径定义
ROOT_DIR="$(pwd)"
TEMPLATE_DIR="$ROOT_DIR/templates/saas-admin"
APPS_DIR="$ROOT_DIR/apps"
APP_PATH="$APPS_DIR/$APP_NAME"

# 检查模板是否存在
if [ ! -d "$TEMPLATE_DIR" ]; then
    log_error "找不到 saas-admin 模板！"
    log_error "预期路径: $TEMPLATE_DIR"
    exit 1
fi

# 检查应用是否已存在
if [ -d "$APP_PATH" ]; then
    log_error "应用 \"$APP_NAME\" 已存在！"
    log_error "路径: $APP_PATH"
    exit 1
fi

# 步骤 1: 复制模板文件
log_step 1 "复制模板文件..."
mkdir -p "$APP_PATH"
cp -r "$TEMPLATE_DIR/"* "$APP_PATH/" 2>/dev/null || true
cp -r "$TEMPLATE_DIR/".* "$APP_PATH/" 2>/dev/null || true
log_success "模板文件复制完成"

# 步骤 2: 更新 package.json
log_step 2 "配置项目信息..."
if [ -f "$APP_PATH/package.json" ]; then
    sed -i.bak "s/@templates\/saas-admin/@apps\/$APP_NAME/g" "$APP_PATH/package.json"
    sed -i.bak "s/\"version\": \"[^\"]*\"/\"version\": \"1.0.0\"/g" "$APP_PATH/package.json"
    rm "$APP_PATH/package.json.bak" 2>/dev/null || true
fi
log_success "项目配置完成"

# 步骤 3: 创建环境变量文件
log_step 3 "创建环境配置..."
cat > "$APP_PATH/.env.development" << EOF
# 开发环境配置

# API 基础地址
VITE_API_BASE_URL=http://localhost:3001

# 是否启用模拟认证（开发时可以不依赖后端）
VITE_USE_MOCK_AUTH=true

# 应用标题
VITE_APP_TITLE=$APP_NAME 管理后台

# 应用环境
VITE_APP_ENV=development
EOF
log_success "环境配置创建完成"

# 步骤 4: 更新 pnpm-workspace.yaml
log_step 4 "更新工作区配置..."
if ! grep -q "apps/$APP_NAME" "$ROOT_DIR/pnpm-workspace.yaml" 2>/dev/null; then
    if grep -q "apps/\*" "$ROOT_DIR/pnpm-workspace.yaml" 2>/dev/null; then
        log_info "工作区已包含 apps/* 配置"
    else
        echo "  - 'apps/$APP_NAME'" >> "$ROOT_DIR/pnpm-workspace.yaml"
        log_success "工作区配置已更新"
    fi
fi

# 步骤 5: 安装依赖
log_step 5 "安装依赖（这可能需要几分钟）..."
cd "$ROOT_DIR"
if pnpm install; then
    log_success "依赖安装完成"
else
    log_error "依赖安装失败，但项目已创建。请手动运行 pnpm install"
fi

# 完成
echo -e "\n${GREEN}🎉 应用创建成功！${NC}\n"
echo -e "${CYAN}📁 项目路径:${NC}"
echo -e "   $APP_PATH\n"

echo -e "${CYAN}🚀 快速开始:${NC}"
echo -e "${YELLOW}   cd apps/$APP_NAME${NC}"
echo -e "${YELLOW}   pnpm dev${NC}\n"

echo -e "${CYAN}🔑 测试账号:${NC}"
echo -e "${YELLOW}   管理员: admin@example.com / admin123${NC}"
echo -e "${YELLOW}   普通用户: user@example.com / user123${NC}\n"

echo -e "${CYAN}📚 文档:${NC}"
echo -e "${YELLOW}   - apps/$APP_NAME/QUICK_START.md - 快速开始${NC}"
echo -e "${YELLOW}   - apps/$APP_NAME/LOGIN_TEST_GUIDE.md - 登录测试${NC}"
echo -e "${YELLOW}   - apps/$APP_NAME/USAGE.md - 使用文档${NC}\n"

echo -e "${CYAN}💡 提示:${NC}"
echo -e "${YELLOW}   • 模拟认证已启用，无需后端即可开发${NC}"
echo -e "${YELLOW}   • 使用 Feature-First 架构组织代码${NC}"
echo -e "${YELLOW}   • 所有 @repo/* 包已自动配置${NC}\n"

echo -e "${BOLD}✨ 祝您开发愉快！${NC}\n"

