import { promises as fs } from "fs";
import path from "path";

export default async function clearUploads() {
    const uploadsDir = path.join(process.cwd(), "public/assets/uploads");

    try {
        const stats = await fs.stat(uploadsDir);
        if (!stats.isDirectory()) {
            console.error("O caminho não é um diretório válido:", uploadsDir);
            return;
        }

        const files = await fs.readdir(uploadsDir);
        if (files.length === 0) {
            console.log("Nenhum arquivo para remover.");
            return;
        }

        // Remove todos os arquivos
        await Promise.all(
            files.map(async (file) => {
                try {
                    await fs.unlink(path.join(uploadsDir, file));
                    console.log(`Arquivo removido: ${file}`);
                } catch (err) {
                    console.error(`Erro ao remover arquivo ${file}:`, err);
                }
            })
        );

        console.log("Todos os arquivos em 'uploads' foram removidos.");
    } catch (err) {
        console.error("Erro ao acessar a pasta de uploads:", err);
    }
}
