export default class Post {
    constructor(title, img) {
        this.title = title
        this.img = img
        this.date = new Date().toLocaleDateString()
    }

    toString() {
        JSON.stringify({
            title: this.title,
            date: this.date,
            img: this.img
        }, null, 2)
    }

    get uppercaseTitle() {
        return this.title.toUpperCase()
    }
}