import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import packagejson from './package.json';

const projectDir = import.meta.dir;

// ==============================
//      Create package.json
// ==============================

console.info('Adjusting version in package.json...');
const finalPackageJson = { ...packagejson };

const version = process.env.REF_NAME ?? (packagejson as any).version ?? '0.0.1';
console.log(`Setting version: ${version}`);

(finalPackageJson as any).version = version;

await writeFile(join(projectDir, 'package.json'), JSON.stringify(finalPackageJson), {
	encoding: 'utf-8'
});
console.info('Written package.json!');

console.info('Done!');
process.exit(0);
