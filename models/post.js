module.exports = (sequelize, DataType) => {
    return sequelize.define('post', {
        content: {
            type: DataType.STRING(150),
            allowNull: false          
        },
        img: {
            type: DataType.STRING(200),
            allowNull: true
        }
    }, {
        timestamp: true,
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci'
    });
};