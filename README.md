# CLI Challenge
## Command line interface (CLI)
CLI adalah sebuah mekanisme untuk melakukan interaksi dengan program menggunakan sebuah teks untuk menjalankan tugas tertentu
## Unix Philosophy
Sebuah norma atau aturan dalam pengembangan aplikasi software yang minimalis
- Setiap program melakukan satu hal dengan baik
- Lakukan percobaan di awal sewaktu mendesain atau membangun sebuah program
- Pilih tools yang lebih disukai daripada tools yang tidak baik dalam meringankan program yang dibuat
## Caporal js
dalam membuat sebuah CLI memerlukan tools/library, dan yang digunakan biasanya caporal,commander,yargs. Pada dokumentasi ini menggunakan caporal.js
#### Contoh Penggunaan
```
const cli = require('caporal');
cli
  .version('1.0.0')
  .command('obfuscate', 'Obfuscate the string')
  .argument('<string>', 'String to be obfuscated', cli.STRING)
  .action(function(args, options, logger) {
	  logger.info(args.string.replace(/./gm, function(i) {
		  return '&#'+i.charCodeAt(0)+';';
	  }));
  });
 
cli.parse(process.argv);
```
Pada caporal.js action mengandung 3 argument yaitu `args`, `options`, `logger`. tidak hanya itu `.command` berguna untuk memberikan command tertentu pada command line sebagai contoh `obfuscate` seperti contoh diatas
#### Contoh penggunaan
```
const cli = require('caporal');
cli
  .version('1.0.0')
  .command('random', 'Generate random string')
  .option('--length <num>', 'Length of the generated string', cli.INT, 32)
  .option('--numbers <true|false>', 'Use numbers to generate random string', cli.BOOL, true)
  .option('--letters <true|false>', 'Use letters to generate random string', cli.BOOL, true)
  .option('--uppercase', 'Use uppercase letters to generate random string')
  .option('--lowercase', 'Use lowercase letters to generate random string')
  .action(function(args, options, logger) {
	  let ucLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	  let lcLetters = 'abcdefghijklmnopqrstuvwxyz';
	  let numbers = '0123456789';
	  let charset = '';
	  if (options.numbers)
		  charset = numbers;
	  if (options.letters) {
		  if ((options.uppercase) || (options.lowercase)) {
			  if (options.uppercase)
				  charset += ucLetters;
			  if (options.lowercase)
				  charset += lcLetters;
		  }
		  else
			  charset += ucLetters + lcLetters;
	  }
	  let charLength = charset.length;
	  let result = '';
	  for (let i = 0; i < options.length; i++) {
		  result += charset.charAt(Math.floor(Math.random() * charLength));
	  }
	  logger.info(result);
  });
 
cli.parse(process.argv);
```
`.option` disini berguna untuk mengklarifikasi sebuah command sesuai keinginan developer


