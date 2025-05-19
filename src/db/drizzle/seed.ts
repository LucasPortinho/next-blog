import { JsonPostRepository } from "@/repositories/post/json-post-repository";
import { eq } from "drizzle-orm";
import { drizzleDb } from "./index";
import { postsTable } from "./schemas";

(async() => {
    const jsonPostRepository = new JsonPostRepository();
    const posts = await jsonPostRepository.findAll();

    try {
        await drizzleDb.delete(postsTable) // Limpa a db, não faça isso em prod. Apenas para fins educativos.
        await drizzleDb.insert(postsTable).values(posts)
    }

    catch (e) {
        console.log(e)
    }
    
})()
