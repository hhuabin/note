
# 组件样式修改

1. **style**

   通过style强制修改css变量的值

   ```tsx
   <div>
       <ImageUploader
           style={{'--cell-size': '10rem'}}
           upload={uploadImage}
           maxCount={1}
       ></ImageUploader>
   </div>
   ```
   
2. **global**
   当开启CSS Modules时，建工具会在编译的时候自动把我们的类名加上一个哈希字符串，而使用global声明的class，不会在编译的时候被加上哈希字符串，从而可以实现覆盖默认样式的效果、

   - 建议global的范围尽可能小，不会影响全局样式

   ```less
   .style {
       .imageUploader {
           :global {
               .adm-image-uploader-upload-button {
                   display: flex;
                   justify-content: center;
                   align-items: center;
               }
           }
       }
   }
   ```

   ```tsx
   import styles from './styles.module.less';
   
   return (
       <div className={styles.style}>
           <div className={styles.imageUploader}>
               <ImageUploader
                   style={{'--cell-size': '10rem'}}
                   upload={uploadImage}
                   maxCount={1}
               ></ImageUploader>
           </div>
       </div>
   )
   ```

   