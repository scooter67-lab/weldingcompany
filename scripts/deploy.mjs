/**
 * Сборка и отправка готового сайта в ветку deploy.
 *
 *   npm run deploy            -> пушит в remote "origin"
 *   npm run deploy -- plesk   -> пушит в remote "plesk"
 *
 * Зачем отдельная ветка: хостинг не умеет собирать проект (Node там нет),
 * поэтому в Git должен лежать результат сборки. Но класть его в main нельзя —
 * тогда в публичную папку сайта попадут исходники, а index.html окажется
 * внутри подкаталога out/ и сайт не откроется.
 *
 * Поэтому:
 *   main   — исходники, out/ в .gitignore
 *   deploy — только содержимое out/, в корне ветки
 *
 * Ветка deploy собирается в отдельном рабочем каталоге .deploy через
 * git worktree, чтобы не переключать ветку в основном и не терять
 * несохранённые правки.
 */
import { execFileSync } from "node:child_process";
import { cpSync, existsSync, readdirSync, rmSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const REMOTE = process.argv[2] ?? "origin";
const BRANCH = "deploy";
const WORKTREE = ".deploy";
const OUT = "out";

/** Хеш пустого дерева — одинаков во всех репозиториях git (SHA-1). */
const EMPTY_TREE = "4b825dc642cb6eb9a060e54bf8d69288fbee4904";

function git(args, options = {}) {
  return execFileSync("git", args, { encoding: "utf8", ...options }).trim();
}

function run(command, args) {
  execFileSync(command, args, { stdio: "inherit" });
}

/**
 * Сборка запускается напрямую бинарником Next через node.
 * Через npm пришлось бы поднимать оболочку (на Windows npm — это .cmd),
 * а запуск с аргументами через оболочку небезопасен и объявлен устаревшим.
 */
function build() {
  execFileSync(process.execPath, ["node_modules/next/dist/bin/next", "build"], {
    stdio: "inherit",
  });
}

function branchExists(name) {
  try {
    git(["rev-parse", "--verify", `refs/heads/${name}`]);
    return true;
  } catch {
    return false;
  }
}

console.log("1/5  Сборка");
build();

if (!existsSync(path.join(OUT, "index.html"))) {
  console.error(`\nОшибка: ${OUT}/index.html не создан — сборка прошла не полностью.`);
  process.exit(1);
}

console.log(`\n2/5  Подготовка ветки ${BRANCH}`);
if (!branchExists(BRANCH)) {
  // Пустой коммит-основание без переключения текущей ветки
  const base = git(["commit-tree", EMPTY_TREE, "-m", `Инициализация ветки ${BRANCH}`]);
  git(["branch", BRANCH, base]);
  console.log(`     ветка ${BRANCH} создана`);
}

if (!existsSync(WORKTREE)) {
  git(["worktree", "add", WORKTREE, BRANCH]);
  console.log(`     рабочий каталог ${WORKTREE} подключён`);
}

console.log("\n3/5  Перенос файлов сборки");
// Чистим всё, кроме служебного .git — иначе удалённые страницы остались бы на сайте
for (const entry of readdirSync(WORKTREE)) {
  if (entry !== ".git") rmSync(path.join(WORKTREE, entry), { recursive: true, force: true });
}
// cpSync переносит и файлы с точкой в имени, включая .htaccess
cpSync(OUT, WORKTREE, { recursive: true });

const copied = readdirSync(WORKTREE).filter((n) => n !== ".git");
console.log(`     перенесено записей: ${copied.length}`);
if (!copied.includes(".htaccess")) {
  console.error("\nОшибка: .htaccess не попал в сборку — проверьте public/.htaccess");
  process.exit(1);
}

console.log("\n4/5  Коммит");
git(["-C", WORKTREE, "add", "-A"]);
const pending = git(["-C", WORKTREE, "status", "--porcelain"]);
if (!pending) {
  console.log("     изменений нет, коммит не нужен");
} else {
  const stamp = new Date().toISOString().slice(0, 16).replace("T", " ");
  git(["-C", WORKTREE, "commit", "-m", `Сборка сайта ${stamp}`]);
  console.log(`     ${git(["-C", WORKTREE, "log", "--oneline", "-1"])}`);
}

console.log(`\n5/5  Отправка в ${REMOTE}/${BRANCH}`);
run("git", ["-C", WORKTREE, "push", REMOTE, BRANCH]);

console.log("\nГотово. Сайт выложен в ветку deploy.");
