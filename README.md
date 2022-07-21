# DOTA 2 API

Example get heroes data from DOTA 2

## Try it Run

this code here, in a console or from any site

```js
fetch(https://dota2-game-api.vercel.app/api/heroes?pageOffset=0&pageSize=1)
.then(response => response.json())
.then(json => console.log(json))
```
