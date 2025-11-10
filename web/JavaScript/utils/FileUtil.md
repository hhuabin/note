# png转成jpg

```typescript
export const pngToJpg = (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
        if (file?.type !== "image/png") {
            resolve(file)
        }
        const reader = new FileReader()
        reader.readAsDataURL(file)
        // 此处开始异步
        reader.onload = () => {
            const img = new Image();
            img.src = reader.result as string
            img.onload = () => {
                const canvas = document.createElement('canvas')
                const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
                canvas.width = img.width
                canvas.height = img.height
                ctx.drawImage(img, 0, 0)
                /**
                 * jpgDataUrl是data:image/jpeg;base64...
                 * 可用于<img/>标签的回显
                 */
                const jpgDataUrl = canvas.toDataURL('image/jpeg')
                /**
                 * 将用于回显的string转成file格式返回
                 */
                fetch(jpgDataUrl)
                .then(response => response.blob())
                .then(blob => {
                    const imgFile = new File([blob], file.name, { type: "image/jpeg" })
                    resolve(imgFile)
                })
                .catch(error => {
                    console.error('Error fetching data URL:', error);
                    reject(error)
                })
            }
        }
    })
}
```

