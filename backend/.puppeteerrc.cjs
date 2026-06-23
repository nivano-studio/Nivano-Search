const { join } = require('path');

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // Configura o diretório de cache para dentro da pasta do projeto,
  // garantindo que o Render preserve o executável do Chrome na execução.
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};
