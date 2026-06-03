import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const connectDB = async () => {
	const uri = process.env.STRING_CONEXAO_DB;
	try {
		if (uri) {
			try {
				await mongoose.connect(uri);
				console.log("Conectado ao MongoDB:", uri);
				return;
			} catch (err) {
				console.warn("Falha ao conectar em STRING_CONEXAO_DB, tentando MongoDB em memória:", err.message);
			}
		}

		const mongod = await MongoMemoryServer.create();
		const memoryUri = mongod.getUri();
		await mongoose.connect(memoryUri);
		console.log("Conectado ao MongoDB em memória:", memoryUri);
	} catch (error) {
		console.error("Erro ao conectar ao MongoDB:", error);
	}
};

connectDB().catch(err => console.error('connectDB failed:', err));

const db = mongoose.connection;

export default db;
