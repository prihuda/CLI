const cli = require('caporal');
cli
  .version('1.0.0')
  .command('lowercase', 'Lowercase the string')
  .argument('<string>', 'String to be lowercased', cli.STRING)
  .action(function(args, options, logger) {
	logger.info(args.string.toLowerCase());
  })
  .command('uppercase', 'Uppercase the string')
  .argument('<string>', 'String to be uppercased', cli.STRING)
  .action(function(args, options, logger) {
	logger.info(args.string.toUpperCase());
  })
  .command('capitalize', 'Titlecase the string')
  .argument('<string>', 'String to be titlecased', cli.STRING)
  .action(function(args, options, logger) {
	logger.info(args.string.replace(
		/\w\S*/g,
		function(txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		}
	));
  });
 
cli.parse(process.argv);
