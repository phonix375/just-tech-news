const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

//create our User model 
class User extends Model{}


//define table columns and configuration 
User.init(
    {
        id:{
            // use the special Sequelize DataTypes object provide what type of data it is
            type: DataTypes.INTEGER,

            // this is the equivalent of SQL's `NOT NULL` option
            allowNull:false,

            // instruct that this is the Primary Key
            primaryKey:true,

            // turn on auto increment
            autoIncrement:true

        },
        username:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
            validate:{
                isEmail:true
            }
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                //this means the password must be at least four character long
                len:[4]
            }
        },
    },
    {
        hooks: {
            //set up before create lifecycle "hool" functionality
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password,10);
                return newUserData;
            },
            //set up beforeUpdate lifecycle "hook" functionality
            async beforeUpdate(updateUserData){
                updateUserData.password = await bcrypt.hash(updateUserData.password, 10);
                return updateUserData;
            }
        },
        //table configuration option go here

        //pass in our imported sequelize connection (the direct connection to our database)
        sequelize,

        //dont automaticly create time stamps 
        timestamps : false,

        //dont pluralize name of database table
        underscored: true,

        //make it so our model name stays lowercase in the database 
        modelName: `user`
    }
);

module.exports = User;