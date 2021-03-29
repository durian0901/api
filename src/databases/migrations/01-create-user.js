export async function up(queryInterface,Sequelize){
    await queryInterface.createTable('users',{
        id:{
            type:Sequelize.UUID,
            primaryKey:true,
        },
        email:{
            type:Sequelize.STRING,
            unique:true,
        },
        password:{
            type:Sequelize.STRING
        },
        email_verified:{
            type:Sequelize.DATE,
            allowNull: true,
        },
        createdAt:{
            type:Sequelize.DATE,
            allowNull:false,
        },
        updatedAt:{
            type:Sequelize.DATE,
            allowNull:false,
        }
    });
}

export async function down(queryInterface,Sequelize){
    await queryInterface.dropTable('users');
}