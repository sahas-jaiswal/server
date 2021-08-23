module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("categories", {
        name:{
            type: Sequelize.STRING,
            required: true,
            trim: true,
        },
        slug:{
            type: Sequelize.STRING,
            required: true,
            unique: true,
        },
        parentId:{
            type: Sequelize.STRING,
        },
        createdBy:{
            type:Sequelize.INTEGER,
            references:{
             model:{
                 tableName: 'users'
             },
             key: 'id'
         },
         allowNull:false
        },
    });
  
    return Category;
  };