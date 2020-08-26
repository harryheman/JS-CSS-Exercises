export default (text = 'ok') => {
    const p = document.createElement('p')

    p.textContent = text

    return p
}