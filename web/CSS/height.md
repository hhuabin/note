# height: 100%;

关于`height: 100%;`



1. 父元素有明确高度

   ```css
   .parent {
       height: 300px;    /* 父元素高度明确 */
       background-color: lightgray;
   }
   
   .child {
       height: 100%;     /* 子元素占满父元素高度 300px */
       background-color: lightblue;
   }
   ```

2. 百分比高度的传递

   child的高度为100vh

   ```css
   .grandparent {
   	height: 100vh; /* 祖先元素高度明确，视口高度 */
   }
   
   .parent {
       height: 100%; /* 占满祖先元素的高度 */
       background-color: lightgray;
   }
   
   .child {
       height: 100%; /* 占满父元素的高度 100vh */
       background-color: lightblue;
   }
   ```

3. ==**剩余高度**==

   此时content元素不能再使用`height: 100%;`，可使用`flex`

   ```html
   <div class="parent">
       <div class="header">Header</div>
       <div class="content">Content</div>
   </div>
   ```

   ```css
   .parent {
       height: 100px; /* 父元素高度固定 */
       display: flex;
       flex-direction: column; /* 子元素纵向排列 */
   }
   
   .header {
       height: 50px; /* 固定高度 */
       background-color: lightcoral;
   }
   
   .content {
       flex: 1; /* 占据剩余高度 50px */
       background-color: lightblue;
       /* overflow: hidden; */
   }
   ```
   
   bug解决：
   
   如果`content`还有子元素，并且子元素的高度很大。那么`content`的高度会根据子元素的高度发生变化
   
   ```html
   <div class="parent">
       <div class="header">Header</div>
       <div class="content">
           <div class="child" style="height: 100px;">child</div>
       </div>
   </div>
   ```
   
   此时，content需要加上`overflow: hidden;`

   ```css
   .content {
       flex: 1;       /* 占据剩余高度 50px*/
       background-color: lightblue;
       overflow: hidden;
   }
   ```
   
   
   
   **`height: 100%;`方法不可行**
   
   ```css
   .parent {
       height: 100vh; /* 父元素高度固定 */
   }
   
   .header {
       height: 50px; /* 固定高度 */
   }
   
   .content {
       height: 100%;    /* 100vh */
   }
   ```
   
   

