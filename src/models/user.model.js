module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        firstname:{
            type: Sequelize.STRING,
            required: true,
            trim: true,
        },
        lastname:{
            type: Sequelize.STRING,
            required: true,
            trim: true,
        },
      username: {
            type: Sequelize.STRING,
            required: true,
            trim: true,
      },
      email: {
            type: Sequelize.STRING,
            required: true,
            trim: true,
      },
      password: {
            type: Sequelize.STRING,
            required: true,
            trim: true,
      },
      role: {
          type: Sequelize.ENUM,
          values: ["user","admin","super-admin"],
          default: "admin",
      },
      contact:{
            type: Sequelize.STRING,
            required: true,
            trim: true,
      },
    },
    { timestamp :{
            type: Sequelize.DATE,
    } }
    );
  
    return User;
  };