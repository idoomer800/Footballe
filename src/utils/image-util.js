export default function getImageURL(imgName) {
    return new URL(`/public/player_images/${imgName}`, import.meta.url).href
}