#!/usr/bin/env node

/**
 * Скрипт проверки окружения перед запуском приложения
 * Проверяет наличие всех необходимых зависимостей и конфигураций
 */

const fs = require('fs');
const path = require('path');

// Цвета для консоли
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkFile(filePath, description) {
  const exists = fs.existsSync(filePath);
  if (exists) {
    log(`✓ ${description}`, 'green');
    return true;
  } else {
    log(`✗ ${description}`, 'red');
    return false;
  }
}

function checkEnvFile() {
  const envPath = path.join(__dirname, '.env.local');
  const exists = fs.existsSync(envPath);

  if (!exists) {
    log('✗ Файл .env.local не найден', 'red');
    return false;
  }

  const envContent = fs.readFileSync(envPath, 'utf-8');
  const hasUrl = envContent.includes('NEXT_PUBLIC_SUPABASE_URL') &&
                 !envContent.includes('your-project-url');
  const hasKey = envContent.includes('NEXT_PUBLIC_SUPABASE_ANON_KEY') &&
                 !envContent.includes('your-anon-key-here');

  if (!hasUrl || !hasKey) {
    log('✗ .env.local существует, но содержит placeholder значения', 'yellow');
    log('  Обновите NEXT_PUBLIC_SUPABASE_URL и NEXT_PUBLIC_SUPABASE_ANON_KEY', 'yellow');
    return false;
  }

  log('✓ Файл .env.local настроен правильно', 'green');
  return true;
}

function checkNodeModules() {
  const nmPath = path.join(__dirname, 'node_modules');
  const exists = fs.existsSync(nmPath);

  if (!exists) {
    log('✗ node_modules не найден', 'red');
    log('  Выполните: npm install --legacy-peer-deps', 'yellow');
    return false;
  }

  // Проверяем ключевые зависимости
  const keyDeps = ['next', 'react', '@supabase/supabase-js'];
  let allFound = true;

  for (const dep of keyDeps) {
    const depPath = path.join(nmPath, dep);
    if (!fs.existsSync(depPath)) {
      log(`✗ Зависимость ${dep} не найдена`, 'red');
      allFound = false;
    }
  }

  if (allFound) {
    log('✓ Все ключевые зависимости установлены', 'green');
  }

  return allFound;
}

function checkSupabaseScripts() {
  const scriptsDir = path.join(__dirname, 'scripts');

  if (!fs.existsSync(scriptsDir)) {
    log('✗ Директория scripts/ не найдена', 'red');
    return false;
  }

  const requiredScripts = [
    '001_create_tables.sql',
    '002_seed_data.sql'
  ];

  let allFound = true;

  for (const script of requiredScripts) {
    const scriptPath = path.join(scriptsDir, script);
    if (!fs.existsSync(scriptPath)) {
      log(`✗ SQL скрипт ${script} не найден`, 'red');
      allFound = false;
    }
  }

  if (allFound) {
    log('✓ Все SQL скрипты на месте', 'green');
  }

  return allFound;
}

function printInstructions() {
  log('\n📋 Инструкции по настройке:', 'cyan');
  log('\n1. Установите зависимости:', 'blue');
  log('   npm install --legacy-peer-deps', 'reset');

  log('\n2. Создайте проект в Supabase:', 'blue');
  log('   https://supabase.com', 'reset');

  log('\n3. Выполните SQL скрипты в Supabase SQL Editor:', 'blue');
  log('   - scripts/001_create_tables.sql', 'reset');
  log('   - scripts/002_seed_data.sql', 'reset');

  log('\n4. Настройте .env.local файл:', 'blue');
  log('   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co', 'reset');
  log('   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here', 'reset');

  log('\n5. Запустите dev сервер:', 'blue');
  log('   npm run dev', 'reset');

  log('\n6. Откройте браузер:', 'blue');
  log('   http://localhost:3000', 'reset');
  log('');
}

function main() {
  log('\n🔍 Проверка окружения проекта "Добро.Рядом"\n', 'cyan');

  let allChecks = true;

  // Проверяем package.json
  allChecks = checkFile('package.json', 'package.json существует') && allChecks;

  // Проверяем node_modules
  allChecks = checkNodeModules() && allChecks;

  // Проверяем конфигурационные файлы
  allChecks = checkFile('next.config.mjs', 'next.config.mjs существует') && allChecks;
  allChecks = checkFile('tsconfig.json', 'tsconfig.json существует') && allChecks;
  allChecks = checkFile('middleware.ts', 'middleware.ts существует') && allChecks;

  // Проверяем .env файл
  const envOk = checkEnvFile();
  if (!envOk) {
    log('\n⚠️  ВАЖНО: Без правильной настройки .env.local приложение не будет работать!', 'yellow');
  }

  // Проверяем SQL скрипты
  allChecks = checkSupabaseScripts() && allChecks;

  // Проверяем основные директории
  allChecks = checkFile('app/page.tsx', 'Главная страница существует') && allChecks;
  allChecks = checkFile('lib/supabase/client.ts', 'Supabase client существует') && allChecks;
  allChecks = checkFile('components/bottom-nav.tsx', 'Компоненты существуют') && allChecks;

  log('\n' + '='.repeat(60), 'cyan');

  if (allChecks && envOk) {
    log('✅ Все проверки пройдены! Проект готов к запуску.', 'green');
    log('\n🚀 Запустите: npm run dev', 'cyan');
  } else if (allChecks && !envOk) {
    log('⚠️  Базовая настройка выполнена, но требуется настройка Supabase', 'yellow');
    printInstructions();
  } else {
    log('❌ Обнаружены проблемы. Следуйте инструкциям ниже:', 'red');
    printInstructions();
  }

  log('='.repeat(60) + '\n', 'cyan');
}

main();
