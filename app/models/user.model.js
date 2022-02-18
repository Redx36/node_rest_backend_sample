const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'Email existant.'
            },
            validate: {
                isEmail: {
                    args: true,
                    msg: 'Email non valide.'
                }
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            set(value) {
                const hash = bcrypt.hashSync(value, 10);
                this.setDataValue('password', hash);
            },
        }
    });

    return User;
};
