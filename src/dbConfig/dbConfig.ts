import mongoose from 'mongoose';

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;
        
        connection.on('conneted', () => {
            console.log('Monogdb connected.')
        })

        connection.on('error', (er) => {
            console.log('Monogdb connection error. Some error' + er);
            process.exit();
        })
    } catch (error) {
        console.log('Something went wrong')
        console.log(error)
    }
}