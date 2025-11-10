# URL 引入

```typescript
const homeUrl = new URL('@/images/home-selected.png', import.meta.url).href;
(homeRef.value as HTMLImageElement).src = homeUrl;
```



# require 引入

```typescript
const offiaccountImage = require("@/images/sk-offiaccount.jpg")
```

