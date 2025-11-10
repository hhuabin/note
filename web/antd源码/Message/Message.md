# 渲染

## Message单例容器

```typescript
interface GlobalMessage {
    fragment: DocumentFragment;
    instance?: MessageInstance | null;
    sync?: VoidFunction;
}

const holderFragment = document.createDocumentFragment();

const newMessage: GlobalMessage = {
    fragment: holderFragment,
};
```



## 渲染

通过`unstableSetRender`函数进行渲染

```typescript
const defaultReactRender: RenderType = (node, container) => {
  // TODO: Remove in v6
  // Warning for React 19
  if (process.env.NODE_ENV !== 'production') {
    const majorVersion = parseInt(React.version.split('.')[0], 10);
    const fullKeys = Object.keys(ReactDOM);

    warning(
      majorVersion < 19 || fullKeys.includes('createRoot'),
      'compatible',
      'antd v5 support React is 16 ~ 18. see https://u.ant.design/v5-for-19 for compatible.',
    );
  }

  render(node, container);
  return () => {
    return unmount(container);
  };
};

let unstableRender: RenderType = defaultReactRender;

/**
 * @deprecated Set React render function for compatible usage.
 * This is internal usage only compatible with React 19.
 * And will be removed in next major version.
 */
export function unstableSetRender(render?: RenderType) {
  if (render) {
    unstableRender = render;
  }
  return unstableRender;
}
```

```typescript
const reactRender = unstableSetRender();

reactRender(
    <GlobalHolderWrapper
            ref={(node) => {
                const { instance, sync } = node || {};

                // React 18 test env will throw if call immediately in ref
                Promise.resolve().then(() => {
                    if (!newMessage.instance && instance) {
                        newMessage.instance = instance;
                        newMessage.sync = sync;
                        flushNotice();
                    }
                });
            }}
        />,
    holderFragment,    // 容器
);
```

