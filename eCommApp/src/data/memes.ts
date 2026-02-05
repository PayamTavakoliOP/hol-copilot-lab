// Fetch random meme from Reddit via meme-api
export const getRandomMeme = async (): Promise<string> => {
  try {
    const response = await fetch('https://meme-api.com/gimme')
    const data = await response.json()
    return data.url // Returns direct image URL from Reddit
  } catch (error) {
    // Fallback to a working meme if API fails
    return 'https://preview.redd.it/when-you-find-out-your-s-o-is-actually-your-fbi-agent-v0-d9l0kgdx2lwb1.png?width=640&crop=smart&auto=webp&s=8e3c9a8f1e3d3c8e3a3c9e8f1e3d3c8e3a3c9e8f'
  }
}
