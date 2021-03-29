//資料庫修正的語法qq
//es6

/*eslint-disable import/prefer-default-export*/
export async function up(queryInterface){
    await queryInterface.sequelize.query(`ALTER DATABASE ${queryInterface.sequelize.config.database} CHARACTER SET utf8 COLLATE utf8_general_ci`)
}//萬國碼:)