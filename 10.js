const cli = require('caporal');
const puppeteer = require('puppeteer');
const fs = require("fs");
cli
  .version('1.0.0')
  .command('screenshot', 'Get a screenshot from a URL')
  .option('--format <png|jpg|pdf>', 'File format of the screenshot', cli.STRING, 'png')
  .option('--output <filename>', 'Filename of the screenshot')
  .action(function(args, options, logger) {
	  
	  if (options.output) {
		  options.format = '.' + options.output.split('.').pop();
	  }
	  else {
		  let index = 1;
		  let pad = '000';
		  let num = (pad+index).slice(-pad.length);
		  options.output = 'screenshot-' + num + '.' + options.format;
		  while (fs.existsSync('screenshot-' + num + options.format)) {
			  index += 1;
			  num = (pad+index).slice(-pad.length);
			  options.output = 'screenshot-' + num + '.' + options.format;
		  }
	  }
	  
	  async function doScreenCapture(url, site_name) {
		  const browser = await puppeteer.launch();
		  const page = await browser.newPage();
		  await page.goto(url, {waitUntil: 'domcontentloaded'});
		  if (output.format === 'pdf') {
			  await page.pdf({
				  path: options.output, 
				  format: 'A4'
			  });
		  }
		  else {
			  await page.screenshot({
				  fullPage: true,
				  path: options.output
			  });
		  }
		  
		  await browser.close();
	  }
  });
 
cli.parse(process.argv);
