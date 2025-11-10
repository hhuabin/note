# Cookie工具函数

- **name**: ""            cookie的名称
- **value**: ""             cookie的值
- **expires**: new Date().getTime() + 30 \* 24 \* 60 \* 60 \* 1000         过期时间，保鲜30天，默认会话结束后删除（Session）
- **path**: "/"              指定可以访问该 Cookie 的路径。默认情况下，它的path将是设置Cookie的页面的路径，只有设置该 Cookie 的路径及其子路径可以访问该 Cookie。
- **domain**: ""          指定可以访问该 Cookie 的域名。默认情况下，只有设置该 Cookie 的域名可以访问该 Cookie。
- **secure**: false       指定是否仅通过安全连接（HTTPS）传输该 Cookie。默认情况下，该标识为 false，即可以通过 HTTP 和 HTTPS 传输该 Cookie。

```javascript
export default class CookieUtil {

    /**
     * @description 获取单个 cookie
     * @param { string } name cookie 名称
     * @returns { string | null }
     * @example CookieUtil.get("name")
     */
    public static get = (name: string): string | null => {
        const cookieName = `${encodeURIComponent(name)}=`,
            cookieStart = document.cookie.indexOf(cookieName)
        let cookieValue = null

        if (cookieStart > -1) {
            let cookieEnd = document.cookie.indexOf(";", cookieStart)
            if (cookieEnd === -1) {
                cookieEnd = document.cookie.length
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd))
        }

        return cookieValue
    }

    /**
     * @description 返回当前路径下的所有 cookie
     * @returns { Record<string, string> }
     */
    public static getAll = (): Record<string, string> => {
        const result: Record<string, string> = {}
        const cookie = document.cookie
        if (cookie.length < 1) return result

        const cookieArray = cookie.split("; ")
        for (const element of cookieArray) {
            const cookieElement = element.split('=')
            result[cookieElement[0]] = cookieElement[1]
            // bug: 同名的cookie会被覆盖掉 例如 / 和 /home 下都有一个名为 name 的 cookie，此时只有 / 的 name 被返回
        }

        return result
    }

    /* CookieUtil.set({
        name: "",
        value: "",
        expires: new Date().getTime() + 30 * 24 * 60 * 60 * 1000,  // 保鲜30天，默认会话结束后删除（Session）
        path: "/", 指定可以访问该 Cookie 的路径。默认情况下，它的path将是设置Cookie的页面的路径，只有设置该 Cookie 的路径及其子路径可以访问该 Cookie。
        domain: "",  指定可以访问该 Cookie 的域名。默认情况下，只有设置该 Cookie 的域名可以访问该 Cookie。
        secure: false，指定是否仅通过安全连接（HTTPS）传输该 Cookie。默认情况下，该标识为 false，即可以通过 HTTP 和 HTTPS 传输该 Cookie。
    }) */
    /**
     * @description 设置Cookie
     * @param params cookie 参数对象
     * @param { string } params.name Cookie名称
     * @param { string } params.value Cookie值
     * @param { Date | number } params.expires 过期时间
     * @param { string } params.path 路径，默认当前页
     * @param { string } params.domain 域
     * @param { boolean } params.secure 安全标志
     */
    public static set = (params: { name: string, value: string, expires?: Date | number, path?: string, domain?: string, secure?: boolean }) => {
        const { name, value, expires, path, domain, secure = false } = params

        let cookieText = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`

        if (expires) {
            if (typeof expires === "number") {
                cookieText += `; expires=${new Date(expires).toUTCString()}`
            } else {
                cookieText += `; expires=${(expires as Date).toUTCString()}`
            }
        }

        if (path) cookieText += `; path=${path}`

        if (domain) cookieText += `; domain=${domain}`

        if (secure) cookieText += `; secure`

        document.cookie = cookieText
    }

    /**
     * @description 删除单个 cookie
     * @param params cookie 参数对象
     * @param { string } params.name Cookie名称
     * @param { string } params.path 路径，默认当前页
     * @param { string } params.domain 域
     * @param { boolean } params.secure 安全标志
     * @example CookieUtil.unset({ name: "name", path: "/", domain: "localhost", secure: false })
     */
    public static unset = (params: { name: string, path?: string, domain?: string, secure?: boolean }) => {
        CookieUtil.set({
            ...params,
            value: "",
            expires: new Date(0),
        })
    }
}

```



# Attention

**SessionCookie共享问题**

当你在React应用中从/home页面跳转到/login页面时，浏览器的同一会话（session）中的cookie信息是会被保留的。这意味着，如果你在/home页面设置了某个cookie，然后在同一浏览器会话中跳转到/login页面，你仍然能够在/login页面中访问到之前设置的cookie

如果/login刷新就不会保留/home的cookie
