import { dirname, join } from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const directory = dirname(fileURLToPath(import.meta.url));
const noInputsDiagnosticCode = 18003;
const host = {
  getCanonicalFileName: (fileName) => fileName,
  getCurrentDirectory: () => directory,
  getNewLine: () => ts.sys.newLine,
};

for (const name of ['base.json', 'internal-package.json']) {
  const path = join(directory, name);
  const config = ts.readConfigFile(path, ts.sys.readFile);
  const errors = config.error ? [config.error] : [];

  if (!config.error) {
    const parsed = ts.parseJsonConfigFileContent(
      config.config,
      ts.sys,
      directory,
      undefined,
      path,
    );
    errors.push(
      ...parsed.errors.filter((error) => error.code !== noInputsDiagnosticCode),
    );
  }

  if (errors.length > 0) {
    console.error(ts.formatDiagnosticsWithColorAndContext(errors, host));
    process.exitCode = 1;
  }
}
