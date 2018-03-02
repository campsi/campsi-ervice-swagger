const host = 'http://localhost:3000';

module.exports = {
    port: 3000,
    campsi: {
        title: 'Test Arezzo',
        description: 'API de test avec les pizzas Arezzo !',
        publicURL: host,
        mongo: {
            'host': 'localhost',
            'port': 27017,
            'database': 'relationships'
        },
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
            ui: true
        }
    }
};
