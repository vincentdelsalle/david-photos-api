const { exec, echo } = require('../shell/shell')
const { COLORS } = require('../constants')
const { parseArgv } = require('../parse-argv')

const args = parseArgv(process.argv)

const { environment } = args

echo(`\nRunning the app using the "${environment}" environment.`, COLORS.green)

exec(
  `node -r dotenv/config index.js dotenv_config_path=environment/${environment}/.env`,
)
