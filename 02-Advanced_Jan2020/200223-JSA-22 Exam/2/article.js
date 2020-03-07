class Article{
    commentId = 1;

    constructor(title, creator){
        this.title = title;
        this.creator = creator;
        this._comments = [];
        this._likes = [];
    }

    get likes(){
        if(this._likes.length === 0){
            return `${this.title} has 0 likes`;
        }

        if(this._likes.length === 1){
            return `${this._likes[0]} likes this article!`;
        }

        return `${this._likes[0]} and ${this._likes.length - 1} others like this article!`;
    }

    like(username){
        if(this._likes.some(u => u === username)){
            throw new Error("You can't like the same article twice!");
        }

        if(username === this.creator){
            throw new Error("You can't like your own articles!");
        }

        this._likes.push(username);

        return `${username} liked ${this.title}!`;
    }

    dislike(username){
        let usernameIndex = this._likes.findIndex(u => u === username);

        if(usernameIndex < 0){
            throw new Error("You can't dislike this article!");
        }

        this._likes.splice(usernameIndex, 1);

        return `${username} disliked ${this.title}`;
    }

    comment(username, content, id){
        if(this._comments.length === 0 || id === undefined || !this._comments.some(c => c.id === id)){
            let comment = {
                id: this.commentId++,
                username,
                content,
                replies: []
            };

            this._comments.push(comment);

            return `${username} commented on ${this.title}`;
        }

        let comment = this._comments.find(c => c.id === id);

        let reply = {
            id: `${id}.${comment.replies.length + 1}`,
            username,
            content
        };

        comment.replies.push(reply);

        return 'You replied successfully';
    }

    toString(sortingType){
        this.sorterMap[sortingType](this._comments);
        this._comments.forEach(c => this.sorterMap[sortingType](c.replies));

        let result = `Title: ${this.title}\nCreator: ${this.creator}\nLikes: ${this._likes.length}\nComments:\n`;

        if(this._comments.length === 0){
            return result.trim();
        }

        let commentsResult = this._comments.reduce((acc, curr) => {
            acc.push(`-- ${curr.id}. ${curr.username}: ${curr.content}`);

            if(curr.replies.length > 0){
                curr.replies.forEach(r => acc.push(`--- ${r.id}. ${r.username}: ${r.content}`));
            }

            return acc;
        }, []).join('\n');

        result += commentsResult;

        return result;
    }

    sorterMap = {
        asc: function (arr) { arr.sort((a, b) => (a.id).toString().localeCompare((b.id).toString(), undefined, {numeric: true}))},
        desc: function (arr) { arr.sort((a, b) => (b.id).toString().localeCompare((a.id).toString(), undefined, {numeric: true}))},
        username: function (arr) { arr.sort((a, b) => (a.username).localeCompare(b.username))}
    };
}