module.exports = (sequelize, DataType) => {
    return sequelize.define('hashtag', {
        title: {
            type: DataType.STRING(15),
            allowNull: false,
            unique: true
        }
    }, {
        timestamp: true,
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci'
    });
};