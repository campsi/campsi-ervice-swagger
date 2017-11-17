const host = 'http://localhost:3000';

module.exports = {
    port: 3000,
    host: host,
    campsi: {
        title: 'Test Arezzo',
        version: '1.0.0',
        description: 'API de test avec les pizzas Arezzo !',
        base_url: host,
        mongoURI: 'mongodb://localhost:27017/relationships',
        license: {
            name: 'MIT',
            url: 'https://opensource.org/licenses/mit-license.php'
        },
        contact: {
            name: 'Christophe Braud',
            email: 'christophe@agilitation.fr',
            url: 'http://agilitation.fr'
        }
    },
    services: {
        swagger: {
            title: 'Documentation',
            options: {

            }
        }
    }
};
