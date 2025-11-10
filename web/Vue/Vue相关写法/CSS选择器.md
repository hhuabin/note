# Vue3

1. **style**

   通过style强制修改css变量的值

   ```html
   <div>
       <ImageUploader
           style={{'--cell-size': '10rem'}}
           upload={uploadImage}
           maxCount={1}
       ></ImageUploader>
   </div>

2. 深度选择器**`:deep()`**（`/deep/`已被废弃）

   ```css
   :deep(.ant-picker) {
       width: 100%;
   
       .ant-picker-input, input {
           color: #FFF !important;
           font-size: 24px !important;
       }
   }
   ```

3. **`:where`**

   ```css
   :where(.ant-picker) {
       width: 100%;
   
       :where(.ant-picker-input, input) {
           color: #FFF !important;
           font-size: 24px !important;
       }
   }
   ```

4. 全局选择器`:global()`

   应用到全局

   ```css
   <style scoped>
       :global(.red) {
           color: red;
       }
   </style>
   ```