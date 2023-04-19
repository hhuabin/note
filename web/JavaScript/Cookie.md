封装类

```javascript
export default class CookieUtil {

	public static get = (name: string): string | null => {
		const cookieName = `${encodeURIComponent(name)}=`,
			cookieStart = document.cookie.indexOf(cookieName);
		let	cookieValue = null;
		
		if(cookieStart > -1) {
			let cookieEnd = document.cookie.indexOf(";", cookieStart)
			if(cookieEnd === -1) {
				cookieEnd = document.cookie.length
			}
			cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd))
		}

		return cookieValue;
	}

	/**
	 * 设置Cookie
	 * @param params 参数对象
	 * @param params[name] Cookie名称
	 * @param params[value] Cookie值
	 * @param params[expires] 过期时间
	 * @param params[path] 路径
	 * @param params[domain] 域
	 * @param params[secure] 安全标志
	 */
	public static set = (params: {name: string, value: string, expires?: Date | number, path?: string, domain?: string, secure?: boolean}) => {
		const {name, value, expires, path, domain, secure = false} = params

		let cookieText = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`

		if(expires) {
			if(typeof expires === "number") {
				cookieText += `; expires=${new Date(expires).toUTCString()}`
			} else {
				cookieText += `; expires=${(expires as Date).toUTCString()}`
			}
		}

		if(path) cookieText += `; path=${path}`

		if(domain) cookieText += `; domain=${domain}`

		if(secure) cookieText += `; secure`

		document.cookie = cookieText
	}

	public static unset = (params: {name: string, path?: string, domain?: string, secure?: boolean}) => {
		CookieUtil.set({
			...params,
			value: "",
			expires: new Date(0),
		});
	}
}
```

