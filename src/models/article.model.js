module.exports = (sequelize, Sequelize) => {
    const Article = sequelize.define("articles", {
        title:{
            type: Sequelize.STRING,
            required: true,
            trim: true,
        },

       

        desc:{
            type: Sequelize.TEXT,
            required: true,
            trim: true,
        },

        articlePictures: {
            type: Sequelize.TEXT,
            get: function () {
                    return JSON.parse(this.getDataValue('articlePictures'));
            },
            set: function (value) {
                    this.setDataValue('articlePictures', JSON.stringify(value));
            },
            allowNull:true,
        },
        state:{
            type: Sequelize.INTEGER,
            references:{
                model:{
                    tableName: 'categories'
                },
                key: 'id'
            },
            allowNull:false
        },

        dist:{
            type: Sequelize.INTEGER,
            references:{
                model:{
                    tableName: 'categories'
                },
                key: 'id'
            },
            allowNull:false
        },

        block:{
            type: Sequelize.INTEGER,
            references:{
                model:{
                    tableName: 'categories'
                    },
                key: 'id'
            },
            allowNull:false
        },

       createdBy :{
            type:Sequelize.INTEGER,
            references:{
            model:{
                 tableName: 'users'
                },
                key: 'id'
            },
            allowNull:false
        },
       
       category:{
            type:Sequelize.INTEGER,
            references:{
                model:{
                    tableName: 'categories'
                },
                key: 'id'
            },
            allowNull:false
        },
    });
  
    return Article;
  };