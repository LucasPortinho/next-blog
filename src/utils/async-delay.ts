export async function asyncDelay(milisseconds: number = 0, verbose=false) {
    if (milisseconds <= 0) return

    if (verbose) {
        console.log(`Delaying for ${milisseconds / 1000}s`)
    }

    await new Promise(resolve => setTimeout(resolve, milisseconds))
}