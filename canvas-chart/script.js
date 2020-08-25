const colors = [
    '#b3d5fc',
    '#98d9d9',
    '#ede493'
]

const inputEls = document.querySelectorAll('.chart__input')

const getData = inpitEls => Array.from(inpitEls)
    .map((input, i) => ({
        name: input.name,
        value: input.value,
        color: colors[i]
    }))

const items = getData(inputEls)

const canvas = document.querySelector('canvas')
const $ = canvas.getContext('2d')

const maxPercentage = 100

const gap = {
    horizontal: 100,
    vertical: 30
}

const barCoordinate = {
    initialX: 80,
    initialY: 220
}

const barSize = {
    maxHeight: 190,
    width: 50
}

const labelCoordinate = {
    initialX: 30,
    initialY: 70
}

const font = {
    size: '18px',
    family: 'Tahoma'
}

const renderChart = items => {
    $.clearRect(0, 0, canvas.width, canvas.height)

    let currentBarX = barCoordinate.initialX
    let currentLabelY = labelCoordinate.initialY

    const gapBetweenBars = barSize.width + gap.horizontal

    for (const i of items) {
        const barHeight = (i.value * barSize.maxHeight / maxPercentage)

        $.fillStyle = i.color
        $.font = `${font.size} ${font.family}`
        $.save()
        $.translate(0, canvas.height)
        $.rotate(-Math.PI / 2)
        $.fillText(i.name.toUpperCase(), labelCoordinate.initialX, currentLabelY)
        $.restore()
        $.fillRect(currentBarX, barCoordinate.initialY, barSize.width, -barHeight)

        currentBarX += gapBetweenBars
        currentLabelY += gapBetweenBars
    }
}

const formEl = document.querySelector('.chart__data')

formEl.addEventListener('submit', ev => {
    ev.preventDefault()

    renderChart(getData(inputEls))

    formEl.reset()
})