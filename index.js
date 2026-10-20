const sequelize = require('./database');
const Car = require('./models/Car');

async function main() {
    try {
        await sequelize.authenticate();
        console.log('Подключение к SQLite установлено.');

        await sequelize.sync({ force: true });
        console.log('Таблица создана/синхронизирована.');

        await Car.bulkCreate([
            { brand: 'Toyota', model: 'Camry', year: 2022, price: 2500000, isAvailable: true },
            { brand: 'BMW', model: 'X5', year: 2021, price: 5500000, isAvailable: false }
        ]);
        console.log('Данные добавлены.');

        const cars = await Car.findAll();
        
        console.log('\n--- Список автомобилей ---');

        cars.forEach(car => {
            console.log(car.toJSON());  
        });

    } catch (error) {
        console.error('Ошибка:', error);
    } finally {
        await sequelize.close();
        console.log('\nСоединение закрыто.');
    }
}

main();